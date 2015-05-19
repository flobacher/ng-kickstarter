'use strict';

var util = require('gulp-util');
var jscs = require('gulp-jscs');

module.exports = function (gulp, opts) {
    if (!opts.scripts) return;

    gulp.task('jscs', function () {
        return gulp.src(opts.scripts.src)
            .pipe(jscs())
            .on('error', util.log);
    });
};
