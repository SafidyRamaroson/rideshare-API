require("dotenv").config();
const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/api/auth/register/facebook/callback';

const getLoginDialogUrl = () => `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;


module.exports = getLoginDialogUrl;