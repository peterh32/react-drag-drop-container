var path = require('path');

module.exports = {
  context: path.join(__dirname, 'demo'),
  entry: ['./app.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
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
