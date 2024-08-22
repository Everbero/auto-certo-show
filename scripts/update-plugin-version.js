const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const pluginFilePath = path.join(__dirname, '../auto-certo-show.php'); // Caminho para o arquivo principal do plugin

const updatePluginVersion = () => {
  const version = packageJson.version;

  // Verifica se o arquivo existe
  if (!fs.existsSync(pluginFilePath)) {
    console.error(`Arquivo não encontrado: ${pluginFilePath}`);
    process.exit(1);
  }

  let pluginFileContent = fs.readFileSync(pluginFilePath, 'utf8');

  // Regex mais robusto para garantir a correspondência correta da versão
  pluginFileContent = pluginFileContent.replace(
    /(Version:\s*)(\d+\.\d+\.\d+)/,
    `$1${version}`
  );

  // Verifica se a substituição foi bem-sucedida
  if (!pluginFileContent.includes(`Version: ${version}`)) {
    console.error('Falha ao atualizar a versão no arquivo do plugin.');
    process.exit(1);
  }

  fs.writeFileSync(pluginFilePath, pluginFileContent, 'utf8');
  console.log(`Versão do plugin atualizada para ${version} em ${pluginFilePath}`);
};

updatePluginVersion();
