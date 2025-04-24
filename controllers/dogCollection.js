const Dog = require('../models/dog');

// View all dogs
exports.dog_list = async (req, res) => {
  try {
    const dogs = await Dog.find({});
    res.render('dogList', {
      title: 'Dog Collection',
      dog_list: dogs,
      user: req.user
    });
  } catch (err) {
    res.status(500).render('error', { error: err.message });
  }
};

// Dog details
exports.dog_detail = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).render('error', { error: 'Dog not found' });
    }
    res.render('dogDetail', {
      title: 'Dog Details',
      dog: dog,
      user: req.user
    });
  } catch (err) {
    res.status(500).render('error', { error: err.message });
  }
};

// Delete confirmation page
exports.dog_delete_get = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).render('error', { error: 'Dog not found' });
    }
    res.render('dogDelete', {
      title: 'Delete Dog',
      dog: dog,
      user: req.user
    });
  } catch (err) {
    res.status(500).render('error', { error: err.message });
  }
};

// Create dog
exports.dog_create_post = async (req, res) => {
    try {
        const { dog_name, breed, age, weight } = req.body;
        const newDog = new Dog({ dog_name, breed, age, weight });
        await newDog.save();
        res.redirect('/dogs');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = Object.keys(err.errors).reduce((acc, key) => {
            acc[key] = err.errors[key].message;
            return acc;
          }, {});
          return res.render('dogForm', {
            title: 'Add Dog',
            dog: req.body,
            errors,
            user: req.user
          });
        }
        res.status(500).render('error', { error: err.message });
      }
    };

exports.dog_create_get = (req, res) => {
    res.render('dogForm', {
      title: 'Create Dog',
      user: req.user,
      dog: null,
      errors: null
    });
  };

// Update dog (form page)
exports.dog_update_page = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).render('error', { error: 'Dog not found' });
    }
    res.render('dogUpdate', {
      title: 'Update Dog',
      dog: dog,
      user: req.user
    });
  } catch (err) {
    res.status(500).render('error', { error: err.message });
  }
};

// Handle update submission
exports.dog_update_post = async (req, res) => {
  try {
    await Dog.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/dogs/${req.params.id}`); // Redirect to detail view
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).reduce((acc, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {});
      
      return res.render('dogUpdate', {
        title: 'Update Dog',
        dog: req.body,
        errors: errors,
        user: req.user
      });
    }
    res.status(500).render('error', { error: err.message });
  }
};

// Handle delete
exports.dog_delete = async (req, res) => {
  try {
    const result = await Dog.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).render('error', { error: 'Dog not found' });
    }
    res.redirect('/dogs'); // Redirect to list view
  } catch (err) {
    res.status(500).render('error', { error: err.message });
  }
};