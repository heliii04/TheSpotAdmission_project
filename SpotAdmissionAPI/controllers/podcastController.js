const asyncHandlerPodcast = require('express-async-handler');
const Podcast = require('../models/Podcast');


exports.createPodcast = asyncHandlerPodcast(async (req, res) => { const p = new Podcast(req.body); const created = await p.save(); res.status(201).json(created); });


exports.getPodcasts = asyncHandlerPodcast(async (req, res) => { const items = await Podcast.find({}).limit(200); res.json(items); });


exports.getPodcastById = asyncHandlerPodcast(async (req, res) => { const p = await Podcast.findById(req.params.id); if (!p) { res.status(404); throw new Error('Podcast not found'); } res.json(p); });


exports.updatePodcast = asyncHandlerPodcast(async (req, res) => { const p = await Podcast.findById(req.params.id); if (!p) { res.status(404); throw new Error('Podcast not found'); } Object.assign(p, req.body); const updated = await p.save(); res.json(updated); });


exports.deletePodcast = asyncHandlerPodcast(async (req, res) => { const p = await Podcast.findById(req.params.id); if (!p) { res.status(404); throw new Error('Podcast not found'); } await p.remove(); res.json({ message: 'Podcast removed' }); });