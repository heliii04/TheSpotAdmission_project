const expressAdmission = require('express');
const routerAdmission = expressAdmission.Router();
const admissionController = require('../controllers/admissionController');
const { protect, admin } = require('../middleware/authMiddleware');


routerAdmission.route('/admission').post(protect, admissionController.createAdmission).get(protect, admin, admissionController.getAdmissions);
routerAdmission.route('/admission/:id').get(protect, admissionController.getAdmissionById).put(protect, admissionController.updateAdmission).delete(protect, admissionController.deleteAdmission);


module.exports = routerAdmission;