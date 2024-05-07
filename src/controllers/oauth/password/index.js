const forgotPassword = require('./forgotPassword.controller');
const resetPassword = require("./resetPassword.controller");


const passwordController = Object.freeze({
    forgotPassword,
    resetPassword,
});


module.exports = passwordController;