const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WorkerPlugin = require('worker-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    './src',
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js',
    // @see https://github.com/webpack/webpack/issues/652
    globalObject: 'this',
  },
  node: {
    fs: 'empty',
    Buffer: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  resolveLoader: {
    alias: {
      worker: 'worker-plugin/loader',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components|workers)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: [/(node_modules|bower_components)/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        }, {
          loader: 'ts-loader',
        }],
      },
    ],
  },
  devServer: {
    allowedHosts: [
      '127.0.0.1',
      'lvh.me',
      'www.lvh.me',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new WorkerPlugin({ worker: false }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'reports/webpack-bundle-analysis.html'),
      openAnalyzer: false,
    }),
  ],
};
