const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const CareerForm = require('../models/careerFormModel');
const CounselingForm = require('../models/PersonalizedCounselingForm');
const PrePrimaryForm = require('../models/PrePrimarytoHigherForm');
const Contact = require('../models/Contact');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/careerFormModel');
jest.mock('../models/PersonalizedCounselingForm');
jest.mock('../models/PrePrimarytoHigherForm');
jest.mock('../models/Contact');
jest.mock('../utils/emailService', () => jest.fn().mockResolvedValue(true));
jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());

describe('Form APIs (Career, Counseling, PrePrimary, Contact)', () => {
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

    describe('Career Form API', () => {
        it('should submit a career form', async () => {
            const data = { name: 'John Doe', email: 'john@example.com' };
            CareerForm.prototype.save = jest.fn().mockResolvedValue(data);
            const res = await request(app).post('/careerform').send(data);
            expect(res.statusCode).toEqual(201);
        });
    });

    describe('Personalized Counseling API', () => {
        it('should submit a counseling form', async () => {
            const data = { name: 'Jane Doe' };
            CounselingForm.prototype.save = jest.fn().mockResolvedValue(data);
            const res = await request(app).post('/personalizedcounselingform').send(data);
            expect(res.statusCode).toEqual(201);
        });
    });

    describe('Pre-Primary Form API', () => {
        it('should submit a pre-primary form', async () => {
            const data = { childName: 'Baby Doe' };
            PrePrimaryForm.create.mockResolvedValue(data);
            const res = await request(app).post('/preprimaryform').send(data);
            expect(res.statusCode).toEqual(201);
        });
    });

    describe('Contact API', () => {
        it('should submit a contact form', async () => {
            const data = { name: 'Contact User', email: 'c@example.com', phone: '123', message: 'Hello' };
            Contact.prototype.save = jest.fn().mockResolvedValue(data);
            const res = await request(app).post('/contact').send(data);
            expect(res.statusCode).toEqual(201);
        });
    });
});
