const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Testimonial = require('../models/Testimonial');
const Video = require('../models/Video');
const Podcast = require('../models/Podcast');
const Content = require('../models/Content');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/Testimonial');
jest.mock('../models/Video');
jest.mock('../models/Podcast');
jest.mock('../models/Content');
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('Content APIs (Testimonials, Videos, Podcasts, Site Content)', () => {
    let token;
    let userId;

    beforeAll(() => {
        userId = new mongoose.Types.ObjectId().toString();
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'testsecret');
        
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({ _id: userId, role: 'admin' })
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all testimonials', async () => {
        Testimonial.find.mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
        });
        const res = await request(app).get('/testimonial');
        expect(res.statusCode).toEqual(200);
    });

    it('should upload a video (protected)', async () => {
        Video.prototype.save = jest.fn().mockResolvedValue({ title: 'Video' });
        const res = await request(app)
            .post('/video')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Video', url: 'http://test.com' });
        expect(res.statusCode).toEqual(201);
    });

    it('should get all podcasts', async () => {
        Podcast.find.mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
        });
        const res = await request(app).get('/podcast');
        expect(res.statusCode).toEqual(200);
    });

    it('should get site content', async () => {
        Content.find.mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
        });
        const res = await request(app).get('/content');
        expect(res.statusCode).toEqual(200);
    });
});
