let { RateService } = require("../Services/rateService");
let service = new RateService();

class RatesController{
    async getTotalRatesForAllDoctors(req,res){
        let result = await service.getTotalRatesForAllDoctors();
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else {
            res.status(200).json(result);
        }
    }

    async getTotalRatesForDoctor(req,res){
        let {id} = req.params;
        let result = await service.getTotalRatesForDoctor(id);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else {
            res.status(200).json(result);
        }
    }
    
    async rateDoctor(req,res){
        let { doctorId, patientId, rate } = req.body;
        let result = await service.rateDoctor(doctorId, patientId, rate);
        if (result === false) {
            res.status(500).json({ Message: "Internal server error" });
        } else if (result === 'doctor not found') {
            res.status(404).json({ Message: "Doctor not found" });
        } else if (result === 'patient not found') {
            res.status(404).json({ Message: "Patient not found" });
        }else if(result === 'rate added successfully'){
            res.status(200).json({ Message: "Rate added successfully" });
        }else if(result === 'rate updated successfully'){
            res.status(200).json({ Message: "Rate updated successfully" });
        }
    }
}
module.exports = {
    RatesController
}