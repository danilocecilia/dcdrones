const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var helpers = require('./config/helpers');

module.exports = {
    //devtool: 'inline-source-map',
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        //add alias for application code directory
        alias: {
            AppComponent: path.resolve(__dirname, '/src/app/components/main/main'),
            MenuComponent: path.resolve(__dirname, '/src/app/components/menu/menu'),
            BannerComponent: path.resolve(__dirname, '/src/app/components/banner/banner'),
            GalleryComponent: path.resolve(__dirname, '/src/app/components/gallery/gallery'),
            AboutComponent: path.resolve(__dirname, '/src/app/components/about/about'),
            ContactComponent: path.resolve(__dirname, '/src/app/components/contact/contact'),
            FooterComponent: path.resolve(__dirname, '/src/app/components/footer/footer'),
            components: path.resolve(__dirname, '/src/app/components/'),
            pages: path.resolve(__dirname, '/src/app/pages/'),
            css: path.resolve(__dirname, '/src/app/css/'),
            fonts: path.resolve(__dirname, '/src/app/fonts/')
        },
        extensions: ['.ts', '.tsx', '.js', 'html', 'css']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: ['awesome-typescript-loader', 'angular2-template-loader'],
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
        },
        {
            test: /\.(html|css)$/,
            loader: 'raw-loader',
            exclude: /\.async\.(html|css)$/
        },
        {

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
        }],
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src', 'tsconfig.json') }
                    },
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new HtmlWebpackPlugin({
            title: "DC Drones - Filmagem Aérea",
            filename: 'index.html',
            template: './src/app/index.html',
            //template: './src/index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: "lib", filename: "js/lib.bundle.js" }),
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