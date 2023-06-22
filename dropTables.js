const { Pool } = require("pg");
require('dotenv').config();

// for deployed 
// const pool = new Pool({
//     connectionString: process.env.DB_URI + "?sslmode=require",
// })

// for local 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/**************************************************************/
//drop booking
// pool.query('DROP TABLE booking', (err, res) => {
//   if (err) {
//       console.error(err)
//       return
//   }
//   console.log('booking table dropped successfully!')
// })

/****************************************************************/
//drop schedules
// pool.query('DROP TABLE schedules', (err, res) => {
//   if (err) {
//       console.error(err)
//       return
//   }
//   console.log('schedules table dropped successfully!')
// })

/****************************************************************/
// drop rates
// pool.query('DROP TABLE rates', (err, res) => {
//   if (err) {
//       console.error(err)
//       return
//   }
//   console.log('rates table dropped successfully!')
// })

/****************************************************************/
// drop doctor
// pool.query('DROP TABLE doctors', (err, res) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log('Doctors table dropped successfully!')
// })

/****************************************************************/
//drop patients
// pool.query('DROP TABLE patients', (err, res) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log('patients table dropped successfully!')
// })

/****************************************************************/
// close the pool when done
pool.end();
