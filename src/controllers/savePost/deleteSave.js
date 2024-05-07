const  db  = require("./../../models/index");

// verify save existance
// delete save by save id 
const deleteSave = async(req ,res)=> {
    const { saveId } = req.params;

    try {
        const foundSave = await db.save.findByPk(saveId);
        if(!foundSave){
            return res.status(400).json({
                message:"Save not found"
            });
        }

        await db.save.destroy({
            where : {
                saveId
            }
        });

        res.status(200).json({
            message:"Deleted"
        });

    } catch (e) {
        console.log("Error ",e);
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports = deleteSave;