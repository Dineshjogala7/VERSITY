const express = require("express");
const { postReview ,deleteReview ,updateStreak ,getReviews,quiz} = require("../Controllers/Review");

const router = express.Router();

router.post("/postreview/:courseid",postReview);

router.delete("/deletereview/:reviewid",deleteReview);

router.post("/updatestreak",updateStreak);
router.get("/getreview/:courseid",getReviews);

router.post("/getquiz",quiz);
module.exports = router;