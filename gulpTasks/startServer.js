/* eslint-disable no-console */
import { argv } from 'yargs';
import bodyParser from 'body-parser';
import compression from 'compression';
import deleteJob from '../server/APIs/deleteJob.js';
import editJobData from '../server/APIs/editJobData.js';
import express from 'express';
import getAllJobsRoutes from '../server/APIs/getAllJobs.js';
import gulp from 'gulp';
import insertNewJobDataRoutes from '../server/APIs/insertNewJobData.js';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
    process.env.NODE_ENV = 'production';
}

const PROD = process.env.NODE_ENV === 'production';

// Running server.
gulp.task('startServer', () => {
    const app = express();
    let compiler = {};

    if (PROD) {
        compiler = webpack(webpackConfig.prod);
    } else {
        compiler = webpack(webpackConfig.dev);
    }

    const port = 8080;
    const baseDir = PROD ? 'build' : 'dist';

    if (PROD) {
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true, publicPath: webpackConfig.prod.output.publicPath,
        }));
        app.use(require('webpack-hot-middleware')(compiler));
        app.use(compression());
    }
    else {
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true, publicPath: webpackConfig.dev.output.publicPath,
        }));
        app.use(require('webpack-hot-middleware')(compiler));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Opening up API ports.
    app.use('/api', getAllJobsRoutes);
    app.use('/api', deleteJob);
    app.use('/api', insertNewJobDataRoutes);
    app.use('/api', editJobData);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', baseDir, '/JobPortal.html'));
    });

    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    /* eslint-disable no-unused-vars */
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.send({
            message: error.message || 'Internal Server Error',
            code: error.status,
        });
    });

    app.listen(port, () => {
        console.log('Listening on 8080...');
    });
});
