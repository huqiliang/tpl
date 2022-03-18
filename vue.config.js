const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: (config) => {
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
        target: process.env.api,
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
