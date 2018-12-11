import del from 'del';
import gulp from 'gulp';

// Clears the contents of the dist and build folder
gulp.task('clean', () => del(['dist/**/*', 'build/**/*']));
