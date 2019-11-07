const del = require('del');
const util = require('gulp-util');
const config = require('../config');

let build = function(gulp) {
	return function () {
    return del([
      config.dest.root
    ]).then(function(paths) {
      util.log('Deleted:', util.colors.magenta(paths.join('\n')));
    });
	};
};

module.exports.build = build;
