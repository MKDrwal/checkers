var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src('./src/Sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', () => {
    gulp.watch('src/Sass/**/*.scss', (done) => {
        gulp.series(['sass'])(done);
    })
});

gulp.task('default', function (done) {
    gulp.series(['sass', 'watch'])(done);
});