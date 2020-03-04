const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const StaticUploadPlugin = require('static-upload-plugin');
const resolve = (...args) => require('path').resolve(__dirname, '..', ...args);

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, {
  entry: './src/client-entry.js',
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          // Provide path to the file with resources
          resources: resolve('src', 'assets', 'style', 'mixin.scss')
        },
      },]
    }, ]
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.ssr.html',
    //   template: './templates/index.html',
    //   chunks: []
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.csr.html',
      template: './templates/index.csr.html'
    })
  ].concat(isProd ? [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: {
            path: 'http://static-cdn.lxzmww.xyz/vue@2.6.11.js',
            type: 'js'
          },
          global: 'Vue'
        },
        {
          module: 'vue-router',
          entry: {
            path: 'http://static-cdn.lxzmww.xyz/vue-router@3.1.5.js',
            type: 'js'
          },
          global: 'VueRouter'
        },
        {
          module: 'vuex',
          entry: {
            path: 'http://static-cdn.lxzmww.xyz/vuex@3.1.2.js',
            type: 'js'
          },
          global: 'Vuex'
        }
      ]
    }),
    new StaticUploadPlugin({
      provider: 'qiniu',
      config: {
        accessKey: 'QIPytRNK0T-cwaoI429Itnd9yKBXO-T25L-UtUBf',
        secretKey: 'ays-QtaDtKKpHCx-71LpzMWe7Hvkn_YYzDjNkiTq',
        bucket: 'lucaspic'
      },
      path: '/app/news/',
      include: /\.(js|css)$/
    })
  ] : [])
});