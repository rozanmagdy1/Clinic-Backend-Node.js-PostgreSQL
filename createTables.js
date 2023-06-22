const { Pool } = require('pg');
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
// create doctors
// const create_doctor_table_query = `
// CREATE TABLE doctors (
//     id SERIAL PRIMARY KEY,
//     email varchar,
//     password varchar,
//     firstName varchar,
//     lastName varchar,
//     age int,
//     phone varchar,
//     specialist varchar,
//     price int,
//     experience varchar,
//     imagePath varchar,
//     verified boolean
// );
// `;
// pool.query(create_doctor_table_query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('doctors table is successfully created');
// });

/**************************************************************/
// create patients
// const create_patient_table_query = `
// CREATE TABLE patients (
//     id SERIAL PRIMARY KEY,
//     email varchar,
//     password varchar,
//     firstName varchar,
//     lastName varchar,
//     age int,
//     phone varchar,
//     imagePath varchar,
//     verified boolean
// );
// `;
// pool.query(create_patient_table_query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('patients table is successfully created');
// });

/**************************************************************/
// create rates
// const create_rates_table_query = `
// CREATE TABLE rates (
//     id SERIAL PRIMARY KEY,
//     doctorId INT,
//     FOREIGN KEY (doctorId) REFERENCES doctors (id),
//     patientId INT,
//     FOREIGN KEY (patientId) REFERENCES patients (id),
//     doctorName varchar,
//     patientName varchar,
//     rate FLOAT
// );
// `;
// pool.query(create_rates_table_query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('rates table is successfully created');
// });

/**************************************************************/
//create schedule
// const create_schedule_table_query = `
// CREATE TABLE schedules (
//     id SERIAL PRIMARY KEY,
//     appointment timestamp,
//     doctorId INT,
//     FOREIGN KEY (doctorId) REFERENCES doctors (id),
//     doctor_name varchar,
//     available boolean
// );
// `;
// pool.query(create_schedule_table_query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('schedule table is successfully created');
// });

/**************************************************************/
//create booking
// const create_booking_table_query = `
// CREATE TABLE booking (
//     id SERIAL PRIMARY KEY,
//     doctorId INT,
//     FOREIGN KEY (doctorId) REFERENCES doctors (id),
//     patientId INT,
//     FOREIGN KEY (patientId) REFERENCES patients (id),
//     appointmentId INT,
//     FOREIGN KEY (appointmentId) REFERENCES schedules (id),
//     appointment timestamp,
//     doctorName varchar,
//     patientName varchar
// );
// `;
// pool.query(create_booking_table_query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('booking table is successfully created');
// });
pool.end();