<?php


// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress_trunk');

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

define('AUTH_KEY',         '!x&~A_MJ^B<r!opszB,2LMcF?xjuU.WM_GV|9nA||6K,p-stq?ezMA7&:FXL2tbW');
define('SECURE_AUTH_KEY',  'dTb|O?nu$;-JK]&g,c7>p0wRb< <cbc)a-1z==aCE!;x/;nO}w5$E~ZqJ .wp>~S');
define('LOGGED_IN_KEY',    'Z1S.)ae}0|xY!cPWPY&7$tlMaCu+SNp#++qNgDy_+?Ca9As@.RgAT+/|8|M.t#bS');
define('NONCE_KEY',        '5%1S@GcLw9V^aB%;-yaJo|4<ak/R@#]]hG-l~rrTS}JUsO+zFgb>O+V;LCF9Qu^s');
define('AUTH_SALT',        'sX#GYC}b+.yf3X0uEHi~*bo2@Rxt:?R]<Z4uTO+^Q30Tg@qGx+0|?udCeIh]OOV+');
define('SECURE_AUTH_SALT', '}>drzjUI$+Q2*##,O2,;P^R3aL0Im&P/Udy.3P=p7f#]L_oz-8 U<!g*$+}NC||b');
define('LOGGED_IN_SALT',   'zHqdfW<S#PDh,gwj5 /8n!+sNtt*b:q2c?|b-SeGwrYNjG<l=TmLE&10EWP8dQqZ');
define('NONCE_SALT',       'bsk$E}SS|+rmhE-%%;uddx1e@:~cb2LTt93o_{jZ+eZFn^3~wCy-S*-ZVTtC[]xU');


$table_prefix = 'wp_';


// Match any requests made via xip.io.
if ( isset( $_SERVER['HTTP_HOST'] ) && preg_match('/^(local.wordpress-trunk.)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(.xip.io)\z/', $_SERVER['HTTP_HOST'] ) ) {
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
