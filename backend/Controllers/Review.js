const Review = require("../Models/Review");
const Course = require("../Models/Course");
const User = require("../Models/User");
require('dotenv').config();
const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GROQ_API  });
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


async function updateStreak(req, res) {
    try {
        const userid = req.userid;
        const user = await User.findById(userid);
        if (!user) 
            return res.status(404).json({ message: "User not found" });

        // Safety check: if lastVisited doesn't exist, initialize streak
        if (!user.streak.lastVisited) {
            user.streak.currentStreak = 1;
            user.streak.lastVisited = new Date();
            await user.save();
            return res.status(200).json({
                message: "Streak initialized!",
                Streak: user.streak
            });
        }

        const now = new Date();
        const previousDate = new Date(user.streak.lastVisited);
        const diff = Math.floor((now - previousDate) / (1000 * 60 * 60 * 24));

        if (diff === 0) {
            return res.status(200).json({
                message: "Streak already updated today",
                Streak: user.streak
            });
        }
        else if (diff === 1) {
            user.streak.currentStreak += 1;
            user.streak.lastVisited = now;
        }
        else {
            user.streak.currentStreak = 1;
            user.streak.lastVisited = now;
        }
        
        await user.save();
        return res.status(200).json({
            message: "Streak updated successfully!",
            Streak: user.streak
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error in updating the Streak!!"
        });
    }
}


async function getReviews(req,res) {
  try {
    const {courseid} = req.params;
    if(!courseid) return res.status(404).json({message:'Courseid was not given!!'})

    
    const reviews = await Review.find({ courseid })
  .populate({
    path: 'userid',
    select: 'profileImage userName',
  });

    return res.status(200).json({message:"succesfully fetched",reviews})


  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Server Error in fetching the reviews'})
  }
}


// CONTROLLER: review/getquiz
async function quiz(req,res) {
    try {
        const { topic } = req.body;

        const prompt = `
        Generate 15 multiple-choice quiz questions on the topic "${topic}".
        The questions should range from 5 easy ,5 medium , 5 Hard
        Each question object MUST strictly adhere to the following JSON structure:
        {
          "question": "The question text.",
          "options": {
            "A": "Option A text",
            "B": "Option B text",
            "C": "Option C text",
            "D": "Option D text"
          },
          "correctAnswer": "A" // Must be one of the keys: A, B, C, or D
        }
        Return the result as a single JSON object with a key named "questions" containing a JSON array of the 15 question objects.
        `;

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            // 💡 CRITICAL FIX 1: Enable JSON Mode for predictable output
            response_format: { type: "json_object" }, 
        });

        const text = completion.choices[0]?.message?.content?.trim();

        // 💡 CRITICAL FIX 2: Since we requested a JSON object with a "questions" key,
        // we parse the object and extract the array.
        const responseData = JSON.parse(text);
        
        // Ensure the LLM provided the array under the "questions" key
        const questions = responseData.questions;

        if (!questions || !Array.isArray(questions)) {
             throw new Error("Invalid structure returned by LLM: Missing or non-array 'questions' field.");
        }

        return res.status(200).json({
            success: true,
            topic,
            questions, // This is now a clean array of questions
        });

    } catch (error) {
        console.error("Error in quiz generation:", error); // Use console.error for clarity
        return res.status(500).json({message: "Server Error in getting the quiz data"});
    }
}
module.exports = { postReview , deleteReview ,updateStreak,getReviews,quiz} 
