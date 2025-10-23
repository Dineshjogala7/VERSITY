const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    password:{
        type : String,
        required:true,
    },
    profileImage :{
        type:String
    },
    totalRevenue:{
        type:Number,
        default:0
    },
    totalCoursesUploaded :{
        type:Number,
        default:0
    },
    totalCoursesPurchased:{
        type:Number,
        default:0
    },
    streak:{
        currentStreak : {
            type : Number,
            default:0
        },
        lastVisited: {type:Date},

    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);