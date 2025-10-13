const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  // GitHub Pages 部署設定
  publicPath: process.env.NODE_ENV === 'production' ? '/drawWeb/' : '/',

  // 後台網址 (開發環境)
  devServer: {
    proxy: 'http://lottery.morty.zaza.one',
  },

  // 輸出目錄
  outputDir: 'dist',

  // 靜態資源目錄
  assetsDir: 'static',
});
