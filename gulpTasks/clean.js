import gulp from 'gulp';
import del from 'del';

// Clears the contents of the dist and build folder
gulp.task('clean', () => {
    return del(['dist/**/*', 'build/**/*']);
});
