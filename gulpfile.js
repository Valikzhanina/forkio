const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const paths = {
  style: './src/scss/**/*.scss',
  js: './src/scripts/**/*.js',
  img: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
};

function style() {
  return gulp
    .src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css/'));
}

function js() {
  return gulp
    .src(paths.js)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/scripts/'));
}
function img() {
  return gulp.src(paths.img).pipe(imagemin()).pipe(gulp.dest('./dist/img/'));
}
function watch() {
  gulp.watch(paths.style, style).on('change', browserSync.reload);
  gulp.watch(paths.js, js).on('change', browserSync.reload);
  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch(paths.img, img).on('change', browserSync.reload);
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
