const gulp = require('gulp');
const config = require('../config');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const util = require('gulp-util');

gulp.task('js', function() {
  return gulp
    .src(config.src.js + '/*.js')
    //.pipe(plumber())
    .pipe(plumber(function (error) {
      util.log(error.message);
      this.emit('end');
    }))
    .pipe(gulpif(config.isDevelopment, sourcemaps.init()))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulpif(config.isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.js));
});

let build =  function(gulp) {
  return gulp.series('js');
};

let watch =  function(gulp) {
  return function() {
    gulp.watch(config.src.js + '/**/*.js', gulp.series('js'));
  }
};

module.exports.build = build;
module.exports.watch = watch;
