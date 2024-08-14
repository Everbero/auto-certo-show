<?php

namespace AutoCertoShow;

class Shortcode {
    public static function register_template($templates) {
        $templates['page-veiculo.php'] = 'Página Veículo';
        $templates['page-listagem.php'] = 'Página Listagem';
        return $templates;
    }

    public static function use_custom_template($template) {
        if (is_page_template('page-veiculo.php')) {
            $template = AUTO_CERTO_SHOW_PLUGIN_DIR . 'includes/Templates/page-veiculo.php';
        }
        if (is_page_template('page-listagem.php')) {
            $template = AUTO_CERTO_SHOW_PLUGIN_DIR . 'includes/Templates/page-listagem.php';
        }
        return $template;
    }

    public static function init() {
        add_shortcode( 'auto_certo_show', array( __CLASS__, 'render_shortcode' ) );
        add_shortcode( 'auto_slideshow', array( __CLASS__, 'render_slideshow' ) );
        add_shortcode( 'auto_veiculo_page', array( __CLASS__, 'render_veiculo' ) );
        add_filter( 'theme_page_templates', array( __CLASS__, 'register_template' ) );
        add_filter( 'template_include', array( __CLASS__, 'use_custom_template' ));
    }

    public static function render_shortcode() {
        return '<div id="auto-certo-show-component"></div>';
    }

    public static function render_slideshow() {
        return '<div id="auto-certo-slideshow"></div>';
    }

    public static function render_veiculo() {
        return '<div id="auto-certo-veiculo"></div>';
    }
}
