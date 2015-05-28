var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    isparta = require('isparta'),
    jshintStylish = require('jshint-stylish');

function webpack (src, opts, dest) {
    return gulp.src(src)
        .pipe($.webpack(opts))
        .pipe(gulp.dest(dest));
}

function test () {
    require('babel-core/register');
    return gulp.src(['test/unit/*.js'], {read: false})
        .pipe($.mocha());
}

// Lint Task
gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'index.js', 'bench/**/*.js', 'lib/**/*.js', 'test/**/*.js'])
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
});

// Build Task
gulp.task('build', ['lint'], webpack.bind(this, 'index.js', require('./webpack/build'), 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'], webpack.bind(this, 'index.js', require('./webpack/uglify'), 'dist/'));

// Test Task
gulp.task('test', ['lint'], test.bind(this));

// Coverage Task
gulp.task('coverage', ['lint'], function () {
    require('babel-core/register');
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
    return webpack(['test/**/*.js'], require('./webpack/test'), './.tmp')
        .pipe($.livereload());
});

gulp.task('test-browser', ['test-browser-build'], function () {
    $.livereload.listen({port: 35729, host: 'localhost', start: true});
    gulp.src('test/runner.html')
        .pipe($.open('<%file.path%>'));
    gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['test-browser-build']);
});

// Benchmark Task
gulp.task('benchmark', function () {
    require('babel-core/register');
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

