import { database, host, password, port, user } from '../../config/configurations';
import mysql from 'mysql';

/**
 * Create MySQL connection to the HostGator website.
 * @return {[type]} [description]
 */
function createConnection() {
    const connection = mysql.createConnection({
        host, user, password, database, port,
    });
    connection.connect();
    return connection;
}

/**
 * Query Runner.
 * @param  {String} query [Targeted query to run on the Database.]
 * @return {Object}       [Repsonse and Error]
 */
function compileQuery(query) {
    return new Promise((resolve, reject) => {
        const connection = createConnection();
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
            return results;
        });
        connection.end();
    });
}

export default compileQuery;
