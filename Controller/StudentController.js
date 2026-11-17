const StudentModel = require("../Models/StudentModel");
const cloudinary = require("../Config/cloudinary");

// CREATE STUDENT

const CreateStudent = async (req, res) => {
    try {

        const { name, age, gender, country, state, address, education, image } = req.body;

        if (!image) {
            return res.status(400).json({
                message: "Please provide image"
            });
        }

        const result = await cloudinary.uploader.upload(image, {
            folder: "Students"
        });

        const student = await StudentModel.create({
            name,
            age,
            gender,
            country,
            state,
            address,
            education,
            image: result.secure_url,
            imagePublicId: result.public_id
        });

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// FETCH ALL STUDENTS

const FetchStudent = async (req, res) => {
    try {

        const student = await StudentModel.find();

        res.status(200).json({
            message: "Student fetched successfully",
            data: student
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// FETCH SINGLE STUDENT

const SingleStudent = async (req, res) => {
    try {

        const student = await StudentModel.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student fetched successfully",
            data: student
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE STUDENT

const UpdateStudent = async (req, res) => {
    try {

        console.log("Update Function Called");

        const student = await StudentModel.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { name, age, gender, country, state, address, education, image } = req.body;

        student.name = name ?? student.name;
        student.age = age ?? student.age;
        student.gender = gender ?? student.gender;
        student.country = country ?? student.country;
        student.state = state ?? student.state;
        student.address = address ?? student.address;
        student.education = education ?? student.education;

        if (image) {

            const result = await cloudinary.uploader.upload(image, {
                folder: "Students"
            });

            if (student.imagePublicId) {
                await cloudinary.uploader.destroy(student.imagePublicId);
            }

            student.image = result.secure_url;
            student.imagePublicId = result.public_id;
        }

        await student.save();

        res.status(200).json({
            message: "Student updated successfully",
            data: student
        });

    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE STUDENT

const DeleteStudent = async (req, res) => {
    try {

        const student = await StudentModel.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await cloudinary.uploader.destroy(student.imagePublicId);

        await StudentModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// EXPORT

module.exports = {
    CreateStudent,
    FetchStudent,
    SingleStudent,
    UpdateStudent,
    DeleteStudent
};