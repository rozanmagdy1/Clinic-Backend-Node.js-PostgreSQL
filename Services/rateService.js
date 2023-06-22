const { RateModel } = require('../Model/rateModel');
const Rate = new RateModel();
const { DoctorModel } = require('../Model/doctorModel');
const Doctor = new DoctorModel();
const { PatientModel } = require('../Model/patientModel');
const Patient = new PatientModel();

class RateService {

    async getTotalRatesForAllDoctors() {
        try {
            let rates = await Rate.selectAllRates();
            const total_rates = rates.reduce((accumulator, rateObj) => accumulator + rateObj.rate, 0);
            return {
                "Rates": rates,
                "Total_Rates": total_rates
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getTotalRatesForDoctor(id) {
        try {
            let doctors = await Doctor.selectDoctorByID(id);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else {
                let rates = await Rate.selectRatesByDoctorId(id);
                const total_rates = rates.reduce((accumulator, rateObj) => accumulator + rateObj.rate, 0);
                return {
                    "Rates": rates,
                    "Total_Rates_For_That_Doctor": total_rates
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async rateDoctor(doctorId, patientId, rate) {
        try {
            let rates = await Rate.selectRateByCondition(doctorId, patientId);
            let doctors = await Doctor.selectDoctorByID(doctorId);
            let patients = await Patient.selectPatientByID(patientId);
            if (doctors.length === 0) {
                return 'doctor not found';
            } else if (patients.length === 0) {
                return 'patient not found';
            } else if (rates.length === 0) {
                let doctor_name = doctors[0].firstname + " " + doctors[0].lastname;
                let patient_name = patients[0].firstname + " " + patients[0].lastname;
                await Rate.addRate([doctorId, patientId, doctor_name, patient_name, rate]);
                return 'rate added successfully';
            } else {
                await Rate.updateRate(doctorId, patientId, rate);
                return 'rate updated successfully';
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}
module.exports = {
    RateService
}