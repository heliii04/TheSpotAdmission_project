const mongoose = require('mongoose');


const collegeSchema = mongoose.Schema(
    {
        fullName: String,
        dob: String,
        gender: String,
        email: String,
        contact: Number,
        fatherName: String,
        fatherOcc: String,
        fatherContact: Number,
        motherName: String,
        motherOcc: String,
        motherContact: Number,
        parentEmail: String,
        address: String,
        country:String,
        city:String,
        state:String,
        pincode:Number,
        admissionLevel:String,
        boardSeatNo:Number,
        boardName:String,
        yearOfPassing:Number,
        tenthPercent:Number,
        twelfthPercent:Number,
        degree:String,
        entranceExam:String,
        scoreRank:Number,
        location: String,
        fees: String,
    },
    { timestamps: true }
);


module.exports = mongoose.model('College', collegeSchema);

