<?php

namespace AutoCertoShow;

class Enqueuer {

    public static function init() {
        add_action('wp_enqueue_scripts', [self::class, 'enqueue_scripts']);
        add_action('wp_enqueue_scripts', [self::class, 'localize_script']);
    }

    public static function enqueue_scripts() {
        $asset_file = include AUTO_CERTO_SHOW_PLUGIN_DIR . 'build/index.asset.php';

        wp_register_script(
            'auto-certo-show-script',
            AUTO_CERTO_SHOW_PLUGIN_URL . 'build/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        wp_enqueue_script('auto-certo-show-script');

        wp_register_style(
            'auto-certo-show-styles',
            AUTO_CERTO_SHOW_PLUGIN_URL . 'css/style.css',
            [],
            $asset_file['version']
        );
        wp_enqueue_style('auto-certo-show-styles');
    }

    public static function localize_script() {
        wp_localize_script( 'auto-certo-show-script', 'autoCertoShow', array(
            'apiUrl' => get_option( 'autocerto_api_url' ),
            'clientId' => get_option( 'autocerto_client_id' ),
            'clientSecret' => get_option( 'autocerto_client_secret' ),
            'username' => get_option( 'autocerto_username' ),
            'password' => get_option( 'autocerto_password' ),
        ));
    }
}
?>
