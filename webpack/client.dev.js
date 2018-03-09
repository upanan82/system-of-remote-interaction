const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
	context: path.join(__dirname, '../client'),
	devtool: 'inline-source-map',
	entry: [
    	'react-hot-loader/patch',
    	'webpack-dev-server/client?http://localhost:8080',
    	'webpack/hot/only-dev-server',
    	'./src/index.tsx',
    	'./res/scss/main.scss'
  	],
  	output: {
    	path: path.join(__dirname, '../server/public'),
    	filename: './js/index.js',
    	publicPath: '/'
  	},
  	resolve: {
    	extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
  	devServer: {
    	hot: true,
    	publicPath: '/',
    	historyApiFallback: true
  	},
  	module: {
    	rules: [
			{
        		test: /\.js$/,
        		exclude: /node_modules/,
        		use: {
          			loader: 'babel-loader',
          			options: {
            			presets: ['react', 'es2015', 'stage-1']
          			}
        		}
      		},
      		{
        		test: /\.scss$/,
        		use: ['style-loader', 'css-loader', 'sass-loader']
      		},
      		{
        		test: /\.(png|jpg|gif)$/,
        		use: [
          			{
            			loader: 'file-loader',
            			options: {}  
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
    	]
  	},
  	plugins: [
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
    	new HtmlWebpackPlugin({
      		filename: 'index.html',
      		template: path.join(__dirname, '../server/views/index.dev.ejs'),
      		inject: false
		}),
		new CheckerPlugin()
  	]
};
