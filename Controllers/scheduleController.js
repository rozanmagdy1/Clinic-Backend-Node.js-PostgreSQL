let { ScheduleService } = require("../Services/scheduleService");
let service = new ScheduleService();

class ScheduleController {

    async addSchedule(req, res) {
        let { appointment, doctorId, available } = req.body;
        let result = await service.addSchedule(appointment, doctorId, available);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else {
            res.status(200).json({ Message: "Schedule added successfully" });
        }
    }

    async getAllSchedules(req, res) {
        let result = await service.getAllSchedules();
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else {
            res.status(200).json({ Schedules: result });
        }
    }

    async getScheduleById(req, res) {
        let id = req.params.id;
        let result = await service.getScheduleById(id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'schedule not found') {
            res.status(404).json({ Message: "Schedule not found" });
        } else {
            res.status(200).json({ "Schedule": result });
        }
    }

    async getSchedulesByDoctorId(req, res) {
        let doctor_id = req.params.did;
        let result = await service.getSchedulesByDoctorId(doctor_id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else if (result === "doctor don't have schedules") {
            res.status(404).json({ Message: "Doctor don't have schedules" });
        } else {
            res.status(200).json({ "Schedules": result });
        }
    }

    async deleteSchedule(req, res) {
        let id = req.params.id;
        let { password } = req.body;
        let result = await service.deleteSchedule(id, password);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'schedule not found') {
            res.status(404).json({ Message: "Schedule not found" });
        } else if (result === 'unauthorized') {
            res.status(401).json({Message: "You are unauthorized!"});
        } else {
            res.status(200).json({ Message: "Schedule deleted successfully" });
        }
    }

}
module.exports = {
    ScheduleController
}