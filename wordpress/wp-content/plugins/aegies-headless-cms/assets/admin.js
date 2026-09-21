/**
 * Aegies Headless CMS Admin JavaScript Engine
 */

(function($) {
	'use strict';

	$(document).ready(function() {
		const app = $('#aegies-cms-app');
		const currentSlug = app.data('current-slug') || 'home';

		function showToast(message, isError) {
			const toast = $('#aegies-toast');
			toast.text(message).css({
				'background': isError ? '#dc2626' : '#0f172a',
				'display': 'block'
			}).fadeIn(200);

			setTimeout(function() {
				toast.fadeOut(300);
			}, 3500);
		}

		// 1. Accordion Toggle
		$(document).on('click', '.aegies-toggle-accordion-btn', function(e) {
			e.preventDefault();
			const card = $(this).closest('.aegies-section-card');
			const body = card.find('.aegies-section-body');
			const icon = $(this).find('.dashicons');

			body.slideToggle(200, function() {
				if (body.is(':visible')) {
					icon.removeClass('dashicons-arrow-right').addClass('dashicons-arrow-down');
				} else {
					icon.removeClass('dashicons-arrow-down').addClass('dashicons-arrow-right');
				}
			});
		});

		// 2. Active Toggle Switch
		$(document).on('change', '.aegies-section-active-toggle', function() {
			const card = $(this).closest('.aegies-section-card');
			if ($(this).is(':checked')) {
				card.removeClass('is-inactive').addClass('is-active');
			} else {
				card.removeClass('is-active').addClass('is-inactive');
			}
		});

		// 3. Move Section Up
		$(document).on('click', '.aegies-move-up-btn', function(e) {
			e.preventDefault();
			const card = $(this).closest('.aegies-section-card');
			const prev = card.prev('.aegies-section-card');
			if (prev.length) {
				card.insertBefore(prev);
				recalcOrders();
			}
		});

		// 4. Move Section Down
		$(document).on('click', '.aegies-move-down-btn', function(e) {
			e.preventDefault();
			const card = $(this).closest('.aegies-section-card');
			const next = card.next('.aegies-section-card');
			if (next.length) {
				card.insertAfter(next);
				recalcOrders();
			}
		});

		// 5. Delete Section
		$(document).on('click', '.aegies-delete-section-btn', function(e) {
			e.preventDefault();
			if (confirm('Are you sure you want to remove this section?')) {
				$(this).closest('.aegies-section-card').slideUp(200, function() {
					$(this).remove();
					recalcOrders();
				});
			}
		});

		function recalcOrders() {
			$('#aegies-sections-list .aegies-section-card').each(function(index) {
				$(this).attr('data-order', index + 1);
			});
			$('#stat-total-sections').text($('#aegies-sections-list .aegies-section-card').length);
		}

		// 6. Media Library Uploader (wp.media)
		$(document).on('click', '.aegies-upload-img-btn', function(e) {
			e.preventDefault();
			const button = $(this);
			const picker = button.closest('.aegies-media-picker');
			const hiddenField = picker.find('input[type="hidden"]');
			const preview = picker.find('.aegies-image-preview');
			const removeBtn = picker.find('.aegies-remove-img-btn');

			const mediaUploader = wp.media({
				title: 'Select or Upload Graphic Asset',
				button: { text: 'Use Asset' },
				multiple: false
			});

			mediaUploader.on('select', function() {
				const attachment = mediaUploader.state().get('selection').first().toJSON();
				hiddenField.val(attachment.url);
				preview.html('<img src="' + attachment.url + '" alt="Asset Preview">');
				removeBtn.show();
			});

			mediaUploader.open();
		});

		$(document).on('click', '.aegies-remove-img-btn', function(e) {
			e.preventDefault();
			const picker = $(this).closest('.aegies-media-picker');
			picker.find('input[type="hidden"]').val('');
			picker.find('.aegies-image-preview').html('<span class="aegies-no-image-text">No custom image</span>');
			$(this).hide();
		});

		// 7. Add Repeater Items
		$(document).on('click', '.aegies-remove-rep-row', function(e) {
			e.preventDefault();
			$(this).closest('.aegies-repeater-row, .aegies-nested-card').remove();
		});

		$(document).on('click', '.aegies-add-logo-btn', function(e) {
			e.preventDefault();
			const list = $(this).siblings('.aegies-logos-repeater');
			const newRow = $(
				'<div class="aegies-repeater-row">' +
					'<input type="text" class="rep-logo-name regular-text" placeholder="Brand Name">' +
					'<input type="text" class="rep-logo-label regular-text" placeholder="Badge Label">' +
					'<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-no-alt"></span></button>' +
				'</div>'
			);
			list.append(newRow);
		});

		$(document).on('click', '.aegies-add-metric-btn', function(e) {
			e.preventDefault();
			const list = $(this).siblings('.aegies-metrics-repeater');
			const newRow = $(
				'<div class="aegies-repeater-row">' +
					'<input type="text" class="rep-met-val" style="width:120px;" placeholder="Value">' +
					'<input type="text" class="rep-met-label regular-text" placeholder="Label">' +
					'<input type="text" class="rep-met-subtext regular-text" placeholder="Subtext">' +
					'<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-no-alt"></span></button>' +
				'</div>'
			);
			list.append(newRow);
		});

		$(document).on('click', '.aegies-add-cs-btn', function(e) {
			e.preventDefault();
			const list = $(this).siblings('.aegies-cs-repeater');
			const newCard = $(
				'<div class="aegies-nested-card aegies-cs-card">' +
					'<div class="aegies-card-header-compact">' +
						'<strong>New Case Study</strong>' +
						'<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col"><label>Metric Stat</label><input type="text" class="cs-metric regular-text" placeholder="e.g. 99.6%"></div>' +
						'<div class="aegies-field-col"><label>Metric Label</label><input type="text" class="cs-label regular-text" placeholder="e.g. Patrol SLA"></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Client Name</label><input type="text" class="cs-client regular-text" placeholder="Client Name"></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Outcome</label><textarea class="cs-outcome large-text" rows="2" placeholder="Outcome"></textarea></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col"><label>Link Text</label><input type="text" class="cs-link-text regular-text" value="Read Case Study →"></div>' +
						'<div class="aegies-field-col"><label>Link URL</label><input type="text" class="cs-link-url regular-text" value="#case"></div>' +
					'</div>' +
				'</div>'
			);
			list.append(newCard);
		});

		$(document).on('click', '.aegies-add-zrow-btn', function(e) {
			e.preventDefault();
			const list = $(this).siblings('.aegies-zrows-repeater');
			const count = list.find('.aegies-zrow-card').length + 1;
			const newCard = $(
				'<div class="aegies-nested-card aegies-zrow-card">' +
					'<div class="aegies-card-header-compact">' +
						'<strong>Row #' + count + ': New Feature</strong>' +
						'<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col"><label>Badge</label><input type="text" class="z-badge regular-text" placeholder="e.g. FIELD OPERATIONS"></div>' +
						'<div class="aegies-field-col"><label>Title</label><input type="text" class="z-title regular-text" placeholder="Feature title"></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Description</label><textarea class="z-desc large-text" rows="2" placeholder="Feature description"></textarea></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Feature Bullets (One per line)</label><textarea class="z-bullets large-text" rows="3"></textarea></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col"><label>Link Text</label><input type="text" class="z-cta-text regular-text" value="Learn More →"></div>' +
						'<div class="aegies-field-col"><label>Link URL</label><input type="text" class="z-cta-url regular-text" value="#learn"></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width">' +
							'<label>Row Image (Optional)</label>' +
							'<div class="aegies-media-picker">' +
								'<input type="hidden" class="z-image-url" value="">' +
								'<div class="aegies-image-preview"><span class="aegies-no-image-text">No custom image</span></div>' +
								'<div class="aegies-media-controls">' +
									'<button type="button" class="button aegies-upload-img-btn">Upload / Select</button>' +
									'<button type="button" class="button button-link-delete aegies-remove-img-btn" style="display:none;">Remove</button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
			list.append(newCard);
		});

		$(document).on('click', '.aegies-add-faq-btn', function(e) {
			e.preventDefault();
			const list = $(this).siblings('.aegies-faq-repeater');
			const newCard = $(
				'<div class="aegies-nested-card">' +
					'<div class="aegies-card-header-compact">' +
						'<strong>New Question</strong>' +
						'<button type="button" class="button button-small button-link-delete aegies-remove-rep-row"><span class="dashicons dashicons-trash"></span></button>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Question</label><input type="text" class="faq-q large-text" placeholder="Question"></div>' +
					'</div>' +
					'<div class="aegies-form-row">' +
						'<div class="aegies-field-col full-width"><label>Answer</label><textarea class="faq-a large-text" rows="2" placeholder="Answer"></textarea></div>' +
					'</div>' +
				'</div>'
			);
			list.append(newCard);
		});

		// 8. Add Section Modal
		$('#aegies-open-add-section-modal').on('click', function() {
			$('#aegies-add-section-modal').fadeIn(150);
		});

		$('.aegies-modal-close-btn, .aegies-modal-overlay').on('click', function() {
			$('#aegies-add-section-modal').fadeOut(150);
		});

		$('.aegies-template-card').on('click', function() {
			const type = $(this).data('template');
			$('#aegies-add-section-modal').fadeOut(150);
			insertNewSectionCard(type);
		});

		function insertNewSectionCard(type) {
			const id = 'sec_' + type + '_' + Date.now();
			const order = $('#aegies-sections-list .aegies-section-card').length + 1;
			const card = $(
				'<div class="aegies-section-card is-active" data-section-id="' + id + '" data-section-type="' + type + '" data-order="' + order + '">' +
					'<div class="aegies-section-header">' +
						'<div class="aegies-section-title-wrap">' +
							'<span class="dashicons dashicons-menu aegies-drag-handle"></span>' +
							'<span class="aegies-type-badge type-' + type + '">' + type.toUpperCase().replace('_', ' ') + '</span>' +
							'<strong class="aegies-section-label">New ' + type.replace('_', ' ') + ' section</strong>' +
						'</div>' +
						'<div class="aegies-section-actions">' +
							'<label class="aegies-toggle-switch">' +
								'<input type="checkbox" class="aegies-section-active-toggle" checked>' +
								'<span class="slider"></span>' +
							'</label>' +
							'<button type="button" class="button button-small aegies-move-up-btn"><span class="dashicons dashicons-arrow-up-alt2"></span></button>' +
							'<button type="button" class="button button-small aegies-move-down-btn"><span class="dashicons dashicons-arrow-down-alt2"></span></button>' +
							'<button type="button" class="button button-small aegies-toggle-accordion-btn"><span class="dashicons dashicons-arrow-down"></span></button>' +
							'<button type="button" class="button button-small button-link-delete aegies-delete-section-btn"><span class="dashicons dashicons-trash"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="aegies-section-body">' +
						'<div class="aegies-form-grid">' +
							'<div class="aegies-form-row">' +
								'<div class="aegies-field-col full-width">' +
									'<label>Headline / Title</label>' +
									'<input type="text" class="field-headline regular-text" placeholder="Section headline...">' +
								'</div>' +
							'</div>' +
							'<div class="aegies-form-row">' +
								'<div class="aegies-field-col full-width">' +
									'<label>Description</label>' +
									'<textarea class="field-subheadline large-text" rows="2" placeholder="Section description..."></textarea>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);

			$('#aegies-sections-list').append(card);
			recalcOrders();
			$('html, body').animate({ scrollTop: card.offset().top - 100 }, 300);
			showToast('Added ' + type + ' section.');
		}

		// 9. Collect and Serialize Data for Saving
		function extractSectionsData() {
			const sections = [];

			$('#aegies-sections-list .aegies-section-card').each(function() {
				const card = $(this);
				const id = card.data('section-id');
				const type = card.data('section-type');
				const order = parseInt(card.attr('data-order') || '1', 10);
				const active = card.find('.aegies-section-active-toggle').is(':checked');
				const settings = {};

				if (type === 'hero') {
					settings.badge = card.find('.field-badge').val() || '';
					settings.headline = card.find('.field-headline').val() || '';
					settings.subheadline = card.find('.field-subheadline').val() || '';
					settings.primary_cta = {
						label: card.find('.field-primary-btn-label').val() || 'Request Demo',
						url: card.find('.field-primary-btn-url').val() || '#demo',
						variant: 'primary'
					};
					settings.secondary_cta = {
						label: card.find('.field-secondary-btn-label').val() || 'Explore Platform',
						url: card.find('.field-secondary-btn-url').val() || '#platform',
						variant: 'outline'
					};
					settings.hero_image = card.find('.field-hero-image').val() || '';
					const chipsStr = card.find('.field-highlight-chips').val() || '';
					settings.highlight_chips = chipsStr.split(',').map(s => s.trim()).filter(Boolean);
				} else if (type === 'trust_logos') {
					settings.title = card.find('.field-logos-title').val() || '';
					settings.logos = [];
					card.find('.aegies-logos-repeater .aegies-repeater-row').each(function() {
						settings.logos.push({
							name: $(this).find('.rep-logo-name').val() || '',
							label: $(this).find('.rep-logo-label').val() || '',
							url: ''
						});
					});
				} else if (type === 'audience_tabs') {
					settings.heading = card.find('.field-aud-heading').val() || '';
					settings.subheading = card.find('.field-aud-subheading').val() || '';
					settings.tab_enterprise = {
						tab_title: card.find('.field-tab-ent-title').val() || 'Enterprise Security',
						tagline: card.find('.field-tab-ent-tagline').val() || '',
						headline: card.find('.field-tab-ent-headline').val() || '',
						description: card.find('.field-tab-ent-desc').val() || '',
						bullets: (card.find('.field-tab-ent-bullets').val() || '').split('\n').map(s => s.trim()).filter(Boolean),
						stat_badge: card.find('.field-tab-ent-badge').val() || '99.8% SLA Compliance'
					};
					settings.tab_guarding = {
						tab_title: card.find('.field-tab-guard-title').val() || 'Guarding Firms',
						tagline: card.find('.field-tab-guard-tagline').val() || '',
						headline: card.find('.field-tab-guard-headline').val() || '',
						description: card.find('.field-tab-guard-desc').val() || '',
						bullets: (card.find('.field-tab-guard-bullets').val() || '').split('\n').map(s => s.trim()).filter(Boolean),
						stat_badge: card.find('.field-tab-guard-badge').val() || '+34% Gross Margin Lift'
					};
				} else if (type === 'product_showcase') {
					settings.badge = card.find('.field-prod-badge').val() || '';
					settings.headline = card.find('.field-prod-headline').val() || '';
					settings.subheadline = card.find('.field-prod-subheadline').val() || '';
					settings.image_url = card.find('.field-prod-image').val() || '';
					settings.floating_badges = [
						{ title: 'SOC 2 Type II', subtitle: 'Continuous Security Audits' },
						{ title: 'Sub-Second Dispatch', subtitle: 'Live Guard Location Ping' },
						{ title: '99.99% Uptime', subtitle: 'Mission-Critical SLA' }
					];
				} else if (type === 'z_features') {
					settings.section_title = card.find('.field-z-title').val() || '';
					settings.rows = [];
					card.find('.aegies-zrows-repeater .aegies-zrow-card').each(function(idx) {
						settings.rows.push({
							badge: $(this).find('.z-badge').val() || '',
							title: $(this).find('.z-title').val() || '',
							description: $(this).find('.z-desc').val() || '',
							bullets: ($(this).find('.z-bullets').val() || '').split('\n').map(s => s.trim()).filter(Boolean),
							image_align: idx % 2 === 1 ? 'left' : 'right',
							image_url: $(this).find('.z-image-url').val() || '',
							cta_text: $(this).find('.z-cta-text').val() || 'Learn More →',
							cta_url: $(this).find('.z-cta-url').val() || '#learn'
						});
					});
				} else if (type === 'metrics') {
					settings.headline = card.find('.field-met-headline').val() || '';
					settings.description = card.find('.field-met-desc').val() || '';
					settings.items = [];
					card.find('.aegies-metrics-repeater .aegies-repeater-row').each(function() {
						settings.items.push({
							value: $(this).find('.rep-met-val').val() || '',
							label: $(this).find('.rep-met-label').val() || '',
							subtext: $(this).find('.rep-met-subtext').val() || ''
						});
					});
				} else if (type === 'case_studies') {
					settings.title = card.find('.field-cs-title').val() || '';
					settings.subtitle = card.find('.field-cs-subtitle').val() || '';
					settings.cards = [];
					card.find('.aegies-cs-repeater .aegies-cs-card').each(function() {
						settings.cards.push({
							metric: $(this).find('.cs-metric').val() || '',
							label: $(this).find('.cs-label').val() || '',
							client: $(this).find('.cs-client').val() || '',
							outcome: $(this).find('.cs-outcome').val() || '',
							challenge: '',
							link_text: $(this).find('.cs-link-text').val() || 'Read Case Study →',
							link_url: $(this).find('.cs-link-url').val() || '#case'
						});
					});
				} else if (type === 'faq_accordion') {
					settings.title = card.find('.field-faq-title').val() || '';
					settings.subtitle = card.find('.field-faq-subtitle').val() || '';
					settings.items = [];
					card.find('.aegies-faq-repeater .aegies-nested-card').each(function() {
						settings.items.push({
							q: $(this).find('.faq-q').val() || '',
							a: $(this).find('.faq-a').val() || ''
						});
					});
				} else if (type === 'cta_banner') {
					settings.headline = card.find('.field-cta-headline').val() || '';
					settings.subheadline = card.find('.field-cta-subheadline').val() || '';
					settings.primary_button = {
						label: card.find('.field-cta-btn-label').val() || 'Request Demo',
						url: card.find('.field-cta-btn-url').val() || '#demo'
					};
					settings.secondary_button = {
						label: card.find('.field-cta-sec-label').val() || 'Contact Sales',
						url: card.find('.field-cta-sec-url').val() || '#contact'
					};
					settings.footnote = card.find('.field-cta-footnote').val() || 'No credit card required • SOC 2 Type II Certified';
				} else {
					settings.headline = card.find('.field-headline').val() || '';
					settings.subheadline = card.find('.field-subheadline').val() || '';
				}

				sections.push({
					id: id,
					type: type,
					active: active,
					order: order,
					settings: settings
				});
			});

			return sections;
		}

		// 10. Save Page Changes via AJAX
		$('.aegies-save-btn, #aegies-save-page-btn').on('click', function(e) {
			e.preventDefault();
			const btn = $(this);
			btn.prop('disabled', true).text('Saving & Syncing...');

			const sections = extractSectionsData();
			const meta = {
				title: $('#meta_page_title').val() || '',
				description: $('#meta_page_desc').val() || ''
			};

			$.ajax({
				url: window.aegiesAdminData ? window.aegiesAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: {
					action: 'aegies_save_page_content',
					nonce: window.aegiesAdminData ? window.aegiesAdminData.nonce : '',
					slug: currentSlug,
					meta: JSON.stringify(meta),
					sections: JSON.stringify(sections)
				},
				success: function(response) {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend');
					if (response.success) {
						showToast('✓ ' + response.data.message);
						$('#stat-updated-time').text(response.data.updatedAt);
					} else {
						showToast('Error: ' + (response.data.message || 'Failed to save'), true);
					}
				},
				error: function() {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend');
					showToast('AJAX Server Error. Please check connection.', true);
				}
			});
		});

		// 11. Save Global Settings
		$('#aegies-save-global-btn').on('click', function(e) {
			e.preventDefault();
			const btn = $(this);
			btn.prop('disabled', true).text('Saving Settings...');

			const globalData = {
				branding: {
					site_title: $('#glob_site_title').val() || 'Aegies Lead',
					tagline: $('#glob_tagline').val() || '',
					logo_text: $('#glob_logo_text').val() || 'AEGIES LEAD',
					primary_color: $('#glob_primary_color').val() || '#1d4ed8'
				},
				header_nav: {
					mega_menu_enabled: true,
					action_buttons: [
						{ label: $('#glob_cta1_label').val() || 'Client Portal', url: $('#glob_cta1_url').val() || 'http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123', variant: 'ghost' },
						{ label: $('#glob_cta2_label').val() || 'Request Demo', url: $('#glob_cta2_url').val() || '#demo', variant: 'primary' }
					]
				},
				footer: {
					about_text: $('#glob_footer_about').val() || '',
					copyright: $('#glob_footer_copyright').val() || '',
					compliance_badges: ($('#glob_footer_compliance').val() || '').split(',').map(s => s.trim()).filter(Boolean)
				}
			};

			$.ajax({
				url: window.aegiesAdminData ? window.aegiesAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: {
					action: 'aegies_save_global_settings',
					nonce: window.aegiesAdminData ? window.aegiesAdminData.nonce : '',
					global_data: JSON.stringify(globalData)
				},
				success: function(response) {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save Global Settings');
					if (response.success) {
						showToast('✓ ' + response.data.message);
					} else {
						showToast('Error saving global settings', true);
					}
				},
				error: function() {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save Global Settings');
					showToast('AJAX Server Error.', true);
				}
			});
		});

		// 12. Restore Defaults
		$('#aegies-reset-defaults-btn').on('click', function(e) {
			e.preventDefault();
			if (confirm('Restore default Aegies Lead templates and section schemas? All current edits will be reset to high-fidelity defaults.')) {
				$.ajax({
					url: window.aegiesAdminData ? window.aegiesAdminData.ajaxUrl : ajaxurl,
					type: 'POST',
					data: {
						action: 'aegies_reset_defaults',
						nonce: window.aegiesAdminData ? window.aegiesAdminData.nonce : ''
					},
					success: function(response) {
						if (response.success) {
							location.reload();
						}
					}
				});
			}
		});
	});
})(jQuery);
