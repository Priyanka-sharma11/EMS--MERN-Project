const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Used once to create the very first admin account (see scripts/seedAdmin.js),
// and can also be reused if you want a public sign-up page later.
async function registerUser(req, res) {
    const { firstName, email, password, role = 'employee' } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ message: 'firstName, email and password are required' });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        firstName,
        email,
        password: hash,
        role
    });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'none' , secure:true });

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role
        }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure:true });

    res.status(200).json({
        message: 'Logged in successfully',
        user: {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role
        }
    });
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}

// Called on app load to check "is anyone already logged in" (via the token cookie)
async function getMe(req, res) {
    const user = await userModel.findById(req.user.id).select('-password');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
