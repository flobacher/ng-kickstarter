'use strict';

var sass            = require('gulp-sass'),
    livereload      = require('gulp-livereload'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    gulpIgnore      = require('gulp-ignore')
;

var sourcemapfiles = '*.map';

module.exports = function (gulp, opts) {
    if (!opts.sass) return;

    gulp.task('sass', ['svgs'], function() {

        return gulp.src(opts.sass.src)
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    outputStyle: 'expanded'
                })
            )
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: true,
                remove: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(opts.sass.dest))
            .pipe(gulpIgnore.exclude(sourcemapfiles))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(opts.sass.dest))
            .pipe(livereload())
        ;

    });
};
