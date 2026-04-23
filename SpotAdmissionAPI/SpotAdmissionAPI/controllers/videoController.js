const asyncHandlerVideo = require('express-async-handler');
const Video = require('../models/Video');


exports.uploadVideo = asyncHandlerVideo(async (req, res) => {
    const { title, url, category, description } = req.body;
    const video = new Video({ title, url, category, description, uploadedBy: req.user ? req.user._id : null });
    const created = await video.save();
    res.status(201).json(created);
});


exports.getVideos = asyncHandlerVideo(async (req, res) => { const videos = await Video.find({}).limit(200); res.json(videos); });


exports.getVideoById = asyncHandlerVideo(async (req, res) => { const v = await Video.findById(req.params.id); if (!v) { res.status(404); throw new Error('Video not found'); } res.json(v); });


exports.updateVideo = asyncHandlerVideo(async (req, res) => { const v = await Video.findById(req.params.id); if (!v) { res.status(404); throw new Error('Video not found'); } Object.assign(v, req.body); const updated = await v.save(); res.json(updated); });


exports.deleteVideo = asyncHandlerVideo(async (req, res) => { const v = await Video.findById(req.params.id); if (!v) { res.status(404); throw new Error('Video not found'); } await v.deleteOne(); res.json({ message: 'Video removed' }); });