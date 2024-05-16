const handleForgotPassword = require("../services/password/handleForgotPassword");
const handleResetPassword = require("../services/password/handleResetPassword");
const { USER_PROFIL_UPDATED } = require("../utils/error.message");
require("dotenv").config();


const forgotPassword = async(req,res,next)=>{
    const { email } = req.body;

    try {
        await handleForgotPassword(email);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const resetPassword = async(req,res,next)=>{
    try {
        await handleResetPassword(req);
        res.status(200).json({message:USER_PROFIL_UPDATED});
    } catch (error) {
        next(error);
    }
}

module.exports = { forgotPassword, resetPassword }; 
