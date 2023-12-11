const express = require('express');
const router = express.Router();
const moodsCtrl = require('../../controllers/api/moods');


//POST /api/moods
router.post('/', moodsCtrl.create);

module.exports = router;