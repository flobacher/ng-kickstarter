'use strict';

var gulp        = require('gulp'),
    parseArgs   = require('minimist'),
    buildConfig = require('./.buildconfig'),
    pkg         = require('./package.json')
;

var assetsSrc   = buildConfig.dirs.src.root + '/',
    assetsDest  = buildConfig.dirs.dist.root + '/'
;

require('gulp-load-params')(gulp, {taskPath: 'gulp_tasks'});

var options = {
    prod: parseArgs('prod'),
    sass: {
        watch:  assetsSrc + buildConfig.dirs.src.scss + '/**/*.scss',
        src:    assetsSrc + buildConfig.dirs.src.scss + '/' + buildConfig.names.css +'.scss',
        dest:   assetsDest + buildConfig.dirs.dist.css + '/'
    },
    scripts: {
        watch:  assetsSrc + buildConfig.dirs.src.js + '/**/*.js',
        src:    assetsSrc + buildConfig.dirs.src.js + '/' + buildConfig.names.js + '.js',
        dest:   assetsDest + buildConfig.dirs.dist.js + '/'
    },
    svgs: {
        watch:  assetsSrc + buildConfig.dirs.src.svg + '/' + buildConfig.dirs.src.ss + '/**/*.svg',
        src:    assetsSrc + buildConfig.dirs.src.svg + '/' + buildConfig.dirs.src.ss + '/**/*.svg',
        dest:   assetsDest + buildConfig.dirs.dist.img + '/'
    },
    html: {
        watch:  assetsSrc + buildConfig.dirs.src.html + '/**/*.html',
        src:    assetsSrc + buildConfig.dirs.src.html + '/**/*.html',
        dest:   assetsDest + '/'
    },
    dirs:   buildConfig.dirs.dist,
    tmp:    buildConfig.dirs.tmp,
    names:  buildConfig.names,
    ext:    buildConfig.ext,
    content: {
        title:  pkg.title,
        desc:   pkg.desc
    },
    svgsprite: buildConfig.svgsprite
};

//use view-mode for stylesheet creation
options.names.svgss = buildConfig.names.svgssview;
options.svgsprite.mode.view.render.scss.dest = '../../' + buildConfig.dirs.tmp.root + '/' + buildConfig.dirs.tmp.scss + '/' + '_' + buildConfig.names.svgssview + '.scss';
options.svgsprite.mode.view.dest = assetsDest + buildConfig.dirs.dist.css + '/';
options.svgsprite.mode.view.sprite = '../' + buildConfig.dirs.dist.img + '/' + buildConfig.dirs.dist.ss + '/' + buildConfig.names.svgssview + '.svg',

gulp.loadTasks(__dirname, options);

gulp.task('default', ['svgs', 'sass', 'scripts', 'html']);
gulp.task('dev', ['default', 'watch']);
