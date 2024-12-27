const express = require('express');
const router = express.Router();
const attractionController = require('../Controllers/attractioncontroller');

router.get('/', attractionController.getAllAttractions);

// Define routes for attractions
router.get('/', attractionController.getAllAttractions);
router.post('/', attractionController.addAttraction);
router.get('/:id', attractionController.getAttractionById);
router.put('/:id', attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);
// controllers/attractionController.js
exports.getAllAttractions = (req, res) => {
    // Your logic for getting all attractions goes here
    res.send("All attractions");
  };
  

module.exports = router;
