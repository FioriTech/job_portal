import { argv } from 'yargs';
import cond from 'gulp-cond';
import gulp from 'gulp';
import insertLines from 'gulp-insert-lines';

if (argv.prod) {
    process.env.NODE_ENV = 'production';
}

const PROD = process.env.NODE_ENV === 'production';
// Configuration
const src = 'public';
const config = {
    port: 4000,
    paths: {
        html: `${src}/JobPortal.html`,
        baseDir: PROD ? 'build' : 'dist',
    },
};

/**
*
* Copies our index.html file from the app folder to either the dist
* or build folder, depending on the node environment.
* @type {RegExp}
*/
gulp.task('html', () =>
    gulp.src(config.paths.html)
        .pipe(cond(PROD, insertLines({
            before: /<\/head>$/,
            lineBefore: '<link rel="stylesheet" href="bundle.css"/>',
        })))
        .pipe(gulp.dest(config.paths.baseDir)));
