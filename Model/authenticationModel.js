const {Base} = require('../DB/base');
const base_db = new Base();
class AuthenticationModel {
    async verifyDoctor(email){
        const verify_doctor_query =  "UPDATE doctors SET verified = $1 WHERE email = $2";
        return await base_db.updateFromDB(verify_doctor_query, [true, email]);
    }
    async verifyPatient(email){
        const verify_patient_query =  "UPDATE patients SET verified = $1 WHERE email = $2";
        return await base_db.updateFromDB(verify_patient_query, [true, email]);
    }

}
module.exports = {
    AuthenticationModel
}