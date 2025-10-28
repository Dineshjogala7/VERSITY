const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        console.log("Uploaded file data:", req.file);

      
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            profileImage: req.file.path,           
            profileImagePublicId: req.file.filename
        });

        await newUser.save();

        
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
        if (!email || !password) return res.status(400).json({message:"Details Must be provided!!"})
        const foundEmail = await User.findOne({email})
        if (!foundEmail) return res.status(404).json({message:"Email not found Check once!!"});
        const check = await bcrypt.compare(password,foundEmail.password)
        if(!check)return res.status(401).json({message:"Password is wrong with this one!!"})
        const token = jwt.sign({id:foundEmail._id,email:foundEmail.email},process.env.JSON_SECRET_KEY);
        return res.json({message :"User Logged in successfully!!",token,user:foundEmail})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Login Module!!"})

    }

}




module.exports = {signup,login}