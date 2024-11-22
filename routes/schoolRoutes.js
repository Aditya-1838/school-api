const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const validateInput = require('../middleware/validateInput');

// Add School Route
router.post('/addSchool', validateInput.validateSchoolData, schoolController.addSchool);

// List Schools Route
router.get('/listSchools', schoolController.listSchools);

// Get All Schools Route
router.get('/getAllSchools', schoolController.getAllSchools);

module.exports = router;
