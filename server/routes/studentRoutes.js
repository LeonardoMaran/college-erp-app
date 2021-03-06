import express from "express";
import { showStudentAttendance, showStudentSubjects, showTestMarks, studentLogin, updateStudent, updateStudentPassword } from "../controller/studentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/studentLogin", studentLogin);
router.patch("/updateStudent/:id", auth, updateStudent);
router.patch("/updateStudentPassword/:id", auth, updateStudentPassword);
router.post("/showTestMarks/:id", auth, showTestMarks);
router.get("/showStudentSubjects/:id", auth, showStudentSubjects);
router.post("/showStudentAttendance/:id", auth, showStudentAttendance);

export default router;