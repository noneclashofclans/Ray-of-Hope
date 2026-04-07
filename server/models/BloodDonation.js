const mongoose = require('mongoose');

const bloodDonationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    hb: { type: Number, required: true },
    weight: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] }
}, { timestamps: true });

module.exports = mongoose.model('BloodDonation', bloodDonationSchema);