<?php
/**
 * Plugin Name: Aegies Local Auto Login
 * Description: One-click local administrator login via URL token.
 * Version:     1.0.0
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	if ( ! isset( $_GET['aegies_login'] ) || $_GET['aegies_login'] !== '1' ) {
		return;
	}

	if ( ! defined( 'AEGIES_LOCAL_LOGIN_TOKEN' ) || empty( $_GET['token'] ) ) {
		return;
	}

	if ( ! hash_equals( AEGIES_LOCAL_LOGIN_TOKEN, (string) $_GET['token'] ) ) {
		return;
	}

	// Only allow on local environment type
	if ( function_exists( 'wp_get_environment_type' ) && wp_get_environment_type() !== 'local' ) {
		return;
	}

	// Find administrator user
	$admins = get_users( array( 'role' => 'administrator', 'number' => 1 ) );
	if ( empty( $admins ) ) {
		return;
	}

	$admin = $admins[0];
	wp_set_current_user( $admin->ID, $admin->user_login );
	wp_set_auth_cookie( $admin->ID );
	do_action( 'wp_login', $admin->user_login, $admin );

	$redirect_url = admin_url( 'admin.php?page=aegies-headless-cms' );
	if ( ! empty( $_GET['redirect_to'] ) ) {
		$redirect_url = sanitize_text_field( wp_unslash( $_GET['redirect_to'] ) );
	}

	wp_safe_redirect( $redirect_url );
	exit;
} );
