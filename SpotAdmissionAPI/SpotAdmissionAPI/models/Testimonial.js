const mongoose = require('mongoose');


const testimonialSchema = mongoose.Schema(
    {
        name: String,
        role: String,
        message: String,
        rating: Number,
    },
    { timestamps: true }
);


module.exports = mongoose.model('Testimonial', testimonialSchema);