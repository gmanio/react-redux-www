import path from 'path';
import webpack from 'webpack';
import webpackConfigModuleLoader from './webpack.config.moduleLoader';
import ExtractTextPlugin from "extract-text-webpack-plugin";

const webpackOutputPublicPath = '/dist/';

export default {
    devtool: 'eval',
    debug: true,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: webpackOutputPublicPath
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: webpackConfigModuleLoader
    },

    devServer: {
        port: 3000,
        publicPath: webpackOutputPublicPath,
        hot: true,
        inline: true,
        colors: true,
        historyApiFallback: true,
        compress: true,
        quiet: false,
        progress: true
    }
}