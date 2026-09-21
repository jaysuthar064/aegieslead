<?php
/**
 * Admin Page: Global Navigation & Brand Settings
 */

defined( 'ABSPATH' ) || exit;

$global_settings = get_option( 'aegies_global_settings' );
if ( empty( $global_settings ) || ! is_array( $global_settings ) ) {
	$global_settings = Aegies_Defaults::get_default_global_settings();
}

$branding = $global_settings['branding'] ?? array();
$nav      = $global_settings['header_nav'] ?? array();
$footer   = $global_settings['footer'] ?? array();
$seo      = $global_settings['seo'] ?? array();
?>

<div class="wrap aegies-admin-wrap" id="aegies-cms-global-app">
	<header class="aegies-topbar">
		<div class="aegies-branding">
			<span class="dashicons dashicons-shield-alt aegies-logo-icon"></span>
			<div>
				<h1 class="aegies-title">Global Settings & Navigation</h1>
				<p class="aegies-subtitle">Manage Site Branding, Mega-Menu Links, Footer Link Trees, and Global SEO</p>
			</div>
		</div>

		<div class="aegies-topbar-actions">
			<a href="http://localhost:5173" target="_blank" class="button aegies-preview-btn">
				<span class="dashicons dashicons-external"></span> Live React Preview
			</a>
			<button type="button" class="button button-primary button-hero" id="aegies-save-global-btn">
				<span class="dashicons dashicons-cloud-saved"></span> Save Global Settings
			</button>
		</div>
	</header>

	<div class="aegies-workspace">
		<main class="aegies-main-content">
			<!-- BRANDING CARD -->
			<div class="aegies-page-meta-card">
				<div class="aegies-card-header">
					<h2><span class="dashicons dashicons-art"></span> Site Branding & Identity</h2>
				</div>
				<div class="aegies-card-body">
					<div class="aegies-form-row">
						<div class="aegies-field-col">
							<label for="glob_site_title">Site Title</label>
							<input type="text" id="glob_site_title" class="regular-text" value="<?php echo esc_attr( $branding['site_title'] ?? 'Aegies Lead' ); ?>">
						</div>
						<div class="aegies-field-col">
							<label for="glob_tagline">Tagline</label>
							<input type="text" id="glob_tagline" class="regular-text" value="<?php echo esc_attr( $branding['tagline'] ?? '' ); ?>">
						</div>
					</div>
					<div class="aegies-form-row">
						<div class="aegies-field-col">
							<label for="glob_logo_text">Header Brand Text</label>
							<input type="text" id="glob_logo_text" class="regular-text" value="<?php echo esc_attr( $branding['logo_text'] ?? 'AEGIES LEAD' ); ?>">
						</div>
						<div class="aegies-field-col">
							<label for="glob_primary_color">Primary Brand Color</label>
							<input type="color" id="glob_primary_color" value="<?php echo esc_attr( $branding['primary_color'] ?? '#1d4ed8' ); ?>" style="width:80px; height:38px; padding:0; cursor:pointer;">
						</div>
					</div>
				</div>
			</div>

			<!-- HEADER & MEGA MENU CARD -->
			<div class="aegies-page-meta-card">
				<div class="aegies-card-header">
					<h2><span class="dashicons dashicons-menu-alt"></span> Header Navigation & Mega-Menu</h2>
				</div>
				<div class="aegies-card-body">
					<div class="aegies-form-row">
						<div class="aegies-field-col">
							<label>Header CTA Button 1</label>
							<input type="text" id="glob_cta1_label" class="regular-text" value="<?php echo esc_attr( $nav['action_buttons'][0]['label'] ?? 'Client Portal' ); ?>" placeholder="Button Label">
							<input type="text" id="glob_cta1_url" class="regular-text" style="margin-top:5px;" value="<?php echo esc_attr( $nav['action_buttons'][0]['url'] ?? 'http://localhost:8889/wp-admin' ); ?>" placeholder="URL">
						</div>
						<div class="aegies-field-col">
							<label>Header CTA Button 2 (Primary Demo)</label>
							<input type="text" id="glob_cta2_label" class="regular-text" value="<?php echo esc_attr( $nav['action_buttons'][1]['label'] ?? 'Request Demo' ); ?>" placeholder="Button Label">
							<input type="text" id="glob_cta2_url" class="regular-text" style="margin-top:5px;" value="<?php echo esc_attr( $nav['action_buttons'][1]['url'] ?? '#demo' ); ?>" placeholder="URL">
						</div>
					</div>
				</div>
			</div>

			<!-- FOOTER SETTINGS CARD -->
			<div class="aegies-page-meta-card">
				<div class="aegies-card-header">
					<h2><span class="dashicons dashicons-editor-table"></span> Footer Link Farm & Compliance</h2>
				</div>
				<div class="aegies-card-body">
					<div class="aegies-form-row">
						<div class="aegies-field-col full-width">
							<label for="glob_footer_about">Footer Company Description</label>
							<textarea id="glob_footer_about" class="large-text" rows="2"><?php echo esc_textarea( $footer['about_text'] ?? '' ); ?></textarea>
						</div>
					</div>
					<div class="aegies-form-row">
						<div class="aegies-field-col">
							<label for="glob_footer_copyright">Copyright Text</label>
							<input type="text" id="glob_footer_copyright" class="regular-text" value="<?php echo esc_attr( $footer['copyright'] ?? '' ); ?>">
						</div>
						<div class="aegies-field-col">
							<label for="glob_footer_compliance">Compliance Badges (Comma-separated)</label>
							<input type="text" id="glob_footer_compliance" class="regular-text" value="<?php echo esc_attr( implode( ', ', $footer['compliance_badges'] ?? array() ) ); ?>">
						</div>
					</div>
				</div>
			</div>
		</main>

		<aside class="aegies-sidebar">
			<div class="aegies-side-card">
				<h3><span class="dashicons dashicons-rest-api"></span> API Endpoint</h3>
				<p>Global navigation and branding are served at:</p>
				<code>GET /wp-json/aegies/v1/global</code>
			</div>
		</aside>
	</div>

	<div id="aegies-toast" class="aegies-toast" style="display:none;"></div>
</div>
