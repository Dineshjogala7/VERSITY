const Review = require("../Models/Review");
const Course = require("../Models/Course");
const User = require("../Models/User");
async function postReview(req, res) {
  try {
    const { courseid } = req.params;
    const userid = req.userid;
    const { msg, rating } = req.body;

   
    if (!msg || !rating)
      return res.status(400).json({ message: "Provide all the details!!" });

    if (isNaN(rating) || rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });

    const course = await Course.findById(courseid);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    const existingReview = await Review.findOne({ userid, courseid });
    if (existingReview)
      return res.status(400).json({ message: "You already reviewed this course" });

    course.avgRating =
      (course.avgRating * course.ratingsCount + Number(rating)) /
      (course.ratingsCount + 1);
    course.ratingsCount += 1;
    await course.save();

    const newReview = await Review.create({
      userid,
      courseid,
      rating: Number(rating),
      comment: msg,
    });

    return res.status(201).json({
      message: "Review uploaded successfully!",
      newReview,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while creating the review!" });
  }
}


async function  deleteReview(req,res) {
   try {
      const {reviewid} = req.params;
      
      const review = await Review.findById(reviewid);
      if(!review) return res.status(404).json({message: "You didnt posted the review "});

      const deletedReview = await Review.findByIdAndDelete(reviewid);
      return res.json({message : "Successfully deleted the review!!",deleteReview})
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Server Error in deleting the review!!"});
   }
}


async function updateStreak(req,res) {
    try {
        const userid = req.userid;
        const user = await User.findById(userid);
        if (!user) 
      return res.status(404).json({ message: "User not found" });

        const previousDate = user.streak.lastVisited || new Date();
        const diff = Math.floor(
      (Date.now() - new Date(previousDate)) / (1000 * 60 * 60 * 24)
    );
        if(diff === 0){
            return res.status(201).json({message: "already streak upadted",Streak : user.streak});
        }
        else if(diff===1){
            user.streak.currentStreak+=1;
            user.streak.lastVisited =new Date();;
            
        }
        else{
            user.streak.currentStreak = 1;
            user.streak.lastVisited = new Date();
        };
        await user.save();
        return res.status(201).json({message : "Streak is already updated!!",Streak : user.streak})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Server Error in updating the Streak!!"});
    }
}
module.exports = { postReview , deleteReview ,updateStreak} 
