const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const College = require('../models/College');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mocking dependencies
jest.mock('../models/College');
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('College API', () => {
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

    it('should delete a college', async () => {
        const collegeId = new mongoose.Types.ObjectId().toString();
        const mockCollege = {
            _id: collegeId,
            deleteOne: jest.fn().mockResolvedValue(true)
        };

        College.findById.mockResolvedValue(mockCollege);

        const res = await request(app)
            .delete(`/college/${collegeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('College removed');
        expect(mockCollege.deleteOne).toHaveBeenCalled();
    });

    it('should return 404 if college not found on delete', async () => {
        const collegeId = new mongoose.Types.ObjectId().toString();
        College.findById.mockResolvedValue(null);

        const res = await request(app)
            .delete(`/college/${collegeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('College not found');
    });
});
