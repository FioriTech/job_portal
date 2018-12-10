import eslint from 'gulp-eslint';
import gulp from 'gulp';

// Linting
gulp.task('lint', () => {
    return gulp.src('../src/**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format());
});
