const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moodSchema = new Schema({
mood: Number,
emoji: String,
title: String,
description: String,
}, {
  timestamps: true,
}
);


module.exports = mongoose.model('Mood', moodSchema);