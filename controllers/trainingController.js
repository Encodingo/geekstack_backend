const Training = require("../models/TrainingModel");
const training = require("../sampledatabase/trainingdb.jsx")
const fs = require('fs');
const path = require('path');

module.exports.getAllTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find();
    return res.json(trainings);
  } catch (ex) {
    next(ex);
  }
};
module.exports.createTraining = async (req, res, next) => {
  try {
    const { trainingName, category, subcategory, message, price } = req.body;
    const imageurl = req.file.path;
    const image = process.env.HOST_URL + imageurl;
    const training = await Training.create({
      trainingName,
      category,
      subcategory,
      message,
      price,
      image
    });
    return res.json({ msg: "Training created", status: true, training });
  } catch (ex) {
    next(ex);
  }
};


module.exports.deleteTraining = async (req, res, next) => {
  try {
    const { id } = req.body;

    const training = await Training.findByIdAndDelete(id);
    if (!training) {
      return res.json({ msg: "Training not found", status: false });
    }
    const imageUrl = training.image;
    const imagePath = new URL(imageUrl).pathname;

    // Delete the associated image file
    const imagePathToDelete = path.join(__dirname, '..', imagePath);

    fs.unlink(imagePathToDelete, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res.json({ msg: "Training deleted", status: true });
  } catch (ex) {
    next(ex);
  }
};


module.exports.editTraining = async (req, res, next) => {
  try {
    const { id, trainingName, price, category, subcategory } = req.body;

    // Check if the provided ID is valid
    if (!id) {
      return res.json({ msg: "Missing training ID", status: false });
    }

    // Find the training by ID
    const training = await Training.findById(id);

    // Check if the training exists
    if (!training) {
      return res.json({ msg: "Training not found", status: false });
    }
    // Update the training properties with the new values
    training.trainingName = trainingName || training.trainingName;
    training.price = price || training.price;
    training.category = category || training.category;
    training.subcategory = subcategory || training.subcategory;


    // Save the updated training
    await training.save();
    return res.json({ msg: "Training updated", status: true });
  } catch (ex) {
    next(ex);
  }
};





//inserting sample trainings  
module.exports.insertSampleTrainingData = async (req, res, next) => {
  try {
    await Training.insertMany(training);
    res.status(200).json({ message: "Training data inserted successfully" });
  } catch (ex) {
    next(ex);
  }
};

