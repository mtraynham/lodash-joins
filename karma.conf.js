import {karma} from './webpack';

export default function (config) {
    config.set({
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/lodash/lodash.js',
            'spec/**/*.js'
        ],
        plugins: [
            'karma-chai',
            'karma-coverage',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],
        browsers: [
            'PhantomJS'
        ],
        singleRun: true,
        frameworks: [
            'mocha'
        ],
        preprocessors: {
            'spec/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: karma,
        webpackServer: {
            noInfo: true
        },
        reporters: [
            'mocha'
        ],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'text'},
                {type: 'html', subdir: 'html'},
                {type: 'lcovonly', subdir: '.'}
            ]
        }
    });
}
