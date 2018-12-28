import compileQuery from '../helper/mySQLConnHelper';
import express from 'express';

const router = express.Router();

router.post('/editJobData', (req, res, next) => {
    const requestBody = req.body;
    const {
        id, jobType, location, jobCode, experience, openings, requirement,
    } = requestBody;

    const query = 'UPDATE `career` SET `job_type`="'+ jobType +'",`location`="'+ location +'",`job_code`="'+ jobCode +'",`experience`="'+ experience +'",`openings`='+ openings +',`requirement`="'+ requirement +'" WHERE `id`=' + id;

    console.log(query);

    compileQuery(query)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            const errorObj = new Error(error.sqlMessage);
            return next(errorObj);
        });
});

export default router;
