const Review = require('../models/review');
const Visitor = require('../models/visitor');
const Attraction = require('../models/attraction');

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { visitorId, attractionId, score, comment } = req.body;

    // Check if the visitor exists
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    // Check if the attraction exists
    const attraction = await Attraction.findById(attractionId);
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }

    // Ensure the visitor has visited the attraction before posting a review
    if (!visitor.visitedAttractions.includes(attractionId)) {
      return res.status(400).json({ message: 'Visitor must visit the attraction before reviewing' });
    }

    // Ensure the visitor has not already reviewed this attraction
    const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
    if (existingReview) {
      return res.status(400).json({ message: 'Visitor has already reviewed this attraction' });
    }

    // Create and save the review
    const review = new Review({
      visitor: visitorId,
      attraction: attractionId,
      score,
      comment
    });
    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(400).json({ message: 'Error adding review', error: err.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('visitor', 'name email')
      .populate('attraction', 'name location');
    
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching reviews', error: err.message });
  }
};

// Get a review by its ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the review and populate related visitor and attraction data
    const review = await Review.findById(id)
      .populate('visitor', 'name email')
      .populate('attraction', 'name location');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching review', error: err.message });
  }
};

// Update a review by its ID
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;

    // Find the review by ID
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review fields
    review.score = score || review.score;
    review.comment = comment || review.comment;

    // Save the updated review
    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (err) {
    res.status(400).json({ message: 'Error updating review', error: err.message });
  }
};

// Delete a review by its ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the review by its ID
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting review', error: err.message });
  }
};
