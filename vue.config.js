const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // changeOrigin: true,
  // runtimeCompiler: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 後台網址
  devServer: {
    proxy: 'http://lottery.morty.zaza.one',
  },
  // assetsDir: 'static',
  // outputDir: 'dist',
});
