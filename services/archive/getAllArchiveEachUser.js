const db = require("../../models");
const { USER_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/httpException");


const getArchivesList = async(userId) => {
    const foundUser = await db.user.findByPk(userId);

        if(!foundUser){
            throw new httpException(400,USER_NOT_FOUND);
        }

        const archivesList   = await db.archive.findAll({
            where:{
                userId
            }
        });

        return archivesList;
}

module.exports = getArchivesList;
