const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  context: path.join(__dirname, '../server'),
  devtool: 'source-map',
  entry: [
    './routes/index.js',
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, '../server/bin'),
    filename: './server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
},
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-1'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              emitFile: false,
            }  
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
    },
    {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
            configFile: './tslint.json',
            typeCheck: true
        }
    }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      test: /\.tsx($|\?)/i
    }),
    new CheckerPlugin()
  ]
};
