const Mood = require('../../models/mood');

module.exports = {
  create,
  index,
}

async function create(req,res) {
  try {
    req.body.user = req.user;
    req.body.date = Date.now();
    const mood = await Mood.create(req.body);
    res.json(mood);
  } catch(err) {
    res.status(400).json(err);
  }
}

async function index(req,res) {
  try {
    const moods = await Mood.find({
      user: req.user
    })
    res.json(moods);
  } catch(err) {
    res.status(400).json(err);
  }
}