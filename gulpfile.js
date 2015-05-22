var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('lint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
  return gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('styles', function() {
  return gulp.src(['css/libs/*.css', 'css/main.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css'))
    .pipe(rename('all.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['lint', 'scripts']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({ livereload: true });
});

gulp.task('default', ['lint', 'sass', 'scripts', 'styles', 'watch', 'connect']);
