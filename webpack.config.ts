/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */

import {
  DEV_PORT,
  DEV_SERVER_PROXY_CONFIG,
  DEV_SERVER_WATCH_OPTIONS,
  DEV_SOURCE_MAPS,
  EXCLUDE_SOURCE_MAPS,
  HOST,
  MY_CLIENT_PLUGINS,
  MY_CLIENT_PRODUCTION_PLUGINS,
  MY_CLIENT_RULES,
  MY_COPY_FOLDERS,
  MY_VENDOR_DLLS,
  PROD_PORT,
  PROD_SOURCE_MAPS,
  SHOW_WEBPACK_BUNDLE_ANALYZER,
  STORE_DEV_TOOLS,
  SW_RUNTIME_CACHING,
  UNIVERSAL_PORT,
  USE_DEV_SERVER_PROXY
} from './constants';

const webpack = require('webpack');

const { CheckerPlugin } = require('awesome-typescript-loader');
const { getAotPlugin } = require('./webpack.aot');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

const { hasProcessFlag, root, testDll } = require('./helpers.js');
const EVENT = process.env.npm_lifecycle_event || '';
const AOT = EVENT.includes('aot');
const DEV_SERVER = EVENT.includes('webdev');
const DLL = EVENT.includes('dll');
const E2E = EVENT.includes('e2e');
const HMR = hasProcessFlag('hot');
const PROD = EVENT.includes('prod');
const PUBLISH = EVENT.includes('publish');
const SERVER = EVENT.includes('server');
const TEST = EVENT.includes('test');
const WATCH = hasProcessFlag('watch');
const UNIVERSAL = EVENT.includes('universal');

let port: number;
if (!UNIVERSAL) {
  if (PROD) {
    port = PROD_PORT;
  } else {
    port = DEV_PORT;
  }
} else {
  port = UNIVERSAL_PORT;
}

const PORT = port;

console.log('PRODUCTION BUILD: ', PROD);
console.log('AOT: ', AOT);
if (DEV_SERVER) {
  testDll();
  console.log(`Starting dev server on: http://${HOST}:${PORT}`);
}

const CONSTANTS = {
  AOT: AOT,
  DEV_SERVER: DEV_SERVER,
  ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
  HMR: HMR,
  HOST: PUBLISH ? JSON.stringify('levelrewards.com') : JSON.stringify(HOST),
  PORT: PORT,
  PUBLISH: PUBLISH,
  STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
  UNIVERSAL: UNIVERSAL || SERVER
};

const DLL_VENDORS = [
  '@angular/animations',
  '@angular/cdk',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/flex-layout',
  '@angular/forms',
  '@angular/http',
  '@angular/material',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/platform-server',
  '@angular/router',
  '@angularclass/hmr',
  '@angularclass/hmr-loader',
  '@ngrx/effects',
  '@ngrx/entity',
  '@ngrx/router-store',
  '@ngrx/store',
  '@ngrx/store-devtools',
  'core-js',
  'hammerjs',
  'linkifyjs',
  'ngrx-store-freeze',
  'ngrx-store-logger',
  'ngx-facebook',
  'rxjs',
  'thenby',
  'web-animations-js',
  'zone.js',
  ...MY_VENDOR_DLLS
];

const COPY_FOLDERS = [
  { from: 'src/assets', to: 'assets' },
  { from: 'node_modules/hammerjs/hammer.min.js' },
  { from: 'node_modules/hammerjs/hammer.min.js.map' },
  { from: 'node_modules/@angular/material/prebuilt-themes/indigo-pink.css' },
  { from: 'src/app/material-custom-theme.css' },
  ...MY_COPY_FOLDERS
];

if (!DEV_SERVER) {
  COPY_FOLDERS.unshift({ from: 'src/index.html' });
} else {
  COPY_FOLDERS.push({ from: 'dll' });
}

const commonConfig = (function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.module = {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS]
      },
      {
        test: /\.ts$/,
        loaders:
          !DLL && !DEV_SERVER
            ? ['@ngtools/webpack']
            : [
                '@angularclass/hmr-loader',
                'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
                'angular2-template-loader',
                'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT
              ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {
        type: 'javascript/auto',
        test: /\.(json|jsonp)/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      ...MY_CLIENT_RULES
    ]
  };

  config.plugins = [
    new webpack.ProgressPlugin(),
    new CheckerPlugin(),
    new webpack.DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      metadata: { isDevServer: DEV_SERVER }
    }),
    new FilterWarningsPlugin({
      exclude: /System\.import/
    }),
    ...MY_CLIENT_PLUGINS
  ];

  if (DEV_SERVER) {
    config.plugins.push(
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./dll/polyfill-manifest.json`)
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./dll/vendor-manifest.json`)
      })
    );
  }

  if (DLL) {
    config.plugins.push(
      new webpack.DllPlugin({
        name: '[name]',
        path: root('dll/[name]-manifest.json')
      })
    );
  } else {
    config.plugins.push(
      new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] }),
      new CopyWebpackPlugin([{ from: 'src/assets/dist_root' }]),
      new SWPrecacheWebpackPlugin({
        cacheId: 'my-project-cache',
        filename: 'service-worker.js',
        maximumFileSizeToCacheInBytes: 4194304,
        navigateFallback: 'index.html',
        runtimeCaching: SW_RUNTIME_CACHING
        // minify: true,
        // importScripts: ['sw-push.js']
      })
    );
  }

  if (PROD) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      ...MY_CLIENT_PRODUCTION_PLUGINS
    );
    if (!E2E && !WATCH && !UNIVERSAL && !PUBLISH && SHOW_WEBPACK_BUNDLE_ANALYZER) {
      config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 5000 }));
    }
  }

  return config;
})();

// type definition for WebpackConfig at the bottom
const clientConfig = (function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});
  config.mode = PROD ? 'production' : 'development';
  config.cache = true;
  config.target = 'web';
  PROD
    ? (config.devtool = PUBLISH ? undefined : PROD_SOURCE_MAPS)
    : (config.devtool = DEV_SOURCE_MAPS);
  config.plugins = [getAotPlugin('client', AOT)];

  if (PROD) {
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    );
  }

  if (UNIVERSAL || SERVER) {
    config.plugins.push(
      new ScriptExtPlugin({
        defaultAttribute: 'defer'
      })
    );
  }

  if (DLL) {
    config.entry = {
      app_assets: ['./src/main.browser'],
      polyfill: [
        'sockjs-client',
        '@angularclass/hmr',
        'ts-helpers',
        'zone.js',
        'core-js/client/shim.js',
        'core-js/es6/reflect.js',
        'core-js/es7/reflect.js',
        'querystring-es3',
        'strip-ansi',
        'url',
        'punycode',
        'events',
        'webpack-dev-server/client/socket.js',
        'webpack/hot/emitter.js',
        'zone.js/dist/long-stack-trace-zone.js'
      ],
      vendor: [...DLL_VENDORS]
    };
  } else {
    config.entry = {
      main: root('./src/main.browser.ts')
    };
  }

  if (!DLL) {
    config.output = {
      path: PUBLISH ? (!TEST ? '/var/www/html' : '/var/www/html/test') : root('dist'),
      filename: !PROD ? '[name].bundle.js' : '[name].[chunkhash].bundle.js',
      sourceMapFilename: !PROD ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',
      chunkFilename: !PROD ? '[id].chunk.js' : '[id].[chunkhash].chunk.js'
    };
  } else {
    config.output = {
      path: root('dll'),
      filename: '[name].dll.js',
      library: '[name]'
    };
  }

  config.devServer = {
    contentBase: AOT ? './compiled' : './src',
    port: CONSTANTS.PORT,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    host: '0.0.0.0',
    watchOptions: DEV_SERVER_WATCH_OPTIONS
  };

  if (USE_DEV_SERVER_PROXY) {
    Object.assign(config.devServer, {
      proxy: DEV_SERVER_PROXY_CONFIG
    });
  }

  config.performance = {
    hints: false
  };

  config.node = {
    global: true,
    process: true,
    Buffer: false,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  };

  return config;
})();

const serverConfig: WebpackConfig = {
  target: 'node',
  mode: PROD ? 'production' : 'development',
  entry: AOT ? './src/server.aot.ts' : root('./src/server.ts'),
  output: {
    filename: 'server.js',
    path: root('dist')
  },
  plugins: [getAotPlugin('server', AOT)],
  module: {
    rules: []
  }
};

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};

if (!UNIVERSAL && !SERVER) {
  DLL ? console.log('BUILDING DLLs') : console.log('BUILDING APP');
  module.exports = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
} else if (SERVER) {
  module.exports = webpackMerge({}, defaultConfig, commonConfig, serverConfig);
} else {
  console.log('BUILDING UNIVERSAL');
  module.exports = [
    webpackMerge({}, defaultConfig, commonConfig, clientConfig),
    webpackMerge({}, defaultConfig, commonConfig, serverConfig)
  ];
}
