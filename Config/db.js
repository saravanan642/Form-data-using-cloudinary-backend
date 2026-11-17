const mongoose = require("mongoose");

const Database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose connected successfully");
    } 
    catch (err) {
        console.error("Mongoose connection failed:", err.message);
    }
};

module.exports = Database;