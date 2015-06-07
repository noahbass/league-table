/**
 * gulpfile.js
 */

var gulp      = require('gulp'),
    concatJS  = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    bower     = require('gulp-bower'),
    concatCSS = require('gulp-concat-css'),
    minify    = require('gulp-minify-css'),
    nodemon   = require('gulp-nodemon');

var dist = './public/dist';

/**
 * bower task: run `bower install`
 */
gulp.task('bower', function() {
    return bower();
});


/**
 * js task: concat and uglify javascript
 */
gulp.task('js', ['bower'], function() {
    return gulp.src([
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './public/js/app.js',
        './public/js/factories/*',
        './public/js/controllers/*'
    ])
    .pipe(concatJS('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist));
});


/**
 * css task: concat and minify CSS
 */
gulp.task('css', ['bower'], function() {
    return gulp.src([
        './bower_components/bootswatch/flatly/bootstrap.css',
        './public/assets/css/style.css'
    ])
    .pipe(concatCSS('all.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(dist));
});


/**
 * nodemon task: run nodemon and watch for asset changes
 */
gulp.task('nodemon', function() {
    nodemon({
        script: './bin/www'
    });

    gulp.watch([
        './public/js/**/*.js',
        './public/assets/js/**/*.js'
    ], ['js']);
    gulp.watch('./public/assets/css/**/*.css', ['css']);
});


/**
 * default task: build js and css, then run nodemon to watch
 */
gulp.task('default', [
    'bower',
    'js',
    'css',
    'nodemon'
]);


/**
 * build task: build js and css
 */
gulp.task('build', [
    'bower',
    'js',
    'css'
]);
