const mongoose = require('mongoose');


const podcastSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        audioUrl: String,
        youtubeUrl: String,
        guests: [String],
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Podcast', podcastSchema)