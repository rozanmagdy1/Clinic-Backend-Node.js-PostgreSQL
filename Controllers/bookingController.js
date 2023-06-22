let { BookingService } = require("../Services/bookingService");
let service = new BookingService();

class BookingController {
    async getAllBookings(req, res) {
        let result = await service.getAllBookings();
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else {
            res.status(200).json({ Bookings: result });
        }
    }
    async getBookingById(req, res) {
        let id = req.params.id;
        let result = await service.getBookingById(id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'booking not found') {
            res.status(404).json({ Message: "Booking is not found" });
        } else {
            res.status(200).json({ "Booking": result });
        }
    }

    async getBookingsByDoctorId(req, res) {
        let doctor_id = req.params.dId;
        let result = await service.getBookingsByDoctorId(doctor_id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor is not found" });
        } else {
            res.status(200).json({ "Bookings": result });
        }
    }
    async addBooking(req, res) {
        let { doctorId, patiendId, appointmentId } = req.body;
        let result = await service.addBooking(doctorId, patiendId, appointmentId);
        if (result === 'patient not found') {
            res.status(404).json({ Message: "Patient is not found" });
        } else if (result === 'appointment reserved') {
            res.status(401).json({ Message: "Appointment reserved" });
        } else if (result === 'schedule not found') {
            res.status(404).json({ Message: "Schedule is not found" });
        } else if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === true) {
            res.status(200).json({ Message: "Booking added successfully" });
        }
    }
    async deleteBooking(req, res) {
        let { userType, password } = req.body;
        let { id } = req.params;
        let result = await service.deleteBooking(id, userType, password);
        if (result === 'booking not found') {
            res.status(404).json({ Message: "Booking is not found" });
        } else if (result === 'unauthorized'){
            res.status(401).json({ Message: "You are unauthorized" });
        } else if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === true) {
            res.status(200).json({ Message: "Booking deleted successfully" });
        }
    }
}
module.exports = {
    BookingController
}