const expressC = require('express');
const routerC = expressC.Router();
const { protect: protectC, admin: adminC } = require('../middleware/authMiddleware');
const collegeController = require('../controllers/collegeController');


routerC.route('/college').get(collegeController.getColleges).post(protectC, adminC, collegeController.createCollege);
routerC.route('/college/:id').get(collegeController.getCollegeById).put(protectC, adminC, collegeController.updateCollege).delete(protectC, adminC, collegeController.deleteCollege);


module.exports = routerC;