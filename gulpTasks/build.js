import gulp from 'gulp';
import {argv} from 'yargs';
import webpackConfig from '../webpack.config';
import webpackStream from 'webpack-stream';

if (argv.prod) {
    process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';
// Configuration
const src = 'public';
const config = {
    port: 4000,
    paths: {
        baseDir: PROD ? 'build' : 'dist',
        entry: src + '/CalivaApp.js',
    },
};

// Builds the entire web app into either the dist or build folder, depending on the node environment
gulp.task('build', () => {
    let webpack = {};
    if (PROD) {
        webpack = webpackConfig.prod;
    } else {
        webpack = webpackConfig.dev;
    }

    return gulp.src(config.paths.entry)
    .pipe(webpackStream(webpack))
    .pipe(gulp.dest(config.paths.baseDir));
});
