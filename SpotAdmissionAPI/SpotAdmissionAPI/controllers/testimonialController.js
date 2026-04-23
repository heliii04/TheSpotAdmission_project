const asyncHandlerTest = require('express-async-handler');
const Testimonial = require('../models/Testimonial');


exports.createTestimonial = asyncHandlerTest(async (req, res) => { const t = new Testimonial(req.body); const created = await t.save(); res.status(201).json(created); });


exports.getTestimonials = asyncHandlerTest(async (req, res) => { const items = await Testimonial.find({}).limit(200); res.json(items); });


exports.getTestimonialById = asyncHandlerTest(async (req, res) => { const t = await Testimonial.findById(req.params.id); if (!t) { res.status(404); throw new Error('Testimonial not found'); } res.json(t); });


exports.updateTestimonial = asyncHandlerTest(async (req, res) => { const t = await Testimonial.findById(req.params.id); if (!t) { res.status(404); throw new Error('Testimonial not found'); } Object.assign(t, req.body); const updated = await t.save(); res.json(updated); });


exports.deleteTestimonial = asyncHandlerTest(async (req, res) => { const t = await Testimonial.findById(req.params.id); if (!t) { res.status(404); throw new Error('Testimonial not found'); } await t.deleteOne(); res.json({ message: 'Testimonial removed' }); });