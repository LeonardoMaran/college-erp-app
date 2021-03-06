import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    firstName: {type : String, required: true },
    lastName: {type : String, required: true },
    email: {type : String, required: true },
    branch: {type : String, required: true },
    contact: {type : String, required: true },
    gender: {type : String, required: true },
    year: {type : String, required: true },
    password: {type : String, required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;