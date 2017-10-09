const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',

        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        host: 'localhost',
        port: 8000,

        historyApiFallback: true,
        contentBase: './',

        hot:true
    }
};
