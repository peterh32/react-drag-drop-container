var path = require('path');

module.exports = {
  context: path.join(__dirname, 'demo'),
  entry: ['./example.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'example.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },

  // CLI:  webpack-dev-server --hot --inline
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080,
    watchContentBase: true
  }
};
