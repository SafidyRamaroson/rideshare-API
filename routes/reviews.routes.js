const express = require("express");
const reviewsRouter = express.Router();
const { createOneReview, reviewsList, deleteReview } = require("../controllers/reviews.controller");


// one comment
reviewsRouter.post("/create/:tripId/:userId", createOneReview);

// list comments linked to a post 
reviewsRouter.get("/:tripId/list", reviewsList);

// delete one comment on a post 
reviewsRouter.delete("/:reviewId/delete/:userId", deleteReview);

// update a comment linked to a
//  post and user who update 
// that is the user who  created this comment on the post
module.exports = reviewsRouter;