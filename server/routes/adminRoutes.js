import express from "express";
import { adminLogin, addTeacher, addAdmin, addSubject, addStudent, showTeachers, showStudents, showSubjects } from "../controller/adminController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/addTeacher", auth, addTeacher);
router.post("/addStudent", auth, addStudent);
router.post("/addSubject", auth, addSubject);
router.post("/addAdmin", auth, addAdmin);
router.get("/showTeachers", auth, showTeachers);
router.get("/showStudents", auth, showStudents);
router.get("/showSubjects", auth, showSubjects);

export default router;