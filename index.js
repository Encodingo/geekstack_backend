const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const trainingRoutes = require("./routes/training");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

const collegeRoutes = require("./routes/collegeRoutes");
const app = express();


require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/training", upload.single("image"), trainingRoutes);
app.use("/api", collegeRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
