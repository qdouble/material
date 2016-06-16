var webpack = require('webpack');
var path = require('path');
const helpers = require('./helpers');

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'univeral';

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js'],
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ]
};


var clientConfig = {
  target: 'web',
  entry: {
    vendor: './../src/vendors.ts',
    main: './../src/main.browser.ts'
},
  output: {
    path: helpers.root('dist/client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


var serverConfig = {
  target: 'node',
  entry: './../src/server/server',
  output: {
    path: helpers.root('dist/server')
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};



// Default config
var defaultConfig = {
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, '/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  }
}



var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}