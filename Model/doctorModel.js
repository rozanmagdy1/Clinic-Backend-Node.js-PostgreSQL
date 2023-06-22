const {Base} = require('../DB/base');
const base_db = new Base();
class DoctorModel {
    async selectAllDoctors() {
        const select_doctor_query =  "SELECT * FROM doctors";
        return await base_db.selectAllFromDB(select_doctor_query);
    }

    async selectDoctorByEmail(email) {
        const select_doctor_query =  "SELECT * FROM doctors WHERE email = $1";
        const selection_values = [email];
        return await base_db.selectFromDB(select_doctor_query, selection_values);
    }
    async selectDoctorByID(id) {
        const select_doctor_query =  "SELECT * FROM doctors WHERE id = $1";
        const selection_values = [id];
        return await base_db.selectFromDB(select_doctor_query, selection_values);
    }
    async addDoctor([...values]){
        const insert_query = "INSERT INTO doctors (email, password, firstName, lastName, age, phone, specialist, price, experience, imagePath, verified)" +
            " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
        return await base_db.addToDB(insert_query, [...values]);
    }
    async deleteDoctor(id){
        const delete_query = 'DELETE FROM doctors WHERE id = $1';
        return await base_db.deleteFromDB(delete_query,[id]);
    }
    async updateDoctor(id ,[...values]){
        const update_query = 'UPDATE doctors SET firstName = $1, lastName = $2, age = $3, phone = $4, specialist = $5, price = $6, experience = $7 WHERE id = $8';
        return await base_db.updateFromDB(update_query, [...values, id]);
    }
    async updatePassword(email , password){
        const password_update_query = 'UPDATE doctors SET password = $1 WHERE email = $2';
        return await base_db.updateFromDB(password_update_query, [password, email]);
    }
    async addImage(id, imagePath){
        const update_query = 'UPDATE doctors SET imagePath = $1 WHERE id = $2';
        return await base_db.updateFromDB(update_query, [imagePath, id]);
    }

}
module.exports = {
    DoctorModel
}