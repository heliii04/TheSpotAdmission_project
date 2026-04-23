const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const School = require('../models/School');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/School');
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('School API', () => {
    let token;
    let userId;

    beforeAll(() => {
        userId = new mongoose.Types.ObjectId().toString();
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'testsecret');
        
        // Mock User.findById for authentication middleware
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({ _id: userId, role: 'admin' })
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get schools with filters', async () => {
        const mockSchools = [{ name: 'Test School', location: 'Delhi' }];
        School.find.mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockSchools)
        });

        const res = await request(app)
            .get('/school?location=Delhi&q=Test');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSchools);
        expect(School.find).toHaveBeenCalledWith(expect.objectContaining({
            location: expect.any(RegExp),
            $or: expect.any(Array)
        }));
    });

    it('should create a school as admin', async () => {
        const schoolData = { name: 'New School', location: 'Mumbai' };
        School.prototype.save = jest.fn().mockResolvedValue(schoolData);

        const res = await request(app)
            .post('/school')
            .set('Authorization', `Bearer ${token}`)
            .send(schoolData);

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('New School');
    });

    it('should return 401 for school creation without token', async () => {
        const res = await request(app)
            .post('/school')
            .send({ name: 'Fail School' });

        expect(res.statusCode).toEqual(401);
    });
});
