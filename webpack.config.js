const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'index.js',
    path: __dirname + '/client/build'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
