<?php

namespace AutoCertoShow;

class Api {

    private $api_url;
    private $client_id;
    private $client_secret;
    private $username;
    private $password;

    public function __construct() {
        $this->api_url = get_option('autocerto_api_url');
        $this->client_id = get_option('autocerto_client_id');
        $this->client_secret = get_option('autocerto_client_secret');
        $this->username = get_option('autocerto_username');
        $this->password = get_option('autocerto_password');
    }

    public static function init() {
        $instance = new self(); // Cria uma instância da classe
        $token = $instance->get_stored_token();

        if (!$token) {
            $token = $instance->obter_access_token();
            if ($token) {
                $instance->store_token($token);
            }
        }

        return $token;
    }

    private function obter_access_token() {
        $body = http_build_query(array(
            'grant_type' => 'password',
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
            'username' => $this->username,
            'password' => $this->password,
        ));

        $args = array(
            'body' => $body,
            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded',
            ),
            'method' => 'POST',
        );

        $response = wp_remote_post($this->api_url . '/oauth/token', $args);

        if (is_wp_error($response)) {
            return null;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return isset($data['access_token']) ? $data['access_token'] : null;
    }

    // Recebe a lista de carros ou um único carro e filtra os campos Renavam, Chassi e Placa
    private function filtrarDocsCarro($carros) {
        // Verifica se a entrada é um único objeto ou um array de objetos
        if (isset($carros['Codigo'])) {
            // É um único objeto, então aplica o filtro e retorna
            return $this->filtrarCamposCarro($carros);
        } elseif (is_array($carros)) {
            // É um array de objetos, então aplica o filtro a cada um
            return array_map([$this, 'filtrarCamposCarro'], $carros);
        }

        // Retorna o original se não for um formato esperado
        return $carros;
    }

    // Função auxiliar para filtrar os campos de um único carro
    private function filtrarCamposCarro(array $carro): array {
        // Verifica e garante que os valores são strings antes de aplicar substr
        $carro['Chassi'] = isset($carro['Chassi']) && is_string($carro['Chassi']) ? "Final " . substr($carro['Chassi'], -3) : 'N/A';
        $carro['Renavam'] = isset($carro['Renavam']) && is_string($carro['Renavam']) ? "Final " . substr($carro['Renavam'], -3) : 'N/A';
        $carro['Placa'] = isset($carro['Placa']) && is_string($carro['Placa']) ? "Final " . substr($carro['Placa'], -1) : 'N/A';

        return $carro;
    }




    private function get_stored_token() {
        $token_data = get_option('autocerto_access_token', false);

        if ($token_data && isset($token_data['token']) && isset($token_data['expires'])) {
            // Verifica se o token ainda é válido
            if ($token_data['expires'] > time()) {
                return $token_data['token'];
            }
        }

        return null;
    }

    private function store_token($token) {
        $expires_in = 3600; // Defina o tempo de expiração do token conforme necessário
        $expires_at = time() + $expires_in;

        $token_data = array(
            'token' => $token,
            'expires' => $expires_at,
        );

        update_option('autocerto_access_token', $token_data);
    }
    public function obter_estoque($filtros = array()) {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        // Construa a URL com base nos filtros, se necessário
        $url = $this->api_url . '/api/Veiculo/ObterEstoque';

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        $data = $this->filtrarDocsCarro($data);

        return $data;
    }
    public function obter_cambio() {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterCambio';

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public function obter_combustivel() {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterCombustivel';

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public function obter_cor() {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterCor';

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public static function get_cor(\WP_REST_Request $request) {
        $api = new Api();
        $cor = $api->obter_cor();

        if (is_wp_error($cor)) {
            return new \WP_REST_Response($cor, 500);
        }

        return new \WP_REST_Response($cor, 200);
    }
    public function obter_marcas($tipo) {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterMarcas?tipo=' . urlencode($tipo);

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public function obter_opcionais() {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterOpcionais';

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public function obter_modelos($codigoMarca) {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterModelos?codigoMarca=' . urlencode($codigoMarca);

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }
    public function obter_versoes($codigoModelo, $anoModelo) {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterVersoes?codigoModelo=' . urlencode($codigoModelo) . '&anoModelo=' . urlencode($anoModelo);

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);

        return $data;
    }

    public function obter_veiculo($codigoVeiculo) {
        $token = $this->init(); // Obtém o token de autenticação

        if (!$token) {
            return new \WP_Error('no_token', 'Unable to retrieve access token', array('status' => 403));
        }

        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ),
            'method' => 'GET',
        );

        $url = $this->api_url . '/api/Veiculo/ObterVeiculo?codigoVeiculo=' . urlencode($codigoVeiculo);

        $response = wp_remote_get($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        $data = $this->filtrarDocsCarro($data);

        return $data;
    }
}
