const mongoose = require('mongoose');

const reviewSchema  = new mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    },
    courseid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required: true
    },
    rating : {
        type :Number,
        default:null
    },
    comment: {type : String,
        default : ""
    }
},{timestamps :true});

module.exports = mongoose.model("Review",reviewSchema);