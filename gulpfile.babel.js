import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {Instrumenter} from 'isparta';
import webpackStream from 'webpack-stream';
import * as wpack from './webpack';

const $ = gulpLoadPlugins();

const webpack = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts))
        .pipe(gulp.dest(dest));

const test = () =>
    gulp.src(['test/unit/*.js'], {read: false})
        .pipe($.mocha());

const bump = type =>
    gulp.src([
        './bower.json',
        './package.json'
    ])
    .pipe($.bump({type: type}))
    .pipe(gulp.dest('./'));

// Lint Task
gulp.task('lint', () =>
    gulp.src([
        'gulpfile.babel.js',
        'index.js',
        'webpack.js',
        '{bench,lib,test}/**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError()));

// Build Task
gulp.task('build', ['lint'],
    webpack.bind(this, 'index.js', wpack.build, 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'],
    webpack.bind(this, 'index.js', wpack.uglify, 'dist/'));

// Test Task
gulp.task('test', ['lint'],
    test.bind(this));

// Coverage Task
gulp.task('coverage', ['lint'], () =>
    gulp.src(['lib/**/*.js'])
        .pipe($.istanbul({instrumenter: Instrumenter}))
        .pipe($.istanbul.hookRequire())
        .on('finish', () =>
            test()
                .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', () =>
                    gulp.src('coverage/lcov.info')
                        .pipe($.coveralls()))));

// Browser Test Tasks
gulp.task('test-browser-build', ['lint'], () =>
    webpack(['test/**/*.js'], wpack.test, './.tmp')
        .pipe($.livereload()));

gulp.task('test-browser', ['test-browser-build'], () => {
    $.livereload.listen({
        port: 35729,
        host: 'localhost',
        start: true
    });
    gulp.src('test/runner.html')
        .pipe($.open());
    gulp.watch('{lib,test}/**/*.js', ['test-browser-build']);
});

// Benchmark Task
gulp.task('benchmark', () =>
    gulp.src('bench/*.js', {read: false})
        .pipe($.bench()));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);
