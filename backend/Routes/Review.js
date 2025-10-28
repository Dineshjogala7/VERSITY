const express = require("express");
const { postReview ,deleteReview ,updateStreak } = require("../Controllers/Review");

const router = express.Router();

router.post("/postreview/:courseid",postReview);

router.delete("/deletereview/:reviewid",deleteReview);

router.post("/updatestreak",updateStreak);
module.exports = router;