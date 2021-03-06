import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    firstName: {type : String, required: true },
    lastName: {type : String, required: true },
    email: {type : String, required: true },
    branch: {type : String, required: true },
    contact: {type : String, required: true },
    section: {type : String, required: true },
    gender: {type : String, required: true },
    year: {type : String, required: true },
    password: {type : String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;