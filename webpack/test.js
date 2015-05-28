module.exports = {
    externals: {
        'chai': 'chai',
        'lodash': '_',
    },
    output: {
        filename: 'test.js',
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
    devtool: 'source-map'
};
