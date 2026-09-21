<?php
/**
 * Default Seed Data for Aegies Headless CMS (Trackforce B2B Benchmark).
 */

defined( 'ABSPATH' ) || exit;

class Aegies_Defaults {

	public static function get_pages_catalog() {
		return array(
			array( 'slug' => 'home', 'title' => 'Home Page', 'icon' => 'dashicons-admin-home' ),
			array( 'slug' => 'platform', 'title' => 'Platform Deep Dive', 'icon' => 'dashicons-networking' ),
			array( 'slug' => 'who-we-serve', 'title' => 'Who We Serve (Solutions)', 'icon' => 'dashicons-groups' ),
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
						'url'         => '#platform',
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
						'url'         => '#who-we-serve',
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
						'id'    => 'menu_pricing',
						'label' => 'Pricing',
						'url'   => '#pricing',
					),
					array(
						'id'    => 'menu_company',
						'label' => 'Security & Trust',
						'url'   => '#company',
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
							array( 'label' => 'Guard Mobile Portal', 'url' => '#mobile' ),
						),
					),
					array(
						'title' => 'Solutions',
						'links' => array(
							array( 'label' => 'Enterprise Security Leaders', 'url' => '#enterprise' ),
							array( 'label' => 'Guarding Contractors', 'url' => '#contractors' ),
							array( 'label' => 'Critical Infrastructure', 'url' => '#infrastructure' ),
							array( 'label' => 'Healthcare Campuses', 'url' => '#healthcare' ),
						),
					),
					array(
						'title' => 'Trust & Governance',
						'links' => array(
							array( 'label' => 'SOC 2 Type II Certified', 'url' => '#compliance' ),
							array( 'label' => 'ISO 27001 Security', 'url' => '#compliance' ),
							array( 'label' => 'GDPR & Privacy Shield', 'url' => '#privacy' ),
							array( 'label' => 'Live System Status (99.99%)', 'url' => '#status' ),
						),
					),
					array(
						'title' => 'Company',
						'links' => array(
							array( 'label' => 'About Aegies Lead', 'url' => '#about' ),
							array( 'label' => 'Customer Case Studies', 'url' => '#case-studies' ),
							array( 'label' => 'Careers (Hiring)', 'url' => '#careers' ),
							array( 'label' => 'Contact Sales & Dispatch', 'url' => '#contact' ),
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
						'secondary_cta'   => array( 'label' => 'Explore Platform', 'url' => '#platform', 'variant' => 'outline' ),
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
								'cta_url'     => '#patrols',
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
								'cta_url'     => '#incidents',
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
								'cta_url'     => '#proposals',
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
								'link_url'  => '#vanguard-case',
							),
							array(
								'metric'    => '-42%',
								'label'     => 'Emergency Escalation Time',
								'client'    => 'Metropolitan Healthcare Network',
								'challenge' => 'Hospital campuses needed instant duress dispatch and live officer tracking.',
								'outcome'   => 'Deployed Aegies panic alerts and GPS live location, slashing dispatch response times from 4.2 minutes down to under 2.4 minutes.',
								'link_text' => 'Read Healthcare Case Study →',
								'link_url'  => '#metro-case',
							),
							array(
								'metric'    => '+$480K',
								'label'     => 'Annual Margin Recovery',
								'client'    => 'Apex Protective Group',
								'challenge' => 'Manual timesheet calculations caused unbilled overtime and uncollected payroll discrepancies.',
								'outcome'   => 'Automated timesheet-to-invoice generation, eliminating billing leakage and accelerating payment cycles by 14 days.',
								'link_text' => 'Read Apex Case Study →',
								'link_url'  => '#apex-case',
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
				'title'       => 'Platform Architecture — Aegies Lead',
				'description' => 'Explore the complete security operations suite: Field Ops, Dispatch, GPS Patrols, AI Bidding.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_plat_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'COMPLETE PLATFORM ARCHITECTURE',
						'headline'        => 'The connected system of record for physical security.',
						'subheadline'     => 'Eliminate fragmented spreadsheets and point solutions. Manage scheduling, GPS patrols, incident management, and client billing on one unified platform.',
						'primary_cta'     => array( 'label' => 'Schedule Architecture Tour', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'View Live Demo', 'url' => '#demo', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Real-Time GPS Tracking', 'Offline Sync Engine', 'Automated Invoicing', 'SOC 2 Certified' ),
					),
				),
				array(
					'id'       => 'sec_plat_showcase',
					'type'     => 'product_showcase',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'badge'           => 'LIVE COMMAND & DISPATCH',
						'headline'        => 'Complete operational visibility from headquarters to the field',
						'subheadline'     => 'Coordinate hundreds of officers, verify geofenced checkpoints, and surface live risk alerts instantaneously.',
						'floating_badges' => array(
							array( 'title' => 'Sub-Second Ping', 'subtitle' => 'Live Location Tracking' ),
							array( 'title' => '100% Geofenced', 'subtitle' => 'Zero Missed Checkpoints' ),
							array( 'title' => 'AES-256 Encrypted', 'subtitle' => 'Audit-Proof Evidence Logs' ),
						),
					),
				),
				array(
					'id'       => 'sec_plat_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'headline'         => 'Ready to see the Aegies Lead Platform in action?',
						'subheadline'      => 'Book a 1-on-1 technical walk-through with a security solutions architect.',
						'primary_button'   => array( 'label' => 'Book Platform Walkthrough', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Talk to Sales', 'url' => '#contact' ),
						'footnote'         => 'Custom migration support • Enterprise SLAs available',
					),
				),
			),
		);
	}

	public static function get_default_page_who_we_serve() {
		return array(
			'slug' => 'who-we-serve',
			'meta' => array(
				'title'       => 'Solutions & Industries — Aegies Lead',
				'description' => 'Tailored security solutions for Enterprise Directors, Guarding Contractors, and Critical Infrastructure.',
			),
			'sections' => array(
				array(
					'id'       => 'sec_who_hero',
					'type'     => 'hero',
					'active'   => true,
					'order'    => 1,
					'settings' => array(
						'badge'           => 'TAILORED INDUSTRY SOLUTIONS',
						'headline'        => 'Built for enterprise directors and guard service firms.',
						'subheadline'     => 'Whether managing in-house security risk across global corporate facilities or scaling a commercial guarding contractor agency, Aegies Lead adapts to your exact operational requirements.',
						'primary_cta'     => array( 'label' => 'Explore Your Solution', 'url' => '#who-we-serve', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Read Case Studies', 'url' => '#case-studies', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Commercial Real Estate', 'Healthcare Systems', 'Guarding Contractors', 'Critical Infrastructure' ),
					),
				),
				array(
					'id'       => 'sec_who_tabs',
					'type'     => 'audience_tabs',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'heading'    => 'Dedicated workflows for both sides of the physical security ecosystem',
						'subheading' => 'Select your operational persona to see how Aegies Lead solves your specific challenges.',
						'tab_enterprise' => array(
							'tab_title'   => 'Enterprise Security Leaders',
							'tagline'     => 'In-House Risk, Compliance & Asset Protection',
							'headline'    => 'Board-Grade Governance & Vendor SLA Oversight',
							'description' => 'Maintain strict control over third-party guard contractors, verify daily service reports, and inspect tamper-proof incident evidence across all properties.',
							'bullets'     => array(
								'Direct access to live patrol verification data',
								'Automated SLA penalty tracking and invoice audit',
								'Standardized incident reporting across multiple vendors',
								'Certificate of Insurance (COI) compliance enforcement',
							),
							'stat_badge'  => '99.8% SLA Compliance Across 1,400+ Client Sites',
						),
						'tab_guarding' => array(
							'tab_title'   => 'Guarding Contractor Firms',
							'tagline'     => 'Security Vendors & Guarding Agencies',
							'headline'    => 'Grow Guard Profit Margins & Win Enterprise Bids',
							'description' => 'Automate workforce scheduling, eliminate unbilled overtime, and draft AI-assisted RFP proposals in minutes to secure high-margin multi-year contracts.',
							'bullets'     => array(
								'Clock-in to invoice generation in under 24 hours',
								'AI proposal scoping for commercial security bids',
								'Guard mobile portal with offline patrol sync',
								'Guard training and certification tracking',
							),
							'stat_badge'  => '+34% Gross Margin Recovery in 90 Days',
						),
					),
				),
				array(
					'id'       => 'sec_who_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'headline'         => 'Discover the exact solution for your security operations.',
						'subheadline'      => 'Schedule a discovery session tailored to your industry and scale.',
						'primary_button'   => array( 'label' => 'Request Industry Demo', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Contact Us', 'url' => '#contact' ),
						'footnote'         => 'SOC 2 Type II Certified • Dedicated account management',
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
				'description' => 'Simple, scalable pricing built for physical security firms of all sizes.',
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
						'subheadline'     => 'No hidden setup fees. Pay only for active guards and sites with unlimited supervisor and client portal accounts included.',
						'primary_cta'     => array( 'label' => 'Calculate Your ROI', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Contact Sales', 'url' => '#contact', 'variant' => 'outline' ),
						'highlight_chips' => array( 'Unlimited Client Users', 'Free Guard Mobile App', 'Free Dedicated Onboarding', 'SOC 2 Certified' ),
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
							array( 'value' => '3.4x', 'label' => 'Average Annual ROI', 'subtext' => 'From margin recovery' ),
							array( 'value' => '14 Days', 'label' => 'Faster Payment Cycles', 'subtext' => 'With auto-invoicing' ),
							array( 'value' => '-60%', 'label' => 'Admin Overhead', 'subtext' => 'In scheduling & payroll' ),
							array( 'value' => '100%', 'label' => 'Audit Compliance', 'subtext' => 'Zero unverified shifts' ),
						),
					),
				),
				array(
					'id'       => 'sec_price_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 3,
					'settings' => array(
						'headline'         => 'Get a custom quote tailored to your guard roster.',
						'subheadline'      => 'Our solutions team will model your exact cost savings and return on investment.',
						'primary_button'   => array( 'label' => 'Request Custom Quote', 'url' => '#demo' ),
						'secondary_button' => array( 'label' => 'Talk to Pricing Specialist', 'url' => '#contact' ),
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
				'title'       => 'Company, Security & Trust — Aegies Lead',
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
						'headline'        => 'Mission-critical reliability for physical security.',
						'subheadline'     => 'Aegies Lead was engineered by security operations veterans and software architects to set the highest standard of physical security software governance.',
						'primary_cta'     => array( 'label' => 'Contact Security Team', 'url' => '#contact', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Download Security Whitepaper', 'url' => '#report', 'variant' => 'outline' ),
						'highlight_chips' => array( 'SOC 2 Type II Certified', 'ISO 27001 Aligned', 'AES-256 Data Encryption', '99.99% Uptime SLA' ),
					),
				),
				array(
					'id'       => 'sec_comp_cta',
					'type'     => 'cta_banner',
					'active'   => true,
					'order'    => 2,
					'settings' => array(
						'headline'         => 'Partner with the leader in physical security technology.',
						'subheadline'      => 'Join the hundreds of security firms and enterprise risk leaders who trust Aegies Lead.',
						'primary_button'   => array( 'label' => 'Contact Leadership Team', 'url' => '#contact' ),
						'secondary_button' => array( 'label' => 'Request Security Package', 'url' => '#demo' ),
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
						'primary_cta'     => array( 'label' => 'Get Started', 'url' => '#demo', 'variant' => 'primary' ),
						'secondary_cta'   => array( 'label' => 'Learn More', 'url' => '#learn', 'variant' => 'outline' ),
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
						'secondary_button' => array( 'label' => 'Contact Us', 'url' => '#contact' ),
						'footnote'         => 'Custom deployment • White-label options • Dedicated account manager',
					),
				),
			),
		);
	}
}
