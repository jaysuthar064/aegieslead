<?php
/**
 * Default Seed Data for Aegies Headless CMS (Trackforce B2B Benchmark).
 */

defined( 'ABSPATH' ) || exit;

class Aegies_Defaults {

	public static function get_pages_catalog() {
		return array(
			array( 'slug' => 'home', 'title' => 'Home Page', 'icon' => 'dashicons-admin-home' ),
			array( 'slug' => 'platform', 'title' => 'Platform Architecture', 'icon' => 'dashicons-networking' ),
			array( 'slug' => 'who-we-serve', 'title' => 'Who We Serve (Solutions)', 'icon' => 'dashicons-groups' ),
			array( 'slug' => 'workforce', 'title' => 'Workforce & Mobile Guard', 'icon' => 'dashicons-id-alt' ),
			array( 'slug' => 'pricing', 'title' => 'Pricing & Plans', 'icon' => 'dashicons-tag' ),
			array( 'slug' => 'company', 'title' => 'Company & Security', 'icon' => 'dashicons-building' ),
		);
	}

	public static function seed_all_defaults() {
		update_option( 'aegies_global_settings', self::get_default_global_settings() );

		$pages = self::get_pages_catalog();
		foreach ( $pages as $p ) {
			$method = 'get_default_page_' . str_replace( '-', '_', $p['slug'] );
			if ( method_exists( __CLASS__, $method ) ) {
				$data = self::$method();
			} else {
				$data = self::get_generic_page_template( $p['slug'], $p['title'] );
			}
			update_option( 'aegies_page_' . $p['slug'], $data );
		}
	}

	public static function get_default_global_settings() {
		return array(
			'branding' => array(
				'site_title'        => 'Aegies Lead',
				'tagline'           => 'The Unified Operating System for Physical Security',
				'logo_text'         => 'AEGIES LEAD',
				'logo_url'          => '',
				'dark_logo_url'     => '',
				'favicon_url'       => '',
				'primary_color'     => '#1d4ed8',
				'accent_color'      => '#0284c7',
				'support_email'     => 'security@aegieslead.com',
				'support_phone'     => '+1 (800) 555-AEGIES',
			),
			'header_nav' => array(
				'mega_menu_enabled' => true,
				'menu_items' => array(
					array(
						'id'          => 'menu_platform',
						'label'       => 'Platform',
						'badge'       => 'v4.2',
						'url'         => '/platform',
						'has_columns' => true,
						'columns'     => array(
							array(
								'title' => 'Field Operations & Patrols',
								'links' => array(
									array( 'label' => 'GPS Geofenced Patrols', 'desc' => 'Live checkpoint verification with zero blind spots', 'url' => '#patrols', 'icon' => 'map-pin' ),
									array( 'label' => 'Guards Roster & Shifts', 'desc' => 'AI-driven shift matching and attendance tracking', 'url' => '#guards', 'icon' => 'users' ),
									array( 'label' => 'Incident Evidence Logs', 'desc' => 'Tamper-proof photo & video audit chains', 'url' => '#incidents', 'icon' => 'shield-alert' ),
								),
							),
							array(
								'title' => 'Commercial & Financials',
								'links' => array(
									array( 'label' => 'AI Proposal Generator', 'desc' => 'Generate enterprise security bids in seconds', 'url' => '#proposals', 'icon' => 'file-text' ),
									array( 'label' => 'Automated Timesheet Billing', 'desc' => 'Direct clock-in to client invoice flow', 'url' => '#billing', 'icon' => 'dollar-sign' ),
									array( 'label' => 'Vendor RFP Procurement', 'desc' => 'Subcontractor bidding & SLA tracking', 'url' => '#rfp', 'icon' => 'briefcase' ),
								),
							),
						),
						'featured_card' => array(
							'title'    => '2026 Security Operations Benchmark',
							'desc'     => 'Download the comprehensive report on digital patrol audits and margin recovery.',
							'cta_text' => 'Read Full Benchmark →',
							'cta_url'  => '#report',
						),
					),
					array(
						'id'          => 'menu_solutions',
						'label'       => 'Who We Serve',
						'url'         => '/who-we-serve',
						'has_columns' => true,
						'columns'     => array(
							array(
								'title' => 'By Customer Type',
								'links' => array(
									array( 'label' => 'Enterprise Security Leaders', 'desc' => 'Risk visibility across distributed commercial sites', 'url' => '#enterprise', 'icon' => 'building-2' ),
									array( 'label' => 'Guarding Contractor Firms', 'desc' => 'Grow guard margins & automate dispatch', 'url' => '#guarding-firms', 'icon' => 'user-check' ),
								),
							),
							array(
								'title' => 'By Industry Sector',
								'links' => array(
									array( 'label' => 'Critical Infrastructure & Energy', 'desc' => 'NERC CIP & high-assurance physical security', 'url' => '#infrastructure', 'icon' => 'shield-alert' ),
									array( 'label' => 'Healthcare Facilities & Campuses', 'desc' => 'Rapid duress response & patient safety', 'url' => '#healthcare', 'icon' => 'activity' ),
									array( 'label' => 'Commercial Real Estate & Ports', 'desc' => 'Multi-tenant perimeter patrol audits', 'url' => '#commercial', 'icon' => 'layers' ),
								),
							),
						),
					),
					array(
						'id'    => 'menu_workforce',
						'label' => 'Workforce',
						'url'   => '/workforce',
						'badge' => 'Mobile',
					),
					array(
						'id'    => 'menu_pricing',
						'label' => 'Pricing',
						'url'   => '/pricing',
					),
					array(
						'id'    => 'menu_company',
						'label' => 'Security & Trust',
						'url'   => '/company',
						'badge' => 'SOC 2',
					),
				),
				'action_buttons' => array(
					array( 'label' => 'Client Portal', 'url' => 'http://localhost:8889/?aegies_login=1&token=aegies-dev-token-123', 'variant' => 'ghost' ),
					array( 'label' => 'Request Demo', 'url' => '#demo', 'variant' => 'primary' ),
				),
			),
			'footer' => array(
				'about_text' => 'Aegies Lead is the unified operational platform for physical security guard agencies and corporate enterprise security teams.',
				'columns' => array(
					array(
						'title' => 'Platform',
						'links' => array(
							array( 'label' => 'GPS Patrol Tracking', 'url' => '#patrols' ),
							array( 'label' => 'Incident Chain-of-Custody', 'url' => '#incidents' ),
							array( 'label' => 'AI Proposal Drafting', 'url' => '#proposals' ),
							array( 'label' => 'Automated Invoicing', 'url' => '#billing' ),
							array( 'label' => 'Guard Mobile Portal', 'url' => '/workforce' ),
						),
					),
					array(
						'title' => 'Solutions',
						'links' => array(
							array( 'label' => 'Enterprise Security Leaders', 'url' => '/who-we-serve' ),
							array( 'label' => 'Guarding Contractors', 'url' => '/who-we-serve' ),
							array( 'label' => 'Critical Infrastructure', 'url' => '/who-we-serve' ),
							array( 'label' => 'Healthcare Campuses', 'url' => '/who-we-serve' ),
						),
					),
					array(
						'title' => 'Trust & Governance',
						'links' => array(
							array( 'label' => 'SOC 2 Type II Certified', 'url' => '/company' ),
							array( 'label' => 'ISO 27001 Security', 'url' => '/company' ),
							array( 'label' => 'GDPR & Privacy Shield', 'url' => '/company' ),
							array( 'label' => 'Live System Status (99.99%)', 'url' => '/company' ),
						),
					),
					array(
						'title' => 'Company',
						'links' => array(
							array( 'label' => 'About Aegies Lead', 'url' => '/company' ),
							array( 'label' => 'Customer Case Studies', 'url' => '#case-studies' ),
							array( 'label' => 'Pricing Plans & ROI', 'url' => '/pricing' ),
							array( 'label' => 'Contact Sales & Dispatch', 'url' => '#demo' ),
						),
					),
				),
				'compliance_badges' => array( 'SOC 2 TYPE II', 'ISO 27001', 'GDPR READY', 'NIST CSF', 'HIPAA ALIGNED' ),
				'copyright'         => '© ' . gmdate( 'Y' ) . ' Aegies Lead Technologies Inc. All rights reserved.',
			),
			'seo' => array(
				'meta_title'       => 'Aegies Lead — The Unified Operating System for Physical Security',
				'meta_description' => 'Command guard patrols, live incidents, timesheet billing, and AI proposals in one connected system of record.',
				'og_image'         => '',
			),
		);
	}

	public static function get_default_page_home() {
		return array(
			'slug' => 'home',
			'meta' => array(
				'title'       => 'Aegies Lead — Unified Physical Security Operating System',
				'description' => 'The leading platform for physical security firms and enterprise security teams.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_hero_1',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'THE CONNECTIVE SECURITY PLATFORM',
						'headline'        => 'Where the world’s leading security programs operate.',
						'subheadline'     => 'One connected system of record for every site, shift, incident, and proposal. Built for enterprise security directors and guard contracting firms.',
						'primary_cta'     => array( 'label' => 'Request a Demo', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Explore Platform', 'url' => '/platform', 'variant' => 'outline' ),
						'hero_image'      => '',
						'highlight_chips' => array(
							'600k+ Active Users',
							'50+ Countries',
							'250M+ Guard Hours',
							'SOC 2 Type II Certified',
						),
					),
				),
				array(
					'id'       => 'sec_logos_2',
					'type'     => 'trust_logos',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'title' => 'TRUSTED BY LEADING ENTERPRISE SECURITY DIRECTORS & GLOBAL CONTRACTORS',
						'logos' => array(
							array( 'name' => 'Airbus Defense', 'label' => 'AIRBUS DEFENSE', 'url' => '' ),
							array( 'name' => 'Sanofi Global', 'label' => 'SANOFI HEALTH', 'url' => '' ),
							array( 'name' => 'Renault Group', 'label' => 'RENAULT AUTOMOTIVE', 'url' => '' ),
							array( 'name' => 'Metro Guard Corp', 'label' => 'METRO GUARD', 'url' => '' ),
							array( 'name' => 'Vanguard Asset Care', 'label' => 'VANGUARD SECURE', 'url' => '' ),
							array( 'name' => 'Apex Tactical Logistics', 'label' => 'APEX DEFENSE', 'url' => '' ),
						),
					),
				),
				array(
					'id'       => 'sec_audience_3',
					'type'     => 'audience_tabs',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'heading'    => 'The connective layer across your entire security ecosystem',
						'subheading' => 'One single platform aligning the people who set the security standard and the teams on the ground who keep it.',
						'tab_enterprise' => array(
							'tab_title'   => 'I Run Enterprise Security',
							'tagline'     => 'In-House Corporate Risk & Facility Protection',
							'headline'    => 'Board-Grade Security Visibility & Zero Blind Spots',
							'description' => 'Eliminate contractor friction with automated SLA verification, tamper-proof incident evidence, and instant audit trails across every commercial property.',
							'bullets'     => array(
								'Own your security data without relying on vendor PDF summaries',
								'Live GPS geofenced patrol verification with instant checkpoint alerts',
								'Direct incident escalation with chain-of-custody video/photo logs',
								'Centralized COI (Certificate of Insurance) and vendor compliance tracking',
							),
							'stat_badge'  => '99.8% SLA Compliance Across 1,400+ Client Sites',
						),
						'tab_guarding' => array(
							'tab_title'   => 'I Run a Guarding Firm',
							'tagline'     => 'Security Contractors & Service Vendors',
							'headline'    => 'Stop Margin Leakage & Scale High-Value Accounts',
							'description' => 'Unify scheduling, clock-in attendance, timesheet approvals, and client billing into one seamless workflow that wins and retains enterprise contracts.',
							'bullets'     => array(
								'Auto-generate approved client invoices from verified guard check-ins',
								'AI-assisted RFP bid builder and instant security proposal drafting',
								'Guard mobile portal with full offline patrol queue and panic alert',
								'Guard license & certification expiry tracker with automated warnings',
							),
							'stat_badge'  => '+34% Gross Margin Lift in First 90 Days',
						),
					),
				),
				array(
					'id'       => 'sec_product_4',
					'type'     => 'product_showcase',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'badge'           => 'UNIFIED COMMAND CENTER',
						'headline'        => 'Take command of your entire operation on one screen',
						'subheadline'     => 'Live guard dispatch, interactive GPS patrols, real-time duress alerts, and automated client billing — all synchronizing in real time.',
						'image_url'       => '',
						'floating_badges' => array(
							array( 'title' => 'SOC 2 Type II', 'subtitle' => 'Continuous Security Audits' ),
							array( 'title' => 'Sub-Second Dispatch', 'subtitle' => 'Live Guard Location Ping' ),
							array( 'title' => '99.99% Uptime', 'subtitle' => 'Mission-Critical SLA' ),
						),
					),
				),
				array(
					'id'       => 'sec_zfeatures_5',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'section_title' => 'Engineered for high-assurance security operations',
						'rows' => array(
							array(
								'badge'       => 'FIELD OPERATIONS',
								'title'       => 'GPS Geofenced Patrols & Instant Checkpoint Verification',
								'description' => 'Guards tap through mandatory checkpoints with automated geofence radius checks. Eliminate ghost patrols and provide undeniable proof of service.',
								'bullets'     => array(
									'Geofenced checkpoint radius verification',
									'Live breadcrumb patrol route visualization',
									'Guard duress & emergency panic dispatch alerts',
									'Offline-first mobile sync for basements & remote facilities',
								),
								'image_align' => 'right',
								'image_url'   => '',
								'cta_text'    => 'Learn about Patrols →',
								'cta_url'     => '/workforce',
							),
							array(
								'badge'       => 'RISK & INCIDENT MANAGEMENT',
								'title'       => 'Tamper-Proof Incident Reporting with Chain of Custody',
								'description' => 'Empower guards to capture structured incident reports on mobile with photo, video, and witness testimony attached directly to the site record.',
								'bullets'     => array(
									'One-click supervisor review and approval workflow',
									'Publishable client portal incident summaries',
									'Automated notification triggers for high-severity alerts',
									'Export court-ready PDF incident packages in seconds',
								),
								'image_align' => 'left',
								'image_url'   => '',
								'cta_text'    => 'Explore Incident Engine →',
								'cta_url'     => '/platform',
							),
							array(
								'badge'       => 'AI SALES & PROCUREMENT',
								'title'       => 'AI Proposal Generation & Vendor RFP Bidding',
								'description' => 'Draft comprehensive, customized security service proposals in minutes with AI scoping. Manage subcontractor bids and award contracts with verified compliance.',
								'bullets'     => array(
									'AI-assisted site risk analysis and guard post recommendations',
									'Multi-tier rate card modeling (Standard, Overtime, Holiday)',
									'Vendor RFP portal with tokenized passwordless access',
									'HubSpot CRM integration and proposal digital signing',
								),
								'image_align' => 'right',
								'image_url'   => '',
								'cta_text'    => 'See AI Proposal Tools →',
								'cta_url'     => '/platform',
							),
						),
					),
				),
				array(
					'id'       => 'sec_metrics_6',
					'type'     => 'metrics',
					'active'   => true,
					'order'    => 6,
					'settings' => array(
						'headline'    => 'Scale and reliability proven on the front lines',
						'description' => 'When seconds matter, global enterprise operations depend on Aegies Lead.',
						'items'       => array(
							array( 'value' => '600k+', 'label' => 'Active Guards & Officers', 'subtext' => 'Deploying daily on the platform' ),
							array( 'value' => '250M+', 'label' => 'Patrol Hours Tracked', 'subtext' => 'With GPS & NFC geofence validation' ),
							array( 'value' => '0', 'label' => 'Unverified Blind Spots', 'subtext' => '100% auditable digital checkpoints' ),
							array( 'value' => '99.99%', 'label' => 'Cloud Platform Uptime', 'subtext' => 'Tier 4 resilient infrastructure' ),
						),
					),
				),
				array(
					'id'       => 'sec_casestudies_7',
					'type'     => 'case_studies',
					'active'   => true,
					'order'    => 7,
					'settings' => array(
						'title'    => 'Customer Impact Stories',
						'subtitle' => 'Discover how leading security firms and enterprise directors transform operational performance.',
						'cards'    => array(
							array(
								'metric'    => '99.6%',
								'label'     => 'Patrol SLA Compliance',
								'client'    => 'Vanguard Security Services',
								'challenge' => 'Struggling with paper logs across 55 commercial sites.',
								'outcome'   => 'Unified 320 officers on Aegies Lead mobile portal, achieving 99.6% on-time checkpoint scans and zero missed shifts.',
								'link_text' => 'Read Vanguard Case Study →',
								'link_url'  => '#demo',
							),
							array(
								'metric'    => '-42%',
								'label'     => 'Emergency Escalation Time',
								'client'    => 'Metropolitan Healthcare Network',
								'challenge' => 'Hospital campuses needed instant duress dispatch and live officer tracking.',
								'outcome'   => 'Deployed Aegies panic alerts and GPS live location, slashing dispatch response times from 4.2 minutes down to under 2.4 minutes.',
								'link_text' => 'Read Healthcare Case Study →',
								'link_url'  => '#demo',
							),
							array(
								'metric'    => '+$480K',
								'label'     => 'Annual Margin Recovery',
								'client'    => 'Apex Protective Group',
								'challenge' => 'Manual timesheet calculations caused unbilled overtime and uncollected payroll discrepancies.',
								'outcome'   => 'Automated timesheet-to-invoice generation, eliminating billing leakage and accelerating payment cycles by 14 days.',
								'link_text' => 'Read Apex Case Study →',
								'link_url'  => '#demo',
							),
						),
					),
				),
				array(
					'id'       => 'sec_faq_8',
					'type'     => 'faq_accordion',
					'active'   => true,
					'order'    => 8,
					'settings' => array(
						'title'    => 'Frequently Asked Questions',
						'subtitle' => 'Everything you need to know about Aegies Lead deployment, security, and integrations.',
						'items'    => array(
							array(
								'q' => 'How does the offline mobile portal work for guards in basements or remote areas?',
								'a' => 'The Aegies Guard mobile app is built with an offline-first indexed queue. Officers can log checkpoints, scan NFC tags, and capture incident reports without internet. When connection resumes, data syncs automatically with cryptographic timestamps.',
							),
							array(
								'q' => 'Can our enterprise clients log in to view their own site reports?',
								'a' => 'Yes. Aegies Lead includes a dedicated, white-label Client Portal. Your clients can log in to view approved incident reports, patrol audit logs, timesheet breakdowns, and approve digital proposals with custom permission controls.',
							),
							array(
								'q' => 'How does Aegies Lead integrate with our existing CRM and payroll systems?',
								'a' => 'Aegies Lead provides bi-directional webhooks, a documented REST API, native HubSpot CRM sync, and export capabilities for major payroll providers (QuickBooks, ADP, CSV/Excel).',
							),
							array(
								'q' => 'What compliance certifications does Aegies Lead maintain?',
								'a' => 'Aegies Lead is SOC 2 Type II certified, ISO 27001 compliant, GDPR aligned, and enforces AES-256 encryption at rest and TLS 1.3 in transit.',
							),
						),
					),
				),
				array(
					'id'       => 'sec_cta_9',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 9,
					'settings' => array(
						'headline'         => 'See your entire security operation on one screen.',
						'subheadline'      => 'Join over 600,000 security professionals who depend on Aegies Lead for mission-critical operations.',
						'primary_button'   => array( 'label' => 'Request a Personalized Demo', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Enterprise Sales', 'url' => '#contact' ),
						'footnote'         => 'No credit card required • SOC 2 Type II Certified • 14-day assisted trial',
					),
				),
			),
		);
	}

	public static function get_default_page_platform() {
		return array(
			'slug' => 'platform',
			'meta' => array(
				'title'       => 'Platform Architecture & Capabilities — Aegies Lead',
				'description' => 'Complete security operations engine: GPS Geofencing, AI Dispatch, Incident Evidence Chain, Automated Invoicing.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_plat_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'CORE ARCHITECTURE & ENGINES',
						'headline'        => 'The connected platform engineered for high-assurance security.',
						'subheadline'     => 'Eliminate disconnected point solutions. Unify scheduling, live GPS patrols, chain-of-custody incident logging, and automated client billing into one authoritative platform.',
						'primary_cta'     => array( 'label' => 'Book Architecture Tour', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'View Pricing Plans', 'url' => '/pricing', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Sub-Second Dispatch Ping', 'Offline Indexed Queue', 'Automated Overtime Prevention', 'SOC 2 Type II Certified' ),
					),
				),
				array(
					'id'       => 'sec_plat_showcase',
					'type'     => 'product_showcase',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'badge'           => 'COMMAND DISPATCH CONSOLE',
						'headline'        => 'Real-time multi-site visibility from HQ to the field',
						'subheadline'     => 'Monitor hundreds of officers across global facilities, audit geofenced routes in real time, and coordinate instant emergency escalations.',
						'floating_badges' => array(
							array( 'title' => 'Sub-Second Radar', 'subtitle' => 'Live GPS Checkpoint Verification' ),
							array( 'title' => 'Zero Blind Spots', 'subtitle' => '100% Auditable Shift Route Scans' ),
							array( 'title' => 'AES-256 Vault', 'subtitle' => 'Tamper-Proof Incident Media Chain' ),
						),
					),
				),
				array(
					'id'       => 'sec_plat_z',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'section_title' => 'Deep dive into the core operational engines',
						'rows' => array(
							array(
								'badge'       => 'FIELD RADAR',
								'title'       => 'GPS Geofenced Route Execution & NFC Verification',
								'description' => 'Enforce mandatory checkpoint scanning with automated geofence radius checks, route deviation alerts, and offline timestamp logging.',
								'bullets'     => array(
									'Configurable geofence radius (10m to 100m)',
									'Live breadcrumb trail with playback history',
									'Guard duress & man-down panic triggers',
									'NFC, QR Code, and Bluetooth beacon scanning support',
								),
								'image_align' => 'right',
								'cta_text'    => 'Learn about Mobile Workforce →',
								'cta_url'     => '/workforce',
							),
							array(
								'badge'       => 'LEGAL AUDIT CHAIN',
								'title'       => 'Tamper-Proof Incident Reporting & Evidence Vault',
								'description' => 'Capture photo, video, audio witness testimony, and GPS coordinates directly from the field. Produce court-ready PDF evidence dossiers in one click.',
								'bullets'     => array(
									'Cryptographic SHA-256 evidence hashing',
									'Multi-stage supervisor review & approval workflows',
									'Automated client portal incident broadcasting',
									'Customizable severity matrices and escalation alerts',
								),
								'image_align' => 'left',
								'cta_text'    => 'Explore Incident Features →',
								'cta_url'     => '#demo',
							),
							array(
								'badge'       => 'MARGIN RECOVERY',
								'title'       => 'Automated Timesheet-to-Invoice Financial Engine',
								'description' => 'Connect verified guard clock-ins directly to billing line items. Prevent unbilled overtime and automatically apply client holiday and hazard rates.',
								'bullets'     => array(
									'Multi-tier rate card modeling (Standard, Overtime, Holiday)',
									'Direct export to QuickBooks, ADP, and custom ERPs',
									'Real-time gross margin calculation per site and shift',
									'One-click dispute reconciliation with audit proof',
								),
								'image_align' => 'right',
								'cta_text'    => 'See Pricing & ROI →',
								'cta_url'     => '/pricing',
							),
						),
					),
				),
				array(
					'id'       => 'sec_plat_metrics',
					'type'     => 'metrics',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'headline'    => 'High-Assurance Performance Benchmarks',
						'description' => 'Engineered for Tier 1 enterprise reliability and zero data loss.',
						'items'       => array(
							array( 'value' => '12ms', 'label' => 'Average Dispatch Latency', 'subtext' => 'Sub-second real-time pings' ),
							array( 'value' => '99.99%', 'label' => 'Guaranteed Platform Uptime', 'subtext' => 'Multi-region AWS redundancy' ),
							array( 'value' => '256-Bit', 'label' => 'AES Encryption at Rest', 'subtext' => 'TLS 1.3 in transit' ),
							array( 'value' => '0', 'label' => 'Ghost Patrol Blind Spots', 'subtext' => 'Strict geofence verification' ),
						),
					),
				),
				array(
					'id'       => 'sec_plat_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'headline'         => 'Ready to experience the Aegies Lead Platform?',
						'subheadline'      => 'Schedule a 1-on-1 guided software demonstration with our security architecture specialists.',
						'primary_button'   => array( 'label' => 'Schedule Live Demo', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Sales for Custom Scope', 'url' => '#contact' ),
						'footnote'         => 'Custom integration support • Assisted data migration • Enterprise SLA',
					),
				),
			),
		);
	}

	public static function get_default_page_who_we_serve() {
		return array(
			'slug' => 'who-we-serve',
			'meta' => array(
				'title'       => 'Who We Serve — Enterprise Security & Guarding Contractor Solutions',
				'description' => 'Dedicated operational workflows for corporate risk directors, guarding firms, critical infrastructure, and healthcare.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_who_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'DUAL-BUYER INDUSTRY SOLUTIONS',
						'headline'        => 'Built for the people who set the standard, and the teams who keep it.',
						'subheadline'     => 'Aegies Lead bridges the divide between corporate enterprise security directors and third-party guarding service contractors on one unified platform.',
						'primary_cta'     => array( 'label' => 'Request Solution Demo', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Explore Platform Architecture', 'url' => '/platform', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Commercial Real Estate', 'Guarding Contractors', 'Healthcare Campuses', 'Critical Infrastructure' ),
					),
				),
				array(
					'id'       => 'sec_who_tabs',
					'type'     => 'audience_tabs',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'heading'    => 'Dedicated workflows for both sides of the physical security ecosystem',
						'subheading' => 'Select your operational persona to discover tailored features and measurable return on investment.',
						'tab_enterprise' => array(
							'tab_title'   => 'I Run Enterprise Corporate Security',
							'tagline'     => 'In-House Corporate Risk, Compliance & Asset Protection',
							'headline'    => 'Board-Grade Governance & Real-Time Vendor SLA Oversight',
							'description' => 'Eliminate contractor opacity. Access live GPS patrol verification data, audit vendor shift staffing compliance, and standardize incident evidence across global facilities.',
							'bullets'     => array(
								'Direct access to raw patrol breadcrumbs without waiting for monthly vendor PDFs',
								'Automated SLA penalty tracking and contracted staffing rate audits',
								'Standardized incident reporting across multiple competing vendor agencies',
								'Certificate of Insurance (COI) and guard guard-card license compliance tracking',
							),
							'stat_badge'  => '99.8% SLA Compliance Across 1,400+ Client Facilities',
						),
						'tab_guarding' => array(
							'tab_title'   => 'I Run a Guarding Contractor Firm',
							'tagline'     => 'Security Contractors & Service Vendors',
							'headline'    => 'Stop Payroll Leakage & Win Multi-Year Enterprise Contracts',
							'description' => 'Automate guard scheduling, eliminate unbilled overtime with verified clock-ins, and draft AI-assisted RFP bids in minutes to win high-margin enterprise accounts.',
							'bullets'     => array(
								'Clock-in to invoice generation in under 24 hours with zero manual data entry',
								'AI proposal scoping engine for enterprise commercial security bids',
								'Guard mobile portal with offline patrol sync and NFC checkpoint tapping',
								'Guard training, firearm qualification, and certification expiry alerts',
							),
							'stat_badge'  => '+34% Gross Margin Recovery in First 90 Days',
						),
					),
				),
				array(
					'id'       => 'sec_who_z',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'section_title' => 'Tailored Solutions by Industry Vertical',
						'rows' => array(
							array(
								'badge'       => 'COMMERCIAL REAL ESTATE & PORTS',
								'title'       => 'Multi-Tenant Perimeter & Access Control Auditing',
								'description' => 'Manage round-the-clock patrol rounds across high-rise corporate towers, logistics yards, and maritime port facilities with zero blind spots.',
								'bullets'     => array(
									'Tenant-specific incident report routing',
									'Loading dock and freight vehicle logging',
									'After-hours perimeter breach geofence alarms',
								),
								'image_align' => 'right',
								'cta_text'    => 'Request Real Estate Demo →',
								'cta_url'     => '#demo',
							),
							array(
								'badge'       => 'HEALTHCARE & HOSPITAL CAMPUSES',
								'title'       => 'Emergency Duress Response & Patient Safety Oversight',
								'description' => 'Slashing incident escalation times in emergency departments, behavioral health wards, and parking garages with sub-second officer dispatch.',
								'bullets'     => array(
									'Instant officer panic button dispatch to GPS coordinates',
									'HIPAA-aligned encrypted witness & patient incident logs',
									'Visitor badge and restricted area patrol checkpoints',
								),
								'image_align' => 'left',
								'cta_text'    => 'See Healthcare Solutions →',
								'cta_url'     => '#demo',
							),
							array(
								'badge'       => 'CRITICAL INFRASTRUCTURE & ENERGY',
								'title'       => 'NERC CIP Physical Security Standards Compliance',
								'description' => 'Maintain rigorous physical access security and tamper-proof patrol audits across substations, data centers, and water treatment utilities.',
								'bullets'     => array(
									'Cryptographic timestamp validation for NERC CIP audits',
									'Offline remote facility sync with automated retry',
									'Restricted key & asset chain-of-custody tracking',
								),
								'image_align' => 'right',
								'cta_text'    => 'Request Infrastructure Scope →',
								'cta_url'     => '#demo',
							),
						),
					),
				),
				array(
					'id'       => 'sec_who_cases',
					'type'     => 'case_studies',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'title'    => 'Customer Success Stories Across Industries',
						'subtitle' => 'Explore how leading enterprise teams and guarding contractors achieve measurable operational ROI.',
						'cards'    => array(
							array(
								'metric'    => '99.6%',
								'label'     => 'Patrol SLA Compliance',
								'client'    => 'Vanguard Security Services',
								'challenge' => 'Struggling with paper logs across 55 commercial sites.',
								'outcome'   => 'Unified 320 officers on Aegies Lead mobile portal, achieving 99.6% on-time checkpoint scans and zero missed shifts.',
								'link_text' => 'Read Vanguard Case Study →',
								'link_url'  => '#demo',
							),
							array(
								'metric'    => '-42%',
								'label'     => 'Dispatch Response Time',
								'client'    => 'Metropolitan Healthcare',
								'challenge' => 'Hospital campuses needed instant duress dispatch.',
								'outcome'   => 'Slashing emergency incident response times from 4.2 minutes down to under 2.4 minutes.',
								'link_text' => 'Read Healthcare Case Study →',
								'link_url'  => '#demo',
							),
							array(
								'metric'    => '+$480K',
								'label'     => 'Annual Margin Lift',
								'client'    => 'Apex Protective Group',
								'challenge' => 'Manual timesheets caused unbilled payroll discrepancies.',
								'outcome'   => 'Eliminated billing leakage and accelerated cash collections by 14 days.',
								'link_text' => 'Read Apex Case Study →',
								'link_url'  => '#demo',
							),
						),
					),
				),
				array(
					'id'       => 'sec_who_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'headline'         => 'Discover the exact solution for your security operations.',
						'subheadline'      => 'Schedule a discovery session tailored to your industry, team structure, and facility scale.',
						'primary_button'   => array( 'label' => 'Request Industry Demo', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Enterprise Sales', 'url' => '#contact' ),
						'footnote'         => 'SOC 2 Type II Certified • Dedicated account management',
					),
				),
			),
		);
	}

	public static function get_default_page_workforce() {
		return array(
			'slug' => 'workforce',
			'meta' => array(
				'title'       => 'Workforce Management & Mobile Guard App — Aegies Lead',
				'description' => 'Offline-first guard mobile portal, NFC checkpoint scanning, emergency panic dispatch, and smart shift rostering.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_work_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'MOBILE GUARD & FIELD ROSTER',
						'headline'        => 'Empower frontline officers with an offline-first mobile portal.',
						'subheadline'     => 'Equip guards with an intuitive iOS and Android mobile app designed for high-stress security operations. Works seamlessly in basements, remote substations, and parking garages.',
						'primary_cta'     => array( 'label' => 'Request Mobile Demo', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'View Pricing Plans', 'url' => '/pricing', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Offline Indexed Storage', 'NFC & QR Code Checkpoints', 'Instant Duress Panic Alert', 'Zero Mobile Battery Drain' ),
					),
				),
				array(
					'id'       => 'sec_work_showcase',
					'type'     => 'product_showcase',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'badge'           => 'OFFLINE-FIRST MOBILE EXPERIENCE',
						'headline'        => 'Uninterrupted guard patrols even without internet connectivity',
						'subheadline'     => 'All checkpoint scans, incident photos, and timestamps are queued locally in encrypted device storage and automatically synchronize the millisecond connectivity resumes.',
						'floating_badges' => array(
							array( 'title' => 'Offline Sync', 'subtitle' => 'Zero Patrol Data Loss' ),
							array( 'title' => 'GPS Radar', 'subtitle' => 'Live Geofenced Coordinates' ),
							array( 'title' => 'NFC Tapping', 'subtitle' => 'Instant Checkpoint Verification' ),
						),
					),
				),
				array(
					'id'       => 'sec_work_z',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'section_title' => 'Mobile capabilities engineered for frontline efficiency',
						'rows' => array(
							array(
								'badge'       => 'ROSTER & ATTENDANCE',
								'title'       => 'Smart Shift Scheduling & NFC Clock-In Validation',
								'description' => 'Match certified guards to open shifts based on training, site requirements, and overtime limits. Eliminate ghost shifts with geofenced clock-ins.',
								'bullets'     => array(
									'Geofenced radius check-in prevents clocking in from home',
									'Automated replacement guard dispatch for unconfirmed shifts',
									'Guard certificate & license validation before shift assignment',
								),
								'image_align' => 'right',
								'cta_text'    => 'Learn about Scheduling →',
								'cta_url'     => '#demo',
							),
							array(
								'badge'       => 'MOBILE INCIDENT EVIDENCE',
								'title'       => 'Structured Incident Capture with High-Res Media',
								'description' => 'Guards can document incidents in seconds with structured dropdowns, mandatory photo attachments, and audio witness memos.',
								'bullets'     => array(
									'Timestamped photo watermarking with GPS coordinates',
									'Voice-to-text incident dictation for rapid logging',
									'Immediate supervisor notification for high-severity alerts',
								),
								'image_align' => 'left',
								'cta_text'    => 'Explore Evidence Logging →',
								'cta_url'     => '#demo',
							),
							array(
								'badge'       => 'OFFICER SAFETY',
								'title'       => 'Emergency Duress Alerts & Lone Worker Protection',
								'description' => 'Protect officers working alone with automated check-in timers, fall detection alerts, and silent duress panic buttons linked to dispatch.',
								'bullets'     => array(
									'One-touch emergency distress signal broadcast',
									'Automated countdown timers for hazardous zone patrols',
									'Direct GPS coordinates streamed to emergency dispatchers',
								),
								'image_align' => 'right',
								'cta_text'    => 'See Safety Specifications →',
								'cta_url'     => '#demo',
							),
						),
					),
				),
				array(
					'id'       => 'sec_work_metrics',
					'type'     => 'metrics',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'headline'    => 'Frontline Field Impact Metrics',
						'description' => 'Proven adoption across over 600,000 active security officers.',
						'items'       => array(
							array( 'value' => '99.9%', 'label' => 'Guard Shift Attendance', 'subtext' => 'With automated push reminders' ),
							array( 'value' => '< 15s', 'label' => 'Checkpoint Scan Duration', 'subtext' => 'Rapid NFC tag tap workflow' ),
							array( 'value' => '100%', 'label' => 'Offline Data Retention', 'subtext' => 'Zero lost logs in dead zones' ),
							array( 'value' => '4.9★', 'label' => 'Guard App Store Rating', 'subtext' => 'Loved by frontline security teams' ),
						),
					),
				),
				array(
					'id'       => 'sec_work_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'headline'         => 'Equip your security workforce with Aegies Mobile.',
						'subheadline'      => 'Deploy the app to your guards in under 48 hours with zero hardware investment.',
						'primary_button'   => array( 'label' => 'Request Mobile Walkthrough', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Sales for Quote', 'url' => '#contact' ),
						'footnote'         => 'Compatible with iOS 15+ and Android 10+ • Full offline encryption',
					),
				),
			),
		);
	}

	public static function get_default_page_pricing() {
		return array(
			'slug' => 'pricing',
			'meta' => array(
				'title'       => 'Pricing & Plans — Aegies Lead',
				'description' => 'Transparent, predictable pricing built for physical security firms and enterprise programs.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_price_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'TRANSPARENT ENTERPRISE PRICING',
						'headline'        => 'Predictable pricing that scales with your workforce.',
						'subheadline'     => 'No hidden setup fees. Pay only for active guards and sites. Unlimited supervisor accounts, admin users, and enterprise client portals are included at no extra charge.',
						'primary_cta'     => array( 'label' => 'Request Custom Price Quote', 'url' => '#contact', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Book Software Demo', 'url' => '#demo', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Unlimited Client Portal Accounts', 'Free Guard Mobile App', 'Assisted Data Migration', 'SOC 2 Type II Certified' ),
					),
				),
				array(
					'id'       => 'sec_price_metrics',
					'type'     => 'metrics',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'headline'    => 'Average Customer Return on Investment',
						'description' => 'Aegies Lead typically pays for itself within the first 45 days of deployment.',
						'items'       => array(
							array( 'value' => '3.4x', 'label' => 'Average Annual ROI', 'subtext' => 'From payroll & overtime recovery' ),
							array( 'value' => '14 Days', 'label' => 'Faster Cash Collection', 'subtext' => 'Automated invoice generation' ),
							array( 'value' => '-60%', 'label' => 'Admin Overhead Slashed', 'subtext' => 'In scheduling & dispute audits' ),
							array( 'value' => '100%', 'label' => 'SLA Audit Pass Rate', 'subtext' => 'Zero unverified ghost patrols' ),
						),
					),
				),
				array(
					'id'       => 'sec_price_z',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'section_title' => 'Tiered Plans Built for Every Operational Scale',
						'rows' => array(
							array(
								'badge'       => 'TIER 1: OPERATIONS STARTER',
								'title'       => 'Core Guard Scheduling & GPS Patrol Verification',
								'description' => 'Ideal for growing security guarding contractor firms managing 15 to 100 officers looking to modernize patrols and replace paper logs.',
								'bullets'     => array(
									'Live GPS geofenced patrol radar & checkpoint scanning',
									'Offline-first guard mobile app on iOS & Android',
									'Incident reporting with photo attachments & watermarks',
									'Shift rostering and attendance clock-in tracking',
								),
								'image_align' => 'right',
								'cta_text'    => 'Get Starter Quote →',
								'cta_url'     => '#contact',
							),
							array(
								'badge'       => 'TIER 2: PROFESSIONAL SCALE',
								'title'       => 'Commercial AI Proposal Engine & Automated Timesheet Billing',
								'description' => 'Designed for regional and multi-state security agencies managing 100 to 500 officers who need to stop billing leakage and win enterprise RFPs.',
								'bullets'     => array(
									'Everything in Starter Tier included',
									'Automated timesheet-to-invoice generation with rate card modeling',
									'AI security proposal drafting & RFP scope generator',
									'White-label Enterprise Client Portal for direct client access',
								),
								'image_align' => 'left',
								'cta_text'    => 'Get Professional Quote →',
								'cta_url'     => '#contact',
							),
							array(
								'badge'       => 'TIER 3: ENTERPRISE GLOBAL',
								'title'       => 'Custom Security SLA, Dedicated Integration & Multi-Tenant Governance',
								'description' => 'Engineered for national security contractors and Fortune 500 corporate security departments managing 500+ officers across global sites.',
								'bullets'     => array(
									'Everything in Professional Tier included',
									'Dedicated 99.99% uptime SLA with 24/7 priority dispatch engineering',
									'Custom ERP, payroll & CRM API webhooks (Workday, ADP, SAP)',
									'Custom data residency (US, EU, UK) & isolated database tenant',
								),
								'image_align' => 'right',
								'cta_text'    => 'Contact Enterprise Sales →',
								'cta_url'     => '#contact',
							),
						),
					),
				),
				array(
					'id'       => 'sec_price_faq',
					'type'     => 'faq_accordion',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'title'    => 'Pricing & Licensing FAQ',
						'subtitle' => 'Everything you need to know about active guard seats, contract terms, and billing cycles.',
						'items'    => array(
							array(
								'q' => 'How are active guard seats calculated?',
								'a' => 'You are only billed for guards who are actively scheduled or work shifts during the billing period. Substitute guards or inactive roster profiles incur zero cost.',
							),
							array(
								'q' => 'Are supervisor and client portal users charged separately?',
								'a' => 'No. All Aegies Lead plans include unlimited administrator accounts, field supervisor logins, and enterprise client portal viewers at no additional cost.',
							),
							array(
								'q' => 'Can we upgrade or adjust our guard capacity as we win new contracts?',
								'a' => 'Yes. You can instantly adjust your active guard capacity directly from your billing console as your contracts scale up or down.',
							),
							array(
								'q' => 'Do you provide onboarding and data migration support?',
								'a' => 'Yes. Every plan includes dedicated onboarding specialists who assist with migrating your sites, guard rosters, and rate cards from spreadsheets or legacy systems.',
							),
						),
					),
				),
				array(
					'id'       => 'sec_price_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'headline'         => 'Get a customized quote tailored to your guard roster.',
						'subheadline'      => 'Our security solutions team will model your exact cost savings and return on investment.',
						'primary_button'   => array( 'label' => 'Request Custom Price Quote', 'url' => '#contact' ),
						'secondary_button' => array( 'label' => 'Schedule Live Demo', 'url' => '#demo' ),
						'footnote'         => '14-day assisted proof-of-concept • Full data migration included',
					),
				),
			),
		);
	}

	public static function get_default_page_company() {
		return array(
			'slug' => 'company',
			'meta' => array(
				'title'       => 'Company, Security & Trust Governance — Aegies Lead',
				'description' => 'Learn about Aegies Lead mission, enterprise certifications, and security governance.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_comp_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'SECURITY & TRUST FIRST',
						'headline'        => 'Mission-critical reliability for the physical security industry.',
						'subheadline'     => 'Aegies Lead was founded by security operations veterans and software architects to set the highest standard of physical security software governance and operational trust.',
						'primary_cta'     => array( 'label' => 'Contact Enterprise Team', 'url' => '#contact', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Book Software Demo', 'url' => '#demo', 'variant' => 'outline' ),
						'highlight_chips' => array( 'SOC 2 Type II Certified', 'ISO 27001 Aligned', 'AES-256 Data Encryption', '99.99% Uptime SLA' ),
					),
				),
				array(
					'id'       => 'sec_comp_logos',
					'type'     => 'trust_logos',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'title' => 'TRUSTED BY GLOBAL SECURITY CONTRACTORS & ENTERPRISE ORGANIZATIONS',
						'logos' => array(
							array( 'name' => 'Airbus Defense', 'label' => 'AIRBUS DEFENSE', 'url' => '' ),
							array( 'name' => 'Sanofi Global', 'label' => 'SANOFI HEALTH', 'url' => '' ),
							array( 'name' => 'Renault Group', 'label' => 'RENAULT AUTOMOTIVE', 'url' => '' ),
							array( 'name' => 'Metro Guard Corp', 'label' => 'METRO GUARD', 'url' => '' ),
							array( 'name' => 'Vanguard Asset Care', 'label' => 'VANGUARD SECURE', 'url' => '' ),
							array( 'name' => 'Apex Tactical Logistics', 'label' => 'APEX DEFENSE', 'url' => '' ),
						),
					),
				),
				array(
					'id'       => 'sec_comp_z',
					'type'     => 'z_features',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'section_title' => 'Our Governance, Compliance & Security Commitments',
						'rows' => array(
							array(
								'badge'       => 'COMPLIANCE AUDIT',
								'title'       => 'SOC 2 Type II & ISO 27001 Certified Security',
								'description' => 'Aegies Lead undergoes rigorous continuous audits by independent third-party CPA firms to ensure ironclad security controls across all customer data.',
								'bullets'     => array(
									'End-to-end AES-256 encryption at rest and TLS 1.3 in transit',
									'Strict role-based access control (RBAC) and SSO / SAML integration',
									'Immutable audit logging with cryptographic hash chains',
								),
								'image_align' => 'right',
								'cta_text'    => 'Request Security Dossier →',
								'cta_url'     => '#contact',
							),
							array(
								'badge'       => 'INFRASTRUCTURE',
								'title'       => 'Resilient Multi-Region Cloud Infrastructure',
								'description' => 'Hosted on enterprise-grade AWS infrastructure with automatic failover, real-time replication, and continuous automated backup snapshots.',
								'bullets'     => array(
									'99.99% uptime availability backed by contractual SLA',
									'Disaster recovery recovery-point objective (RPO) under 5 minutes',
									'Regional data residency options in US, EU, and UK',
								),
								'image_align' => 'left',
								'cta_text'    => 'View System Status →',
								'cta_url'     => '#demo',
							),
						),
					),
				),
				array(
					'id'       => 'sec_comp_faq',
					'type'     => 'faq_accordion',
					'active'   => true,
					'order'    => 4,
					'settings' => array(
						'title'    => 'Security, Privacy & Infrastructure Governance',
						'subtitle' => 'Detailed specifications on our data security, compliance standards, and hosting infrastructure.',
						'items'    => array(
							array(
								'q' => 'Where is our security and incident data hosted?',
								'a' => 'All data is hosted in Tier 4 AWS data centers with multi-region redundancy, automated daily backups, and AES-256 encryption at rest and TLS 1.3 in transit.',
							),
							array(
								'q' => 'Do you offer custom data residency for international clients?',
								'a' => 'Yes. Aegies Lead provides dedicated US, EU (Frankfurt), and UK data residency options to meet regional compliance mandates.',
							),
							array(
								'q' => 'How does Aegies Lead handle data isolation between clients?',
								'a' => 'Aegies Lead enforces strict multi-tenant logical database isolation with cryptographic tenant keys and role-based access controls.',
							),
						),
					),
				),
				array(
					'id'       => 'sec_comp_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 5,
					'settings' => array(
						'headline'         => 'Partner with the leader in physical security technology.',
						'subheadline'      => 'Join the hundreds of security firms and enterprise risk leaders who trust Aegies Lead.',
						'primary_button'   => array( 'label' => 'Contact Enterprise Sales', 'url' => '#contact' ),
						'secondary_button' => array( 'label' => 'Schedule Live Demo', 'url' => '#demo' ),
						'footnote'         => 'SOC 2 Type II Audit Reports available under NDA',
					),
				),
			),
		);
	}

	public static function get_generic_page_template( $slug, $title ) {
		return array(
			'slug' => $slug,
			'meta' => array(
				'title'       => $title . ' — Aegies Lead',
				'description' => 'Enterprise security and guarding workforce solutions.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_' . $slug . '_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => strtoupper( $title ),
						'headline'        => $title . ' for Modern Security Teams',
						'subheadline'     => 'Explore how Aegies Lead accelerates operational efficiency and governance.',
						'primary_cta'     => array( 'label' => 'Schedule Demo', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Contact Sales', 'url' => '#contact', 'variant' => 'outline' ),
						'hero_image'      => '',
						'highlight_chips' => array( 'Enterprise Security', 'Real-Time Visibility', 'SOC 2 Type II' ),
					),
				),
				array(
					'id'       => 'sec_' . $slug . '_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'headline'         => 'Ready to get started with ' . $title . '?',
						'subheadline'      => 'Our security engineering specialists are ready to tailor a solution for your organization.',
						'primary_button'   => array( 'label' => 'Book Discovery Call', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Sales Team', 'url' => '#contact' ),
						'footnote'         => 'Custom deployment • White-label options • Dedicated account manager',
					),
				),
			),
		);
	}
}
