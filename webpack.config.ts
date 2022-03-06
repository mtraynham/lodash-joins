import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve, sep} from 'path';
import {BannerPlugin, Configuration} from 'webpack';
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
        new BannerPlugin({banner, raw: true})
    ],
    externals: [
        // handle splitting modern lodash paths:
        // import merge from 'lodash/merge'; -> _.merge
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({request}, callback: (error: any, result: any) => void): any => {
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
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]`,
        globalObject: 'this'
    }
};

export default [
    {
        ...baseConfiguration,
        name: 'dist-joins',
        mode: 'production',
        devtool: 'source-map',
        entry: {
            joins: resolve(__dirname, './index.ts')
        }
    },
    {
        ...baseConfiguration,
        name: 'dist-lodash-joins',
        mode: 'production',
        devtool: 'source-map',
        entry: {
            [pkg.name]: resolve(__dirname, './index.lodash.ts')
        },
        output: {
            ...baseConfiguration.output,
            library: {
                name: '_', // Re-export as lodash mixin (_)
                type: 'umd',
                export: 'default',
            }
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
                    loader: '@jsdevtools/coverage-istanbul-loader',
                    enforce: 'post',
                    options: {esModules: true}
                }
            ]
        },
        output: {
            ...baseConfiguration.output,
            globalObject: 'self'  // https://github.com/ryanclark/karma-webpack/issues/497
        }
    },
    {
        ...baseConfiguration,
        name: 'debug',
        mode: 'development',
        devtool: 'inline-source-map',
        entry: {
            [pkg.name]: resolve(__dirname, './debug/index.ts')
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
