const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        enforce: "post",
        test: /\.js/,
        exclude: /(tests|node_modules)/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      }
    ]
  }
}
