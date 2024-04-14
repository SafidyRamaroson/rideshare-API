/** MANAGE THE REQUEST INCONMING AND RETURN RESPONSE ***/

// CREATE USER 
// Obtain INFO OF DRIVER ID
// Obtain INFO OF USER 
// Obtain ALL RESERVATION FOLLOWED BY USER
// OBTAIN INFORMATION ON A USER'S DRIVING LICENSES
// AND  THEIR RENTED CARS
// DELETE USER OR DRIVER ID
// UPDATE INFO OF CURRENT USER 
const udpateProfil = require("./updateProfile.controller");
const getProfil = require("./get.controller");
const getProfilByUserID = require("./getUserByID.controller");
const confirmDeleteAccount = require("./confirmAndDelete.controller");


const userController = Object.freeze({
    udpateProfil,
    getProfil,
    getProfilByUserID,
    confirmDeleteAccount,
});

module.exports = userController;
