const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WorkerPlugin = require('worker-plugin');

module.exports = {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/convert-it/',
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
              ['@babel/preset-env', {
                targets: '> 0.5%, last 2 versions, Firefox ESR, not dead, ie 11',
                useBuiltIns: 'usage',
                corejs: 3,
              }],
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                corejs: 3,
              }],
            ],
            sourceType: 'script',
          },
        }, {
          loader: 'ts-loader',
        }],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new WorkerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'reports/webpack-bundle-analysis.html'),
      openAnalyzer: false,
    }),
  ],
};
