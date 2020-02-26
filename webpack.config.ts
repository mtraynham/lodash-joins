import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve, sep} from 'path';
import {BannerPlugin, Configuration} from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const pkg: {name: string} = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
const banner: string = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

const baseConfiguration: Partial<Configuration> = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new BannerPlugin({banner, raw: true}),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({eslint: true})
    ],
    externals: [
        // handle splitting modern lodash paths:
        // import merge from 'lodash/merge'; -> _.merge
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (context: any, request: any, callback: (error: any, result: any) => void): any => {
            if (/^lodash/.test(request)) {
                const paths = request.split(sep);
                return callback(null, {
                    root: ['_'].concat(paths.length > 1 ? [paths[paths.length - 1]] : []),
                    commonjs: request,
                    commonjs2: request,
                    amd: request,
                    toJSON: () => request // Fixes the source map output (sort of)
                });
            }
            return callback(undefined, undefined);
        }
    ],
    output: {
        filename: '[name].js',
        library: '_', // Re-export as lodash mixin (_)
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]`,
        globalObject: 'this'
    }
};

export default [
    {
        ...baseConfiguration,
        name: 'dist',
        mode: 'production',
        devtool: 'source-map',
        entry: {
            [pkg.name]: resolve(__dirname, './index.ts')
        }
    },
    {
        ...baseConfiguration,
        name: 'karma',
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            ...baseConfiguration.module,
            rules: [
                ...baseConfiguration.module.rules,
                {
                    test: /\.(js|ts)$/,
                    exclude: /(node_modules|\.spec\.(js|ts)$)/,
                    loader: 'istanbul-instrumenter-loader',
                    enforce: 'post',
                    options: {esModules: true}
                }
            ]
        }
    },
    {
        ...baseConfiguration,
        name: 'debug',
        mode: 'development',
        devtool: 'inline-source-map',
        entry: {
            [pkg.name]: resolve(__dirname, './debug/index.js')
        },
        plugins: [
            ...baseConfiguration.plugins,
            new HtmlWebpackPlugin({
                title: 'Debug',
                template: resolve(__dirname, './debug/index.ejs')
            })
        ]
    }
] as Configuration[];
