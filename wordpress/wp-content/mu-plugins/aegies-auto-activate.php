<?php
/**
 * Plugin Name: Aegies Auto Activator
 * Description: Ensures Aegies Headless CMS plugin is automatically activated in local development.
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function() {
	$plugin_file = 'aegies-headless-cms/aegies-headless-cms.php';
	$active_plugins = (array) get_option( 'active_plugins', array() );

	if ( ! in_array( $plugin_file, $active_plugins, true ) ) {
		$active_plugins[] = $plugin_file;
		update_option( 'active_plugins', array_values( array_unique( $active_plugins ) ) );
	}
} );
