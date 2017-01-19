import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve, sep} from 'path';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    devtool: 'source-map',
    entry: resolve('./index.js'),
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
        filename: 'lodash-joins.js',
        // Re-export as lodash mixin (_)
        library: '_',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
    },
    plugins: [
        new BannerPlugin({banner, raw: true})
    ],
    module: {
        rules: [
            {test: /\.js$/, enforce: 'pre', loader: 'source-map-loader'},
            {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', loader: 'eslint-loader'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: 'lodash-joins.min.js'
    },
    plugins: [
        new UglifyJsPlugin(),
        new BannerPlugin({banner, raw: true})
    ]
});

export const karma = merge({}, build, {
    devtool: 'inline-source-map',
    output: {
        // Override the library name here since we aren't re-exporting lodash with the tests.
        // This would cause the second test to fail because lodash was overwritten by the first.
        library: 'foobar'
    }
});

export const debug = merge({}, build, {
    cache: true,
    devtool: 'inline-sourcemap',
    entry: resolve('./debug/index.js'),
    output: {
        path: resolve('./test/'),
        publicPath: 'test/',
        pathinfo: true
    },
    plugins: [
        new LoaderOptionsPlugin({debug: true}),
        new HtmlWebpackPlugin({
            port: 3000,
            template: resolve('./debug/index.ejs')
        })
    ]
});
