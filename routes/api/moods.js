const express = require('express');
const router = express.Router();
const moodsCtrl = require('../../controllers/api/moods');


//POST /api/moods
router.post('/', moodsCtrl.create);

//GET /api/moods
router.get('/', moodsCtrl.index);


module.exports = router;