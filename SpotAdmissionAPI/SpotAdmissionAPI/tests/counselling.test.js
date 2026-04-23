const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Counselling = require('../models/Counselling');
const CounselingAppointmentForm = require('../models/CounselingAppointmentForm');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/Counselling');
jest.mock('../models/CounselingAppointmentForm');
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('Counselling APIs', () => {
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

    it('should create a counselling booking (protected)', async () => {
        Counselling.prototype.save = jest.fn().mockResolvedValue({ service: 'Career' });
        const res = await request(app)
            .post('/counselling')
            .set('Authorization', `Bearer ${token}`)
            .send({ service: 'Career' });
        expect(res.statusCode).toEqual(201);
    });

    it('should submit a counseling appointment form', async () => {
        CounselingAppointmentForm.prototype.save = jest.fn().mockResolvedValue({ name: 'Appointee' });
        const res = await request(app)
            .post('/counselingform')
            .send({ name: 'Appointee' });
        expect(res.statusCode).toEqual(201);
    });
});
