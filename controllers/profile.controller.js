const { USER_DELETED } = require("../utils/error.message");
const { 
    deleteUser ,
    getUserProfilByUserId ,
    udpateUserProfile,
} = require("../services/userProfile/userProfile.service");
const handleError = require("../utils/handleError");
const db = require("../models");
const generateToken = require("../utils/generateToken");


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
const updateUserProfile = async(req,res)=> {
    const { userId } = req.params
    try {
        await udpateUserProfile(userId,req.body)
        const updateUser = await db.user.findByPk(userId)
        const userToken =  generateToken(updateUser);
        res.status(200).json({token:userToken});

    } catch (error) {
        handleError(res,error)
    }
}


module.exports = {
    getUserProfile ,
    confirmDeleteAccount,
    updateUserProfile,
 };