import pkg from './package';
import {readFileSync} from 'fs';
import {merge, template} from 'lodash';
import {optimize, BannerPlugin} from 'webpack';

const date = new Date();

const banner = template(readFileSync(__dirname + '/LICENSE_BANNER', 'utf8'))({
    pkg: pkg,
    date: date,
    year: date.getFullYear()
});

const base = {
    externals: {
        'lodash': {
            root: '_',
            commonJs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        }
    },
    output: {
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
    devtool: 'source-map'
};

export const build = merge({
    entry: './index.js',
    output: {
        filename: 'lodash-joins.js',
        library: '_'
    },
    plugins: [
        new BannerPlugin(banner, {raw: true})
    ]
}, base);

export const uglify = merge({
    entry: './index.js',
    output: {
        filename: 'lodash-joins.min.js',
        library: '_'
    },
    plugins: [
        new optimize.UglifyJsPlugin(),
        new BannerPlugin(banner, {raw: true})
    ]
}, base);

export const test = merge({
    externals: {
        'chai': 'chai',
    },
    output: {
        filename: 'test.js'
    }
}, base);
