const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected for seeding...');

        const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@spotadmission.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log('Admin already exists:', adminExists.email);
        } else {
            const admin = await User.create({
                name: process.env.SEED_ADMIN_NAME || 'Main Admin',
                email: adminEmail,
                password: process.env.SEED_ADMIN_PASSWORD || 'adminpassword123',
                role: process.env.SEED_ADMIN_ROLE || 'admin',
                phone: process.env.SEED_ADMIN_PHONE || '1234567890'
            });
            console.log('Admin created successfully:', admin.email);
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
