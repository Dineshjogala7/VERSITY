const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    courseid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    paymentStatus : {
        type:String,
        enume: ['pending','completed','failed'],
        default : 'completed'
    },
    paymentId: {
        type:String
    },
    liked :{
        type : Boolean,
        default:  false
    },
    completed : {
        type: Boolean,
        default : false
    },
    

},{timestamps: true})

module.exports = mongoose.model("Enrollment",enrollmentSchema);