const express = require('express')
const uploadMultiple = require('../Middlewares/courseUploads');
const {addCourse , deleteCourse} = require('../Controllers/Course')
const router = express.Router();



//router for adding the course , i used the fields bcoz the data may be of any type and in the controller it will be files
router.post("/addcourse",uploadMultiple.fields([
    { name: 'videos', maxCount: 5 },
    { name: 'pdfs', maxCount: 3 },
    { name: 'thumbnail', maxCount: 1 }]),
    addCourse
)

//router for the deleting the course by user
router.delete("/deletecourse",deleteCourse)

module.exports = router
