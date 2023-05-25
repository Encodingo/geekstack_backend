const College = require("../models/collegeModel")

const fs = require('fs');


module.exports.collegeInfo = async (req, res, next) => {
    try {
        const { name, email, phone, designation, organization, message } = req.body;
        const college = await College.create({
            name, email, phone, designation, organization, message
        });
        return res.status(200).json({ msg: "College Information saved", status: true, college });
    } catch (ex) {
        next(ex);
    }
};



// Get All Colleges Data 
module.exports.getAllColleges = async (req, res, next) => {
    try {
        const colleges = await College.find();
        return res.status(200).json(colleges);
    } catch (ex) {
        next(ex);
    }
};

