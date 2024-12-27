const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  entryFee: { 
    type: Number, 
    required: true, 
    validate: {
      validator: function(value) {
        return value >= 0; // Entry fee cannot be negative
      },
      message: 'Entry fee must be a non-negative number.'
    }
  },
  rating: { 
    type: Number, 
    default: 0, 
    validate: {
      validator: function(value) {
        return value >= 0 && value <= 5; // Rating must be between 0 and 5
      },
      message: 'Rating must be between 0 and 5.'
    }
  }
});

module.exports = mongoose.model('Attraction', AttractionSchema);
