const Enrollment = require('../Models/Enrollment');
const User = require("../Models/User");
const Course = require("../Models/Course");

async function joinCourse(req, res) {
  try {
    const userid = req.userid;
    const { courseid } = req.params; 

    if(!userid || !courseid)
      return res.status(400).json({ message: "Please provide both user ID and course ID" });

    const user = await User.findById(userid);
    const course = await Course.findById(courseid);

    if (!user || !course)
      return res.status(404).json({ message: "User or Course not found" });

    const enrolledCourse = await Enrollment.create({
      userid,
      courseid,
    });
    user.totalCoursesPurchased += 1;
    const creator = await User.findById(course.creator);
    creator.totalRevenue += course.price;
    course.totalStudentsEnrolled += 1;
    await course.save();
    await user.save();
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

module.exports = joinCourse;
