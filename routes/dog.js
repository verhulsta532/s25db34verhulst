const express = require('express');
const router = express.Router();
exports.router = router;
const dogController = require('../controllers/dogCollection');
const secured = require('../middleware/secured');


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

const secured = (req, res, next) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {  // More reliable than just checking req.user
    return next();
  }
  
  // Store the original URL for redirect after login
  if (req.session) {
    req.session.returnTo = req.originalUrl;
  }
  
  // Redirect to login
  res.redirect('/login');
};

router.get('/', dogController.dog_list)
router.get('/create', secured, dogController.dog_create_get);
router.post('/', secured, dogController.dog_create_post);
router.get('/:id', dogController.dog_detail);
router.get('/:id/update', secured, dogController.dog_update_page);
router.post('/:id/update', secured, dogController.dog_update_post);
router.get('/:id/delete', secured, dogController.dog_delete_get);
router.post('/:id/delete', secured, dogController.dog_delete);
module.exports = router;