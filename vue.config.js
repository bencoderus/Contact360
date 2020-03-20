const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/pwa/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};