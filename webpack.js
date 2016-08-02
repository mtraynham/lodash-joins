import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, sep} from 'path';
import {optimize, BannerPlugin} from 'webpack';
import pkg from './package';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

const base = {
    externals: [
        // handle splitting modern lodash paths:
        // import merge from 'lodash/merge'; -> _.merge
        (context, request, callback) => {
            if (/^lodash/.test(request)) {
                const paths = request.split(sep);
                return callback(null, {
                    root: ['_'].concat(paths.length > 1 ? [paths[paths.length - 1]] : []),
                    commonJs: request,
                    commonjs2: request,
                    amd: request,
                    toJSON: () => request // Fixes the source map output (sort of)
                });
            }
            return callback();
        }
    ],
    output: {
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
    },
    module: {
        preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map'
};

export const build = merge({}, base, {
    entry: './index.js',
    output: {
        filename: 'lodash-joins.js',
        library: '_'
    },
    plugins: [
        new BannerPlugin(banner, {raw: true})
    ]
});

export const uglify = merge({}, base, {
    entry: './index.js',
    output: {
        filename: 'lodash-joins.min.js',
        library: '_'
    },
    plugins: [
        new optimize.UglifyJsPlugin(),
        new BannerPlugin(banner, {raw: true})
    ]
});

export const test = merge({}, base, {
    output: {
        filename: 'test.js'
    }
}, (a, b) => {
    if (isArray(a)) {
        return a.concat(b);
    }
    return undefined;
});
