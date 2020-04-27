module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/components'
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 48
          })
        ]
      }
    }
  },
  devServer: {
    proxy: 'http://49.235.144.211:8344/',
    // https: true,
  }
}