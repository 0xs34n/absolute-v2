const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const DashboardPlugin = require('webpack-dashboard/plugin');
const pkg = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build')
}

// Common configurations for all npm run options.
const common = {
     entry: {
     	app: PATHS.app,
     	vendor: Object.keys(pkg.dependencies)
     },
     output: {
        path: PATHS.build,
        filename: '[name].js',
     },
     module: {
     	loaders: [
     		{
     			test: /\.jsx?$/,
     			loader: 'babel',
     			include: PATHS.app,
     			query: {
     				cacheDirectory: true,
     				presets: ['react', 'es2015'],
     				plugins: [
	                    [
	                        'typecheck',
	                        'syntax-flow',
	                        'transform-flow-strip-types',
	                        {'disable': {'production': true}}
	                    ]
	                ]
     			}

     		},
     		{
     			test: /\.css$/,
            	loader: ExtractTextPlugin.extract('style', 'css'),
            	include: PATHS.app
     		},
     		{
     			test: /\.(jpg|png|svg|woff|woff2|ttf|eot)$/,
            	loader: 'file',
            	include: PATHS.app
     		}
     	]
     },
     plugins: [
     	new HtmlWebpackPlugin({
     		title: 'absolute',
            template: './template.html'
     	}),
     	new ExtractTextPlugin('[name].[chunkhash].css')
     ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
	case 'build':
		config = merge(common, {
			output: {
				path: PATHS.build,
                filename: '[name].[chunkhash].js',
                chunkFilename: '[chunkhash].js'
			},
			devtool: 'source-map',
			plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
               	new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
              	new webpack.optimize.CommonsChunkPlugin({
                     names: ["vendor", "manifest"]
                }),
                new CleanWebpackPlugin(
                	PATHS.build, 
                	{root: process.cwd()}
                ),
                new PurifyCSSPlugin({
                	basepath: process.cwd(),
                	paths: [PATHS.app]
                })
			]
		});
		break;
	case 'start': 
		config = merge(common, {
			devtool: 'eval-source-map',
			devServer: {
				historyApiFallback: true,
				hot: true,
				inline: true,
				host: 'localhost',
				port: 8082
			},
			plugins: [
				new webpack.HotModuleReplacementPlugin({
					multiStep: true
				}),
				new DashboardPlugin()
			]
		});
		break;
        case 'test':
            config = merge(common, {
                entry: './test.js',
                output: {
                    path: PATHS.build,
                    filename: '[name].js',
                },
                externals: {
                    'react/addons': true,
                    'react/lib/ExecutionEnvironment': true,
                    'react/lib/ReactContext': true
                },
                devServer: {
                    host: "localhost",
                    port: 8083
                }
            });
            break;
	default:
		config = merge(common, {});
}

module.exports = validate(config);

