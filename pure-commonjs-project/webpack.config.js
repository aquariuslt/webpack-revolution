/** Created by CUIJA on 05-19-2017.*/

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve('public'),
    publicPath: '',
    filename: '[name].bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};