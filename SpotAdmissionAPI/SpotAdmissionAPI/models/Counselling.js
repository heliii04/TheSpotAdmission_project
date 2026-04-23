const mongoose = require('mongoose');


const counsellingSchema = mongoose.Schema(
{
studentName: { type: String, required: true },
grade: { type: String },
serviceType: { type: String },
preferredDate: { type: Date },
notes: { type: String },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
},
{ timestamps: true }
);


module.exports = mongoose.model('Counselling', counsellingSchema);