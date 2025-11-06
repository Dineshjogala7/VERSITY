const Enrollment = require('../Models/Enrollment');
const User = require("../Models/User");
const Course = require("../Models/Course");

async function joinCourse(req, res) {
  try {
    const userid = req.userid;
    const { courseid } = req.params; 

    // Fetch user and course first
    const user = await User.findById(userid);
    const course = await Course.findById(courseid);

    if (!user || !course) 
      return res.status(404).json({ message: "User or Course not found" });

    // Check if user is the creator
    if (course.creator.equals(userid)) 
      return res.status(400).json({ message: "Course created by you, unable to join" });

    // Enroll user
    const enrolledCourse = await Enrollment.create({ userid, courseid });
    await enrolledCourse.populate({
      path: "courseid",
      populate: { path: "creator", select: "userName" },
    });

    // Update stats
    user.totalCoursesPurchased += 1;
    course.totalStudentsEnrolled += 1;

    const creator = await User.findById(course.creator);
    creator.totalRevenue += course.price;

    await user.save();
    await course.save();
    await creator.save();

    return res.status(201).json({
      message: "Enrolled in the course successfully!",
      enrolledCourse,
    });
  } catch (error) {
    console.error("Join course error:", error);
    return res.status(500).json({
      message: "Server error in enrolling in the course!",
    });
  }
}


async function getEnrolledCourses(req,res) {
  try {
    
    const userid = req.userid
    // Here I want all the Course model attributes
        const enrolledCourse = await Enrollment.find({ userid })
  .populate({
    path: "courseid",
    populate: {
      path: "creator", // this is the ref inside Course schema
      select: "userName", // only fetch userName from User model
    },
  });

    if (enrolledCourse.length === 0) return res.status(400).json({message:"Courses not found!!",enrolledCourse});
    return res.status(200).json({message:"Fetched Courses Successfuly",enrolledCourse});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server Error in getting COurses!!"});
  }
}
module.exports = {joinCourse,getEnrolledCourses}
