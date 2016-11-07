import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve, sep} from 'path';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    entry: './index.js',
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
        library: '_',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
    },
    devtool: 'source-map',
    plugins: [
        new BannerPlugin(banner, {raw: true})
    ],
    module: {
        preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
        loaders: [
            {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader'}
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: 'lodash-joins.min.js'
    },
    plugins: [
        new UglifyJsPlugin(),
        new BannerPlugin(banner, {raw: true})
    ]
});

export const karma = merge({}, build, {
    devtool: 'inline-source-map',
    output: {
        library: null
    }
});


export const debug = merge({}, build, {
    cache: true,
    debug: true,
    devtool: 'inline-sourcemap',
    entry: './debug/index.js',
    output: {
        path: resolve('./test/'),
        publicPath: 'test/',
        pathinfo: true,
        library: undefined,
        libraryTarget: undefined
    },
    plugins: [
        new HtmlWebpackPlugin({
            port: 3000,
            template: resolve('./debug/index.ejs')
        })
    ]
});
