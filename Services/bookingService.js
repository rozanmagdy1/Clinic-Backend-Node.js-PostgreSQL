const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");
const bcrypt = require("bcrypt")
const { BookingModel } = require('../Model/bookingModel');
const Booking = new BookingModel();
const { DoctorModel } = require('../Model/doctorModel');
const Doctor = new DoctorModel();
const { PatientModel } = require('../Model/patientModel');
const Patient = new PatientModel();
const { ScheduleModel } = require('../Model/scheduleModel');
const Schedule = new ScheduleModel();

class BookingService {
    k = process.env.EMAIL_SECRET_KEY;
    transporter = nodemailer.createTransport(
        new Transport({ apiKey: this.k })
    );

    async getAllBookings() {
        try {
            return await Booking.selectAllBookings();
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async getBookingById(id) {
        try {
            let bookings = await Booking.selectBookingByID(id);
            if (bookings.length === 0) {
                return 'booking not found';
            } else {
                return bookings[0];
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async getBookingsByDoctorId(doctor_id) {
        try {
            let doctors = await Doctor.selectDoctorByID(doctor_id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                let bookings = await Booking.selectBookingByDoctorID(doctor_id);
                return bookings[0];
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async addBooking(doctorId, patiendId, appointmentId) {
        try {
            let schedules = await Schedule.selectScheduleByConditions(doctorId, appointmentId);
            let Patients = await Patient.selectPatientByID(patiendId);
            if (Patients.length === 0) {
                return 'patient not found';
            } else if (schedules.length === 0) {
                return 'schedule not found';
            } else {
                if (schedules[0].available === false) {
                    return 'appointment reserved';
                } else {
                    let appointment = schedules[0].appointment;
                    let doctor_name = schedules[0].doctor_name;
                    let patient_name = Patients[0].firstname + " " + Patients[0].lastname;
                    await Booking.addBooking([doctorId, patiendId, appointmentId, appointment,
                        doctor_name, patient_name]);
                    await Schedule.updateScheduleAvailability(appointmentId, false);
                    return true;
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async deleteBooking(id, userType, password) {
        try {
            let booking = await Booking.selectBookingByID(id);
            if (booking.length === 0) {
                return 'booking not found';
            } else {
                let doctors = await Doctor.selectDoctorByID(booking[0].doctorid);
                let patients = await Patient.selectPatientByID(booking[0].patientid);
                if (userType === 1) {
                    const mailOptions = {
                        from: 'rozanmagdy1@gmail.com',
                        to: patients[0].email,
                        subject: 'Booking Canceling',
                        html:
                            `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
                                <h2 style="text-align: center; letter-spacing: 5px;">CLINC</h2>
                                <p>We are sorry that an emergency situation has occurred and the doctor will not be able to come at the reserved date at ${booking[0].appointment}.</p>
                                <p>You can visit our application and choose another appointment.</p>
                                <p style="opacity: 0.9;">Best regards,</p>
                                <p style="opacity: 0.9;">Your Website Team</p>
                            </div>`
                    };
                    if (!password) {
                        return 'unauthorized';
                    } else {
                        if (!await bcrypt.compare(password, doctors[0].password)) {
                            return 'unauthorized';
                        } else {
                            await Booking.deleteBooking(id);
                            await Schedule.updateScheduleAvailability(booking[0].appointmentid, true);
                            await this.transporter.sendMail(mailOptions);
                            return true;
                        }
                    }
                } else if (userType === 2) {
                    const mailOptions = {
                        from: 'rozanmagdy1@gmail.com',
                        to: doctors[0].email,
                        subject: 'Booking Canceling',
                        html:
                            `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
                                <h2 style="text-align: center; letter-spacing: 5px;">CLINC</h2>
                                <p style="letter-spacing: 3px;">The patient canceled that appointment: ${booking[0].appointment}.</p>
                            </div>`
                    };
                    await Booking.deleteBooking(id);
                    await Schedule.updateScheduleAvailability(booking[0].appointmentid, true);
                    await this.transporter.sendMail(mailOptions);
                    return true;
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}
module.exports = {
    BookingService
}