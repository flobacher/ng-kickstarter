'use strict';

var util = require('gulp-util');
var jshint = require('gulp-jshint');

var reporter = require('jshint-stylish');

module.exports = function (gulp, opts) {
    if (!opts.scripts) return;

    gulp.task('jshint', function () {
        return gulp.src(opts.scripts.src)
            .pipe(jshint())
            .on('error', util.log)
            .pipe(jshint.reporter(reporter));
    });
};
