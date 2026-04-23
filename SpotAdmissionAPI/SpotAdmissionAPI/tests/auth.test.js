const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');
jest.mock('../utils/emailService', () => jest.fn().mockResolvedValue(true));
jest.mock('../config/db', () => jest.fn());

describe('Auth API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'parent'
        };

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            _id: 'mockId',
            ...userData
        });

        const res = await request(app)
            .post('/auth/register')
            .send(userData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.email).toEqual(userData.email);
    });

    it('should not register if user exists', async () => {
        User.findOne.mockResolvedValue({ email: 'test@example.com' });

        const res = await request(app)
            .post('/auth/register')
            .send({ email: 'test@example.com', password: '123' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('User already exists');
    });

    it('should login a user', async () => {
        const mockUser = {
            _id: 'mockId',
            name: 'Test User',
            email: 'test@example.com',
            role: 'parent',
            matchPassword: jest.fn().mockResolvedValue(true)
        };

        User.findOne.mockResolvedValue(mockUser);

        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        User.findOne.mockResolvedValue(null);

        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'wrong@example.com', password: '123' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Invalid email or password');
    });

    it('should send reset password link', async () => {
        User.findOne.mockResolvedValue({ _id: 'mockId', email: 'test@example.com' });

        const res = await request(app)
            .post('/auth/forgot-password')
            .send({ email: 'test@example.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('Reset link sent');
    });
});
