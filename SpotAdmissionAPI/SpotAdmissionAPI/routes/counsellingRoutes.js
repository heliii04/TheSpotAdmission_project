const expressCounselling = require('express');
const routerCounselling = expressCounselling.Router();
const counsellingController = require('../controllers/counsellingController');
const { protect, admin } = require('../middleware/authMiddleware');


routerCounselling.route('/counselling').post(protect, counsellingController.createBooking).get(protect, admin, counsellingController.getBookings);
routerCounselling.route('/counselling/:id').get(protect, counsellingController.getBookingById).put(protect, counsellingController.updateBooking).delete(protect, counsellingController.deleteBooking);


module.exports = routerCounselling;