<?php
/**
 * Admin Page: Leads & Inquiries Management
 */

defined( 'ABSPATH' ) || exit;

$leads = get_option( 'aegies_leads_log', array() );
if ( ! is_array( $leads ) ) {
	$leads = array();
}
?>

<div class="wrap aegies-admin-wrap" id="aegies-cms-leads-app">
	<header class="aegies-topbar">
		<div class="aegies-branding">
			<span class="dashicons dashicons-shield-alt aegies-logo-icon"></span>
			<div>
				<h1 class="aegies-title">Leads & Demo Requests</h1>
				<p class="aegies-subtitle">Inbound inquiries submitted in real-time from the decoupled React frontend</p>
			</div>
		</div>

		<div class="aegies-topbar-actions">
			<a href="http://localhost:5173" target="_blank" class="button aegies-preview-btn">
				<span class="dashicons dashicons-external"></span> View React Frontend
			</a>
			<button type="button" class="button button-secondary" onclick="location.reload();">
				<span class="dashicons dashicons-update"></span> Refresh Inquiries
			</button>
		</div>
	</header>

	<div class="aegies-workspace" style="grid-template-columns: 1fr;">
		<main class="aegies-main-content">
			<div class="aegies-page-meta-card">
				<div class="aegies-card-header" style="display:flex; justify-content:space-between; align-items:center;">
					<h2><span class="dashicons dashicons-email-alt2"></span> Inbound Inquiries Log (<?php echo count( $leads ); ?>)</h2>
					<span style="font-size:12px; color:#64748b;">Endpoint: <code>POST /?rest_route=/aegies/v1/leads</code></span>
				</div>
				<div class="aegies-card-body" style="padding:0;">
					<?php if ( empty( $leads ) ) : ?>
						<div class="aegies-empty-state" style="padding:40px; text-align:center;">
							<span class="dashicons dashicons-inbox" style="font-size:40px; width:40px; height:40px; color:#94a3b8;"></span>
							<h3 style="margin-top:10px;">No inquiries submitted yet.</h3>
							<p style="color:#64748b;">When users click "Request a Demo" on the React site, their inquiries will appear here instantaneously.</p>
						</div>
					<?php else : ?>
						<table class="wp-list-table widefat fixed striped" style="border:none;">
							<thead>
								<tr>
									<th style="width:160px;">Date & Time</th>
									<th style="width:160px;">Contact Name</th>
									<th style="width:200px;">Work Email</th>
									<th style="width:180px;">Company</th>
									<th style="width:140px;">Guard Scale</th>
									<th style="width:140px;">Persona</th>
									<th>Message / Notes</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ( $leads as $l ) : ?>
									<tr>
										<td><strong><?php echo esc_html( $l['created_at'] ?? 'N/A' ); ?></strong></td>
										<td><?php echo esc_html( $l['name'] ?? 'N/A' ); ?></td>
										<td><a href="mailto:<?php echo esc_attr( $l['email'] ?? '' ); ?>"><?php echo esc_html( $l['email'] ?? '' ); ?></a></td>
										<td><?php echo esc_html( $l['company'] ?? 'N/A' ); ?></td>
										<td><span class="aegies-type-badge"><?php echo esc_html( $l['guard_count'] ?? 'N/A' ); ?></span></td>
										<td><code><?php echo esc_html( $l['persona'] ?? 'Enterprise' ); ?></code></td>
										<td><?php echo esc_html( $l['message'] ?? '—' ); ?></td>
									</tr>
								<?php endforeach; ?>
							</tbody>
						</table>
					<?php endif; ?>
				</div>
			</div>
		</main>
	</div>
</div>
