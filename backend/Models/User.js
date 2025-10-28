const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
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
        type:String,
        required :true
    },
    profileImagePublicId:{
        type:String,
        required :true
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
            default:1
        },
        lastVisited: {type:Date,
            default : Date.now()
        },

    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);