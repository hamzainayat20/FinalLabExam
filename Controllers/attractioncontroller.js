// controllers/attractionController.js
const Attraction = require('../models/attraction');

exports.addAttraction = async (req, res) => {
  try {
    const { name, location, entryFee, rating } = req.body;
    const attraction = new Attraction({ name, location, entryFee, rating });
    await attraction.save();
    res.status(201).json({ message: 'Attraction added successfully', attraction });
  } catch (err) {
    res.status(400).json({ message: 'Error adding attraction', error: err.message });
  }
};

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json(attractions);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching attractions', error: err.message });
  }
};

exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    res.status(200).json(attraction);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching attraction', error: err.message });
  }
};

exports.updateAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    res.status(200).json(attraction);
  } catch (err) {
    res.status(400).json({ message: 'Error updating attraction', error: err.message });
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    res.status(200).json({ message: 'Attraction deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting attraction', error: err.message });
  }
};
