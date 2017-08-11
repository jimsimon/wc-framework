const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './docs/index.js',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/docs/generated',
    filename: 'docs.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-inline-import-loader',
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: 'docs/template.html'
    })
  ]
}
