const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
 

// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    mode: 'development', // 'production' | 'development' | 'none'
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js', // '[name].[contenthash].js' //Bundles all files into respective names
      path: path.resolve(__dirname, 'dist'), //creates dist folder
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        filename: 'manifest.json',
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        orientation:'portrait',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
           destination: path.join('assets', 'icons'),
          }
         ],
        start_url: '/',
        publicPath: '/',
        })
    ],

    module: {
      rules: [
         {
           test: /\.css$/i,
           use: ['style-loader', 'css-loader'], // css loaders
         },{
           test: /\.m?js$/, //js files
           exclude: /(node_modules|bower_components)/, //exclude node_modules and bower_components
           use: {
             loader: 'babel-loader', //babel-loader
             options: {
               presets: ['@babel/preset-env'], //presets
               plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], //plugins
             },
           },
         }
      ],
    },
  };
};
