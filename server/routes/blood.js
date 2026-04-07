const express = require('express');
const router = express.Router();
const BloodDonation = require('../models/BloodDonation');


router.post('/donate', async (req, res) => {
    try {
        console.log("Incoming Data:", req.body); 
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data received by server" });
        }

        const donation = new BloodDonation({
            ...req.body,
        });

        await donation.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/donors', async (req, res) => {
    try {
        const donors = await BloodDonation.find()
            .populate('user', 'phone email')
            .sort({ createdAt: -1 });
        res.json(donors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/admin/delete-donor/:id', async (req, res) => {
    try {
        await BloodDonation.findByIdAndDelete(req.params.id);
        res.json({ message: "Donor record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/admin/update/:id', async(req, res) => {
    try{
        const { status } = req.body; 
        const updatedDonation = await BloodDonation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedDonation) return res.status(404).json({ message: "Record not found" });

        res.json({ message: `Status updated to ${status}`, updatedDonation });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;