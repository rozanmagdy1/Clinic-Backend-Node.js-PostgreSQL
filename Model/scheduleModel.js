const {Base} = require('../DB/base');
const base_db = new Base();

class ScheduleModel{
    async selectAllSchedules() {
        const select_schedule_query =  "SELECT * FROM schedules";
        return await base_db.selectAllFromDB(select_schedule_query);
    }

    async selectScheduleByID(id) {
        const select_schedule_query =  "SELECT * FROM schedules WHERE id = $1";
        const selection_values = [id];
        return await base_db.selectFromDB(select_schedule_query, selection_values);
    }

    async selectSchedulesByDoctorId(doctorId) {
        const select_schedule_query =  "SELECT * FROM schedules WHERE doctorId = $1";
        const selection_values = [doctorId];
        return await base_db.selectFromDB(select_schedule_query, selection_values);
    }

    async selectScheduleByConditions(doctorId, appointmentId){
        const select_schedule_query =  `SELECT * FROM schedules WHERE doctorId = $1 AND id = $2`;
        const selection_values = [doctorId, appointmentId];
        return await base_db.selectFromDB(select_schedule_query, selection_values);
    }

    async addSchedule([...values]){
        const insert_query = "INSERT INTO schedules (appointment, doctorId, doctor_name, available)" +
            " VALUES ($1, $2, $3, $4)";
        return await base_db.addToDB(insert_query, [...values]);
    }

    async deleteSchedule(id){
        const delete_query = 'DELETE FROM schedules WHERE id = $1'
        return await base_db.deleteFromDB(delete_query,[id]);
    }

    async updateScheduleAvailability(id,value){
        const update_query = 'UPDATE schedules SET available = $1 WHERE id = $2';
        return await base_db.updateFromDB(update_query, [value, id]);
    }

}
module.exports = {
    ScheduleModel
}