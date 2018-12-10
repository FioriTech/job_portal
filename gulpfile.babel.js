/* eslint-disable no-console */
// Gulp imports
import gulp from 'gulp';
import 'gulp-showhelp';

import runSequence from 'run-sequence';
var requireDir = require('require-dir');
requireDir('./gulpTasks');

// Default task, bundles the entire app and hosts it on an Express server
gulp.task('default', (cb) => {
    runSequence('lint', 'clean','html', 'build', 'startServer', 'watch', cb);
});
