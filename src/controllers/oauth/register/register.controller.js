const db = require("../../../models/index");
const hashPassword = require("../../../utils/user/hashPassword");
const axios = require("axios");
const { parseRegisterData } = require("./../../../validations/validation");
require("dotenv").config();

const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/api/auth/register/facebook/callback';

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { error, success } = parseRegisterData(req.body);
        if (!success) throw new Error(Object.values(error)[0]);

        const foundUser = await db.user.findOne({ where: { email } });
        if (foundUser) throw new Error("User already exists with this email");

        const hashedPassword = await hashPassword(password);

        if (req.body.unsubscribe) {
            await db.SpecialSubscriber.findOrCreate({ where: { email } });
        }

        await db.user.create({ firstName, lastName, email, password: hashedPassword });
        res.status(200).json({ message: "User successfully registered" });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(400).json({ error: error.message });
    }
};

const redirectRegisterDialogFacebook = (req, res) => {
    try {
        const loginDialogUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
        res.redirect(loginDialogUrl);
    } catch (error) {
        console.error("Error redirecting to Facebook login dialog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const callbackFacebookRegister = async (req, res) => {
    try {
        const { code } = req.query;
        const response = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
        const { access_token } = response.data;
        const profileResponse = await axios.get(`https://graph.facebook.com/v13.0/me?fields=first_name,last_name,email&access_token=${access_token}`);
        const { first_name, last_name, email, id } = profileResponse.data;

        const foundUser = await db.user.findOne({ where: { email } });
        if (foundUser) return res.redirect("<URL after successful registration>");

        await db.user.create({ firstName: first_name, lastName: last_name, email, facebookID: id });
        res.send("<URL after successful registration>");
    } catch (error) {
        console.error("Error during Facebook registration:", error);
        res.redirect('/login');
    }
};

module.exports = { register, callbackFacebookRegister, redirectRegisterDialogFacebook };
