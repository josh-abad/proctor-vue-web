const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11
          }
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ]
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
