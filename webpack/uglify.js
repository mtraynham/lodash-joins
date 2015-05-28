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
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [{test: /\.js$/, loader: 'babel-loader'}]
    }
};