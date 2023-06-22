const multer = require("multer");
const { AuthenticationController } = require('../Controllers/authenticationController');
const auth_controller = new AuthenticationController();
const { DoctorController } = require('../Controllers/doctorController');
const doctor_controller = new DoctorController();
const { PatientController } = require('../Controllers/patientController');
const patient_controller = new PatientController();
const { ScheduleController } = require("../Controllers/scheduleController");
const schedule_controller = new ScheduleController();
const { BookingController } = require("../Controllers/bookingController");
const booking_controller = new BookingController();
const { RatesController } = require("../Controllers/ratesController");
const rate_controller = new RatesController();

function websiteRoutes(websiteApp) {
    let upload = multer({dest : './database/'});
    //authentication
    websiteApp.post("/login", auth_controller.login);
    websiteApp.post("/changePassword", auth_controller.changePassword);
    websiteApp.post("/forgotPassword", auth_controller.forgotPassword);
    websiteApp.post("/resetPassword", auth_controller.resetPassword);
    websiteApp.post("/verifyAccountStep1", auth_controller.verifyStepOne);
    websiteApp.post("/verifyAccountStep2/:token", auth_controller.verifyStepTwo);

    //doctors
    websiteApp.get("/Doctors", doctor_controller.getAllDoctors);
    websiteApp.get("/Doctor/:id", doctor_controller.getDoctorById);

    //rates 
    websiteApp.get("/Rates/Doctors", rate_controller.getTotalRatesForAllDoctors);
    websiteApp.get("/Rates/Doctor/:id", rate_controller.getTotalRatesForDoctor);
    websiteApp.post("/Rate/Doctor", rate_controller.rateDoctor);

    //patients
    websiteApp.get("/PatientProfile", patient_controller.getPatientProfile);
    websiteApp.post("/addPatient", patient_controller.addPatient);
    websiteApp.put("/Patient/:id", patient_controller.updatePatient);
    websiteApp.delete("/Patient/:id", patient_controller.deletePatient);
    websiteApp.post('/Patient/:id', upload.single("patientImage"), patient_controller.addPatientImage);

    //schedule
    websiteApp.get("/Schedules", schedule_controller.getAllSchedules);
    websiteApp.get("/Schedule/:id", schedule_controller.getScheduleById);
    websiteApp.get("/Schedules/:did", schedule_controller.getSchedulesByDoctorId);

    //booking 
    websiteApp.get("/bookings", booking_controller.getAllBookings);
    websiteApp.get("/booking/:id", booking_controller.getBookingById);
    websiteApp.get("/bookings/:dId", booking_controller.getBookingsByDoctorId);
    websiteApp.post("/addBooking", booking_controller.addBooking);
    websiteApp.delete("/deleteBooking/:id", booking_controller.deleteBooking);

}

module.exports = {
    websiteRoutes
}