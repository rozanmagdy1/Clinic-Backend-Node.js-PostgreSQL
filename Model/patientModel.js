const {Base} = require('../DB/base');
const base_db = new Base();
class PatientModel {
    async selectAllPatients() {
        const select_patient_query =  "SELECT * FROM patients";
        return await base_db.selectAllFromDB(select_patient_query);
    }
    async selectPatientByEmail(email) {
        const select_patient_query =  "SELECT * FROM patients WHERE email = $1";
        const selection_values = [email];
        return await base_db.selectFromDB(select_patient_query, selection_values);
    }
    async selectPatientByID(id) {
        const select_patient_query =  "SELECT * FROM patients WHERE id = $1";
        const selection_values = [id];
        return await base_db.selectFromDB(select_patient_query, selection_values);
    }
    async addPatient([...values]){
        const insert_query = "INSERT INTO patients (email, password, firstName, lastName, age, phone, imagePath, verified)" +
            " VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
        return await base_db.addToDB(insert_query, [...values]);
    }
    async deletePatient(id){
        const delete_query = 'DELETE FROM patients WHERE id = $1'
        return await base_db.deleteFromDB(delete_query,[id]);
    }
    async updatePatient(id ,[...values]){
        const update_query = 'UPDATE patients SET firstName = $1, lastName = $2, age = $3, phone = $4 WHERE id = $5';
        return await base_db.updateFromDB(update_query, [...values, id]);
    }
    async updatePassword(email , password){
        const password_update_query = 'UPDATE patients SET password = $1 WHERE email = $2';
        return await base_db.updateFromDB(password_update_query, [password,email]);
    }
    async addImage(id, imagePath){
        const update_query = 'UPDATE patients SET imagePath = $1 WHERE id = $2';
        return await base_db.updateFromDB(update_query, [imagePath, id]);
    }
}
module.exports = {
    PatientModel
}