const asyncHandler = require('express-async-handler');
const School = require('../models/School');


exports.getSchools = asyncHandler(async (req, res) => {
    const { location, curriculum, featured, q } = req.body;
    const filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (curriculum) filter.curriculum = curriculum;
    if (featured) filter.featured = featured === 'true';
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { overview: new RegExp(q, 'i') }];
    const schools = await School.find(filter).limit(200);
    res.json(schools);
});


exports.getSchoolById = asyncHandler(async (req, res) => {
    const school = await School.findById(req.params.id);
    if (!school) { res.status(404); throw new Error('School not found'); }
    res.json(school);
});


exports.createSchool = asyncHandler(async (req, res) => { const school = new School(req.body); const created = await school.save(); res.status(201).json(created); });


exports.updateSchool = asyncHandler(async (req, res) => { const school = await School.findById(req.params.id); if (!school) { res.status(404); throw new Error('School not found'); } Object.assign(school, req.body); const updated = await school.save(); res.json(updated); });


exports.deleteSchool = asyncHandler(async (req, res) => { const school = await School.findById(req.params.id); if (!school) { res.status(404); throw new Error('School not found'); } await school.remove(); res.json({ message: 'School removed' }); });