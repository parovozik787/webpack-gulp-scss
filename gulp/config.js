const util = require('gulp-util');

//const production = util.env.production || util.env.prod || false;
const production = util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;
const destPath = 'build';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let config = {
  env: 'development',
  production: production,
  isDevelopment: isDevelopment,

  src: {
    root: 'src',
    // pug: ['./src/pug/*.pug', './src/pug/**/*.pug'],
    // sass: ['./src/sass/*.{scss,sass}', './src/sass/**/*.{scss,sass}'],
    // js: ['./src/js/*.js', './src/js/**/*.js'],
    pug: 'src/pug',
    sass: 'src/sass',
    js: 'src/js',
    img: 'src/img',
    fonts: 'src/fonts',
    libs: 'src/libs'
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/img',
    fonts: destPath + '/fonts',
    libs: destPath + '/libs'
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    util.log(
      'Environment:',
      util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
    );
  },

  setSt: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
