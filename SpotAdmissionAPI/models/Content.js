const mongoose = require('mongoose');


const contentSchema = mongoose.Schema(
{
title: String,
content: String,
author: String,
category: String,
coverImage: String,
},
{ timestamps: true }
);


module.exports = mongoose.model('Content', contentSchema);