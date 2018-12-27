import compileQuery from '../helper/mySQLConnHelper';
import express from 'express';

const router = express.Router();

router.get('/getAllJobs', (req, res, next) => {
    const query = 'SELECT * FROM `career` WHERE 1';
    compileQuery(query)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            const errorObj = new Error(error.sqlMessage);
            return next(errorObj);
        });
});

export default router;
