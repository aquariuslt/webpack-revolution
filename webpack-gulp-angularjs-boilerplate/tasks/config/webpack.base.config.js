/** Created by CUIJA on 05-19-2017.*/

var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var baseConfig = require('./base.config');

var pathUtil = require('../util/path-util');

module.exports = {
  entry: {
    main: './src/main.js',
    styles: './src/styles.css'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: pathUtil.root(baseConfig.dir.src, 'index.html'),
        loader: 'ng-cache-loader?prefix=[dir]/[dir]/[dir]'
      },
      {
        test: /\.css$/,
        exclude: pathUtil.root(baseConfig.dir.src, 'app'),
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: ['style-loader']
        })
      },
      {
        test: /\.css$/,
        include: pathUtil.root(baseConfig.dir.src, 'app'),
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: ['style-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: false,
          publicPath: './',
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: []
};