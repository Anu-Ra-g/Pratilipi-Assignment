const express = require('express');
const User = require('../models/User');
const { publishEvent } = require('../events/userEvents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ; 

// create a user and specify "ADMIN" or not in body. default to "USER"
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role){
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        
        await publishEvent('user-registered', {
            id: user.id,
            name: user.name,
            email: user.email
        });

        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to register user' });
    }
});

// login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, JWT_SECRET);
        
        return res.status(200).json(token);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to login user' });
    }
});

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// get user by id
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve user' });
    }
});



module.exports = router;
