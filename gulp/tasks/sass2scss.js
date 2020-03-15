#!/usr/bin/env node

var vfs = require('vinyl-fs'),
  fs = require('fs'),
  path = require('path'),
  converter = require('sass-convert'),
  version = require('./package.json').version,
  program = require('commander');

program
  .version(version)
  .usage('[options] <file>')
  //.option('-t, --type [json]', 'add file type', 'json')
  .parse(process.argv);

var file = program.args[0] || '';
//var type = program.type;
//var fileType = mime.lookup(file);

if (!file) {
  console.error('Please specify file!');
  process.exit(1);
}

fs.stat(file, function (err, stat) {
  if (err) {
    console.err('Error reading file stats, probably not a valid path: ', err);
    process.exit(1);
  }

  var c = converter({
    from: 'sass',
    to: 'scss',
    rename: true,
  });

  if (stat.isDirectory()) {
    console.log('Handling directory ' + file);

    vfs.src(file + '/**/*.sass')
      .pipe(c)
      .pipe(vfs.dest(file));
  } else if (stat.isFile()) {
    var ext = path.extname(file);
    if(ext !== '' && '.sass' !== ext) {
      console.error('Given file is not a scss file!');
      process.exit(1);
    }

    console.log('Handling file ' + file);

    vfs.src(file)
      .pipe(c)
      .pipe(vfs.dest(path.dirname(file)));
  }
});
