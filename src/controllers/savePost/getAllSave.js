const { db } = require("../../models/index");

// verify user existance
// get all save by user 
const getAllSave =  async(req,res)=>{
    const {  userId } = req.params;

    try {
        const foundUser = await db.user.findByPk(userId);

        if(!foundUser){
            return res.status(400).json({
                message:"User not found"
            });
        }

        const allSaveByUser  = await db.save.findAll({
            where:{
                userId
            }
        });

        res.status(200).json({
            data:allSaveByUser
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports = getAllSave;