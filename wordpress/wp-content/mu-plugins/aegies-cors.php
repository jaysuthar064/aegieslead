<?php
/**
 * Plugin Name: Aegies Headless Open CORS Engine
 * Description: Guarantees 100% open CORS support for all origins, headers, and HTTP methods across all WordPress endpoints.
 * Version: 1.1.0
 */

defined( 'ABSPATH' ) || exit;

function aegies_apply_open_cors_headers() {
	$origin = ! empty( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '*';

	header( "Access-Control-Allow-Origin: $origin" );
	header( 'Access-Control-Allow-Credentials: true' );
	header( 'Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Accept, Origin, Cache-Control, Pragma, X-Requested-With, If-Modified-Since, X-HTTP-Method-Override' );
	header( 'Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages, Link' );
	header( 'Access-Control-Max-Age: 86400' );

	if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === strtoupper( $_SERVER['REQUEST_METHOD'] ) ) {
		status_header( 200 );
		exit();
	}
}

// Hook early at multiple lifecycle points
add_action( 'init', 'aegies_apply_open_cors_headers', -9999 );
add_action( 'rest_api_init', 'aegies_apply_open_cors_headers', -9999 );
add_action( 'send_headers', 'aegies_apply_open_cors_headers', -9999 );
add_filter( 'rest_pre_serve_request', function( $served ) {
	aegies_apply_open_cors_headers();
	return $served;
}, -9999 );
