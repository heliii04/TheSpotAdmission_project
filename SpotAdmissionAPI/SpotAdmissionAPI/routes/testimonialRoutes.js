const expressTestimonial = require('express');
const routerTestimonial = expressTestimonial.Router();
const testimonialController = require('../controllers/testimonialController');
const { protect, admin } = require('../middleware/authMiddleware');


routerTestimonial.route('/testimonial').get(testimonialController.getTestimonials).post(protect, admin, testimonialController.createTestimonial);
routerTestimonial.route('/testimonial/:id').get(testimonialController.getTestimonialById).put(protect, admin, testimonialController.updateTestimonial).delete(protect, admin, testimonialController.deleteTestimonial);


module.exports = routerTestimonial;