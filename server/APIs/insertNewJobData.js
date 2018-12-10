import compileQuery from '../helper/mySQLConnHelper';
import express from 'express';

const router = express.Router();

router.post('/insertNewJobData', (req, res, next) => {
    const requestBody = req.body;
    const {
        jobType, location, jobCode, experience, openings, requirement,
    } = requestBody;

    compileQuery(`INSERT INTO 'career'
        ('job_type', 'location', 'job_code', 'experience', 'openings', 'requirement')
        VALUES ('${jobType}','${location}','${jobCode}','${experience}','${openings}','${requirement}')`)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            const errorObj = new Error(error.sqlMessage);
            return next(errorObj);
        });
});

export default router;
