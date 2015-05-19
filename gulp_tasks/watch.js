'use strict';

var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

module.exports = function (gulp, opts) {
    gulp.task('watch', function () {
        livereload.listen();

        // we iterate over the config object (opts) and if 
        // a given task has a watch value, we watch the dir
        // and run the given task
        for (var key in opts) {
            if (opts[key].watch) {
                watch(opts[key].watch, function () { gulp.start(key); });
                console.log('watching Dir: ' + opts[key].watch);
            }
        }
    });
};
