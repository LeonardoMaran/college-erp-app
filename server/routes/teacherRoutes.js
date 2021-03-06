import express from "express";
import { addAttendance, addTest, markAttendance, markTest, showAttendance, showMarks, teacherLogin, updateTeacher, updateTeacherPassword } from "../controller/teacherController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/teacherLogin", teacherLogin);
router.patch("/updateTeacher/:id", auth, updateTeacher);
router.patch("/updateTeacherPassword/:id", auth, updateTeacherPassword);
router.post("/markAttendance", auth, markAttendance);
router.post("/addAttendance", auth, addAttendance);
router.post("/markTest", auth, markTest);
router.post("/addTest", auth, addTest);
router.post("/showMarks", auth, showMarks);
router.post("/showAttendance", auth, showAttendance);

export default router;