/** MANAGE THE REQUEST INCONMING AND RETURN RESPONSE ***/

// CREATE USER 
// Obtain INFO OF DRIVER ID
// Obtain INFO OF USER 
// Obtain ALL RESERVATION FOLLOWED BY USER
// OBTAIN INFORMATION ON A USER'S DRIVING LICENSES
// AND  THEIR RENTED CARS
// DELETE USER OR DRIVER ID
// UPDATE INFO OF CURRENT USER 
const register = require("./register.controller");
const login = require("./login.controller");
const udpateProfil = require("./updateProfile.controller");
const getProfil = require("./get.controller");
const getProfilByUserID = require("./getUserByID.controller");
const confirmDeleteAccount = require("./confirmAndDelete.controller");
const forgotPassword = require("./forgotPassword.controller");
const resetPassword = require("./resetPassword.controller");

const userController = Object.freeze({
    register,
    login,
    udpateProfil,
    getProfil,
    getProfilByUserID,
    confirmDeleteAccount,
    forgotPassword,
    resetPassword,
});

module.exports = userController;
