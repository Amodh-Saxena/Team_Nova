const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    hobbies: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: true,
    },
    internship: {
        type: String,
        required: true,
    },
    aboutYourAim: {
        type: String,
        required: true,
    },
    achievements: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
