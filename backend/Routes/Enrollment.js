const express = require('express');
const {joinCourse,getEnrolledCourses} = require("../Controllers/Enrollment");
const router= express.Router();

// join Course Route 

router.post("/joincourse/:courseid",joinCourse);


router.get("/getenrolled",getEnrolledCourses);
module.exports = router;