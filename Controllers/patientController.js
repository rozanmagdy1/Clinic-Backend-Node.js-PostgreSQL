let {PatientService} = require("../Services/patientService");
let service = new PatientService();
class PatientController {

    async addPatient(req,res) {
        let {email, password, firstName, lastName, age, phone, verified} = req.body;
        let result = await service.addPatient(email, password, firstName, lastName, age, phone, verified);
        if (result === false) {
            res.status(500).json({Message: "Internal server error"});
        } else if (result === true) {
            res.status(200).json({Message: "Patient added successfully"});
        } else {
            res.status(403).json({Message: "The username already exists use another one!"});
        }
    }

    async getPatientProfile(req,res) {
        let token = req.headers["authorization"];
        let result = await service.getPatientProfile(token);
        if (result === false) {
            res.status(500).json({Message: "Internal server error"});
        }else{
            res.status(200).json({"PatientProfile": result});
        }
    }

    async getAllPatients(req,res) {
        let result = await service.getAllDoctors();
        if(result === false){
            res.status(500).json({Message: "Internal server error"});
        }else{
            res.status(200).json({Patients: result});
        }
    }

    async getPatientById(req,res) {
        let id = req.params.id;
        let result = await service.getPatientById(id);
        if (result === false) {
            res.status(500).json({Message: "Internal server error"});
        }else if(result === 'patient not found'){
            res.status(404).json({Message: "Patient not found"});
        } else if(result === 'unauthorized'){
            res.status(401).json({Message: "You are unauthorized!"});
        }else {
            res.status(200).json({"Patient": result});
        }
    }

    async updatePatient(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updatePatient(id,data);
        if (result === false) {
            res.status(500).json({Message: "Internal server error"});
        }else if(result === 'patient not found'){
            res.status(404).json({Message: "Patient not found"});
        } else {
            res.status(200).json({Message: "The patient information updated successfully"});
        }
    }

    async deletePatient(req,res) {
        let id = req.params.id;
        let result = await service.deletePatient(id);
        if (result === false) {
            res.status(500).json({Message: "Internal server error"});
        }else if(result === 'patient not found'){
            res.status(404).json({Message: "Patient not found"});
        } else {
            res.status(200).json({Message: "The Patient deleted successfully"});
        }
    }

    async addPatientImage(req,res){
        let { id } = req.params;
        let result = await service.addPatientImage(id, req);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        }else if (result === 'patient not found'){
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
    PatientController
}