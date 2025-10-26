const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number , 
        required : true,
        default : 0
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    videos :[{type:String}],
    pdfs : [{type:String}],
    articles: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true } // can store HTML or markdown
        }
    ],
    thumbnail : {type:String },
    totalStudentsEnrolled : {
        type:Number,
        default:0
    },
    avgRating : {
        type : Number,
        default : 0
    },
    ratingsCount : {
        type : Number,
        default : 0
    },
    category : {
        type:  String
    },
    tags : [{type : String}]
},{timestamps : true})

module.exports = mongoose.model("Course",courseSchema);