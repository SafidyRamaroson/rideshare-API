const db = require("./../../models/index");

const confirmDeleteAccount = async(req,res)=>{
    const UserID = req.params.UserID;
    const confirmed = req.body.confirmation;

    
    try{
        if(!confirmed){
            return res.status(400).json({message:"Confirmation required to delete user"});
        }
        const deletedUser  = await db.user.destroy({where:{UserID}});
        if(!deletedUser){
            return res.status(400).json({message:"User to delete is not found"});
        }

        res.status(200).json({message:"User deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

module.exports = confirmDeleteAccount;