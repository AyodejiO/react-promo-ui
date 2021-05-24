const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BASE_URL
    : '/',

  configureWebpack: {
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'config': path.resolve(__dirname, 'src/config'),
        'layouts': path.resolve(__dirname, 'src/layouts'),
        'locales': path.resolve(__dirname, 'src/locales'),
        'middleware': path.resolve(__dirname, 'src/middleware'),
        'Model': path.resolve(__dirname, 'src/Model'),
        'plugins': path.resolve(__dirname, 'src/plugins'),
        'router': path.resolve(__dirname, 'src/router'),
        'store': path.resolve(__dirname, 'src/store'),
        'Utils': path.resolve(__dirname, 'src/Utils'),
        'views': path.resolve(__dirname, 'src/views')
      }
    },
    plugins: [
    ]
  },
  devServer: {
    // https: true
    disableHostCheck: true
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
