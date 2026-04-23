const expressPodcast = require('express');
const routerPodcast = expressPodcast.Router();
const podcastController = require('../controllers/podcastController');
const { protect, admin } = require('../middleware/authMiddleware');


routerPodcast.route('/podcast').get(podcastController.getPodcasts).post(protect, admin, podcastController.createPodcast);
routerPodcast.route('/podcast/:id').get(podcastController.getPodcastById).put(protect, admin, podcastController.updatePodcast).delete(protect, admin, podcastController.deletePodcast);


module.exports = routerPodcast;