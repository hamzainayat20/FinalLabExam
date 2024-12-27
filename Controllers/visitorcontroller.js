// controllers/visitorController.js
const Visitor = require('../models/visitor'); // Ensure path is correct

// Add a new visitor
exports.addVisitor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const visitor = new Visitor({ name, email });
    await visitor.save();
    res.status(201).json({ message: 'Visitor added successfully', visitor });
  } catch (err) {
    res.status(400).json({ message: 'Error adding visitor', error: err.message });
  }
};

// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json(visitors);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching visitors', error: err.message });
  }
};

// Get visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json(visitor);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching visitor', error: err.message });
  }
};

// Update visitor
exports.updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json(visitor);
  } catch (err) {
    res.status(400).json({ message: 'Error updating visitor', error: err.message });
  }
};

// Delete visitor
exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json({ message: 'Visitor deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting visitor', error: err.message });
  }
};
