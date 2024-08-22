<?php
/*
    Plugin Name: Auto Certo Show
    Description: Exibe os veículos da Auto Certo no seu site wordpress.
    Version: 1.4.3
    Author: Douglas Everbero
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

define( 'AUTO_CERTO_SHOW_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'AUTO_CERTO_SHOW_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/vendor/autoload.php';

class AutoCertoShow {

    public static function init() {
        add_action( 'plugins_loaded', array( __CLASS__, 'plugins_loaded' ) );
        add_action('rest_api_init', array( __CLASS__, 'autocerto_register_routes' ));
    }

    public static function plugins_loaded() {
        AutoCertoShow\Settings::init();
        AutoCertoShow\Shortcode::init();
        AutoCertoShow\Enqueuer::init();
        AutoCertoShow\Api::init();
    }

    public static function autocerto_register_routes() {
        AutoCertoShow\Routes::register_routes();
    }
   
    
}

AutoCertoShow::init();
