const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    imagePublicId: {
        type: String,
        required: true
    },

    education: {
        type: String,
        required: true
    }

}, { timestamps: true });

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;