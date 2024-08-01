const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // changeOrigin: true,
  // runtimeCompiler: true,
  lintOnSave: false,

  // 後台網址
  devServer: {
    proxy: 'http://lottery.mo.shy.lol',
  },
  // assetsDir: 'static',
  // outputDir: 'dist',
});
