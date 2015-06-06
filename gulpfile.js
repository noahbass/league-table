var gulp       = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpBower  = require('gulp-bower');

/*
 * Run `bower install`
 */
gulp.task('bower', function() {
    return gulpBower();
});


/*
 * Concat and uglify javascript
 */
gulp.task('js', function() {
    return gulp.src([
            './bower_components/angular/angular.min.js',
            './bower_components/angular-route/angular-route.min.js',
            './public/js/app.js',
            './public/js/factories/*',
            './public/js/controllers/*'
        ])
        .pipe(gulpConcat('all.js'))
        .pipe(gulp.dest('./public/dist'));
});
