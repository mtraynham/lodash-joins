var gulp = require('gulp'),
    benchmark = require('gulp-bench'),
    bump = require('gulp-bump'),
    coveralls = require('gulp-coveralls'),
    istanbul = require('gulp-istanbul'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    mocha = require('gulp-mocha'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');

gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'index.js', 'bench/**/*.js', 'lib/**/*.js', 'test/**/*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build', function () {
    return gulp.src('index.js')
        .pipe(gulpWebpack({
            watch: global.isWatching,
            entry: './index.js',
            externals: {
                'lodash': '_'
            },
            output: {
                filename: 'lodash-joins.js',
                library: '_',
                libraryTarget: 'umd'
            },
            module: {
                preLoaders: [{test: /\.js$/, loader: 'source-map-loader'}]
            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglify', function () {
    return gulp.src('index.js')
        .pipe(gulpWebpack({
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
            ]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('test', function () {
    gulp.src(['lib/**/*.js', 'main.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', function () {
                    gulp.src('coverage/lcov.info')
                        .pipe(coveralls());
                });
        });
});

gulp.task('benchmark', function () {
    return gulp.src('bench/*.js', {read: false})
        .pipe(benchmark());
});

gulp.task('setWatch', function () {
    global.isWatching = true;
});

var bumpFn = function (type) {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
};

// Default Task
gulp.task('default', ['lint', 'build', 'uglify']);
gulp.task('watch', ['setWatch', 'lint', 'build']);
gulp.task('bump:major', function () {
    bumpFn('major');
});
gulp.task('bump:minor', function () {
    bumpFn('minor');
});
gulp.task('bump:patch', function () {
    bumpFn('patch');
});
