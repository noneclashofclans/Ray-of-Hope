const express = require('express')
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register route
router.post('/register', async(req, res) => {
    try{
        const {username, email, phone, password} = req.body;

        if (!username || !email || !phone || !password){
            return res.status(400).json({message: 'Fill up all the fields'});
        }

        // finding the user
        const user = await User.findOne({ $or: [{email}, {username}] })

        if (user) res.status(400).json({message: 'User already present'})
        
        // salting password
        const salting = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salting);
        
        // pehle original password ko hash kardo, and new user ko password ke jagah pe hashedPassword de do
        const newUser = await User.create ({
            username, email, phone,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,   
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone
            }
        })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ message: 'Error during registration' });
    }
})

// login route

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) return res.status(401).json({message: 'Invalid email/password'});

        // console.log("Login attempt:", email);
        // console.log("User found:", !!user);
        // console.log("Password from DB:", user.password);

        const matched = await bcrypt.compare(password, user.password);
        console.log("Password matched:", matched);

        if (!matched) return res.status(401).json({message: 'Invalid email/password'});

        // put username and email in payload
        const payload = {userEmail: user.email,
                         userName: user.name
                        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '200d'});

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone
            },
        });

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ message: 'Error during login' });
    }
})

module.exports = router;