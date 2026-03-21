const asyncHandlerContent = require('express-async-handler');
const Content = require('../models/Content');


exports.createContent = asyncHandlerContent(async (req, res) => { const b = new Content(req.body); const created = await b.save(); res.status(201).json(created); });


exports.getContents = asyncHandlerContent(async (req, res) => { const Contents = await Content.find({}).limit(200); res.json(Contents); });


exports.getContentById = asyncHandlerContent(async (req, res) => { const b = await Content.findById(req.params.id); if (!b) { res.status(404); throw new Error('Content not found'); } res.json(b); });


exports.updateContent = asyncHandlerContent(async (req, res) => { const b = await Content.findById(req.params.id); if (!b) { res.status(404); throw new Error('Content not found'); } Object.assign(b, req.body); const updated = await b.save(); res.json(updated); });


exports.deleteContent = asyncHandlerContent(async (req, res) => { const b = await Content.findById(req.params.id); if (!b) { res.status(404); throw new Error('Content not found'); } await b.remove(); res.json({ message: 'Content removed' }); });