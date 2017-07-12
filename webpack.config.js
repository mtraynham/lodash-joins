import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve, sep} from 'path';
import {strategy} from 'webpack-merge';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';

const merge = strategy(({plugins: 'replace'}));

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    devtool: 'source-map',
    entry: {
        [pkg.name]: resolve('./index.js')
    },
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
        filename: '[name].js',
        // Re-export as lodash mixin (_)
        library: '_',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]`
    },
    plugins: [
        new BannerPlugin({banner, raw: true})
    ],
    module: {
        rules: [
            {test: /\.js$/, enforce: 'pre', use: 'source-map-loader'},
            {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', use: 'eslint-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: '[name].min.js'
    },
    plugins: [
        new UglifyJsPlugin({sourceMap: true}),
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
    devtool: 'inline-source-map',
    entry: {
        [pkg.name]: resolve('./debug/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            port: 3000,
            template: resolve('./debug/index.ejs')
        })
    ]
});
