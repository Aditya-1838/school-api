const db = require('../config/db');

// Add a new school
exports.addSchool = (schoolData, callback) => {
  const sql = 'INSERT INTO schools SET ?';
  db.query(sql, schoolData, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Fetch all schools
exports.getAllSchools = (callback) => {
  const sql = 'SELECT * FROM schools';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
