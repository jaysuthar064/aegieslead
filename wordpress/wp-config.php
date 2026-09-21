<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'agieslead' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'uM_a<2P<TKb6JfyTw`VMcYn?:%xgKwTFBY?L14DEW>,,5a^LZ=K>g8nlS E/W=SF' );
define( 'SECURE_AUTH_KEY',   '6qq7R(tYoa{%-b,0+Qsp:9WvIcQx89`(Aky~2~T<@/#y@_+A>]w:aaCOoDmT@<:[' );
define( 'LOGGED_IN_KEY',     'B+)CWsk,3]ljeVhf+}r=kTMvA<8+I7g*YU@]Nd[yIzk+`:~`5xx!Tb@VWMvw+6/q' );
define( 'NONCE_KEY',         '8c=jl6-+UCW[]F#IoV_j0mthvZ:^@v4`96@|mNSv%6%s<&gsbQ]B}scb,]GrS-l)' );
define( 'AUTH_SALT',         'Lwpi[EGjbq9~F_( T[Xb8iCE]3/w #W=>}8:*#jZFvp?T40Z~8#Lm]xQd]m?UH$]' );
define( 'SECURE_AUTH_SALT',  'cbJ;=ab4TAu1o~M;##P)N646-.@31uqL2kTZI84vrHPL8O3?|6Q]0e}hGVv`ia?N' );
define( 'LOGGED_IN_SALT',    'ywS-5#1UHR/=+=v^B)9H*Iem6=-`[-AxBvTIoIuVcVaY^%X0m2H!dR46p^[n-4_u' );
define( 'NONCE_SALT',        'Eqv~k(~1}-OEm#$}r,j[&JAy`TUmSvsG>} &,>dnMxBmV4%!x_SP]:jr>Ivg*Gfo' );
define( 'WP_CACHE_KEY_SALT', 'k~?U^}n.eM27RNemf;>E+PoU;BA_L<enccQ$:R/ebp8?@Q#@Y)=+*GQPt&DFt[+h' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ENVIRONMENT_TYPE', 'local'); define('AEGIES_LOCAL_LOGIN_TOKEN', 'aegies-dev-token-123');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
