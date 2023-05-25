// const express = require("express");

const { collegeInfo, getAllColleges } = require("../controllers/collegeController");

const router = require("express").Router();

router.post("/college", collegeInfo);
router.get("/getAllColleges", getAllColleges);

// Route
module.exports = router;