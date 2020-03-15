const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', ['copy:watch', 'pug:watch', 'scss:watch', 'js:watch']);
