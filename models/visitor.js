const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    validate: {
      validator: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value); // Validate email format
      },
      message: 'Invalid email format.'
    }
  },
  visitedAttractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attraction' }]
});

module.exports = mongoose.model('Visitor', VisitorSchema);
