/*
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-30 10:14:38
 */
const port = process.env.port || process.env.npm_config_port || 9528; // dev port
const path = require("path");
module.exports = {
  lintOnSave: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8089/api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/styles/variables.scss")],
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname,'src'))
      .set('@store', path.resolve(__dirname,'src/store/modules'))
      .set('@storeAction', path.resolve(__dirname,'src/utils/cache/store'))
  },
};
