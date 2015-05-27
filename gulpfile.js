var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    isparta = require('isparta'),
    jshintStylish = require('jshint-stylish'),
    webpack = require('webpack');

gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'index.js', 'bench/**/*.js', 'lib/**/*.js', 'test/**/*.js'])
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
});

gulp.task('build', function () {
    return gulp.src('index.js')
        .pipe($.webpack({
            watch: global.isWatching,
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

gulp.task('uglify', function () {
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

gulp.task('test', function () {
    require('babel/register');
    return gulp.src(['lib/**/*.js', 'main.js'])
        .pipe($.istanbul({instrumenter: isparta.Instrumenter}))
        .pipe($.istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/*.js'], {read: false})
                .pipe($.mocha())
                .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', function () {
                    gulp.src('coverage/lcov.info')
                        .pipe($.coveralls());
                });
        });
});

gulp.task('benchmark', function () {
    require('babel/register');
    return gulp.src('bench/*.js', {read: false})
        .pipe($.bench());
});

gulp.task('setWatch', function () {
    global.isWatching = true;
});

function bumpFn (type) {
    return gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({type: type}))
        .pipe(gulp.dest('./'));
}

// Default Task
gulp.task('default', ['lint', 'build', 'uglify']);
gulp.task('watch', ['setWatch', 'lint', 'build']);
gulp.task('bump:major', bumpFn.bind(this, 'major'));
gulp.task('bump:minor', bumpFn.bind(this, 'minor'));
gulp.task('bump:patch', bumpFn.bind(this, 'patch'));
