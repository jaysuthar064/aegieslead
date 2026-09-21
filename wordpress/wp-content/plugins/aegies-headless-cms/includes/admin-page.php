<?php
/**
 * Admin Page: Page Sections Manager
 */

defined( 'ABSPATH' ) || exit;

$current_slug = isset( $_GET['page_slug'] ) ? sanitize_key( $_GET['page_slug'] ) : 'home';
$all_pages    = Aegies_Defaults::get_pages_catalog();
$page_data    = get_option( 'aegies_page_' . $current_slug );

if ( empty( $page_data ) || ! is_array( $page_data ) ) {
	$method = 'get_default_page_' . str_replace( '-', '_', $current_slug );
	if ( method_exists( 'Aegies_Defaults', $method ) ) {
		$page_data = Aegies_Defaults::$method();
	} else {
		$page_data = Aegies_Defaults::get_generic_page_template( $current_slug, ucwords( str_replace( '-', ' ', $current_slug ) ) );
	}
}

$sections = $page_data['sections'] ?? array();
?>

<div class="wrap aegies-admin-wrap" id="aegies-cms-app" data-current-slug="<?php echo esc_attr( $current_slug ); ?>">
	<!-- Top Bar -->
	<header class="aegies-topbar">
		<div class="aegies-branding">
			<span class="dashicons dashicons-shield-alt aegies-logo-icon"></span>
			<div>
				<h1 class="aegies-title">Aegies Headless CMS</h1>
				<p class="aegies-subtitle">Visual Page & Section Content Manager for Decoupled React Frontend</p>
			</div>
		</div>

		<div class="aegies-topbar-actions">
			<a href="http://localhost:5173" target="_blank" class="button aegies-preview-btn">
				<span class="dashicons dashicons-external"></span> View Frontend (localhost:5173)
			</a>
			<button type="button" class="button button-secondary" id="aegies-reset-defaults-btn">
				<span class="dashicons dashicons-backup"></span> Restore Defaults
			</button>
			<button type="button" class="button button-primary button-hero aegies-save-btn" id="aegies-save-page-btn">
				<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend
			</button>
		</div>
	</header>

	<!-- Page Tabs Navigation -->
	<nav class="aegies-page-tabs">
		<div class="aegies-tab-group">
			<?php foreach ( $all_pages as $p ) : 
				$active_class = ( $p['slug'] === $current_slug ) ? 'active' : '';
			?>
				<a href="<?php echo esc_url( admin_url( 'admin.php?page=aegies-headless-cms&page_slug=' . $p['slug'] ) ); ?>" class="aegies-tab-item <?php echo esc_attr( $active_class ); ?>">
					<span class="dashicons <?php echo esc_attr( $p['icon'] ?? 'dashicons-admin-page' ); ?>"></span>
					<span><?php echo esc_html( $p['title'] ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
		<div class="aegies-api-endpoint-badge">
			<code>GET /?rest_route=/aegies/v1/page/<?php echo esc_html( $current_slug ); ?></code>
		</div>
	</nav>

	<!-- Main Workspace Layout -->
	<div class="aegies-workspace">
		<!-- Main Content: Section Accordions -->
		<main class="aegies-main-content">
			<div class="aegies-page-meta-card">
				<div class="aegies-card-header">
					<h2><span class="dashicons dashicons-admin-settings"></span> Page Meta & SEO</h2>
				</div>
				<div class="aegies-card-body">
					<div class="aegies-form-row">
						<div class="aegies-field-col">
							<label for="meta_page_title">Browser Page Title</label>
							<input type="text" id="meta_page_title" name="meta[title]" class="regular-text" value="<?php echo esc_attr( $page_data['meta']['title'] ?? '' ); ?>" placeholder="e.g., Home — Aegies Lead Enterprise Security">
						</div>
						<div class="aegies-field-col">
							<label for="meta_page_desc">Meta Description</label>
							<input type="text" id="meta_page_desc" name="meta[description]" class="regular-text" value="<?php echo esc_attr( $page_data['meta']['description'] ?? '' ); ?>" placeholder="Search engine description...">
						</div>
					</div>
				</div>
			</div>

			<!-- Sections Container -->
			<div class="aegies-sections-header">
				<div>
					<h2>Configured Sections (<?php echo count( $sections ); ?>)</h2>
					<p>Add, edit text/images, reorder, or toggle visibility of each section rendered on this page.</p>
				</div>
				<button type="button" class="button button-primary" id="aegies-open-add-section-modal">
					<span class="dashicons dashicons-plus-alt2"></span> Add New Section
				</button>
			</div>

			<div id="aegies-sections-list" class="aegies-sections-list">
				<?php if ( empty( $sections ) ) : ?>
					<div class="aegies-empty-state">
						<span class="dashicons dashicons-layout"></span>
						<h3>No sections configured yet.</h3>
						<p>Click "Add New Section" above to start building this page.</p>
					</div>
				<?php else : ?>
					<?php foreach ( $sections as $index => $section ) : 
						$sec_id     = $section['id'] ?? ( 'sec_' . uniqid() );
						$sec_type   = $section['type'] ?? 'hero';
						$is_active  = ! empty( $section['active'] );
						$settings   = $section['settings'] ?? array();
					?>
						<div class="aegies-section-card <?php echo $is_active ? 'is-active' : 'is-inactive'; ?>" data-section-id="<?php echo esc_attr( $sec_id ); ?>" data-section-type="<?php echo esc_attr( $sec_type ); ?>" data-order="<?php echo esc_attr( $index + 1 ); ?>">
							<!-- Header Bar -->
							<div class="aegies-section-header">
								<div class="aegies-section-title-wrap">
									<span class="dashicons dashicons-menu aegies-drag-handle" title="Drag or use up/down to reorder"></span>
									<span class="aegies-type-badge type-<?php echo esc_attr( $sec_type ); ?>"><?php echo esc_html( strtoupper( str_replace( '_', ' ', $sec_type ) ) ); ?></span>
									<strong class="aegies-section-label">
										<?php 
											echo esc_html( $settings['headline'] ?? $settings['title'] ?? $settings['heading'] ?? $settings['section_title'] ?? ('Section: ' . $sec_type) );
										?>
									</strong>
								</div>
								<div class="aegies-section-actions">
									<label class="aegies-toggle-switch" title="Toggle section visibility on frontend">
										<input type="checkbox" class="aegies-section-active-toggle" <?php checked( $is_active, true ); ?>>
										<span class="slider"></span>
									</label>
									<button type="button" class="button button-small aegies-move-up-btn" title="Move Up"><span class="dashicons dashicons-arrow-up-alt2"></span></button>
									<button type="button" class="button button-small aegies-move-down-btn" title="Move Down"><span class="dashicons dashicons-arrow-down-alt2"></span></button>
									<button type="button" class="button button-small aegies-toggle-accordion-btn" title="Expand / Collapse"><span class="dashicons dashicons-arrow-down"></span></button>
									<button type="button" class="button button-small button-link-delete aegies-delete-section-btn" title="Delete section"><span class="dashicons dashicons-trash"></span></button>
								</div>
							</div>

							<!-- Collapsible Editor Body -->
							<div class="aegies-section-body">
								<?php 
								switch ( $sec_type ) {
									case 'hero':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Eyebrow Badge Text</label>
													<input type="text" class="field-badge regular-text" value="<?php echo esc_attr( $settings['badge'] ?? '' ); ?>" placeholder="e.g., THE CONNECTIVE SECURITY PLATFORM">
												</div>
												<div class="aegies-field-col">
													<label>Main Headline</label>
													<input type="text" class="field-headline regular-text" value="<?php echo esc_attr( $settings['headline'] ?? '' ); ?>" placeholder="Where the world’s leading security programs operate.">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Subheadline / Description</label>
													<textarea class="field-subheadline large-text" rows="3"><?php echo esc_textarea( $settings['subheadline'] ?? '' ); ?></textarea>
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Primary Button Label</label>
													<input type="text" class="field-primary-btn-label regular-text" value="<?php echo esc_attr( $settings['primary_cta']['label'] ?? 'Request a Demo' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Primary Button Link URL</label>
													<input type="text" class="field-primary-btn-url regular-text" value="<?php echo esc_attr( $settings['primary_cta']['url'] ?? '#demo' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Secondary Button Label</label>
													<input type="text" class="field-secondary-btn-label regular-text" value="<?php echo esc_attr( $settings['secondary_cta']['label'] ?? 'Explore Platform' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Secondary Button Link URL</label>
													<input type="text" class="field-secondary-btn-url regular-text" value="<?php echo esc_attr( $settings['secondary_cta']['url'] ?? '#platform' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Custom Hero Image (Leave empty to use built-in interactive vector console)</label>
													<div class="aegies-media-picker">
														<input type="hidden" class="field-hero-image" value="<?php echo esc_attr( $settings['hero_image'] ?? '' ); ?>">
														<div class="aegies-image-preview">
															<?php if ( ! empty( $settings['hero_image'] ) ) : ?>
																<img src="<?php echo esc_url( $settings['hero_image'] ); ?>" alt="Hero Preview">
															<?php else : ?>
																<span class="aegies-no-image-text">No custom image selected (uses built-in vector console)</span>
															<?php endif; ?>
														</div>
														<div class="aegies-media-controls">
															<button type="button" class="button aegies-upload-img-btn">Select / Upload Image</button>
															<button type="button" class="button button-link-delete aegies-remove-img-btn" <?php echo empty( $settings['hero_image'] ) ? 'style="display:none;"' : ''; ?>>Remove</button>
														</div>
													</div>
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Trust Chips / Badges (Comma-separated)</label>
													<input type="text" class="field-highlight-chips large-text" value="<?php echo esc_attr( implode( ', ', $settings['highlight_chips'] ?? array() ) ); ?>" placeholder="600k+ Active Users, 50+ Countries, SOC 2 Type II">
												</div>
											</div>
										</div>
										<?php
										break;

									case 'trust_logos':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Section Title</label>
													<input type="text" class="field-logos-title regular-text" value="<?php echo esc_attr( $settings['title'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-repeater-wrap">
												<label>Partner Logos</label>
												<div class="aegies-repeater-list aegies-logos-repeater">
													<?php 
													$logos = $settings['logos'] ?? array();
													foreach ( $logos as $logo ) : ?>
														<div class="aegies-repeater-row">
															<input type="text" class="rep-logo-name regular-text" value="<?php echo esc_attr( $logo['name'] ?? '' ); ?>" placeholder="Brand Name (e.g. Airbus)">
															<input type="text" class="rep-logo-label regular-text" value="<?php echo esc_attr( $logo['label'] ?? '' ); ?>" placeholder="Badge Label (e.g. AIRBUS DEFENSE)">
															<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-no-alt"></span></button>
														</div>
													<?php endforeach; ?>
												</div>
												<button type="button" class="button button-small aegies-add-logo-btn"><span class="dashicons dashicons-plus"></span> Add Brand Logo</button>
											</div>
										</div>
										<?php
										break;

									case 'audience_tabs':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Section Main Heading</label>
													<input type="text" class="field-aud-heading regular-text" value="<?php echo esc_attr( $settings['heading'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Subheading</label>
													<input type="text" class="field-aud-subheading regular-text" value="<?php echo esc_attr( $settings['subheading'] ?? '' ); ?>">
												</div>
											</div>

											<!-- Tab 1: Enterprise -->
											<div class="aegies-nested-card">
												<h4>Persona 1: Enterprise Security</h4>
												<div class="aegies-form-row">
													<div class="aegies-field-col">
														<label>Tab Label</label>
														<input type="text" class="field-tab-ent-title regular-text" value="<?php echo esc_attr( $settings['tab_enterprise']['tab_title'] ?? '' ); ?>">
													</div>
													<div class="aegies-field-col">
														<label>Tagline</label>
														<input type="text" class="field-tab-ent-tagline regular-text" value="<?php echo esc_attr( $settings['tab_enterprise']['tagline'] ?? '' ); ?>">
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Headline</label>
														<input type="text" class="field-tab-ent-headline large-text" value="<?php echo esc_attr( $settings['tab_enterprise']['headline'] ?? '' ); ?>">
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Description</label>
														<textarea class="field-tab-ent-desc large-text" rows="2"><?php echo esc_textarea( $settings['tab_enterprise']['description'] ?? '' ); ?></textarea>
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Bullet Points (One per line)</label>
														<textarea class="field-tab-ent-bullets large-text" rows="3"><?php echo esc_textarea( implode( "\n", $settings['tab_enterprise']['bullets'] ?? array() ) ); ?></textarea>
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Compliance Stat Badge</label>
														<input type="text" class="field-tab-ent-badge large-text" value="<?php echo esc_attr( $settings['tab_enterprise']['stat_badge'] ?? '' ); ?>">
													</div>
												</div>
											</div>

											<!-- Tab 2: Guarding Firms -->
											<div class="aegies-nested-card">
												<h4>Persona 2: Security Guarding Firms</h4>
												<div class="aegies-form-row">
													<div class="aegies-field-col">
														<label>Tab Label</label>
														<input type="text" class="field-tab-guard-title regular-text" value="<?php echo esc_attr( $settings['tab_guarding']['tab_title'] ?? '' ); ?>">
													</div>
													<div class="aegies-field-col">
														<label>Tagline</label>
														<input type="text" class="field-tab-guard-tagline regular-text" value="<?php echo esc_attr( $settings['tab_guarding']['tagline'] ?? '' ); ?>">
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Headline</label>
														<input type="text" class="field-tab-guard-headline large-text" value="<?php echo esc_attr( $settings['tab_guarding']['headline'] ?? '' ); ?>">
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Description</label>
														<textarea class="field-tab-guard-desc large-text" rows="2"><?php echo esc_textarea( $settings['tab_guarding']['description'] ?? '' ); ?></textarea>
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Bullet Points (One per line)</label>
														<textarea class="field-tab-guard-bullets large-text" rows="3"><?php echo esc_textarea( implode( "\n", $settings['tab_guarding']['bullets'] ?? array() ) ); ?></textarea>
													</div>
												</div>
												<div class="aegies-form-row">
													<div class="aegies-field-col full-width">
														<label>Margin Recovery Stat Badge</label>
														<input type="text" class="field-tab-guard-badge large-text" value="<?php echo esc_attr( $settings['tab_guarding']['stat_badge'] ?? '' ); ?>">
													</div>
												</div>
											</div>
										</div>
										<?php
										break;

									case 'product_showcase':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Eyebrow Badge</label>
													<input type="text" class="field-prod-badge regular-text" value="<?php echo esc_attr( $settings['badge'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Headline</label>
													<input type="text" class="field-prod-headline regular-text" value="<?php echo esc_attr( $settings['headline'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Subheadline</label>
													<textarea class="field-prod-subheadline large-text" rows="2"><?php echo esc_textarea( $settings['subheadline'] ?? '' ); ?></textarea>
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Custom Showcase Image (Optional)</label>
													<div class="aegies-media-picker">
														<input type="hidden" class="field-prod-image" value="<?php echo esc_attr( $settings['image_url'] ?? '' ); ?>">
														<div class="aegies-image-preview">
															<?php if ( ! empty( $settings['image_url'] ) ) : ?>
																<img src="<?php echo esc_url( $settings['image_url'] ); ?>" alt="Showcase Preview">
															<?php else : ?>
																<span class="aegies-no-image-text">No custom image (uses interactive vector command console)</span>
															<?php endif; ?>
														</div>
														<div class="aegies-media-controls">
															<button type="button" class="button aegies-upload-img-btn">Select / Upload Image</button>
															<button type="button" class="button button-link-delete aegies-remove-img-btn" <?php echo empty( $settings['image_url'] ) ? 'style="display:none;"' : ''; ?>>Remove</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<?php
										break;

									case 'z_features':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Section Title</label>
													<input type="text" class="field-z-title regular-text" value="<?php echo esc_attr( $settings['section_title'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-repeater-wrap">
												<label>Feature Rows (Alternating Z-Pattern)</label>
												<div class="aegies-repeater-list aegies-zrows-repeater">
													<?php 
													$rows = $settings['rows'] ?? array();
													foreach ( $rows as $r_idx => $r ) : ?>
														<div class="aegies-nested-card aegies-zrow-card">
															<div class="aegies-card-header-compact">
																<strong>Row #<?php echo $r_idx + 1; ?>: <?php echo esc_html( $r['title'] ?? 'Feature' ); ?></strong>
																<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col">
																	<label>Badge</label>
																	<input type="text" class="z-badge regular-text" value="<?php echo esc_attr( $r['badge'] ?? '' ); ?>">
																</div>
																<div class="aegies-field-col">
																	<label>Title</label>
																	<input type="text" class="z-title regular-text" value="<?php echo esc_attr( $r['title'] ?? '' ); ?>">
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Description</label>
																	<textarea class="z-desc large-text" rows="2"><?php echo esc_textarea( $r['description'] ?? '' ); ?></textarea>
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Feature Bullets (One per line)</label>
																	<textarea class="z-bullets large-text" rows="3"><?php echo esc_textarea( implode( "\n", $r['bullets'] ?? array() ) ); ?></textarea>
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col">
																	<label>Link Text</label>
																	<input type="text" class="z-cta-text regular-text" value="<?php echo esc_attr( $r['cta_text'] ?? '' ); ?>">
																</div>
																<div class="aegies-field-col">
																	<label>Link URL</label>
																	<input type="text" class="z-cta-url regular-text" value="<?php echo esc_attr( $r['cta_url'] ?? '' ); ?>">
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Row Image (Optional)</label>
																	<div class="aegies-media-picker">
																		<input type="hidden" class="z-image-url" value="<?php echo esc_attr( $r['image_url'] ?? '' ); ?>">
																		<div class="aegies-image-preview">
																			<?php if ( ! empty( $r['image_url'] ) ) : ?>
																				<img src="<?php echo esc_url( $r['image_url'] ); ?>" alt="Feature Preview">
																			<?php else : ?>
																				<span class="aegies-no-image-text">No custom image</span>
																			<?php endif; ?>
																		</div>
																		<div class="aegies-media-controls">
																			<button type="button" class="button aegies-upload-img-btn">Upload / Select</button>
																			<button type="button" class="button button-link-delete aegies-remove-img-btn" <?php echo empty( $r['image_url'] ) ? 'style="display:none;"' : ''; ?>>Remove</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													<?php endforeach; ?>
												</div>
												<button type="button" class="button button-small aegies-add-zrow-btn"><span class="dashicons dashicons-plus"></span> Add Feature Row</button>
											</div>
										</div>
										<?php
										break;

									case 'metrics':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Headline</label>
													<input type="text" class="field-met-headline regular-text" value="<?php echo esc_attr( $settings['headline'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Description</label>
													<input type="text" class="field-met-desc regular-text" value="<?php echo esc_attr( $settings['description'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-repeater-wrap">
												<label>Metric Statistics</label>
												<div class="aegies-repeater-list aegies-metrics-repeater">
													<?php 
													$items = $settings['items'] ?? array();
													foreach ( $items as $m ) : ?>
														<div class="aegies-repeater-row">
															<input type="text" class="rep-met-val" style="width:120px;" value="<?php echo esc_attr( $m['value'] ?? '' ); ?>" placeholder="Value (e.g. 600k+)">
															<input type="text" class="rep-met-label regular-text" value="<?php echo esc_attr( $m['label'] ?? '' ); ?>" placeholder="Label (e.g. Active Guards)">
															<input type="text" class="rep-met-subtext regular-text" value="<?php echo esc_attr( $m['subtext'] ?? '' ); ?>" placeholder="Subtext">
															<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-no-alt"></span></button>
														</div>
													<?php endforeach; ?>
												</div>
												<button type="button" class="button button-small aegies-add-metric-btn"><span class="dashicons dashicons-plus"></span> Add Metric Card</button>
											</div>
										</div>
										<?php
										break;

									case 'case_studies':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Section Title</label>
													<input type="text" class="field-cs-title regular-text" value="<?php echo esc_attr( $settings['title'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Subtitle</label>
													<input type="text" class="field-cs-subtitle regular-text" value="<?php echo esc_attr( $settings['subtitle'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-repeater-wrap">
												<label>3-Column Case Study Cards</label>
												<div class="aegies-repeater-list aegies-cs-repeater">
													<?php 
													$cards = $settings['cards'] ?? array();
													foreach ( $cards as $c ) : ?>
														<div class="aegies-nested-card aegies-cs-card">
															<div class="aegies-card-header-compact">
																<strong>Case Study: <?php echo esc_html( $c['client'] ?? 'Client' ); ?></strong>
																<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col">
																	<label>Metric Stat (e.g. 99.6%)</label>
																	<input type="text" class="cs-metric regular-text" value="<?php echo esc_attr( $c['metric'] ?? '' ); ?>">
																</div>
																<div class="aegies-field-col">
																	<label>Metric Label</label>
																	<input type="text" class="cs-label regular-text" value="<?php echo esc_attr( $c['label'] ?? '' ); ?>">
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Client Name</label>
																	<input type="text" class="cs-client regular-text" value="<?php echo esc_attr( $c['client'] ?? '' ); ?>">
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Outcome / Result Summary</label>
																	<textarea class="cs-outcome large-text" rows="2"><?php echo esc_textarea( $c['outcome'] ?? '' ); ?></textarea>
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col">
																	<label>Link Text</label>
																	<input type="text" class="cs-link-text regular-text" value="<?php echo esc_attr( $c['link_text'] ?? '' ); ?>">
																</div>
																<div class="aegies-field-col">
																	<label>Link URL</label>
																	<input type="text" class="cs-link-url regular-text" value="<?php echo esc_attr( $c['link_url'] ?? '' ); ?>">
																</div>
															</div>
														</div>
													<?php endforeach; ?>
												</div>
												<button type="button" class="button button-small aegies-add-cs-btn"><span class="dashicons dashicons-plus"></span> Add Case Study Card</button>
											</div>
										</div>
										<?php
										break;

									case 'faq_accordion':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Title</label>
													<input type="text" class="field-faq-title regular-text" value="<?php echo esc_attr( $settings['title'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Subtitle</label>
													<input type="text" class="field-faq-subtitle regular-text" value="<?php echo esc_attr( $settings['subtitle'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-repeater-wrap">
												<label>FAQ Items</label>
												<div class="aegies-repeater-list aegies-faq-repeater">
													<?php 
													$items = $settings['items'] ?? array();
													foreach ( $items as $faq ) : ?>
														<div class="aegies-nested-card">
															<div class="aegies-card-header-compact">
																<strong>Question: <?php echo esc_html( substr( $faq['q'] ?? '', 0, 40 ) ); ?>...</strong>
																<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Question</label>
																	<input type="text" class="faq-q large-text" value="<?php echo esc_attr( $faq['q'] ?? '' ); ?>">
																</div>
															</div>
															<div class="aegies-form-row">
																<div class="aegies-field-col full-width">
																	<label>Answer</label>
																	<textarea class="faq-a large-text" rows="2"><?php echo esc_textarea( $faq['a'] ?? '' ); ?></textarea>
																</div>
															</div>
														</div>
													<?php endforeach; ?>
												</div>
												<button type="button" class="button button-small aegies-add-faq-btn"><span class="dashicons dashicons-plus"></span> Add Question</button>
											</div>
										</div>
										<?php
										break;

									case 'cta_banner':
										?>
										<div class="aegies-form-grid">
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Headline</label>
													<input type="text" class="field-cta-headline regular-text" value="<?php echo esc_attr( $settings['headline'] ?? '' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Subheadline</label>
													<input type="text" class="field-cta-subheadline regular-text" value="<?php echo esc_attr( $settings['subheadline'] ?? '' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Primary Button Label</label>
													<input type="text" class="field-cta-btn-label regular-text" value="<?php echo esc_attr( $settings['primary_button']['label'] ?? 'Request Demo' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Primary Button Link URL</label>
													<input type="text" class="field-cta-btn-url regular-text" value="<?php echo esc_attr( $settings['primary_button']['url'] ?? '#demo' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col">
													<label>Secondary Button Label</label>
													<input type="text" class="field-cta-sec-label regular-text" value="<?php echo esc_attr( $settings['secondary_button']['label'] ?? 'Contact Sales' ); ?>">
												</div>
												<div class="aegies-field-col">
													<label>Secondary Button Link URL</label>
													<input type="text" class="field-cta-sec-url regular-text" value="<?php echo esc_attr( $settings['secondary_button']['url'] ?? '#contact' ); ?>">
												</div>
											</div>
											<div class="aegies-form-row">
												<div class="aegies-field-col full-width">
													<label>Footnote / Guarantee</label>
													<input type="text" class="field-cta-footnote large-text" value="<?php echo esc_attr( $settings['footnote'] ?? '' ); ?>">
												</div>
											</div>
										</div>
										<?php
										break;

									default:
										?>
										<p>Standard section configuration for <code><?php echo esc_html( $sec_type ); ?></code>.</p>
										<?php
										break;
								}
								?>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</main>

		<!-- Sidebar Status & Quick Guide -->
		<aside class="aegies-sidebar">
			<div class="aegies-side-card">
				<h3><span class="dashicons dashicons-info"></span> Sync Status</h3>
				<p>Any changes saved here immediately update the database and reflect on the React frontend.</p>
				<ul class="aegies-status-list">
					<li><strong>Page:</strong> <code><?php echo esc_html( $current_slug ); ?></code></li>
					<li><strong>Total Sections:</strong> <span id="stat-total-sections"><?php echo count( $sections ); ?></span></li>
					<li><strong>Last Updated:</strong> <span id="stat-updated-time"><?php echo esc_html( $page_data['updated_at'] ?? 'Initial Default' ); ?></span></li>
				</ul>
				<button type="button" class="button button-primary aegies-save-btn" style="width:100%; text-align:center; margin-top:10px;">
					Save Page Changes
				</button>
			</div>

			<div class="aegies-side-card">
				<h3><span class="dashicons dashicons-layout"></span> Available Section Types</h3>
				<ul class="aegies-types-reference">
					<li><code>hero</code> 2-Column Hero + Dashboard Visual</li>
					<li><code>trust_logos</code> Enterprise Client Logo Cloud</li>
					<li><code>audience_tabs</code> Enterprise vs. Guarding Tabs</li>
					<li><code>product_showcase</code> Full Command Center Showcase</li>
					<li><code>z_features</code> Alternating 2-Column Z-Rows</li>
					<li><code>metrics</code> High-Impact Stat Counters</li>
					<li><code>case_studies</code> 3-Column Metric Outcome Cards</li>
					<li><code>faq_accordion</code> Interactive FAQ Accordion</li>
					<li><code>cta_banner</code> Bottom Conversion Banner</li>
				</ul>
			</div>
		</aside>
	</div>

	<!-- Add Section Modal Dialog -->
	<div id="aegies-add-section-modal" class="aegies-modal" style="display:none;">
		<div class="aegies-modal-overlay"></div>
		<div class="aegies-modal-content">
			<div class="aegies-modal-header">
				<h2>Add New Section to <?php echo esc_html( $current_slug ); ?></h2>
				<button type="button" class="aegies-modal-close-btn">&times;</button>
			</div>
			<div class="aegies-modal-body">
				<p>Select a section component template to inject into your page layout:</p>
				<div class="aegies-template-grid">
					<div class="aegies-template-card" data-template="hero">
						<span class="dashicons dashicons-slides"></span>
						<strong>Hero Banner</strong>
						<p>Headline, subhead, dual CTAs, mockup image, trust chips.</p>
					</div>
					<div class="aegies-template-card" data-template="trust_logos">
						<span class="dashicons dashicons-awards"></span>
						<strong>Trust Logo Cloud</strong>
						<p>Logos of enterprise clients and security agencies.</p>
					</div>
					<div class="aegies-template-card" data-template="audience_tabs">
						<span class="dashicons dashicons-groups"></span>
						<strong>Audience Persona Tabs</strong>
						<p>Dual-buyer switcher (Enterprise vs. Guarding Firms).</p>
					</div>
					<div class="aegies-template-card" data-template="product_showcase">
						<span class="dashicons dashicons-desktop"></span>
						<strong>Product Showcase</strong>
						<p>Large dashboard visual with floating compliance badges.</p>
					</div>
					<div class="aegies-template-card" data-template="z_features">
						<span class="dashicons dashicons-columns"></span>
						<strong>Z-Pattern Features</strong>
						<p>Alternating text/visual rows with granular bullets.</p>
					</div>
					<div class="aegies-template-card" data-template="metrics">
						<span class="dashicons dashicons-chart-bar"></span>
						<strong>Metrics Counter Bar</strong>
						<p>Big scale numbers (600k+ guards, 250M+ patrol hours).</p>
					</div>
					<div class="aegies-template-card" data-template="case_studies">
						<span class="dashicons dashicons-testimonial"></span>
						<strong>Case Studies Grid</strong>
						<p>3-column proof cards with metrics and outcomes.</p>
					</div>
					<div class="aegies-template-card" data-template="faq_accordion">
						<span class="dashicons dashicons-editor-help"></span>
						<strong>FAQ Accordion</strong>
						<p>Expandable questions and answers.</p>
					</div>
					<div class="aegies-template-card" data-template="cta_banner">
						<span class="dashicons dashicons-megaphone"></span>
						<strong>Bottom CTA Banner</strong>
						<p>Full-width high-converting demo request block.</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Toast Notification -->
	<div id="aegies-toast" class="aegies-toast" style="display:none;"></div>
</div>
