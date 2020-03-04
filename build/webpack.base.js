const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProd = process.env.NODE_ENV === 'production'
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ?
    false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: isProd ? 'http://static-cdn.lxzmww.xyz/app/news/' : '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(gif|jpe?g|png|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HardSourceWebpackPlugin()
  ],
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '..', 'public'),
      '@': path.resolve(__dirname, '..', 'src')
    },
    extensions: ['.vue', '.wasm', '.mjs', '.js', '.json'],
    modules: [
      path.resolve(__dirname, '..', 'node_modules')
    ]
  },
  stats: 'errors-only'
}