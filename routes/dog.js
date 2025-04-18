const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogCollection');
const Dog = require('../models/dog');


router.get('/detail', async (req, res) => {
  try {
    const results = await Dog.find().exec();
    res.render('dog', { 
      title: 'All Dogs',
      results // Passing as 'results'
    });
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});


router.get('/', dogController.dog_view_all_Page);
router.put('/dog/:id', dogController.dog_update_put);
router.delete('/dog/:id', dogController.dog_delete);
module.exports = router;