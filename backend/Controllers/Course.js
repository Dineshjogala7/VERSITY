const express = require('express')
const Course = require('../Models/Course');
const User = require('../Models/User');
async function addCourse(req,res) {
    try {
        const {title , price , description , category , tags , articles} = req.body
        const userid = req.userid;
        const videos = req.files?.videos?.map(f => f.path) || [];
        const pdfs = req.files?.pdfs?.map(f => f.path) || [];
        const thumbnail = req.files?.thumbnail?.[0]?.path || "";
        const user = await User.findById(userid);

        let parsedTags = []
        if(tags){
            parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags
        }
        let parsedArticles = []
        if(articles){
            parsedArticles = typeof articles === 'string' ? JSON.parse(articles) : articles
        }


        const newCourse = await Course.create({
            title,description,price,creator:userid,videos,pdfs,articles : parsedArticles,thumbnail,category,tags:parsedTags
        })
        user.totalCoursesUploaded+=1
        await user.save();
        await newCourse.save();
        return res.status(201).json({message: " course uploaded sucessfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Uploading the course!!"})
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



module.exports = { addCourse , deleteCourse }