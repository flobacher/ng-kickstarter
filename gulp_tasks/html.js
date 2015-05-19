'use strict';

var util        = require('gulp-util'),
    swig        = require('gulp-swig'),
    htmlhint    = require('gulp-htmlhint'),
    htmlmin     = require('gulp-htmlmin'),
    rename      = require('gulp-rename'),
    livereload  = require('gulp-livereload')
;


module.exports = function (gulp, opts) {
    if (!opts.html) return;

    gulp.task('html', function() {
        return gulp.src(opts.html.src)
            .pipe(
                swig({
                    defaults:{
                        cache:false,
                        varControls: ['<%=', '=%>'],
                        tagControls: ['<%', '%>'],
                        cmtControls: ['<#', '#>']
                    },
                    data: {
                        debug:      true,
                        content:    opts.content,
                        dirs:       opts.dirs,
                        exts:       opts.ext.debug,
                        names:      opts.names
                    }
                }
            ))
            .pipe(htmlhint())
            .pipe(htmlhint.reporter())
            .pipe(rename({suffix: '-dbg', extname: '.htm'}))
            .pipe(gulp.dest(opts.html.dest))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(
                rename(function (path) {
                    path.basename = path.basename.replace('-dbg', '');
                    path.extname = '.htm';
                })
            )
            .pipe(gulp.dest(opts.html.dest))
            .pipe(livereload());
    });
};
