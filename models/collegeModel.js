const mongoose = require("mongoose");
const validator = require("validator");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a Valid Email");
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("colleges", collegeSchema);
