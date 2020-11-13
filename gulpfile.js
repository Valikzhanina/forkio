const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function style() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css/'));
}

function js() {
  return gulp
    .src('./src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/scripts/'));
}
function img() {
  return gulp
    .src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
}
function watch() {
  gulp.watch('./src/scss/**/*.scss', style).on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', js).on('change', browserSync.reload);
  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp
    .watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}', img)
    .on('change', browserSync.reload);
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

function cleanDist() {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
}

exports.default = watch;
exports.build = gulp.series(cleanDist, gulp.parallel(style, js, img));
