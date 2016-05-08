var gulp = require('gulp');
var gutil = require('gulp-util');//to print info on cli for debugging
var source = require('vinyl-source-stream');//for throwing text files from one part of build process to another
var browserify = require('browserify');// for figuring out the load order is done  correctly
var watchify = require('watchify');//automatically runs gulpfile when code changes
var reactify = ('reactify');// converts with browserify to convert jsx to js

// do the documentation through videos again
gulp.task('default', function(){
  var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if(file) gutil.log('Recompiling '+ file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./'));
  };
  build();
  bundler.on('update', build);
});
