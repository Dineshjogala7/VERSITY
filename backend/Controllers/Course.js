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
        
        await newCourse.save();
        return res.status(201).json({message: " course uploaded sucessfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Uploading the course!!"})
    }
}






module.exports = addCourse