const expressVideo = require('express');
const routerVideo = expressVideo.Router();
const videoController = require('../controllers/videoController');
const { protect, admin } = require('../middleware/authMiddleware');


routerVideo.route('/video').get(videoController.getVideos).post(protect, admin, videoController.uploadVideo);
routerVideo.route('/video/:id').get(videoController.getVideoById).put(protect, admin, videoController.updateVideo).delete(protect, admin, videoController.deleteVideo);


module.exports = routerVideo;