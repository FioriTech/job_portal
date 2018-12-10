import gulp from 'gulp';
import runSequence from 'run-sequence';

// Re-runs specific tasks when certain files are changed
gulp.task('watch', () => {
    gulp.watch('./public/**/*.jsx', () => {
        runSequence('lint');
    });
});
