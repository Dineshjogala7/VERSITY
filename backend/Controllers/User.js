const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log req.file to debug
        console.log("Uploaded file data:", req.file);

        // Create new user with Cloudinary data
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            profileImage: req.file.path,           // Cloudinary URL
            profileImagePublicId: req.file.filename // Cloudinary public_id
        });

        await newUser.save();

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User created successfully",
            user: userResponse
        });

    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({ 
            message: "Error creating user", 
            error: error.message 
        });
    }
};



async function login(req,res) {
    try {
        const {email,password} = req.body;
        const foundEmail = await User.findOne({email})
        if (!foundEmail) return res.status(404).json({message:"Email not found Check once!!"});
        const check = await bcrypt.compare(password,foundEmail.password)
        if(!check)return res.status(401).json({message:"Password is wrong with this one!!"})
        const token = jwt.sign({id:foundEmail._id,email:foundEmail.email},process.env.JSON_SECRET_KEY);
        return res.json({message :"User Logged in successfully!!",token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Login Module!!"})

    }

}

module.exports = {signup,login}