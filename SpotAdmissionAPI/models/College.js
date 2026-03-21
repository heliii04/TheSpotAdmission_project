const mongoose = require('mongoose');


const collegeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        overview: String,
        location: String,
        streams: [String],
        courses: [String],
        fees: String,
        ranking: String,
        contact: { phone: String, email: String },
        images: [String],
    },
    { timestamps: true }
);


module.exports = mongoose.model('College', collegeSchema);

