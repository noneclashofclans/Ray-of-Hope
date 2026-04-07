const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    memberName: {
        type: String,
        required: [true, "Aadhar name is required"],
        trim: true
    },

    aadharNumber: {
        type: String,
        required: [true, "Aadhar number is required"],
        unique: true,
        match: [/^\d{12}$/, "Please provide a valid 12-digit Aadhar number"]
    },

    dob: {
        type: Date, 
        required: true
    },

    address: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        enum: ["Pending", "Verified", "Rejected"],
        default: "Pending"
    },

    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Member", memberSchema);