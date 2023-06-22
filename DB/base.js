const { Pool } = require('pg');
require('dotenv').config();
// for deployed 
const pool = new Pool({
    connectionString: process.env.DB_URI + "?sslmode=require",
})

// for local 
// let pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DATABASE_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

pool.on('error', (err, client) => {
    console.error('Error:', err);
});
class Base {
    async selectFromDB(query, values) {
        return new Promise((resolve, reject) => {
            pool.query(query, values, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    }
    async selectAllFromDB(query) {
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    }
    async addToDB(query, values) {
        pool.query(query, values, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data insert successful');
        });
    }
    async deleteFromDB(query, values) {
        pool.query(query, values, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data delete successful');
        });
    }
    async updateFromDB(query, values) {
        pool.query(query, values, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data update successful');
        });
    }

}
module.exports = {
    Base
}