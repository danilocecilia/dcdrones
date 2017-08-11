const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        // add alias for application code directory
        alias: {
            components: path.resolve(__dirname, './src/app/components/'),
            pages: path.resolve(__dirname, './src/app/pages/'),
            css: path.resolve(__dirname, './src/app/css/'),
            fonts: path.resolve(__dirname, './src/app/fonts/')
        },
        extensions: ['.ts', '.tsx', '.js', 'html', 'css']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.scss$/,
            exclude: [/node_modules/],
            loader: ExtractTextPlugin.extract(
                'style',
                'css?sourceMap!sass?sourceMap!postcss')
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
            loader: 'url?limit=100000&name=fonts/[name].[ext]'
        }, {
            test: /\.(png|jpe?g|gif)(\?\S*)?$/,
            loader: 'url?limit=100000&name=images/[name].[ext]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "DC Drones - Filmagem Aérea",
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: "lib", fliname: "js/lib.bundle.js" }),
        new ExtractTextPlugin("[name].css"),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/app/css'),
                to: path.resolve(__dirname, './dist/app/css')
            },
            {
                from: path.resolve(__dirname, './src/app/fonts'),
                to: path.resolve(__dirname, './dist/app/fonts')
            },
            {
                from: path.resolve(__dirname, './src/images'),
                to: path.resolve(__dirname, './dist/images')
            }
        ])],
};