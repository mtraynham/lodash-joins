var gulp = require('gulp'),
    browserify = require('browserify'),
    bump = require('gulp-bump'),
    fs = require('vinyl-fs'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

gulp.task('lint', function () {
    return fs
        .src(['src/*.js', 'gulpfile.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('build', function () {
    var bundler = browserify({
        basedir: __dirname,
        entries: ['./src/index.js'], // TODO SHOULD BE index.jsx
        extensions: ['.js'],
        debug: global.isDevelopment ? true : false,
        cache: {},
        packageCache: {},
        fullPaths: false
    });

    var bundle = function () {
        return bundler
            .bundle()
            .pipe(source('lodash-joins.js'))
            .pipe(gulp.dest('./'))
            .pipe(streamify(uglify()))
            .pipe(rename('lodash-joins.min.js'))
            .pipe(gulp.dest('./'));
    };

    if (global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }
    return bundle();
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