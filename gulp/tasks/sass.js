const gulp = require('gulp');
const config = require('../config');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const util = require('gulp-util');

let plugins = [
  //fonts(),
  autoprefixer({
    //browsers: ['last 4 versions'],
    add: true,
    grid: true
  }),
  mqpacker({
    sort: sortMediaQueries
  }),
  cssnano({
    zindex: false,
    reduceIdents: false
  })
];

gulp.task('sass', function() {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    //.pipe(plumber())
    .pipe(plumber(function (error) {
      util.log(error.message);
      this.emit('end');
    }))
    .pipe(gulpif(config.isDevelopment, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'nested' // nested, expanded, compact, compressed
    }))
    .pipe(postcss(plugins))
    .pipe(gulpif(config.isDevelopment, sourcemaps.write()))
    //.pipe(gulpif(config.isDevelopment, postcss([fonts()])))
    //.pipe(gulpif(!config.isDevelopment, postcss(plugins)))
    .pipe(gulp.dest(config.dest.css));
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
      return B - A;
  } else if (isMin(a) && isMin(b)) {
      return A - B;
  } else if (isMax(a) && isMin(b)) {
      return 1;
  } else if (isMin(a) && isMax(b)) {
      return -1;
  }

  return 1;
}

let build =  function(gulp) {
  return gulp.series('sass');
};

let watch =  function(gulp) {
  return function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', gulp.series('sass'));
  }
};

module.exports.build = build;
module.exports.watch = watch;
