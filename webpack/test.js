module.exports = {
    externals: {
        'chai': 'chai',
        'lodash': {
            root: '_',
            commonJs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        }
    },
    output: {
        libraryTarget: 'umd',
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
