import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    date: { type: String, required: true },
    subject: {type: mongoose.Schema.Types.ObjectId, ref: "subject" },
    student: [ { type: mongoose.Schema.Types.ObjectId, ref: "student" } ]
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;