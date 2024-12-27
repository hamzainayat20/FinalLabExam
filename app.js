const express = require('express');
const mongoose = require('mongoose');
const Attraction = require('./models/attraction');  // Adjust the path according to your folder structure
const Visitor = require('./models/visitor');  // Ensure this path is correct
const Review = require('./models/review'); 

const connectDB = require('./db'); // Require your database connection
const app = express();
app.use(express.json());
// Connect to the database
connectDB();


// Import routers
const attractionRoutes = require('./routes/attraction'); // Update here
const visitorRoutes = require('./routes/visitor');       // Update here
const reviewRoutes = require('./routes/review');         // Update here
app.post('/attractions', async (req, res) => {
    try {
        const { name, location, entryFee, rating } = req.body;

        // Create new attraction
        const newAttraction = new Attraction({
            name,
            location,
            entryFee,
            rating
        });

        await newAttraction.save();
        res.status(201).send(newAttraction); // Send back the created attraction
    } catch (err) {
        console.error(err);  // Log the error to the server console
        res.status(500).send({ message: "Error creating attraction", error: err.message });
    }
});

app.get('/attractions', async (req, res) => {
    try {
        const attractions = await Attraction.find(); // This will fetch all attractions from the database
        res.status(200).json(attractions); // Respond with the list of attractions
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error fetching attractions", error: err.message });
    }
});
app.put('/attractions/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the attraction ID from the URL
        const { name, location, entryFee, rating } = req.body; // Get updated data from the request body
        
        // Find the attraction by ID and update it
        const updatedAttraction = await Attraction.findByIdAndUpdate(
            id, 
            { name, location, entryFee, rating }, 
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedAttraction) {
            return res.status(404).send({ message: "Attraction not found" });
        }

        res.status(200).json(updatedAttraction); // Send the updated attraction back as a response
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating attraction", error: err.message });
    }
});
app.delete('/attractions/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the attraction ID from the URL

        // Find and delete the attraction by ID
        const deletedAttraction = await Attraction.findByIdAndDelete(id);

        if (!deletedAttraction) {
            return res.status(404).send({ message: "Attraction not found" });
        }

        res.status(200).send({ message: "Attraction deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error deleting attraction", error: err.message });
    }
});
app.post('/reviews', async (req, res) => {
    try {
        const { attractionId, visitorId, score, comment } = req.body;

        // Validate the incoming data
        if (!attractionId || !visitorId || !score) {
            return res.status(400).send({ message: "Attraction ID, Visitor ID, and score are required." });
        }

        // Check if the attraction and visitor exist
        const attraction = await Attraction.findById(attractionId);
        const visitor = await Visitor.findById(visitorId);

        if (!attraction || !visitor) {
            return res.status(404).send({ message: "Attraction or Visitor not found." });
        }

        // Create the new review
        const newReview = new Review({
            attraction: attractionId,
            visitor: visitorId,
            score,
            comment
        });

        // Save the review to the database
        await newReview.save();

        res.status(201).send({ message: "Review created successfully", review: newReview });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error creating review", error: err.message });
    }
});

// Define the POST route for creating a review
app.post('/reviews', async (req, res) => {
    try {
      const { attractionId, visitorId, score, comment } = req.body;
      
      const newReview = new Review({
        attraction: attractionId,
        visitor: visitorId,
        score: score,
        comment: comment,
      });
  
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error creating review', error: error.message });
    }
  });

  app.get('/reviews', async (req, res) => {
    try {
      const reviews = await Review.find().populate('attraction visitor'); // Populate to get attraction and visitor details
      res.json(reviews); // Send the reviews as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
    }
  });

  app.put('/reviews/:id', async (req, res) => {
    try {
      const reviewId = req.params.id;
      const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json(updatedReview); // Send the updated review as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating review', error: error.message });
    }
  });

  app.delete('/reviews/:id', async (req, res) => {
    try {
      const reviewId = req.params.id;  // Get the review ID from the URL
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json({ message: 'Review deleted successfully', review: deletedReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
  });

  // DELETE a review
app.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting review', error });
    }
  });
  app.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting review', error });
    }
  });
  // POST route to create a visitor
app.post('/visitors', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newVisitor = new Visitor({ name, email, phone });
        await newVisitor.save();
        res.status(201).json({ message: 'Visitor created successfully', visitor: newVisitor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating visitor', error: error.message });
    }
});
app.get('/visitors', async (req, res) => {
    try {
        const visitors = await Visitor.find(); // Fetch all visitors from the database
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visitors', error: error.message });
    }
});
app.delete('/visitors/:id', async (req, res) => {
    try {
        const visitorId = req.params.id; // Get the visitor ID from the route parameter
        const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);

        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ message: 'Visitor deleted successfully', visitor: deletedVisitor });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visitor', error: error.message });
    }
});
app.delete('/visitors/:id', async (req, res) => {
    try {
        const visitorId = req.params.id; // Get the visitor ID from the route parameter
        const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);

        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ message: 'Visitor deleted successfully', visitor: deletedVisitor });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visitor', error: error.message });
    }
});

app.put('/visitors/:id', async (req, res) => {
    try {
        const visitorId = req.params.id; // Extract the visitor ID from the route parameter
        const updatedData = req.body; // Extract the updated data from the request body

        // Find the visitor by ID and update it
        const updatedVisitor = await Visitor.findByIdAndUpdate(visitorId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Ensure validation rules are applied
        });

        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.status(200).json({ message: 'Visitor updated successfully', visitor: updatedVisitor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating visitor', error: error.message });
    }
});
// Use routers
app.use('/api/attractions', attractionRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(3002, () => {
    console.log('Server listening on port 3002');
});
