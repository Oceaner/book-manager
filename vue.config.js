module.exports = {
  devServer: {
    port: 8888,
    open: true,
    https: false,
    host: "localhost",
    proxy: {
      // '/dev-apis':{
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          // '^/dev-apis': ''
          ["^" + process.env.VUE_APP_BASE_URL]: "",
        },
      },
    },
  },
  lintOnSave: true,
  productionSourceMap: false,
};
