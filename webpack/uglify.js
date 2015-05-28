var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    externals: {
        'lodash': '_',
    },
    output: {
        filename: 'lodash-joins.min.js',
        library: '_',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(require('./banner'), {raw: true})
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?optional[]=runtime'
        }]
    }
};