const db = require("../../models");
const { USER_NOT_FOUND, REVIEW_NOT_FOUND, UNAUTHORIZED } = require("../../utils/error.message");
const httpException = require("../../utils/httpException");


const handleDeleteOneReview = async(reviewId,userId) => {
    
    const foundReview =  await db.reviews.findByPk(reviewId);
    const user = await db.user.findByPk(userId);

        if(!user){
            throw new httpException(400,USER_NOT_FOUND);
        }

        if(!foundReview){
            throw new httpException(400,REVIEW_NOT_FOUND);
        }

        if(foundReview.userId != userId){
            throw new httpException(400,UNAUTHORIZED);
        }

        await db.reviews.destroy({
            where: {
                reviewId,
            }
        });
}

module.exports = handleDeleteOneReview;