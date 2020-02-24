import {Config} from 'karma';
import find from 'lodash/find';
import {join} from 'path';
import {Configuration} from 'webpack';

import webpackConfig from './webpack.config';

export default function(config: Config): void {
    config.set({
        browsers: ['ChromeHeadless'],
        client: {clearContext: false},
        coverageIstanbulReporter: {
            dir: join(__dirname, './coverage'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        files: ['./node_modules/lodash/lodash.js', 'test.ts'],
        frameworks: ['jasmine'],
        preprocessors: {'test.ts': ['webpack', 'sourcemap']},
        reporters: ['spec', 'coverage-istanbul'],
        restartOnFileChange: true,
        singleRun: true,
        webpack: find(webpackConfig, ({name}: Configuration) => name === 'karma'),
        webpackMiddleware: {noInfo: true}
    });
}
