const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // transpileDependencies: true,
  // changeOrigin: true,
  lintOnSave: false,
  // 後台網址
  devServer: {
    proxy: 'http://lottery.morty.zaza.one',
  },
});
