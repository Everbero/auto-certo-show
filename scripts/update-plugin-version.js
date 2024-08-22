const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const pluginFilePath = path.join(__dirname, '../auto-certo-show.php'); // Caminho para o arquivo principal do plugin

const updatePluginVersion = () => {
  const version = packageJson.version;

  let pluginFileContent = fs.readFileSync(pluginFilePath, 'utf8');

  // Atualiza a versão no cabeçalho do plugin
  pluginFileContent = pluginFileContent.replace(
    /(Version:\s*)([0-9]+\.[0-9]+\.[0-9]+)/,
    `$1${version}`
  );

  fs.writeFileSync(pluginFilePath, pluginFileContent, 'utf8');
  console.log(`Versão do plugin atualizada para ${version} em ${pluginFilePath}`);
};

updatePluginVersion();
