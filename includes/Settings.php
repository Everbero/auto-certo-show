<?php

namespace AutoCertoShow;

class Settings {

    public static function init() {
        add_action( 'admin_menu', array( __CLASS__, 'add_admin_menu' ) );
        add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
    }

    public static function add_admin_menu() {
        add_options_page(
            'Auto Certo Show Settings',
            'Auto Certo Show',
            'manage_options',
            'auto-certo-show',
            array( __CLASS__, 'settings_page' )
        );
    }

    public static function register_settings() {
        register_setting( 'auto_certo_show_settings_group', 'autocerto_api_url' );
        register_setting( 'auto_certo_show_settings_group', 'autocerto_access_token' );
        register_setting( 'auto_certo_show_settings_group', 'autocerto_username' );
        register_setting( 'auto_certo_show_settings_group', 'autocerto_password' );

        add_settings_section(
            'auto_certo_show_settings_section',
            'API Settings',
            array( __CLASS__, 'settings_section_callback' ),
            'auto-certo-show'
        );

        add_settings_field(
            'autocerto_api_url',
            'API URL',
            array( __CLASS__, 'api_url_render' ),
            'auto-certo-show',
            'auto_certo_show_settings_section'
        );

        add_settings_field(
            'autocerto_access_token',
            'Client Secret',
            array( __CLASS__, 'autocerto_access_token_render' ),
            'auto-certo-show',
            'auto_certo_show_settings_section'
        );

        add_settings_field(
            'autocerto_username',
            'Username',
            array( __CLASS__, 'username_render' ),
            'auto-certo-show',
            'auto_certo_show_settings_section'
        );

        add_settings_field(
            'autocerto_password',
            'Password',
            array( __CLASS__, 'password_render' ),
            'auto-certo-show',
            'auto_certo_show_settings_section'
        );
    }

    public static function settings_section_callback() {
        echo 'Enter your API details below:';
    }

    public static function api_url_render() {
        $api_url = get_option( 'autocerto_api_url' );
        echo '<input type="text" name="autocerto_api_url" value="' . esc_attr( $api_url ) . '" size="50">';
    }

    public static function autocerto_access_token_render() {
        $client_secret = get_option( 'autocerto_access_token' );
        //mostra a dica este campo é preenchido automáticamente
        echo '<p>Este campo é preenchido automaticamente.</p>';
        echo '<input type="password" name="autocerto_access_token" disabled value="' . esc_attr( $client_secret["token"] ) . '" size="50">';
    }

    public static function username_render() {
        $username = get_option( 'autocerto_username' );
        echo '<input type="text" name="autocerto_username" value="' . esc_attr( $username ) . '" size="50">';
    }

    public static function password_render() {
        $password = get_option( 'autocerto_password' );
        echo '<input type="password" name="autocerto_password" value="' . esc_attr( $password ) . '" size="50">';
    }

    public static function settings_page() {
        ?>
        <div class="wrap">
            <h1>Auto Certo Show Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields( 'auto_certo_show_settings_group' );
                do_settings_sections( 'auto-certo-show' );
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }
}
?>
