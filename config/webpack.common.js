const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const resolveNgRoute = require('@angularclass/resolve-angular-routes')
// Webpack Constants
const METADATA = {
  title: 'Angular 2 RC Raw Webpack Boilerplate',
  baseUrl: '/'
};

module.exports = {
  metadata: METADATA,
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendors.ts',
    main: './src/main.browser.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('src'),
    moduleDirectories: ['node_modules']
  },
  module: {
    preloaders: [
        // fix angular2
        {
          test: /(systemjs_component_resolver|system_js_ng_module_factory_loader)\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: '(lang_1(.*[\\n\\r]\\s*\\.|\\.))?(global(.*[\\n\\r]\\s*\\.|\\.))?(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import',
            replace: 'System.import',
            flags: 'g'
          }
        },
        // {
        //   test: /.js$/,
        //   loader: 'string-replace-loader',
        //   query: {
        //     search: 'moduleId: module.id,',
        //     replace: '',
        //     flags: 'g'
        //   }
        // },
        // // end angular2 fix
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@ngrx'),
          helpers.root('node_modules/@angular2-material')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader', 
          'angular2-template-loader', 
          '@angularclass/conventions-loader'
          ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   loader: 'file'
      // },
      {test: /\.svg/, loader: 'svg-url-loader'},
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
    ]
  },
  plugins: [
    // fix angular2
      new webpack.ContextReplacementPlugin(
        /angular\/core\/(esm\/src|src)\/linker/,
        helpers.root('./src'),
        resolveNgRoute(helpers.root('./src'))
      ),
      // end angular2 fix
    new ForkCheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ 
      name: ['main', 'vendor', 'polyfills'], minChunks: Infinity 
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    },{
      from: 'src/images',
      to: 'images'
    }
    ]),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
}
