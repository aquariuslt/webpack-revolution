/** Created by CUIJA on 05-19-2017.*/

var os = require('os');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var baseConfig = require('./base.config');
var webpackBaseConfig = require('./webpack.base.config');

var pathUtil = require('../util/path-util');


const PROTOCOL = 'http://';
const HOST = '127.0.0.1';
const PORT = 5001;

var webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.root(baseConfig.dir.build),
    publicPath: PROTOCOL + HOST + ':' + PORT,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.root('node_modules')
          ) === 0
        );
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    host: HOST,
    port: PORT,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    }
  }
});

module.exports = webpackDevConfig;