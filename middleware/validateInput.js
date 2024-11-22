exports.validateSchoolData = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Latitude and Longitude must be numbers.' });
  }

  next();
};
