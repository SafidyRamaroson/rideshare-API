const createUser = require("./createUser");
const getLoginDialogUrl = require("./getLoginDialogUrl");
const getProfileResponse = require("./getProfilResponse");
const handleLogin = require("./handleLogin");


const authService  = Object.freeze({
    createUser,
    getLoginDialogUrl,
    getProfileResponse,
    handleLogin,
});

module.exports = authService;