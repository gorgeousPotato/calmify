const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moodSchema = new Schema({
mood: Number,
emoji: String,
title: String,
description: String,
user: {
  type: Schema.Types.ObjectId,
  ref: "User",
},
comment: String,
date: Date,
}, {
  timestamps: true,
}
);


module.exports = mongoose.model('Mood', moodSchema);