const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewcontroller');

// Define routes for reviews
router.post('/', reviewController.addReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
