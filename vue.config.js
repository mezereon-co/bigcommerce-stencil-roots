const webpack = require('webpack')

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg')
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')

    config
      .plugin('LimitChunkCountPlugin')
      .use(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }))
  },
  lintOnSave: 'default'
}
