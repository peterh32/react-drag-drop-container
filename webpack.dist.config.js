var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
  }
};
