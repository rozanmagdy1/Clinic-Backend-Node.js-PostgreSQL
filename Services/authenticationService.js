const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");
const {AuthenticationModel} = require('../Model/authenticationModel');
const Auth = new AuthenticationModel();
const {DoctorModel} = require('../Model/doctorModel');
const Doctor = new DoctorModel();
const {PatientModel} = require('../Model/patientModel');
const Patient = new PatientModel();

class AuthenticationService {
    k = process.env.EMAIL_SECRET_KEY;
    transporter = nodemailer.createTransport(
        new Transport({ apiKey: this.k })
    );

    async login(email, password, userType) {
        try {
            if (userType === 1) {
                let doctors = await Doctor.selectDoctorByEmail(email);
                if (doctors.length === 0) {
                    return 'user not found';
                } else {
                    if (!await bcrypt.compare(password, doctors[0].password)) {
                        return 'password wrong';
                    } else {
                        return jwt.sign({email: email, id: doctors[0].id, userType: userType}
                            , 'loginToken22');
                    }
                }
            } else {
                let patients = await Patient.selectPatientByEmail(email);
                if (patients.length === 0) {
                    return 'user not found';
                } else {
                    if (!await bcrypt.compare(password, patients[0].password)) {
                        return 'password wrong';
                    } else {
                        return jwt.sign({email: email, id: patients[0].id, userType: userType}
                            , 'loginToken22');
                    }
                }
            }

        } catch (e) {
            console.log(e)
            return false;
        }
    }

    async forgotPassword(req, email, userType) {
        try {
            let resetLink = "";
            const code = crypto.randomBytes(1).toString('hex');
            let token = jwt.sign({code}, 'resettoken', {expiresIn: '60m'});

            const mailOptions = {
                from: 'rozanmagdy1@gmail.com',
                to: email,
                subject: 'Reset your password',
                html: `
                        <h1 style="text-align: center;">CLINC</h1><p>Please click the following link to reset your password:</p>
                        <a href=${resetLink}>${resetLink}</a>
                        <p>The link will expire after 1hour</p>
                        <p style="opacity: 0.9;">Best regards,</p>
                        <p style="opacity: 0.9;">Your Website Team</p>
                        `
            };

            if (userType === 1) {
                let doctors = await Doctor.selectDoctorByEmail(email);
                if (doctors.length === 0) {
                    return "user not found";
                } else {
                    resetLink = `http://${req.headers.host}/admin/resetPassword`;
                }
            } else {
                let patients = await Patient.selectPatientByEmail(email);
                if (patients.length === 0) {
                    return "user not found";
                } else {
                    resetLink = `http://${req.headers.host}/website/resetPassword`;
                }
            }
            await this.transporter.sendMail(mailOptions);
            return {
                message: 'Email sent',
                token: token,
                resetLink: resetLink
            };
        } catch (e) {
            console.error(e);
            return 'Error sending email';
        }
    }

    async resetPassword(resetToken, email, newPassword, userType) {
        try {
            if (userType === 1) {
                let doctors = await Doctor.selectDoctorByEmail(email);
                if (doctors.length === 0) {
                    return "user not found";
                } else {
                    try {
                        let decoded = jwt.verify(resetToken, "resettoken");
                        newPassword = await bcrypt.hash(newPassword, 10);
                        return Doctor.updatePassword(email, newPassword);
                    } catch (e) {
                        return "Time out , the link is expired";
                    }
                }
            } else {
                let patients = await Patient.selectPatientByEmail(email);
                if (patients.length === 0) {
                    return "user not found";
                } else {
                    try {
                        let decoded = jwt.verify(resetToken, "resettoken");
                        newPassword = await bcrypt.hash(newPassword, 10);
                        return Patient.updatePassword(email, newPassword);
                    } catch (e) {
                        console.log(e);
                        return "Time out , the link is expired";
                    }
                }
            }

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async changePassword(email, oldPassword, newPassword, userType) {
        try {
            if (userType === 1) {
                let doctors = await Doctor.selectDoctorByEmail(email);
                if (doctors.length === 0) {
                    return "user not found";
                } else {
                    if (await bcrypt.compare(oldPassword, doctors[0].password)) {
                        newPassword = await bcrypt.hash(newPassword, 10);
                        return Doctor.updatePassword(email, newPassword);
                    } else {
                        return "The old password wrong";
                    }
                }
            } else {
                let patients = await Patient.selectPatientByEmail(email);
                if (patients.length === 0) {
                    return "user not found";
                } else {
                    if (await bcrypt.compare(oldPassword, patients[0].password)) {
                        newPassword = await bcrypt.hash(newPassword, 10);
                        return Patient.updatePassword(email, newPassword);
                    } else {
                        return "The old password wrong";
                    }
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async verifyStepOne(email, userType) {
        const code = crypto.randomBytes(3).toString('hex').toUpperCase();
        const token = jwt.sign({email, userType, code}, 'veifytoken', {expiresIn: '2m'});
        const mailOptions = {
            from: 'rozanmagdy1@gmail.com',
            to: email,
            subject: 'Verify Your Account',
            html:
                `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
                <h2 style="text-align: center; letter-spacing: 5px;">CLINC</h2>
                <p style="letter-spacing: 3px;"> Your Verification Code is:  <strong>${code}</strong></p> <p><strong>Alert: This code will expire in 2min.</strong></p>
                <p style="opacity: 0.9;">Best regards,</p>
                <p style="opacity: 0.9;">Your Website Team</p>
            </div>`
        };
        try {
            if (userType === 1) {
                let doctors = await Doctor.selectDoctorByEmail(email);
                if (doctors.length === 0) {
                    return "user not found";
                }else{
                    if (doctors[0].verified === true){
                        return "Doctor already verified";
                    }else{
                        await this.transporter.sendMail(mailOptions);
                        return {
                            "Message": "Email sent",
                            "VerificationToken": token,
                        }
                    }
                }
            } else {
                let patients = await Patient.selectPatientByEmail(email);
                if (patients.length === 0) {
                    return "user not found";
                }else{
                    if (patients[0].verified === true){
                        return "Patient already verified";
                    }else{
                        await this.transporter.sendMail(mailOptions);
                        return {
                            "Message": "Email sent",
                            "VerificationToken": token,
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async verifyStepTwo(token, userCode) {
        try{
            let decoded = jwt.verify(token, 'veifytoken');
            let {email, userType, code} = decoded;
            if(userCode === code){
                if(userType === 1){
                    await Auth.verifyDoctor(email);
                    return 'user verified';
                }else if(userType === 2){
                    await Auth.verifyPatient(email);
                    return 'user verified';
                }
            }else{
                return 'invalid code';
            }
        }catch (e){
            console.log(e);
            return false;
        }
    }
}

module.exports = {
    AuthenticationService
}