const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.post('/enroll', async (req, res) => {
    try {
        const { user, memberName, aadharNumber, dob, address } = req.body;

        if (!user || !memberName || !aadharNumber || !dob || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const cleanedAadhar = aadharNumber.replace(/\s+/g, '');

        if (!/^\d{12}$/.test(cleanedAadhar)) {
            return res.status(400).json({ message: 'Invalid Aadhar number. Must be 12 digits.' });
        }

        const existingMember = await Member.findOne({ user });

        if (existingMember) {
            if (existingMember.status === 'Rejected') {
                existingMember.memberName = memberName;
                existingMember.aadharNumber = cleanedAadhar;
                existingMember.dob = dob;
                existingMember.address = address;
                existingMember.status = 'Pending';

                await existingMember.save();
                return res.status(200).json({ message: 'Application re-submitted successfully!' });
            } else {
                return res.status(400).json({ message: 'You already have an active or verified application.' });
            }
        }

        const newMember = new Member({
            user,
            memberName,
            aadharNumber: cleanedAadhar,
            dob,
            address,
        });

        await newMember.save();
        res.status(201).json({ message: 'Application submitted successfully!' });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'This Aadhar number is already registered.' });
        }
        res.status(500).json({ error: err.message });
    }
});


router.get('/status/:userId', async (req, res) => {
    try {
        if (!req.params.userId || req.params.userId === "undefined") {
            return res.status(200).json({ status: "Not Verified" });
        }

        const member = await Member.findOne({ user: req.params.userId });
        if (!member) return res.status(200).json({ message: "No application found" });
        
        res.json(member); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/applications', async (req, res) => {
    try {
        const applications = await Member.find()
            .populate('user', 'username email phone') 
            .sort({ createdAt: -1 }); 
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/admin/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body; 
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.json({ message: `Status updated to ${status}`, updatedMember });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/admin/delete-member/:id', async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.json({ message: "Member request deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;