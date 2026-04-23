const asyncHandlerC = require('express-async-handler');
const College = require('../models/College');


exports.getColleges = asyncHandlerC(async (req, res) => {
    const { location, q } = req.query;
    const filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { overview: new RegExp(q, 'i') }];
    const items = await College.find(filter).limit(200);
    res.json(items);
});


exports.getCollegeById = asyncHandlerC(async (req, res) => { const item = await College.findById(req.params.id); if (!item) { res.status(404); throw new Error('College not found'); } res.json(item); });


exports.createCollege = asyncHandlerC(async (req, res) => { const item = new College(req.body); const created = await item.save(); res.status(201).json(created); });


exports.updateCollege = asyncHandlerC(async (req, res) => { const item = await College.findById(req.params.id); if (!item) { res.status(404); throw new Error('College not found'); } Object.assign(item, req.body); const updated = await item.save(); res.json(updated); });


exports.deleteCollege = asyncHandlerC(async (req, res) => { const item = await College.findById(req.params.id); if (!item) { res.status(404); throw new Error('College not found'); } await item.deleteOne(); res.json({ message: 'College removed' }); });