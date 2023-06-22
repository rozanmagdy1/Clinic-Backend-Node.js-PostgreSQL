const {Base} = require('../DB/base');
const base_db = new Base();

class BookingModel {
    async selectAllBookings() {
        const select_query =  "SELECT * FROM booking";
        return await base_db.selectAllFromDB(select_query);
    }
    async selectBookingByID(id) {
        const select_query =  "SELECT * FROM booking WHERE id = $1";
        const selection_values = [id];
        return await base_db.selectFromDB(select_query, selection_values);
    }
    async selectBookingByDoctorID(id) {
        const select_query =  "SELECT * FROM booking WHERE doctorId = $1";
        const selection_values = [id];
        return await base_db.selectFromDB(select_query, selection_values);
    }
    async addBooking([...values]){
        const insert_query = "INSERT INTO booking (doctorId,patientId,appointmentId,appointment,doctorName,patientName)" +
            " VALUES ($1, $2, $3, $4, $5, $6)";
        return await base_db.addToDB(insert_query, [...values]);
    }
    async deleteBooking(id){
        const delete_query = 'DELETE FROM booking WHERE id = $1'
        return await base_db.deleteFromDB(delete_query,[id]);
    }
}
module.exports = {
    BookingModel
}