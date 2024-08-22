# AutoCerto Show Plugin

**AutoCerto Show** é um plugin WordPress que utiliza React para exibir uma lista de carros filtráveis, integrando-se à API da AutoCerto.com. O plugin facilita a criação de páginas dinâmicas de listagem de veículos e páginas de detalhes de veículos com a utilização de shortcodes e templates personalizados.

## Funcionalidades

- **Integração com a API AutoCerto.com**: O plugin busca dados em tempo real sobre os veículos diretamente da API.
- **Filtro Avançado de Veículos**: Os visitantes podem filtrar os veículos por diversos critérios como marca, modelo, tipo, preço, entre outros.
- **Shortcodes**: Fácil implementação em páginas do WordPress através de shortcodes.
- **Templates Customizados**: O plugin oferece templates para a página de listagem de veículos e para a página de detalhes de veículos.

## Requisitos

- WordPress 5.0 ou superior
- PHP 7.2 ou superior
- React integrado ao projeto (O plugin inclui os scripts necessários)

## Instalação

1. Baixe o plugin e extraia o conteúdo para o diretório `wp-content/plugins/` do seu WordPress.
2. Ative o plugin no painel de administração do WordPress em **Plugins > Plugins instalados**.

## Uso

### Shortcodes Disponíveis

- **[auto_certo_show]**: Exibe o componente principal que lista os veículos com opções de filtro.
- **[auto_slideshow]**: Exibe um slideshow com destaque de veículos.
- **[auto_veiculo_page]**: Exibe a página de detalhes de um veículo específico.

### Templates Customizados

O plugin registra dois templates customizados que podem ser usados para criar páginas dedicadas:

- **page-veiculo.php**: Template para a página de detalhes do veículo.
- **page-listagem.php**: Template para a listagem de veículos.

#### Como Usar os Templates

1. No painel do WordPress, crie uma nova página ou edite uma existente.
2. Escolha o template desejado no menu suspenso de "Atributos da Página".
   - **Página Veículo**: Use o template `page-veiculo.php` para exibir detalhes de um veículo específico.
   - **Página Listagem**: Use o template `page-listagem.php` para exibir a lista filtrável de veículos.

Esses templates irão carregar automaticamente os componentes React adequados conforme o shortcode adicionado.

### Configuração dos Shortcodes

Para utilizar os shortcodes, basta inserir o código correspondente na página ou post desejado. Exemplo:

```php
[auto_certo_show]
```

Esse shortcode renderiza o componente de listagem de veículos.

## Como Funciona

O plugin inclui um sistema de templates e shortcodes que são registrados e integrados ao WordPress por meio dos filtros e ações padrão. As páginas criadas com os templates customizados são carregadas com os componentes React através dos shortcodes.


## Suporte

Para dúvidas, sugestões ou suporte, entre em contato através do [whatsapp](tel:+5584981742798).