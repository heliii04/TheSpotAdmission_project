const asyncHandlerCounselling = require('express-async-handler');
const Counselling = require('../models/Counselling');


exports.createBooking = asyncHandlerCounselling(async (req, res) => {
    const data = req.body;
    const booking = new Counselling({ ...data, user: req.user ? req.user._id : null });
    const created = await booking.save();
    res.status(201).json(created);
});


exports.getBookings = asyncHandlerCounselling(async (req, res) => { const bookings = await Counselling.find({}).populate('user', 'name email'); res.json(bookings); });


exports.getBookingById = asyncHandlerCounselling(async (req, res) => { const b = await Counselling.findById(req.params.id); if (!b) { res.status(404); throw new Error('Booking not found'); } res.json(b); });


exports.updateBooking = asyncHandlerCounselling(async (req, res) => { const b = await Counselling.findById(req.params.id); if (!b) { res.status(404); throw new Error('Booking not found'); } Object.assign(b, req.body); const updated = await b.save(); res.json(updated); });


exports.deleteBooking = asyncHandlerCounselling(async (req, res) => { const b = await Counselling.findById(req.params.id); if (!b) { res.status(404); throw new Error('Booking not found'); } await b.deleteOne(); res.json({ message: 'Booking removed' }); });