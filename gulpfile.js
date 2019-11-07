// Require all tasks in gulp/tasks, including subfolders
// require('require-dir')('./gulp/tasks', {recurse: true});

var gulp = require('gulp');
var config = require('./gulp/config');

function getTaskBuild(task) {
  return require('./gulp/tasks/' + task).build(gulp);
}
function getTaskWatch(task) {
  return require('./gulp/tasks/' + task).watch(gulp);
}

// build tasks
gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('pug', getTaskBuild('pug'));
gulp.task('sass', getTaskBuild('sass'));
gulp.task('js', getTaskBuild('js'));
gulp.task('server', getTaskBuild('server'));

// watch tasks
gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('pug:watch', getTaskWatch('pug'));
gulp.task('sass:watch', getTaskWatch('sass'));
gulp.task('js:watch', getTaskWatch('js'));

function setmodeProd(done) {
  config.setEnv('production');
  config.logEnv();
  done();
}

function setmodeDev(done) {
  config.setEnv('development');
  config.logEnv();
  done();
}

gulp.task('build', gulp.series(setmodeProd, 'clean', 'pug', 'sass', 'js', 'copy'));

gulp.task('build:dev', gulp.series(setmodeDev, 'clean', 'pug', 'sass', 'js', 'copy'));

gulp.task('watch', gulp.parallel('copy:watch', 'pug:watch', 'sass:watch', 'js:watch'));

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));

// NODE_ENV=production gulp build
