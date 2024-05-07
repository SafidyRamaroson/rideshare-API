/** MANAGE THE REQUEST INCONMING AND RETURN RESPONSE ***/

// CREATE USER 
// Obtain INFO OF DRIVER ID
// Obtain INFO OF USER 
// Obtain ALL RESERVATION FOLLOWED BY USER
// OBTAIN INFORMATION ON A USER'S DRIVING LICENSES
// AND  THEIR RENTED CARS
// DELETE USER OR DRIVER ID
// UPDATE INFO OF CURRENT USER 
const updateProfile = require("./updateProfile.controller");
const getProfil = require("./get.controller");
const getProfilByuserId = require("./getUserByID.controller");
const confirmDeleteAccount = require("./confirmAndDelete.controller");


const userController = Object.freeze({
    updateProfile,
    getProfil,
    getProfilByuserId,
    confirmDeleteAccount,
});

module.exports = userController;
