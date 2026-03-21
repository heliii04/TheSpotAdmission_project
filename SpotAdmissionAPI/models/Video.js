const mongoose = require('mongoose');


const videoSchema = mongoose.Schema(
{
title: { type: String, required: true },
category: { type: String },
description: { type: String },
url: { type: String },
uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true }
);


module.exports = mongoose.model('Video', videoSchema);