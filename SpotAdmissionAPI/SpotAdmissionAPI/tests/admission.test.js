const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Admission = require('../models/Admission');
const AdmissionForm = require('../models/AdmissionForm');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/Admission');
jest.mock('../models/AdmissionForm');
jest.mock('../utils/emailService', () => jest.fn().mockResolvedValue(true));
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('Admission & AdmissionForm API', () => {
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

    describe('Admission API', () => {
        it('should create an admission', async () => {
            const data = { name: 'Test Admission' };
            Admission.prototype.save = jest.fn().mockResolvedValue(data);
            
            const res = await request(app)
                .post('/admission')
                .set('Authorization', `Bearer ${token}`)
                .send(data);

            expect(res.statusCode).toEqual(201);
        });

        it('should get all admissions (admin)', async () => {
            Admission.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue([])
            });

            const res = await request(app)
                .get('/admission')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
        });
    });

    describe('AdmissionForm API', () => {
        it('should create an admission form entry', async () => {
            const data = { studentName: 'Jane Doe' };
            AdmissionForm.create.mockResolvedValue(data);

            const res = await request(app)
                .post('/admissionform')
                .send(data);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(data);
        });

        it('should get all admission forms', async () => {
            AdmissionForm.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue([])
            });

            const res = await request(app)
                .get('/admissionform');

            expect(res.statusCode).toEqual(200);
        });
    });
});
