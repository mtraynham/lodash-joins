import {karma} from './webpack';

export default function (config) {
    config.set({
        files: [
            './node_modules/babel-polyfill/browser.js',
            './node_modules/lodash/lodash.js',
            'spec/index.js'
        ],
        browsers: [
            'PhantomJS'
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
