import pkg from './package';
import isArray from 'lodash/lang/isArray';
import merge from 'lodash/object/merge';
import template from 'lodash/string/template';
import {readFileSync} from 'fs';
import {sep} from 'path';
import {optimize, BannerPlugin} from 'webpack';

const banner = template(readFileSync(__dirname + '/LICENSE_BANNER', 'utf8'))({
    pkg: pkg,
    date: new Date()
});

const base = {
    externals: [
        // handle splitting modern lodash paths:
        // import merge from 'lodash/object/merge'; -> _.merge
        (context, request, callback) => {
            if (/^lodash/.test(request)) {
                let paths = request.split(sep);
                return callback(null, {
                    root: ['_'].concat(paths.length > 1 ? [paths[paths.length - 1]] : []),
                    commonJs: request,
                    commonjs2: request,
                    amd: request,
                    toJSON: function () { return request; } // Fixes the source map output (sort of)
                });
            }
            callback();
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
            loader: 'babel-loader?optional[]=runtime'
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
    externals: [{
        'chai': 'chai'
    }],
    output: {
        filename: 'test.js'
    }
}, (a, b) => isArray(a) ? a.concat(b) : void 0);
