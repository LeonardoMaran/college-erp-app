import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subject: {type : String, required: true },
    branch: {type : String, required: true },
    year: {type : String, required: true }
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;