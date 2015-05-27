var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    isparta = require('isparta'),
    jshintStylish = require('jshint-stylish'),
    webpack = require('webpack');

// Lint Task
gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'index.js', 'bench/**/*.js', 'lib/**/*.js', 'test/**/*.js'])
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
});

// Build Task
gulp.task('build', ['lint'], function () {
    return gulp.src('index.js')
        .pipe($.webpack({
            entry: './index.js',
            externals: {
                'lodash': '_'
            },
            output: {
                filename: 'lodash-joins.js',
                library: '_',
                libraryTarget: 'umd',
                devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
            },
            module: {
                preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
                loaders: [{test: /\.js$/, loader: 'babel-loader'}]
            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('dist/'));
});

// Uglify Task
gulp.task('uglify', ['lint'], function () {
    return gulp.src('index.js')
        .pipe($.webpack({
            entry: './index.js',
            externals: {
                'lodash': '_',
            },
            output: {
                filename: 'lodash-joins.min.js',
                library: '_',
                libraryTarget: 'umd'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ],
            module: {
                loaders: [{test: /\.js$/, loader: 'babel-loader'}]
            }
        }))
        .pipe(gulp.dest('dist/'));
});

// Test Tasks
function test() {
    return gulp.src(['test/unit/*.js'], {read: false})
        .pipe($.mocha());
}

gulp.task('test', ['lint'], function () {
    require('babel/register');
    return test();
});

// Coverage Task
gulp.task('coverage', ['lint'], function () {
    require('babel/register');
    return gulp.src(['lib/**/*.js', 'main.js'])
        .pipe($.istanbul({instrumenter: isparta.Instrumenter}))
        .pipe($.istanbul.hookRequire())
        .on('finish', function () {
            return test()
                .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', function () {
                    gulp.src('coverage/lcov.info')
                        .pipe($.coveralls());
                });
        });
});

// Browser Test Tasks
gulp.task('test-browser-build', ['lint'], function () {
    return gulp.src(['test/**/*.js'])
        .pipe($.webpack({
            externals: {
                'chai': 'chai',
                'lodash': '_',
            },
            output: {
                filename: 'test.js',
                devtoolModuleFilenameTemplate: 'webpack:///lodash-joins/[resource-path]'
            },
            module: {
                preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}],
                loaders: [{test: /\.js$/, loader: 'babel-loader'}]
            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('.tmp/'))
        .pipe($.livereload());
});

gulp.task('test-browser', ['test-browser-build'], function () {
    $.livereload.listen({port: 35729, host: 'localhost', start: true});
    gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['test-browser-build']);
});

// Benchmark Task
gulp.task('benchmark', function () {
    require('babel/register');
    return gulp.src('bench/*.js', {read: false})
        .pipe($.bench());
});

// Bump Tasks
function bumpFn (type) {
    return gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({type: type}))
        .pipe(gulp.dest('./'));
}
gulp.task('bump:major', bumpFn.bind(this, 'major'));
gulp.task('bump:minor', bumpFn.bind(this, 'minor'));
gulp.task('bump:patch', bumpFn.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);

