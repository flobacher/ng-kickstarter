'use strict';

var util        = require('gulp-util'),
    livereload  = require('gulp-livereload'),
    extractor  = require('extract-svg-styles').stream,
    rsp         = require('remove-svg-properties').stream,
    svgSprite   = require('gulp-svg-sprite'),
    svg2png     = require('gulp-svg2png')
;

module.exports = function (gulp, opts) {
    if (!opts.svgs) return;

    gulp.task('svgs', function() {
        return gulp.src(opts.svgs.src)
            .pipe(
                extractor.extract({
                    styleDest: opts.tmp.root + '/' + opts.tmp.scss + '/' + opts.tmp.sprites + '/',
                    extension: 'scss',
                    classPrefix: '',
                    idHandling: 'class'
                })
            )
            //.pipe(gulp.dest(opts.tmp.root + '/' + opts.tmp.svgns + '/'))
            .pipe(
                rsp.remove({
                    stylesheets: false,
                    properties: [rsp.PROPS_STROKE, rsp.PROPS_FILL],
                    namespaces: ['i', 'sketch', 'inkscape']
                })
            )
            //.pipe(gulp.dest(opts.tmp.root + '/' + opts.tmp.svgnsnoinlinestyle + '/'))
            .pipe(
                svgSprite(opts.svgsprite)
            )
            .pipe(gulp.dest('./'))
            .on('end', function () {
                // generate png fallbacks
                gulp.src(opts.svgs.dest + '**/*.svg')
                    .pipe(svg2png())
                    .pipe(gulp.dest(opts.svgs.dest))
                    .pipe(livereload())
                ;
            })
        ;


    });
};
