const getReviewsList = require("../services/reviews/getReviewsList");
const handleCreateOneReview = require("../services/reviews/handleCreateReview");
const handleDeleteOneReview = require("../services/reviews/handleDeleteOneReview");
const { REVIEW_CREATED } = require("../utils/error.message");


// create one review
const createOneReview  = async(req,res)=> {
    
    try {
        await handleCreateOneReview(req);
        res.status(201).json({
            message:REVIEW_CREATED
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Reviews list on one Post trip
const reviewsList  = async(req,res,next)=> {
    try {
        const reviews  = await getReviewsList(req?.params?.tripId);
        res.status(200).send(reviews);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// delete one review
const deleteReview  = async(req, res)=>{

    const { reviewId , userId } = req.params;
    try {
        await handleDeleteOneReview(reviewId,userId);
        res.status(204).send();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
} 
module.exports = {reviewsList,createOneReview,deleteReview};