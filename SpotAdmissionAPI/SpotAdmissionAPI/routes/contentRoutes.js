const expressContent = require('express');
const routerContent = expressContent.Router();
const contentController = require('../controllers/contentController');
const { protect, admin } = require('../middleware/authMiddleware');


routerContent.route('/content').get(contentController.getContents).post(protect, admin, contentController.createContent);
routerContent.route('/content/:id').get(contentController.getContentById).put(protect, admin, contentController.updateContent).delete(protect, admin, contentController.deleteContent);


module.exports = routerContent