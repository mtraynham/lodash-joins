var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    externals: {
        'lodash': {
            root: '_',
            commonJs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        }
    },
    output: {
        filename: 'lodash-joins.min.js',
        library: '_',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
    },
    module: {
        preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?optional[]=runtime'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(require('./banner'), {raw: true})
    ],
    devtool: 'source-map'
};
