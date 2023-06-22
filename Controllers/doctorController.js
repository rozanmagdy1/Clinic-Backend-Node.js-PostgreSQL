let { DoctorService } = require("../Services/doctorService");
let service = new DoctorService();

class DoctorController {
    async addDoctor(req, res) {
        let { email, password, firstName, lastName, age, phone, specialist, price, experience, verified } = req.body;
        let result = await service.addDoctor(email, password, firstName, lastName, age, phone, specialist, price, experience, verified);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === true) {
            res.status(200).json({ Message: "Doctor added successfully" });
        } else {
            res.status(403).json({ Message: "The username already exists use another one!" });
        }
    };

    async getAllDoctors(req, res) {
        let result = await service.getAllDoctors();
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else {
            res.status(200).json({ Doctors: result });
        }
    }

    async getDoctorProfile(req, res) {
        let token = req.headers["authorization"];
        let result = await service.getDoctorProfile(token);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else {
            res.status(200).json({ "DoctorProfile": result });
        }
    }

    async getDoctorById(req, res) {
        let id = req.params.id;
        let result = await service.getDoctorById(id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else {
            res.status(200).json({ "Doctor": result });
        }
    }

    async updateDoctor(req, res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateDoctor(id, data);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else if (result === 'unauthorized') {
            res.status(401).json({ Message: "You are unauthorized!" });
        } else {
            res.status(200).json({ Message: "The doctor information updated successfully" });
        }
    }

    async deleteDoctor(req, res) {
        let id = req.params.id;
        let { password } = req.body;
        let result = await service.deleteDoctor(password, id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else if (result === 'unauthorized') {
            res.status(401).json({ Message: "You are unauthorized!" });
        } else {
            res.status(200).json({ Message: "The doctor deleted successfully" });
        }
    }

    async addDoctorImage(req, res) {
        let { id } = req.params;
        let result = await service.addDoctorImage(id, req);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        }else if (result === 'doctor not found'){
            return res.status(404).json({
                ImagePath: result
            });
        } else {
            return res.status(200).json({
                Message: "File Uploaded Successfully!",
                ImagePath: result
            });
        }
    }
}

module.exports = {
    DoctorController
}