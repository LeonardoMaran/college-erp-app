import mongoose from "mongoose";

const markSchema = mongoose.Schema({
    test: { type: String, required: true },
    testMarks: { type: Number, required: true, default: 0 },
    totalMarks: { type: Number, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student" }
});

const Mark = mongoose.model("Mark", markSchema);

export default Mark;