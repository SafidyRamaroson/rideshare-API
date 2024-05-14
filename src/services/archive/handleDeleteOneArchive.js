const db = require("../../models");
const { ARCHIVE_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/httpException");


// verify save existance
// delete save by save id 
const handleDeleteOneArchive = async(archiveId)=> {

    const foundSave = await db.save.findByPk(archiveId);
       
    if(!foundSave){
            throw new  httpException(404,ARCHIVE_NOT_FOUND);
    }
    
    await db.archive.destroy({
        where : {
            archiveId
        }
    });
}

module.exports = handleDeleteOneArchive;