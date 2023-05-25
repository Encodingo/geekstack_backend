const {
  createTraining,
  getAllTrainings,
  insertSampleTrainingData,
  deleteTraining,
  editTraining
} = require("../controllers/trainingController");
 
const router = require("express").Router();

router.get("/alltrainings", getAllTrainings);
router.post("/createtraining", createTraining);
router.post("/deletetraining", deleteTraining);
router.post("/edittraining", editTraining);


router.get("/insert", insertSampleTrainingData); 

module.exports = router;
 