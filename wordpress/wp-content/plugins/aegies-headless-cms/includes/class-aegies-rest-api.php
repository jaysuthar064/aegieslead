<?php
/**
 * REST API Endpoints for Aegies Headless CMS.
 */

defined( 'ABSPATH' ) || exit;

class Aegies_REST_API {

	public static function register_routes() {
		register_rest_route( 'aegies/v1', '/global', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_global_settings' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( 'aegies/v1', '/pages', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_all_pages' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( 'aegies/v1', '/page/(?P<slug>[a-zA-Z0-9_-]+)', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_page_content' ),
			'permission_callback' => '__return_true',
			'args'                => array(
				'slug' => array(
					'required'          => true,
					'validate_callback' => function( $param ) {
						return is_string( $param );
					},
				),
			),
		) );

		register_rest_route( 'aegies/v1', '/leads', array(
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'submit_lead' ),
				'permission_callback' => '__return_true',
			),
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_leads' ),
				'permission_callback' => '__return_true',
			),
		) );

		register_rest_route( 'aegies/v1', '/status', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_cms_status' ),
			'permission_callback' => '__return_true',
		) );
	}

	public static function get_global_settings( WP_REST_Request $request ) {
		$cached = get_transient( 'aegies_global_settings' );
		if ( false !== $cached && is_array( $cached ) ) {
			return rest_ensure_response( $cached );
		}

		$data = get_option( 'aegies_global_settings' );
		if ( empty( $data ) || ! is_array( $data ) ) {
			$data = Aegies_Defaults::get_default_global_settings();
			update_option( 'aegies_global_settings', $data );
		}

		$data = self::sanitize_and_resolve_media( $data );
		set_transient( 'aegies_global_settings', $data, HOUR_IN_SECONDS * 12 );

		return rest_ensure_response( $data );
	}

	public static function get_all_pages( WP_REST_Request $request ) {
		$cached = get_transient( 'aegies_all_pages' );
		if ( false !== $cached && is_array( $cached ) ) {
			return rest_ensure_response( $cached );
		}

		$catalog = Aegies_Defaults::get_pages_catalog();
		$pages_summary = array();

		foreach ( $catalog as $item ) {
			$page_data = get_option( 'aegies_page_' . $item['slug'] );
			if ( empty( $page_data ) || ! is_array( $page_data ) ) {
				$page_data = Aegies_Defaults::get_default_page_home();
			}

			$active_sections_count = 0;
			if ( ! empty( $page_data['sections'] ) && is_array( $page_data['sections'] ) ) {
				foreach ( $page_data['sections'] as $sec ) {
					if ( ! empty( $sec['active'] ) ) {
						$active_sections_count++;
					}
				}
			}

			$pages_summary[] = array(
				'slug'           => $item['slug'],
				'title'          => $item['title'],
				'icon'           => $item['icon'] ?? 'dashicons-admin-page',
				'totalSections'  => count( $page_data['sections'] ?? array() ),
				'activeSections' => $active_sections_count,
				'updatedAt'      => $page_data['updated_at'] ?? current_time( 'mysql' ),
			);
		}

		set_transient( 'aegies_all_pages', $pages_summary, HOUR_IN_SECONDS * 12 );

		return rest_ensure_response( $pages_summary );
	}

	public static function get_page_content( WP_REST_Request $request ) {
		$slug = sanitize_key( $request->get_param( 'slug' ) );

		$cached = get_transient( 'aegies_page_' . $slug );
		if ( false !== $cached && is_array( $cached ) ) {
			return rest_ensure_response( $cached );
		}

		$data = get_option( 'aegies_page_' . $slug );
		if ( empty( $data ) || ! is_array( $data ) ) {
			$method = 'get_default_page_' . str_replace( '-', '_', $slug );
			if ( method_exists( 'Aegies_Defaults', $method ) ) {
				$data = Aegies_Defaults::$method();
			} else {
				$data = Aegies_Defaults::get_generic_page_template( $slug, ucwords( str_replace( '-', ' ', $slug ) ) );
			}
			update_option( 'aegies_page_' . $slug, $data );
		}

		$data = self::sanitize_and_resolve_media( $data );

		if ( ! empty( $data['sections'] ) && is_array( $data['sections'] ) ) {
			usort( $data['sections'], function( $a, $b ) {
				$oa = isset( $a['order'] ) ? (int) $a['order'] : 0;
				$ob = isset( $b['order'] ) ? (int) $b['order'] : 0;
				return $oa <=> $ob;
			} );
		}

		set_transient( 'aegies_page_' . $slug, $data, HOUR_IN_SECONDS * 12 );

		return rest_ensure_response( $data );
	}

	public static function submit_lead( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_body_params();
		}

		$name        = sanitize_text_field( $params['name'] ?? '' );
		$email       = sanitize_email( $params['email'] ?? '' );
		$company     = sanitize_text_field( $params['company'] ?? '' );
		$phone       = sanitize_text_field( $params['phone'] ?? '' );
		$guard_count = sanitize_text_field( $params['guard_count'] ?? $params['guards'] ?? '1-50 guards' );
		$persona     = sanitize_text_field( $params['persona'] ?? 'Enterprise Security' );
		$message     = sanitize_textarea_field( $params['message'] ?? $params['notes'] ?? '' );
		$page_source = sanitize_text_field( $params['source'] ?? 'home' );

		if ( empty( $email ) ) {
			return new WP_Error( 'missing_email', 'Please provide a valid work email address.', array( 'status' => 400 ) );
		}

		$lead_id = 'lead_' . uniqid();
		$lead = array(
			'id'          => $lead_id,
			'name'        => $name ?: 'Prospective Client',
			'email'       => $email,
			'company'     => $company ?: 'Undisclosed Enterprise',
			'phone'       => $phone,
			'guard_count' => $guard_count,
			'persona'     => $persona,
			'message'     => $message,
			'source'      => $page_source,
			'created_at'  => current_time( 'mysql' ),
			'ip_address'  => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '' ),
			'status'      => 'new',
		);

		$leads = get_option( 'aegies_leads_log', array() );
		if ( ! is_array( $leads ) ) {
			$leads = array();
		}

		array_unshift( $leads, $lead );
		// Keep last 500 leads
		if ( count( $leads ) > 500 ) {
			$leads = array_slice( $leads, 0, 500 );
		}

		update_option( 'aegies_leads_log', $leads );

		return rest_ensure_response( array(
			'success' => true,
			'lead_id' => $lead_id,
			'message' => 'Thank you! Your inquiry has been received. Our security solutions engineering team will reach out shortly.',
			'time'    => $lead['created_at'],
		) );
	}

	public static function get_leads( WP_REST_Request $request ) {
		$leads = get_option( 'aegies_leads_log', array() );
		if ( ! is_array( $leads ) ) {
			$leads = array();
		}
		return rest_ensure_response( array(
			'total' => count( $leads ),
			'leads' => $leads,
		) );
	}

	public static function get_cms_status( WP_REST_Request $request ) {
		return rest_ensure_response( array(
			'status'    => 'online',
			'version'   => AEGIES_CMS_VERSION,
			'timestamp' => current_time( 'mysql' ),
			'endpoints' => array(
				'global' => rest_url( 'aegies/v1/global' ),
				'pages'  => rest_url( 'aegies/v1/pages' ),
				'page'   => rest_url( 'aegies/v1/page/{slug}' ),
				'leads'  => rest_url( 'aegies/v1/leads' ),
			),
		) );
	}

	private static function sanitize_and_resolve_media( $data ) {
		if ( is_array( $data ) ) {
			foreach ( $data as $k => $v ) {
				if ( is_numeric( $v ) && ( strpos( $k, '_id' ) !== false || $k === 'attachment_id' || $k === 'image_id' ) ) {
					$url = wp_get_attachment_url( (int) $v );
					if ( $url ) {
						$data[ str_replace( '_id', '_url', $k ) ] = $url;
					}
				} elseif ( is_array( $v ) ) {
					$data[ $k ] = self::sanitize_and_resolve_media( $v );
				}
			}
		}
		return $data;
	}
}
