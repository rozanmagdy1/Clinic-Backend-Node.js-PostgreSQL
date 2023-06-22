const bcrypt = require("bcrypt")
const { ScheduleModel } = require('../Model/scheduleModel');
const Schedule = new ScheduleModel();
const { DoctorModel } = require('../Model/doctorModel');
const Doctor = new DoctorModel();

class ScheduleService {
    async addSchedule(appointment, doctorId, available) {
        try {
            let doctors = await Doctor.selectDoctorByID(doctorId);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                let doctor_name = doctors[0].firstname + " " +doctors[0].lastname;
                await Schedule.addSchedule([appointment, doctorId, doctor_name, available]);
                return true;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getAllSchedules() {
        try {
            return await Schedule.selectAllSchedules();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getScheduleById(id) {
        try {
            let schedules = await Schedule.selectScheduleByID(id);
            if (schedules.length === 0) {
                return 'schedule not found';
            } else {
                return schedules[0];
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getSchedulesByDoctorId(doctor_id) {
        try {
            let doctors = await Doctor.selectDoctorByID(doctor_id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                let schedules = await Schedule.selectSchedulesByDoctorId(doctor_id);
                if (schedules.length === 0) {
                    return "doctor don't have schedules";
                } else {
                    return schedules;
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async deleteSchedule(id,password) {
        try {
            let schedules = await Schedule.selectScheduleByID(id);
            if (schedules.length === 0) {
                return 'schedule not found';
            } else {
                let doctors = await Doctor.selectDoctorByID(schedules[0].doctorid);
                if (password) {
                    if (!await bcrypt.compare(password, doctors[0].password)) {
                        return 'unauthorized';
                    } else {
                        await Schedule.deleteSchedule(id);
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
}
module.exports = {
    ScheduleService
}