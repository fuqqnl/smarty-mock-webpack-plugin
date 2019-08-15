/**
 * @file webpack开发环境
 * @author fuqqnl
 */

 const merge = require('webpack-merge');
 const webpackBaseConf = require('./webpack.base.conf');
 const HTMLWebpackPlugin = require('html-webpack-plugin');

const SmartyMockPlugin = require('smarty-mock-webpack-plugin');

 module.exports = merge(webpackBaseConf, {
     devtool: '#cheap-module-eval-source-map',
     mode: 'development',
     plugins: [
         new HTMLWebpackPlugin({
             filename: 'index.html',
             template: './index.html',
             inject: true
         }),
         new SmartyMockPlugin(require(__dirname + '/../mock/home.json'))

     ]
 })
