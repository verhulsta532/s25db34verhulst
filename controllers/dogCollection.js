var Dog = require('../models/dog');

// List all dogs
exports.dog_list = async function(req, res) {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Show single dog detail
exports.dog_detail = async function(req, res) {
    try {
        const result = await Dog.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: `Document for id ${req.params.id} not found` });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new dog
exports.dog_create_post = async function(req, res) {
    try {
        const newDog = new Dog(req.body);
        const result = await newDog.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update dog
exports.dog_update_put = async function(req, res) {
    try {
        const result = await Dog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!result) {
            return res.status(404).json({ error: `Document for id ${req.params.id} not found` });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete dog
exports.dog_delete = async function(req, res) {
    try {
        const result = await Dog.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: `Document for id ${req.params.id} not found` });
        }
        res.json({ message: 'Dog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all dogs page
exports.dog_view_all_Page = async function(req, res) {
    try {
        const results = await Dog.find(); // Changed from findById to find
        res.render('dog', { title: 'Dog Search Results', results: results }); // Fixed variable name
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};