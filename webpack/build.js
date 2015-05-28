module.exports = {
    entry: './index.js',
    externals: {
        'lodash': '_'
    },
    output: {
        filename: 'lodash-joins.js',
        library: '_',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
    },
    module: {
        preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
        loaders: [{test: /\.js$/, loader: 'babel-loader'}]
    },
    devtool: 'source-map'
};