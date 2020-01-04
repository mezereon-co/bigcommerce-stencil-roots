const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

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

    config.plugin('BundleAnalyzerPlugin').use(
      new BundleAnalyzerPlugin({
        reportFilename: 'bundle.html',
        analyzerMode: 'static',
        openAnalyzer: false
      })
    )

    config
      .plugin('LimitChunkCountPlugin')
      .use(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }))
  },
  lintOnSave: 'default'
}
