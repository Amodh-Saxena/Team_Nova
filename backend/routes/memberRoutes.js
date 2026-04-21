const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST /api/members (Add new member)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const {
            name,
            rollNumber,
            year,
            degree,
            project,
            hobbies,
            certificate,
            internship,
            aboutYourAim,
            achievements
        } = req.body;

        const newMember = new Member({
            name,
            rollNumber,
            year,
            degree,
            project,
            hobbies,
            certificate,
            internship,
            aboutYourAim,
            achievements,
            image: req.file.path.replace(/\\/g, '/') // Ensure forward slashes for path
        });

        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error creating member:', error);
        res.status(500).json({ error: 'Failed to create member' });
    }
});

// GET /api/members (List all members)
router.get('/', async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

// GET /api/members/:id (Get member details)
router.get('/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).json({ error: 'Failed to fetch member details' });
    }
});

// PUT /api/members/:id (Edit member details)
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const memberId = req.params.id;
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const updateData = {
            name: req.body.name,
            rollNumber: req.body.rollNumber,
            year: req.body.year,
            degree: req.body.degree,
            project: req.body.project,
            hobbies: req.body.hobbies,
            certificate: req.body.certificate,
            internship: req.body.internship,
            aboutYourAim: req.body.aboutYourAim,
            achievements: req.body.achievements,
        };

        // If a new image is provided, delete the old one from server
        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', member.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            updateData.image = req.file.path.replace(/\\/g, '/');
        }

        const updatedMember = await Member.findByIdAndUpdate(memberId, updateData, { new: true });
        res.status(200).json(updatedMember);
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ error: 'Failed to update member' });
    }
});

// DELETE /api/members/:id (Delete a member)
router.delete('/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        
        // Remove image file if it exists
        const imagePath = path.join(__dirname, '..', member.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: 'Failed to delete member' });
    }
});

module.exports = router;
