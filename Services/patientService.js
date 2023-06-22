const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const {PatientModel} = require('../Model/patientModel');
const Patient = new PatientModel();
class PatientService {

    async addPatient(email, password, firstName, lastName, age, phone, verified) {
        try {
            let patients = await Patient.selectPatientByEmail(email);
            if (patients.length === 0) {
                password = await bcrypt.hash(password, 10);
                await Patient.addPatient([email, password, firstName, lastName, age, phone, null, verified]);
                return true;
            } else {
                return "the username already exists use another one!"
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getPatientProfile(token) {
        try {
            let data_from_token = await this.extractInfoFromToken(token);
            let [email, ,] = data_from_token;
            let patients = await Patient.selectPatientByEmail(email);
            return await patients[0];
        } catch (e) {
            console.log(e);
            return false
        }
    }
    async extractInfoFromToken(token) {
        let decoded = jwt.verify(token, 'loginToken22');
        return [decoded.email, decoded.id, decoded.userType];
    }

    async getAllDoctors() {
        try {
            return await Patient.selectAllPatients();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getPatientById(id) {
        try {
            let patients = await Patient.selectPatientByID(id);
            if (patients.length === 0) {
                return 'patient not found';
            } else {
                return patients[0];
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async updatePatient(id, data) {
        try {
            let patients = await Patient.selectPatientByID(id);
            if (patients.length === 0) {
                return 'patient not found';
            } else {
                let values = [data.firstName, data.lastName, data.age, data.phone];
                await Patient.updatePatient(id, values);
                return true
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async deletePatient(id) {
        try {
            let patients = await Patient.selectPatientByID(id);
            if (patients.length === 0) {
                return 'patient not found';
            } else {
                await Patient.deletePatient(id);
                return true
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async addPatientImage(id,req){
        try{
            let patients = await Patient.selectPatientByID(id);
            if (patients.length === 0) {
                return 'patient not found';
            }else{
                fs.rename(req.file.path, `./database/patients/${id}.jpg`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                }
            )
            const imagePath = path.join(__dirname, '..', 'database/patients', `${id}.jpg`);
            console.log(imagePath)
            await Patient.addImage(id, imagePath);
            return imagePath;
            }
        }catch(e){
            console.log(e);
            return false; 
        }
    }
}
module.exports = {
    PatientService
}