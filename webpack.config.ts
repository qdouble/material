/* tslint:disable: variable-name max-line-length */
import 'ts-helpers';
// needed to create context for resolveNgRoute
/**
 * @author: @AngularClass
 */
const {
  HotModuleReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin,
  optimize: {
    CommonsChunkPlugin,
    // DedupePlugin
  }

} = require('webpack');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

const ENV = process.env.npm_lifecycle_event;
const AOT = ENV === 'build:aot' || ENV === 'server:aot';
console.log('AOT =', AOT);
// const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build:prod' || ENV === 'server:prod' || ENV === 'watch:prod' ||  ENV === 'build:aot';

// type definition for WebpackConfig at the bottom
module.exports = function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    ENV: isProd ? JSON.stringify('production') : JSON.stringify('development'),
    HMR: options.HMR,
    PORT: 3000,
    HOST: 'localhost'
  };

  let config: any = {};

  config.cache = true;
  isProd ? config.devtool = 'source-map' : config.devtool = 'eval';

  if (AOT) {
    config.entry = {
      polyfills: './src/polyfills.browser',
      main: './src/main.browser.aot'
    };
  } else {
    config.entry = {
      polyfills: './src/polyfills.browser',
      main: './src/main.browser'
    };
  }

  config.output = {
    path: root('dist'),
    filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
    sourceMapFilename: isProd ? '[name].[hash].map' : '[name].map',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.module = {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          root('node_modules/rxjs'),
          root('node_modules/@angular'),
          root('node_modules/@ngrx')
        ]
      },
    ],

    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
    ]
  };

  config.plugins = [
    new HotModuleReplacementPlugin(),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),
    new CommonsChunkPlugin({ name: ['main', 'polyfills'], minChunks: Infinity }),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }, {
      from: 'src/images',
      to: 'images'
    }
    ]),
    // new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ];

  // Add build specific plugins
  console.log('PRODUCTION BUILD = ', isProd);
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      // new DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new UglifyJsPlugin({
        beautify: false,
        // compress: {
        //   screw_ie8: true
        // },
        comments: false
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    config.resolve = {
      extensions: ['.ts', '.js'],
      root: root('src'),
      moduleDirectories: ['node_modules'],
      mainFields: ['module', 'main', 'browser']
    };
  } else {
    config.resolve = {
      extensions: ['.ts', '.js'],
      root: root('src'),
      moduleDirectories: ['node_modules']
    };
  }

  config.devServer = {
    contentBase: './src',
    port: CONSTANTS.PORT,
    hot: CONSTANTS.HMR,
    inline: CONSTANTS.HMR,
    historyApiFallback: true
  };

  config.node = {
    global: 'window',
    process: true,
    Buffer: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  };

  return config;

} ();

// Types
type Entry = Array<string> | Object;

type Output = Array<string> | {
  path: string,
  filename: string
};

type EnvOptions = any;

interface WebpackConfig {
  config: {
    cache?: boolean;
    target?: string;
    devtool?: string;
    entry: Entry;
    output: any;
    module?: any;
    plugins?: Array<any>;
    resolve?: {
      root?: string;
      extensions?: Array<string>;
    };
    devServer?: {
      contentBase?: string;
      port?: number;
      historyApiFallback?: boolean;
      hot?: boolean;
      inline?: boolean;
    };
    node?: {
      process?: boolean;
      global?: boolean | string;
      Buffer?: boolean;
      crypto?: string | boolean;
      module?: boolean;
      clearImmediate?: boolean;
      setImmediate?: boolean
      clearTimeout?: boolean;
      setTimeout?: boolean
    };
  };
}
