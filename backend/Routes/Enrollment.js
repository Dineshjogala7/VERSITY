const express = require('express');
const joinCourse = require("../Controllers/Enrollment");
const router= express.Router();

// join Course Route 

router.post("/joincourse/:courseid",joinCourse);

module.exports = router;