<?php

namespace AutoCertoShow;

class Routes {

    public static function register_routes() {
        register_rest_route('autocerto/v1', '/estoque', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_estoque'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('autocerto/v1', '/cambio', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_cambio'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('autocerto/v1', '/combustivel', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_combustivel'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('autocerto/v1', '/cor', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_cor'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('autocerto/v1', '/marcas', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_marcas'),
            'permission_callback' => '__return_true',
            'args' => array(
                'tipo' => array(
                    'required' => true,
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('autocerto/v1', '/modelos', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_modelos'),
            'permission_callback' => '__return_true',
            'args' => array(
                'codigoMarca' => array(
                    'required' => true,
                    'validate_callback' => function ($param, $request, $key) {
                        return !empty($param);
                    }
                ),
            ),
        ));

        register_rest_route('autocerto/v1', '/versoes', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_versoes'),
            'permission_callback' => '__return_true',
            'args' => array(
                'codigoModelo' => array(
                    'required' => true,
                    'validate_callback' => function ($param, $request, $key) {
                        return !empty($param);
                    }
                ),
                'anoModelo' => array(
                    'required' => true,
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('autocerto/v1', '/opcionais', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_opcionais'),
            'permission_callback' => '__return_true',
        ));

        // registra a rota de veiculo
        register_rest_route('autocerto/v1', '/veiculo', array(
            'methods' => 'GET',
            'callback' => array(__CLASS__, 'get_veiculo'),
            'permission_callback' => '__return_true',
        ));
    }

    public static function get_estoque(\WP_REST_Request $request) {
        $api = new Api();
        $filtros = $request->get_params();
        $estoque = $api->obter_estoque($filtros);

        if (is_wp_error($estoque)) {
            return new \WP_REST_Response($estoque, 500);
        }

        return new \WP_REST_Response($estoque, 200);
    }

    public static function get_cambio(\WP_REST_Request $request) {
        $api = new Api();
        $cambio = $api->obter_cambio();

        if (is_wp_error($cambio)) {
            return new \WP_REST_Response($cambio, 500);
        }

        return new \WP_REST_Response($cambio, 200);
    }

    public static function get_combustivel(\WP_REST_Request $request) {
        $api = new Api();
        $combustivel = $api->obter_combustivel();

        if (is_wp_error($combustivel)) {
            return new \WP_REST_Response($combustivel, 500);
        }

        return new \WP_REST_Response($combustivel, 200);
    }

    public static function get_cor(\WP_REST_Request $request) {
        $api = new Api();
        $cor = $api->obter_cor();

        if (is_wp_error($cor)) {
            return new \WP_REST_Response($cor, 500);
        }

        return new \WP_REST_Response($cor, 200);
    }

    public static function get_marcas(\WP_REST_Request $request) {
        $tipo = $request->get_param('tipo');
        $api = new Api();
        $marcas = $api->obter_marcas($tipo);

        if (is_wp_error($marcas)) {
            return new \WP_REST_Response($marcas, 500);
        }

        return new \WP_REST_Response($marcas, 200);
    }

    public static function get_modelos(\WP_REST_Request $request) {
        $codigoMarca = $request->get_param('codigoMarca');
        $api = new Api();
        $modelos = $api->obter_modelos($codigoMarca);

        if (is_wp_error($modelos)) {
            return new \WP_REST_Response($modelos, 500);
        }

        return new \WP_REST_Response($modelos, 200);
    }

    public static function get_versoes(\WP_REST_Request $request) {
        $codigoModelo = $request->get_param('codigoModelo');
        $anoModelo = $request->get_param('anoModelo');

        // Instancia a classe Api para usar o método obter_versoes
        $api = new Api();
        $versoes = $api->obter_versoes($codigoModelo, $anoModelo);

        // Verifica se houve um erro na chamada
        if (is_wp_error($versoes)) {
            return new \WP_REST_Response($versoes, 500);
        }

        // Retorna as versões com sucesso
        return new \WP_REST_Response($versoes, 200);
    }

    public static function get_opcionais(\WP_REST_Request $request) {
        $api = new Api();
        $opcionais = $api->obter_opcionais();

        if (is_wp_error($opcionais)) {
            return new \WP_REST_Response($opcionais, 500);
        }

        return new \WP_REST_Response($opcionais, 200);
    }

    public static function get_veiculo(\WP_REST_Request $request) {
        $api = new Api();
        $veiculo = $api->obter_veiculo($request->get_param('codigoVeiculo'));

        if (is_wp_error($veiculo)) {
            return new \WP_REST_Response($veiculo, 500);
        }

        return new \WP_REST_Response($veiculo, 200);
    }
    
}
