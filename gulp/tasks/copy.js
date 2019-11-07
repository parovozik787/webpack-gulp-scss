const gulp = require('gulp');
const config = require('../config.js');
const imagemin = require('gulp-imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const newer = require('gulp-newer');

gulp.task('copy:img', function () {
  return gulp
    // .src([
    //     config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
    //     '!' + config.src.img + '/svgo/**/*.*'
    // ])
    .src(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      }),
      imageminJpegRecompress({quality: 'medium'}), // low, medium, high and veryhigh.
      imageminPngquant({quality: [0.7, 0.8]})
    ], {verbose: false}))
    .pipe(gulp.dest(config.dest.img));
});

// gulp.task('copy:fonts', function () {
//   return gulp
//     .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
//     .pipe(gulp.dest(config.dest.fonts));
// });

gulp.task('copy:libs', function () {
  return gulp
    .src(config.src.libs + '/**/*.*')
    .pipe(newer(config.dest.libs))
    .pipe(gulp.dest(config.dest.libs));
});

// gulp.task('copy:rootfiles', function () {
//   return gulp
//     .src(config.src.root + '/*.*')
//     .pipe(gulp.dest(config.dest.root));
// });

let build =  function(gulp) {
  return gulp.series('copy:img', 'copy:libs');
};

let watch =  function(gulp) {
  return function() {
    return gulp.watch(config.src.img + '/*', gulp.series('copy:img'));
  }
};

module.exports.build = build;
module.exports.watch = watch;
