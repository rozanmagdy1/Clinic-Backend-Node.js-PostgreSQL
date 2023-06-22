const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { DoctorModel } = require('../Model/doctorModel');
const Doctor = new DoctorModel();

class DoctorService {
    async addDoctor(email, password, firstName, lastName, age, phone, specialist, price, experience, verified) {
        try {
            let doctors = await Doctor.selectDoctorByEmail(email);
            if (doctors.length === 0) {
                password = await bcrypt.hash(password, 10);
                await Doctor.addDoctor([email, password, firstName, lastName, age, phone, specialist, price, experience, null, verified]);
                return true;
            } else {
                return "the username already exists use another one!"
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getAllDoctors() {
        try {
            return await Doctor.selectAllDoctors();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getDoctorProfile(token) {
        try {
            let data_from_token = await this.extractInfoFromToken(token);
            let [email, ,] = data_from_token;
            let doctors = await Doctor.selectDoctorByEmail(email);
            return await doctors[0];
        } catch (e) {
            console.log(e);
            return false
        }
    }

    async extractInfoFromToken(token) {
        let decoded = jwt.verify(token, 'loginToken22');
        return [decoded.email, decoded.id, decoded.userType];
    }

    async getDoctorById(id) {
        try {
            let doctors = await Doctor.selectDoctorByID(id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                return doctors[0];
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async updateDoctor(id, data) {
        try {
            let doctors = await Doctor.selectDoctorByID(id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                if (data.password) {
                    if (!await bcrypt.compare(data.password, doctors[0].password)) {
                        return 'unauthorized';
                    } else {
                        let values = [data.firstName, data.lastName, data.age, data.phone, data.specialist, data.price, data.experience];
                        await Doctor.updateDoctor(id, values);
                        return true
                    }
                } else {
                    return 'unauthorized';
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async deleteDoctor(password, id) {
        try {
            let doctors = await Doctor.selectDoctorByID(id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                if (password) {
                    if (!await bcrypt.compare(password, doctors[0].password)) {
                        return 'unauthorized';
                    } else {
                        await Doctor.deleteDoctor(id);
                        return true
                    }
                } else {
                    return 'unauthorized';
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async addDoctorImage(id, req) {
        try {
            let doctors = await Doctor.selectDoctorByID(id);
            if (doctors.length === 0) {
                return 'doctor not found';
            }else{
                fs.rename(req.file.path, `./database/doctors/${id}.jpg`,
                (err) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                }
            )
            const imagePath = path.join(__dirname, '..', 'database/doctors', `${id}.jpg`);
            await Doctor.addImage(id, imagePath);
            return imagePath;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = {
    DoctorService
}