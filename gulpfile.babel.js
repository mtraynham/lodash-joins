import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import open from 'open';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import {Server} from 'karma';
import * as webpackConfig from './webpack';

const $ = gulpLoadPlugins();

const wpack = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts, webpack))
        .pipe(gulp.dest(dest));

const karma = (done, options = {}) => {
    const server = new Server(Object.assign({configFile: `${__dirname}/karma.conf.js`}, options));
    // TODO Circumvent 30 second wait
    // https://github.com/karma-runner/karma/issues/1788
    server.on('run_complete', (browsers, results) =>
        done(results.error ? 'There are test failures' : null));
    server.start();
};

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
    wpack.bind(this, 'index.js', webpackConfig.build, 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'],
    wpack.bind(this, 'index.js', webpackConfig.uglify, 'dist/'));

// Mocha Task
gulp.task('mocha', ['lint'], () =>
    gulp.src(['spec/*.js'], {read: false})
        .pipe($.mocha()));

// Karma Task
gulp.task('karma', ['lint'], done =>
    karma(done));

// Karma Debug Task
gulp.task('karma-debug', ['lint'], done =>
    karma(done, {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
    }));

// Coverage Task
gulp.task('coverage', ['lint'], (done) => {
    process.env.NODE_ENV = 'coverage'; // Triggers babel-plugin-istanbul
    return karma(done, {
        reporters: ['mocha', 'coverage']
    });
});

// Coveralls Task
gulp.task('codecov', ['coverage'], () =>
    gulp.src('coverage/lcov.info')
        .pipe($.codecov({token: '855f4b40-9674-40cc-b852-e186c12a7f1d'})));

// Server Task
gulp.task('server', () =>
    new WebpackDevServer(webpack(webpackConfig.debug), {
        publicPath: `/${webpackConfig.debug.output.publicPath}`,
        stats: {colors: true},
        historyApiFallback: {index: `/${webpackConfig.debug.output.publicPath}`}
    }).listen(3000, 'localhost', (err) => {
        if (err) {
            throw new $.util.PluginError('webpack-dev-server', err);
        }
        open(`http://localhost:3000/webpack-dev-server/${webpackConfig.debug.output.publicPath}`);
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
