const asyncHandlerAdmission = require('express-async-handler');
const Admission = require('../models/Admission');


exports.createAdmission = asyncHandlerAdmission(async (req, res) => { const admission = new Admission(req.body); const created = await admission.save(); res.status(201).json(created); });


exports.getAdmissions = asyncHandlerAdmission(async (req, res) => { const admissions = await Admission.find({}).populate('school college'); res.json(admissions); });


exports.getAdmissionById = asyncHandlerAdmission(async (req, res) => { const admission = await Admission.findById(req.params.id).populate('school college'); if (!admission) { res.status(404); throw new Error('Admission not found'); } res.json(admission); });


exports.updateAdmission = asyncHandlerAdmission(async (req, res) => { const admission = await Admission.findById(req.params.id); if (!admission) { res.status(404); throw new Error('Admission not found'); } Object.assign(admission, req.body); const updated = await admission.save(); res.json(updated); });


exports.deleteAdmission = asyncHandlerAdmission(async (req, res) => { const admission = await Admission.findById(req.params.id); if (!admission) { res.status(404); throw new Error('Admission not found'); } await admission.deleteOne(); res.json({ message: 'Admission removed' }); });