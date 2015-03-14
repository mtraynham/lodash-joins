var gulp = require('gulp'),
    benchmark = require('gulp-bench'),
    browserify = require('browserify'),
    browserifyShim = require('browserify-shim'),
    bump = require('gulp-bump'),
    coveralls = require('gulp-coveralls'),
    exorcist = require('exorcist'),
    istanbul = require('gulp-istanbul'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'index.js', 'bench/**/*.js', 'lib/**/*.js', 'test/**/*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build', function () {
    var bundler = browserify({
        basedir: __dirname,
        entries: ['./index.js'],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: false
    }).transform(browserifyShim);

    var bundle = function () {
        return bundler
            .bundle()
            .pipe(exorcist('dist/lodash-joins.js.map'))
            .pipe(source('dist/lodash-joins.js'))
            .pipe(gulp.dest('./'))
            .pipe(streamify(uglify()))
            .pipe(rename('dist/lodash-joins.min.js'))
            .pipe(gulp.dest('./'));
    };

    if (global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }
    return bundle();
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
gulp.task('default', ['lint', 'build']);
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
