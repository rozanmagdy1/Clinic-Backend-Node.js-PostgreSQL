const jwt = require("jsonwebtoken");
const {PatientModel} = require('../Model/patientModel');
const Patient = new PatientModel();
async function WebsiteMiddleWare(req, res, next) {
    try{
        if(req.path == '/login' || req.path == '/signup'|| req.path == '/Doctors' || req.path == '/addPatient' || req.path == '/forgotPassword'|| req.path == '/resetPassword'){
            next();
        }else {
            let token = req.headers["authorization"];
            if(!token) {
                return res.status(401).json({message: "unauthorized"})
            }else{
                let decoded = jwt.verify(token, 'loginToken22');
                let patients = await Patient.selectPatientByEmail(decoded.email);
                if(!patients[0]){
                    res.status(404).json({Message: "User not found, Send token"});
                }else{
                    req.user = patients[0];
                    next();
                }
            }
        }
    }catch (e) {
        res.json({
            message : "invalid token"
        })
    }

}
module.exports = {
    WebsiteMiddleWare
}