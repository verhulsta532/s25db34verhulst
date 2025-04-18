var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var dog_controller = require('../controllers/dogCollection');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/dogCollection', dog_controller.dog_create_post);
// DELETE request to delete Costume.
router.delete('/dogCollection/:id', dog_controller.dog_delete);
// PUT request to update Costume.
router.put('/dogCollection/:id', dog_controller.dog_update_put);
// GET request for one Costume.
router.get('/dogCollection/:id', dog_controller.dog_detail);
// GET request for list of all Costume items.
router.get('/dogCollection', dog_controller.dog_list);
module.exports = router;

