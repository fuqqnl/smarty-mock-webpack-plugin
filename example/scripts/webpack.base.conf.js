/**
 * @file webpack base config
 */

 const path = require('path');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 const isProduction = process.env.NODE_ENV === 'production';

 module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.less']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isProduction ? true : false,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor'
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        })
    ]
 };
