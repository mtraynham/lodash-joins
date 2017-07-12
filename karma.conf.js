import {karma} from './webpack.config';

export default function (config) {
    config.set({
        files: [
            './node_modules/lodash/lodash.js',
            'spec/index.js'
        ],
        browsers: [
            'ChromeHeadless'
        ],
        singleRun: true,
        frameworks: [
            'jasmine'
        ],
        preprocessors: {
            'spec/index.js': ['webpack', 'sourcemap']
        },
        webpack: karma,
        webpackServer: {
            noInfo: true
        },
        reporters: [
            'spec'
        ]
    });
}
