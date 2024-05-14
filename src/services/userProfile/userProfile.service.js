const deleteUser = require("./deleteUser");
const getUserProfilByUserId = require("./getUser");
const udpateUserProfile = require("./udpateUserProfile");

const profilesServices = Object.freeze({
    deleteUser, 
    getUserProfilByUserId,
    udpateUserProfile,
});


module.exports = profilesServices;