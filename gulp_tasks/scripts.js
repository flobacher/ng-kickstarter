'use strict';

var util        = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    browserify  = require('gulp-browserify'),
    rename          = require('gulp-rename'),
    gulpIgnore      = require('gulp-ignore'),
    livereload  = require('gulp-livereload')
;

var sourcemapfiles = '*.map';

module.exports = function (gulp, opts) {
    if (!opts.scripts) return;

    gulp.task('scripts', ['jshint', 'jscs'], function() {
        return gulp.src(opts.scripts.src)
            .pipe(browserify({
                //insertGlobals : true,
                debug: true
                /*shim: {
                    'svg-injector': {
                        path: './node_modules/svg-injector/svg-injector.js',
                        //exports: 'SVGInjector'
                    }
                }*/
            }))
            .on('error', util.log)
            .pipe(gulp.dest(opts.scripts.dest))
            .pipe(gulpIgnore.exclude(sourcemapfiles))
            .pipe(
                uglify({
                    sourceMap: false,
                    compress: true,
                    mangle: true,
                    beautify: false
                })
            )
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(opts.scripts.dest))
            .pipe(livereload());
    });
};
