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
        loaders: [{test: /\.js$/, loader: 'babel-loader'}]
    },
    devtool: 'source-map'
};