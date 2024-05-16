const db = require("../models/index");
const { createUser, getLoginDialogUrl, getProfileResponse } = require("../services/auth/auth.service");
const { USER_ALREADY_EXIST } = require("../utils/error.message");
const handleError = require("../utils/handleError");
require("dotenv").config();


const register = async (req, res) => {
    try {
        const newUser = await createUser(req?.body);
        res.status(201).json({ user: newUser });
    } catch (error) {
        handleError(res,error);
    }
};

const redirectRegisterDialogFacebook = (req, res,next) => {
    try {
        const loginDialogUrl = getLoginDialogUrl();
        res.redirect(loginDialogUrl);
    } catch (error) {
        console.error("Error redirecting to Facebook login dialog:", e);
        next(error)
    }
};


const callbackFacebookRegister = async (req, res,next) => {
    try {
        const { code } = req?.query;
        const { first_name, last_name, email } = getProfileResponse(code);

        const foundUser = await db.user.findOne({ where: { email } });
        if (foundUser){
            return  res
            .json({message:USER_ALREADY_EXIST})
            .redirect("<URL after successful registration>");
        } 

        const user  = await db.user.create({ 
            firstName: first_name,
            lastName: last_name,
            email,
            hasTripCreated:false,
        });
        res
        .json({ userId: user.userId})
        .redirect("<URL after successful registration/to App home>");
    } catch (error) {
        console.error("Error during Facebook registration:", e);
        res.redirect('/login');
        next(error);
    }
};

module.exports = { register, callbackFacebookRegister, redirectRegisterDialogFacebook };
