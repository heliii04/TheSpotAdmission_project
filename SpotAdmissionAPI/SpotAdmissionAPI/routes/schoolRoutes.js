const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getSchools,
    getSchoolById,
    createSchool,
    updateSchool,
    deleteSchool,
} = require('../controllers/schoolController');


router.route('/school').get(getSchools).post(protect, admin, createSchool);
router.route('/school/:id').get(getSchoolById).put(protect, admin, updateSchool).delete(protect, admin, deleteSchool);


module.exports = router;