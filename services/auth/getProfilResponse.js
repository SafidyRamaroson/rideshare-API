const axios = require("axios");
require("dotenv").config();
const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/api/auth/register/facebook/callback';

const getProfileResponse = async(code)=> {
    const response = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
    const { access_token } = response.data;
    const profileResponse = await axios.get(`https://graph.facebook.com/v13.0/me?fields=first_name,last_name,email&access_token=${access_token}`);
    return profileResponse?.data;
}

module.exports = getProfileResponse;

