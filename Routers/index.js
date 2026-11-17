const express = require("express");
const router = express.Router();

const StudentRoutes = require("./StudentRoutes");

router.use("/student", StudentRoutes);

module.exports = router;