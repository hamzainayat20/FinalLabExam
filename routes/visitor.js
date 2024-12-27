const express = require('express');
const router = express.Router();
const visitorController = require('../Controllers/visitorcontroller');

// Define routes for visitors
router.get('/', visitorController.getAllVisitors);
router.post('/', visitorController.addVisitor);
router.get('/:id', visitorController.getVisitorById);
router.put('/:id', visitorController.updateVisitor);
router.delete('/:id', visitorController.deleteVisitor);

module.exports = router;
