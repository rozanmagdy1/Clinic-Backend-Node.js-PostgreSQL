const {Base} = require('../DB/base');
const base_db = new Base();

class RateModel{

    async selectAllRates() {
        const select_schedule_query =  "SELECT * FROM rates";
        return await base_db.selectAllFromDB(select_schedule_query);
    }

    async selectRatesByDoctorId(doctorId) {
        const select_schedule_query =  "SELECT * FROM rates WHERE doctorId = $1";
        const selection_values = [doctorId];
        return await base_db.selectFromDB(select_schedule_query, selection_values);
    }

    async selectRateByCondition(doctorId, patientId) {
        const select_schedule_query =  "SELECT * FROM rates WHERE doctorId = $1 AND patientId = $2";
        const selection_values = [doctorId, patientId];
        return await base_db.selectFromDB(select_schedule_query, selection_values);
    }

    async updateRate(doctorId, patientId, rate) {
        const update_query =  "UPDATE rates SET rate = $3 WHERE doctorId = $1 AND patientId = $2";
        const update_values = [doctorId, patientId, rate];
        return await base_db.selectFromDB(update_query, update_values);
    }

    async addRate([...values]){
        const insert_query = "INSERT INTO rates (doctorId, patientId, doctorName, patientName, rate)" +
        " VALUES ($1, $2, $3, $4, $5)";
        return await base_db.addToDB(insert_query, [...values]);
    }

}
module.exports = {
    RateModel
}