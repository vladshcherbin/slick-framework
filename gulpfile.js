var gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  size = require('gulp-size');

gulp.task('default', ['compile', 'minify']);

gulp.task('watch', function () {
  gulp.watch('src/*.scss', ['compile', 'minify']);
});

gulp.task('compile', function () {
  var compressed = size();
  var gzipped = size({gzip: true});
  gulp.src('src/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(prefix({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
    .pipe(compressed)
    .pipe(gzipped)
    .pipe(notify({
      onLast: true,
      title: 'Compiled',
      message: function () {
        return compressed.prettySize + ' | ' + gzipped.prettySize;
      }
    }));
});

gulp.task('minify', function () {
  var compressed = size();
  var gzipped = size({gzip: true});
  gulp.src('src/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 10
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(prefix('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(rename({
      dirname: '',
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(compressed)
    .pipe(gzipped)
    .pipe(notify({
      onLast: true,
      title: 'Minified',
      message: function () {
        return compressed.prettySize + ' | ' + gzipped.prettySize;
      }
    }));
});