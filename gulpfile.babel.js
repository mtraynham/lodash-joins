import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import open from 'open';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import {Server} from 'karma';
import * as webpackConfig from './webpack';

const $ = gulpLoadPlugins();
const debugHost = '0.0.0.0';
const debugPort = 3000;
const debugPath = '';

/**
 * Run a webpack build
 * @param {String} src
 * @param {Object} opts
 * @param {String} dest
 * @returns {void}
 */
const webpackBuild = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts, webpack))
        .pipe(gulp.dest(dest));

/**
 * Run karma
 * @param {Object} options
 * @param {Function} [done]
 * @returns {void}
 */
function karma (options, done) {
    const server = new Server(Object.assign({configFile: `${__dirname}/karma.conf.js`}, options));
    // TODO Upstream: Circumvent 30 second wait
    // https://github.com/karma-runner/karma/issues/1788
    if (done) {
        server.on('run_complete', (browsers, results) =>
            done(results.error ? 'There are test failures' : null));
    }
    return server.start();
}

const bump = type =>
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({type}))
        .pipe(gulp.dest('./'));

// Lint Task
gulp.task('lint', () =>
    gulp.src(['gulpfile.babel.js', 'index.js', 'webpack.js', '{lib,spec}/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError()));

// Build Task
gulp.task('build', ['lint'],
    webpackBuild.bind(this, 'index.js', webpackConfig.build, 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'],
    webpackBuild.bind(this, 'index.js', webpackConfig.uglify, 'dist/'));

// Jasmine Task
gulp.task('jasmine', ['lint'], () =>
    gulp.src(['spec/*.spec.js'])
        .pipe($.jasmine()));

// Karma Task
gulp.task('karma', ['lint'],
    karma.bind(this, {}));

// Karma Debug Task
gulp.task('karma-debug', ['lint'],
    karma.bind(this, {
        reporters: ['spec', 'kjhtml'],
        autoWatch: true,
        singleRun: false
    }, null));

// Karma Coverage Task
gulp.task('karma-coverage', ['lint'], (done) => {
    process.env.NODE_ENV = 'coverage'; // Triggers babel-plugin-istanbul
    return karma({
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'text'},
                {type: 'html', subdir: 'html'},
                {type: 'lcovonly', subdir: '.'}
            ]
        }
    }, done);
});

// Coveralls Task
gulp.task('codecov', ['karma-coverage'], () =>
    gulp.src('coverage/lcov.info')
        .pipe($.codecov({token: '855f4b40-9674-40cc-b852-e186c12a7f1d'})));

// Server Task
gulp.task('server', () =>
    new WebpackDevServer(webpack(webpackConfig.debug), {
        stats: {colors: true}
    }).listen(debugPort, debugHost, (error) => {
        if (error) {
            throw new $.util.PluginError('webpack-dev-server', error);
        }
        open(`http://${debugHost}:${debugPort}/webpack-dev-server/${debugPath}`);
    }));

// Benchmark Task
gulp.task('benchmark', () =>
    gulp.src('bench/*.js', {read: false})
        .pipe($.benchmark()));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);
