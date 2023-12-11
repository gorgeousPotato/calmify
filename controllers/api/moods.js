const Mood = require('../../models/mood');

module.exports = {
  create,
}

async function create(req,res) {
  try {
    req.body.user = req.user;
    const mood = await Mood.create(req.body);
    res.json(mood);
  } catch(err) {
    res.status(400).json(err);
  }
}