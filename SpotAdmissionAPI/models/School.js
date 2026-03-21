const mongoose = require('mongoose');


const schoolSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        overview: { type: String },
        location: { type: String },
        curriculum: { type: String },
        fees: { type: String },
        facilities: [String],
        contact: { phone: String, email: String },
        images: [String],
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);


module.exports = mongoose.model('School', schoolSchema);