const { login,
    redirectToLoginDialogFacebook,
    callbackFacebookLogin,
    logout 
} = require("./auth.controller");

const authController = Object.freeze({
    login,
    redirectToLoginDialogFacebook,
    callbackFacebookLogin,
    logout
});

module.exports = authController;

