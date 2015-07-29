<?php


// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress_default');

/** MySQL database username */
define('DB_USER', 'wp');

/** MySQL database password */
define('DB_PASSWORD', 'wp');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('AUTH_KEY',         'qj*UJ2kSv7<27R8z1OV])7x^Win}7TW[;ED?G+Z}|#e~?y4&l/KP/Na|c#T3+(M|');
define('SECURE_AUTH_KEY',  'F<VzLo7Y$zPuBu~dUe&Nca^t( %^3Ta5:IAK>fk#_k-r%q^6Z}GXrU;}[5#$<Ki@');
define('LOGGED_IN_KEY',    '8kVQOaDEBZ_:6[a<|kO|UI+9t|p#~#e9=hc?MtvxKP>6y9viRjQr:(A1RE^@(uAa');
define('NONCE_KEY',        '4SJ#+<J7OUaYV@D=^mkgsfOQCT*`.lzof(%S%l|Y?3 D%bF|,-j1qoE1j}tR;eM}');
define('AUTH_SALT',        '1JJ04@EtI~LI cv]gF.,3 GMbRzJ]ptcAck>|`C;RKkmxoEDQgLbh]hu<<;i}-}+');
define('SECURE_AUTH_SALT', 'mkQuIR^>To.cq,dx_9h0V|avQl{j&N(zw.^N>JiH|,fvc8jAk4kMJ>jg`R!TMx|c');
define('LOGGED_IN_SALT',   '|=OAAqo]C-fsPS-&8|*V@[~v</6j6N;=5||.l[t|u>i(Mi$e%Bgi+0F,pGd[5Be1');
define('NONCE_SALT',       'g7#] DHH-,ruJIs@7Vb4fuJ/JToR|=DW+9CSlQeJ}Gjw=T2f2+-ZaH3VysW91w-w');


$table_prefix = 'wp_';


// Match any requests made via xip.io.
if ( isset( $_SERVER['HTTP_HOST'] ) && preg_match('/^(local.wordpress.)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(.xip.io)\z/', $_SERVER['HTTP_HOST'] ) ) {
	define( 'WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] );
	define( 'WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] );
}

define( 'WP_DEBUG', true );



/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
