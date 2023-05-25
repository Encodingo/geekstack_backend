const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  trainingName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  users: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  ratings: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: Number,
    default: 105,
  },
  image: {
    type: String,
    required: true
  }
  ,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trainings", trainingSchema);
