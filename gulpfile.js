var gulp = require('gulp'),
    browserify = require('browserify'),
    bump = require('gulp-bump'),
    fs = require('vinyl-fs'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    // karma = require('gulp-karma'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

gulp.task('lint', function () {
    return fs
        .src(['gulpfile.js', 'index.js', 'lib/*.js', 'test/*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build', function () {
    var bundler = browserify({
        basedir: __dirname,
        entries: ['./index.js'],
        extensions: ['.js'],
        debug: global.isDevelopment ? false : true,
        cache: {},
        packageCache: {},
        fullPaths: false
    });

    var bundle = function () {
        return bundler
            .bundle()
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

});

gulp.task('setWatch', function () {
    global.isWatching = true;
});

gulp.task('setDevelopment', function () {
    global.isDevelopment = true;
});

var bumpFn = function (type) {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
};

// Default Task
gulp.task('default', ['setDevelopment', 'lint', 'build']);
gulp.task('watch', ['setDevelopment', 'setWatch', 'lint', 'build']);
gulp.task('release', ['lint', 'build']);
gulp.task('bump:major', function () {
    bumpFn('major');
});
gulp.task('bump:minor', function () {
    bumpFn('minor');
});
gulp.task('bump:patch', function () {
    bumpFn('patch');
});