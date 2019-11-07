const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', ['copy:watch', 'pug:watch', 'sass:watch', 'js:watch']);
