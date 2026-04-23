const mongoose = require('mongoose');


const admissionSchema = mongoose.Schema(
    {
        studentName: { type: String },
        school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
        college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
        stage: { type: String },
        documents: [String],
        deadline: { type: Date },
        status: { type: String, enum: ['incomplete', 'submitted', 'accepted', 'rejected'], default: 'incomplete' },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Admission', admissionSchema);