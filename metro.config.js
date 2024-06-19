// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  resolver: {
    // Extensões de arquivo para resolução
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx', 'ttf'],
    // Adicione manipuladores para assets se necessário
    assetExts: ['ttf', 'png', 'jpg'], // Incluir outras extensões de assets conforme necessário
  },
  transformer: {
    // Configure manipuladores de transformer se necessário
    assetPlugins: ['expo-asset/tools/hashAssetFiles'], // Necessário para manipular assets em Expo
  },
  ...getDefaultConfig(__dirname), // Inclui configurações padrão do Expo
};
