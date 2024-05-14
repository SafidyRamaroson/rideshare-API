// const handleCreateOneArchive = require("../../services/archive/handleCreateOneArchive");
const handleCreateOneArchive = require("../services/archive/handleCreateOneArchive");
const handleDeleteOneArchive = require("../services/archive/handleDeleteOneArchive");

// verify user existance 
// verify trip existance 
const saveOneTrip = async(req, res,next) => {
    
    const { userId , tripId } = req.params;
    
    try {
        await handleCreateOneArchive(userId, tripId);
        res.status(201).send();
    } catch (error) {
        console.log("Error :",error);
        next(error);
    }
}

const getAllArchives  = async(req,res,next) => {
    try {
        const archivesList  = await getArchivesList(req?.params?.userId);
        res.status(200).send(archivesList);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const deleteOneArchive = async(req, res, next) =>{
    try {
        await handleDeleteOneArchive(req?.params?.archiveId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {saveOneTrip , getAllArchives,deleteOneArchive};
