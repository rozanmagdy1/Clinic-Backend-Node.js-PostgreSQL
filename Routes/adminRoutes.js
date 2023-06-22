const { AuthenticationController } = require("../Controllers/authenticationController");
const auth_controller = new AuthenticationController();
const { DoctorController } = require("../Controllers/doctorController");
const doctor_controller = new DoctorController();
const { PatientController } = require("../Controllers/patientController");
const patient_controller = new PatientController();
const { ScheduleController } = require("../Controllers/scheduleController");
const schedule_controller = new ScheduleController();
const { BookingController } = require("../Controllers/bookingController");
const booking_controller = new BookingController();
const multer = require("multer");

function adminRoutes(adminApp) {
  let upload = multer({dest : './database/'});
  //authentication
  adminApp.post("/login", auth_controller.login);
  adminApp.post("/changePassword", auth_controller.changePassword);
  adminApp.post("/forgotPassword", auth_controller.forgotPassword);
  adminApp.post("/resetPassword", auth_controller.resetPassword);
  adminApp.post("/verifyAccountStep1", auth_controller.verifyStepOne);
  adminApp.post("/verifyAccountStep2/:token", auth_controller.verifyStepTwo);

  //doctors
  adminApp.post("/addDoctor", doctor_controller.addDoctor);
  adminApp.get("/Doctors", doctor_controller.getAllDoctors);
  adminApp.get("/DoctorProfile", doctor_controller.getDoctorProfile);
  adminApp.get("/Doctor/:id", doctor_controller.getDoctorById);
  adminApp.put("/Doctor/:id", doctor_controller.updateDoctor);
  adminApp.delete("/Doctor/:id", doctor_controller.deleteDoctor);
  adminApp.post('/Doctor/:id', upload.single("doctorImage"),doctor_controller.addDoctorImage);

  //patients
  adminApp.get("/Patients", patient_controller.getAllPatients);
  adminApp.get("/Patients/:id", patient_controller.getPatientById);

  //schedule
  adminApp.get("/Schedules", schedule_controller.getAllSchedules);
  adminApp.get("/Schedule/:id", schedule_controller.getScheduleById);
  adminApp.get("/Schedules/:did", schedule_controller.getSchedulesByDoctorId);
  adminApp.post("/addSchedule", schedule_controller.addSchedule);
  adminApp.delete("/Schedule/:id", schedule_controller.deleteSchedule);

  //booking 
  adminApp.get("/bookings", booking_controller.getAllBookings);
  adminApp.get("/booking/:id", booking_controller.getBookingById);
  adminApp.get("/bookings/:dId", booking_controller.getBookingsByDoctorId);
  adminApp.delete("/deleteBooking/:id", booking_controller.deleteBooking);

}

module.exports = {
  adminRoutes,
};
