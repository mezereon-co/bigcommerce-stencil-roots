module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
}
