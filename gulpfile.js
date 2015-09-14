var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');


gulp.task('default', ['watch']);

gulp.task('production', ['minify-css', 'compress']);

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    return gulp.src('scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', function () {
    gulp.watch('styles/*.css', ['minify-css']);
    gulp.watch('scripts/*.js', ['compress']);
});
