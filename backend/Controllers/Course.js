const express = require('express')
const Course = require('../Models/Course');
const User = require('../Models/User');
async function addCourse(req, res) {
  try {
    const { title, price, description, category, tags, articles } = req.body;
    const userid = req.userid;

    // Uploaded file URLs from Cloudinary
    const videos = req.files?.videos?.map(f => f.path) || [];

    // 🔽 MODIFY THIS LINE — add fl_attachment for downloadable PDFs
    const pdfs = req.files?.pdfs?.map(f =>
      f.path.replace('/upload/', '/upload/fl_attachment/')
    ) || [];

    const thumbnail = req.files?.thumbnail?.[0]?.path || "";

    const user = await User.findById(userid);

    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    let parsedArticles = [];
    if (articles) {
      parsedArticles = typeof articles === 'string' ? JSON.parse(articles) : articles;
    }

    const newCourse = await Course.create({
      title,
      description,
      price,
      creator: userid,
      videos,
      pdfs, // these URLs are now downloadable
      articles: parsedArticles,
      thumbnail,
      category,
      tags: parsedTags
    });

    user.totalCoursesUploaded += 1;
    await user.save();
    await newCourse.save();

    return res.status(201).json({ message: "Course uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error in Uploading the course!!" });
  }
}


async function deleteCourse(req,res) {
    try {
        
        const userid = req.userid;
        const { courseid } = req.body;
        const user = await User.findById(userid);
        if(!user) return res.status(404).json({message : "User not found "});
        const course = await Course.findById(courseid);
        if (!course)return res.status(404).json({message : "Course not found "});
        const deletCourse = await Course.findByIdAndDelete(courseid);
        user.totalCoursesUploaded = Math.max(0, user.totalCoursesUploaded - 1);
        await user.save();
        return res.json({message : "Course is deleted Successfully!!",deletCourse},);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Deleting the course!!"})
    }
}



async function getCourse(req,res) {
    try {
        const {search} = req.params;
        let coursesData = [];
        if(search === 'TopRated'){
           coursesData = await Course.find({}).sort({ avgRating: -1 }).limit(10).populate({path:"creator",select:"profileImage userName"});;
        }
        else {

            coursesData = await Course.find({
            $or: [
                { category: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ]
            }).populate({path:"creator",select:"profileImage userName"});
        }
         
        if (!coursesData.length) {
            return res.status(404).json({  message: "No courses found" ,coursesData: []});
        }
        return res.status(200).json({message:'Fetched SuccessfullY',coursesData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error in fetching the data!!"});

    }
}


async function getUserCourses(req,res) {
  try {
    const userid = req.userid;
    const userCourses = await Course.find({ creator:userid});
    
    if(userCourses.length===0)return res.status(404).json({message : "You have n't uploaded any course yet",userCourses:[]})
    return res.status(200).json({message:"Fetched ,User Uploaded courses successfully!!",userCourses} );
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server Error in fetching out the user Courses"});
  }
}
module.exports = { addCourse , deleteCourse ,getCourse , getUserCourses}