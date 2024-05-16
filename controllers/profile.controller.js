const { USER_PROFIL_UPDATED, USER_DELETED } = require("../utils/error.message");
const { 
    deleteUser ,
    getUserProfilByUserId ,
    udpateUserProfile,
} = require("../services/userProfile/userProfile.service");
const db = require("../models");


// confirm and delete account OK
const confirmDeleteAccount = async(req,res,next)=>{
    const userId = req.params?.userId;
    const confirmed = req.body?.confirmation;
    try{
        await deleteUser(userId,confirmed);
        res.status(200).json({message:USER_DELETED});
    }catch(error){
        next(error);
    }
}

// get profile by users/:id OK
const getUserProfile = async(req,res)=>{
    const userId = req.params?.userId;
    try {
        const user = getUserProfilByUserId(userId);
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }

}


// update user profile OK
const updateUserProfile = async(req,res,next)=> {
    const { userId } = req.params;
    const { password } = req.body;

    try {
        await udpateUserProfile(userId,password,req.body);
        res.status(200).json({
            message:USER_PROFIL_UPDATED
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getUserProfile ,
    confirmDeleteAccount,
    updateUserProfile,
 };