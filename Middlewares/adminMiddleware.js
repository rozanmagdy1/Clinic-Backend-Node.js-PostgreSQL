const jwt = require("jsonwebtoken");
const {DoctorModel} = require('../Model/doctorModel');
const Doctor = new DoctorModel();

async function AdminMiddleWare(req, res, next) {
    if(req.path == '/login' || req.path == '/signup' || req.path == '/addDoctor' || req.path == '/forgotPassword'|| req.path == '/resetPassword') {
        next();
    }else {
        try {
            let token = req.headers["authorization"];
            if(!token) {
                return res.status(401).json({message: "unauthorized"})
            }else{
                let decoded = jwt.verify(token, 'loginToken22');
                if(decoded.userType !== 1){
                    return res.status(401).json({message: "unauthorized"})
                }else{
                    let doctors = await Doctor.selectDoctorByEmail(decoded.email);
                    if(!doctors[0]){
                        res.status(404).json({Message: "User not found, Send token"});
                    }else{
                        req.user = doctors[0];
                        next();
                    }
                }
            }
        }catch (e) {
            console.log(e);
            res.json({message : "invalid token"})
        }
    }

}
module.exports ={
    AdminMiddleWare
}