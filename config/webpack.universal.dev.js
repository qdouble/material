var webpack = require('webpack');
var path = require('path');
const helpers = require('./helpers');

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const webpackMerge = require('webpack-merge');

// Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'univeral';

var clientConfig = {
  target: 'web',
  entry: {
    vendor: './src/vendors.ts',
    main: './src/main.browser.ts'
  },
  output: {
    path: helpers.root('dist/client'),
    filename: 'bundle.js'
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
}

var serverConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    path: helpers.root('dist/server'),
    filename: 'bundle.js'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
}

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
}

module.exports = [
  // Client
  webpackMerge({}, commonConfig, clientConfig),
  // Server
  webpackMerge({}, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}
