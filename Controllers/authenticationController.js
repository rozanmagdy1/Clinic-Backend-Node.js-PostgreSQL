let {AuthenticationService} = require("../Services/authenticationService");
let service = new AuthenticationService();
class AuthenticationController {

    async login(req,res) {
        const {email, password, userType} = req.body;
        let result = await service.login(email, password, userType);
        if (result === false){
            res.status(500).json({Message: "Internal server error"});
        }else if(result === 'user not found'){
            res.status(404).json({Message: "User not found"});
        }else if(result === 'password wrong'){
            res.status(401).json({Message: "Password wrong"});
        }else{
            res.status(200).json({
                Message: "Successful login",
                LoginToken: result
            });
        }
    }

    async forgotPassword(req,res) {
        let {email, userType} = req.body;
        let result = await service.forgotPassword(req,email,userType);
        if(result === "user not found"){
            res.status(404).json({Message: "User not found"});
        }else if (result.message === "Email sent") {
            res.status(200).json(result)
        }else{
            res.status(500).json({Message : "Error sending email"})
        }
    }

    async resetPassword(req,res) {
        let reset_token = req.headers["authorization"];
        let {email, newPassword, userType} = req.body;
        let result = await service.resetPassword(reset_token,email,newPassword, userType);
        if (result === "Time out , the link is expired"){
            res.status(401).json({Message: "Time out , the link is expired"});
        }else if(result === false){
            res.status(500).json({Message: "Internal server error"});
        } else if(result === "user not found"){
            res.status(404).json({Message: "The user not found"})
        } else{
            res.status(200).json({Message: "The password retested successfully"});
        }
    }

    async changePassword(req, res) {
        let {email, oldPassword, newPassword, userType} = req.body;
        let result = await service.changePassword(email,oldPassword,newPassword,userType);
        if (result === false){
            res.status(500).json({Message: "Internal server error"});
        }else if (result === "the old password wrong"){
            res.status(401).json({Message: "The old password is wrong"});
        }else if (result === "user not found"){
            res.status(404).json({Message: "The user not found"});
        }else{
            res.status(200).json({Message: "The password changed successfully"});
        }
    }

    async verifyStepOne(req, res) {
        let {email, userType} = req.body;
        let result = await service.verifyStepOne(email,userType);
        if (result === false){
            res.status(500).json({Message: "Internal server error"});
        }else if (result === "user not found"){
            res.status(404).json({Message: "The user not found"});
        }else if (result === "Doctor already verified"){
            res.status(200).json({Message: "Doctor already verified"});
        }else if (result === "Patient already verified"){
            res.status(200).json({Message: "Patient already verified"});
        }
        else{
            res.status(200).json(result);
        }
    }

    async verifyStepTwo(req,res) {
        let {code} = req.body;
        let token = req.params.token;
        let result = await service.verifyStepTwo(token,code);
        if(result === false){
            res.status(500).json({Message: "Internal server error"});
        }else if(result === 'user verified'){
            res.status(200).json({Message : "User verified successfully"});
        }else{
            res.status(401).json({Message: "Invalid code or fail in verification"});
        }
    }
}
module.exports = {
    AuthenticationController
}