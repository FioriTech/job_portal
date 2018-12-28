import compileQuery from '../helper/mySQLConnHelper';
import express from 'express';

const router = express.Router();

router.post('/deleteJob', (req, res, next) => {
    const requestBody = req.body;
    const { id } = requestBody;


    const query = 'DELETE FROM `career` WHERE id = ' + id;

    compileQuery(query)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            const errorObj = new Error(error.sqlMessage);
            return next(errorObj);
        });
});

export default router;
