/*global require*/
(function (r) {
    "use strict";
    var sass = r("gulp-sass");
    var gulp = r("gulp");
    var sourcemaps = require('gulp-sourcemaps');
    var connect = require('gulp-connect');

    gulp.task('default', ['watch','connect']);

    gulp.task('connect', function () {
        connect.server({
            root: 'app',
            livereload: true
        });
    });

    gulp.task('build-css', function () {
        return gulp.src('app/source/sass/*.sass')
            .pipe(sourcemaps.init())  // Process the original sources
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write()) // Add the map to modified source.
            .pipe(gulp.dest('app/assets/stylesheets'))
            .pipe(connect.reload());
    });

    gulp.task('build-js', function () {
        return gulp.src('app/source/javascript/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            //only uglify if gulp is ran with '--type production'
            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('app/assets/javascript'))
            .pipe(connect.reload());
    });

    gulp.task('html', function () {
        gulp.src('app/*.html')
            .pipe(gulp.dest('app'))
            .pipe(connect.reload());
    });
    gulp.task('watch', function () {
        gulp.watch('app/source/javascript/**/*.js', ['build-js']);
        gulp.watch('app/source/sass/**/*.sass', ['build-css']);
        gulp.watch(['./app/*.html'], ['html']);
    });
}(require));