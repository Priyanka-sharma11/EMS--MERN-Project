// Run this once with: npm run seed
// It creates the first admin account so you have a way to log in.
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('../src/models/user.model');

const ADMIN_EMAIL = 'admin@me.com';
const ADMIN_PASSWORD = '123';
const ADMIN_NAME = 'Admin';

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    const existing = await userModel.findOne({ email: ADMIN_EMAIL });

    if (existing) {
        console.log('An admin account already exists:', existing.email);
        await mongoose.disconnect();
        return;
    }

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await userModel.create({
        firstName: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hash,
        role: 'admin'
    });

    console.log('Admin account created!');
    console.log('  email:   ', admin.email);
    console.log('  password:', ADMIN_PASSWORD);
    console.log('You can log in with these credentials, then use the Admin Dashboard to add employees.');

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
