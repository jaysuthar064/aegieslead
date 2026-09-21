<?php
/**
 * Plugin Name: Aegies Headless CMS
 * Plugin URI:  https://aegieslead.com
 * Description: All-in-one headless content & modular section manager for Aegies Lead B2B Security Platform.
 * Version:     1.0.0
 * Author:      Aegies Engineering
 * Text Domain: aegies-headless-cms
 */

defined( 'ABSPATH' ) || exit;

define( 'AEGIES_CMS_VERSION', '1.0.0' );
define( 'AEGIES_CMS_PATH', plugin_dir_path( __FILE__ ) );
define( 'AEGIES_CMS_URL', plugin_dir_url( __FILE__ ) );

// Require dependencies
require_once AEGIES_CMS_PATH . 'includes/class-aegies-defaults.php';
require_once AEGIES_CMS_PATH . 'includes/class-aegies-rest-api.php';

class Aegies_Headless_CMS {

	private static $instance = null;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_action( 'init', array( $this, 'init_defaults_if_needed' ) );
		add_action( 'wp_ajax_aegies_save_page_content', array( $this, 'ajax_save_page_content' ) );
		add_action( 'wp_ajax_aegies_save_global_settings', array( $this, 'ajax_save_global_settings' ) );
		add_action( 'wp_ajax_aegies_reset_defaults', array( $this, 'ajax_reset_defaults' ) );

		// Enable CORS for Headless Frontend clients
		add_action( 'rest_api_init', array( $this, 'init_rest_api' ) );
		add_action( 'init', array( $this, 'add_cors_headers' ) );
		add_filter( 'rest_pre_serve_request', array( $this, 'rest_send_cors_headers' ), 10, 4 );
	}

	public function register_admin_menu() {
		add_menu_page(
			__( 'Aegies CMS', 'aegies-headless-cms' ),
			__( 'Aegies CMS', 'aegies-headless-cms' ),
			'manage_options',
			'aegies-headless-cms',
			array( $this, 'render_admin_page' ),
			'dashicons-shield-alt',
			25
		);

		add_submenu_page(
			'aegies-headless-cms',
			__( 'Page Sections Manager', 'aegies-headless-cms' ),
			__( 'Page Sections', 'aegies-headless-cms' ),
			'manage_options',
			'aegies-headless-cms',
			array( $this, 'render_admin_page' )
		);

		add_submenu_page(
			'aegies-headless-cms',
			__( 'Global Navigation & Brand', 'aegies-headless-cms' ),
			__( 'Global Settings', 'aegies-headless-cms' ),
			'manage_options',
			'aegies-headless-cms-global',
			array( $this, 'render_global_settings_page' )
		);
	}

	public function enqueue_admin_assets( $hook ) {
		if ( strpos( $hook, 'aegies-headless-cms' ) === false ) {
			return;
		}

		// WordPress native media uploader
		wp_enqueue_media();

		wp_enqueue_style(
			'aegies-admin-style',
			AEGIES_CMS_URL . 'assets/admin.css',
			array(),
			AEGIES_CMS_VERSION
		);

		wp_enqueue_script(
			'aegies-admin-script',
			AEGIES_CMS_URL . 'assets/admin.js',
			array( 'jquery' ),
			AEGIES_CMS_VERSION,
			true
		);

		wp_localize_script( 'aegies-admin-script', 'aegiesAdminData', array(
			'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
			'restUrl'   => rest_url( 'aegies/v1/' ),
			'nonce'     => wp_create_nonce( 'aegies_admin_nonce' ),
			'reactUrl'  => 'http://localhost:5173',
			'allPages'  => Aegies_Defaults::get_pages_catalog(),
		) );
	}

	public function render_admin_page() {
		require_once AEGIES_CMS_PATH . 'includes/admin-page.php';
	}

	public function render_global_settings_page() {
		require_once AEGIES_CMS_PATH . 'includes/admin-global-page.php';
	}

	public function init_defaults_if_needed() {
		if ( ! get_option( 'aegies_cms_initialized' ) ) {
			Aegies_Defaults::seed_all_defaults();
			update_option( 'aegies_cms_initialized', '1.0.0' );
		}
	}

	public function init_rest_api() {
		Aegies_REST_API::register_routes();
	}

	public function add_cors_headers() {
		$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '*';
		header( "Access-Control-Allow-Origin: $origin" );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Accept, Origin, Cache-Control, Pragma, X-Requested-With, If-Modified-Since' );
		header( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS' );
		if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
			status_header( 200 );
			exit();
		}
	}

	public function rest_send_cors_headers( $served, $result, $request, $server ) {
		$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '*';
		header( "Access-Control-Allow-Origin: $origin" );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Accept, Origin, Cache-Control, Pragma, X-Requested-With, If-Modified-Since' );
		header( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS' );
		return $served;
	}

	public function ajax_save_page_content() {
		check_ajax_referer( 'aegies_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Unauthorized permissions.' ), 403 );
		}

		$slug = sanitize_text_field( $_POST['slug'] ?? 'home' );
		$raw_data = isset( $_POST['sections'] ) ? wp_unslash( $_POST['sections'] ) : '';
		$sections = is_string( $raw_data ) ? json_decode( $raw_data, true ) : $raw_data;

		if ( ! is_array( $sections ) ) {
			wp_send_json_error( array( 'message' => 'Invalid section payload format.' ), 400 );
		}

		$meta_raw = isset( $_POST['meta'] ) ? wp_unslash( $_POST['meta'] ) : '';
		$meta = is_string( $meta_raw ) ? json_decode( $meta_raw, true ) : ( is_array( $meta_raw ) ? $meta_raw : array() );

		$page_data = array(
			'slug'         => $slug,
			'meta'         => $meta,
			'sections'     => $sections,
			'updated_at'   => current_time( 'mysql' ),
			'updated_by'   => get_current_user_id(),
		);

		update_option( 'aegies_page_' . $slug, $page_data );
		delete_transient( 'aegies_page_' . $slug );
		delete_transient( 'aegies_all_pages' );

		wp_send_json_success( array(
			'message'   => 'Page content synchronized successfully.',
			'slug'      => $slug,
			'sections'  => count( $sections ),
			'updatedAt' => $page_data['updated_at']
		) );
	}

	public function ajax_save_global_settings() {
		check_ajax_referer( 'aegies_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Unauthorized permissions.' ), 403 );
		}

		$raw_data = isset( $_POST['global_data'] ) ? wp_unslash( $_POST['global_data'] ) : '';
		$global_data = is_string( $raw_data ) ? json_decode( $raw_data, true ) : $raw_data;

		if ( ! is_array( $global_data ) ) {
			wp_send_json_error( array( 'message' => 'Invalid global settings payload.' ), 400 );
		}

		$global_data['updated_at'] = current_time( 'mysql' );
		update_option( 'aegies_global_settings', $global_data );
		delete_transient( 'aegies_global_settings' );

		wp_send_json_success( array(
			'message'   => 'Global navigation and branding settings updated.',
			'updatedAt' => $global_data['updated_at']
		) );
	}

	public function ajax_reset_defaults() {
		check_ajax_referer( 'aegies_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Unauthorized permissions.' ), 403 );
		}

		Aegies_Defaults::seed_all_defaults();
		delete_transient( 'aegies_global_settings' );
		delete_transient( 'aegies_all_pages' );

		wp_send_json_success( array( 'message' => 'Default templates and schemas restored.' ) );
	}
}

// Auto-boot plugin
add_action( 'plugins_loaded', array( 'Aegies_Headless_CMS', 'get_instance' ) );
