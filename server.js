// Import required modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose setup
mongoose.connect('mongodb://localhost:27017/wasteManagement', { useNewUrlParser: true, useUnifiedTopology: true });

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Schema for complaints
const complaintSchema = new mongoose.Schema({
    complaint: String,
    createdAt: { type: Date, default: Date.now }
});
const Complaint = mongoose.model('Complaint', complaintSchema);

// API to submit complaints
app.post('/submitComplaint', (req, res) => {
    const newComplaint = new Complaint(req.body);
    newComplaint.save()
        .then(() => res.json({ message: 'Complaint submitted successfully.' }))
        .catch(err => res.status(500).json({ message: 'Error submitting complaint.' }));
});

// API to get waste collection schedule
app.get('/collectionSchedule', (req, res) => {
    res.json({ schedule: 'Next collection on: 2024-10-20, 10:00 AM' });
});

// API to analyze waste image
app.post('/analyzeWaste', upload.single('wasteImage'), (req, res) => {
    // Analyze image here (simulated for the example)
    const result = "This is recyclable waste.";
    res.json({ message: result });
});

// API for environmental impact dashboard
app.get('/impactDashboard', (req, res) => {
    res.json({ impact: 'You have reduced your carbon footprint by 20% this month!' });
});

// API to track waste
app.get('/trackWaste', (req, res) => {
    res.json({ tracking: 'Your waste is at the recycling facility.' });
});

// API to find nearest disposal points
app.get('/disposalPoints', (req, res) => {
    res.json({ points: 'Nearest points: Point A, Point B, Point C.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
