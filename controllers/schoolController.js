const schoolModel = require('../models/schoolModel');

// Add School Controller
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const schoolData = { name, address, latitude, longitude };

  schoolModel.addSchool(schoolData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding school.', error: err.message });
    }
    res.status(201).json({ message: 'School added successfully.', schoolId: result.insertId });
  });
};

// List Schools Controller
exports.listSchools = (req, res) => {
  const { latitude: userLat, longitude: userLng } = req.query;

  if (!userLat || !userLng || isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ message: 'Latitude and Longitude are required as query parameters.' });
  }

  schoolModel.getAllSchools((err, schools) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching schools.', error: err.message });
    }

    // Calculate distances using the Haversine formula
    const schoolsWithDistances = schools.map((school) => {
      const distance = calculateDistance(
        parseFloat(userLat),
        parseFloat(userLng),
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    // Sort schools by distance
    schoolsWithDistances.sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: schoolsWithDistances });
  });
};

// Get All Schools Controller
exports.getAllSchools = (req, res) => {
  schoolModel.getAllSchools((err, schools) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching schools.', error: err.message });
    }
    res.status(200).json({ schools });
  });
};

// Helper function for Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};
