const express = require("express");
const router = express.Router();

const {
    CreateStudent,
    FetchStudent,
    SingleStudent,
    UpdateStudent,
    DeleteStudent
} = require("../Controller/StudentController");

router.post("/create", CreateStudent);

router.get("/fetch", FetchStudent);

router.get("/fetch/:id",  SingleStudent,);

router.put("/update/:id", UpdateStudent);

router.delete("/delete/:id", DeleteStudent);

module.exports = router;