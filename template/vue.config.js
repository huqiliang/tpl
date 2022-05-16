const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const pk = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/${pk.name}` : "/",
  
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      if (process.env.ANALYZ_ENV) {
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    }
  },

  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASEURL,
        ws: false,
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    autoRouting: {
      pages: "./src/views/",
      importPrefix: "@/views/",
      chunkNamePrefix: "view-",
      nested: false
    }
  }
};
