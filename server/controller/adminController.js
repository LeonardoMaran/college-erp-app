import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/adminModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import Subject from "../models/subjectModel.js";

export const adminLogin = async (req, res) => {

    try {
        const  { email, password } = req.body;

        const foundAdmin = await Admin.findOne({ email });

        if (!foundAdmin)
            return res.json({ message: "Admin doesn't exists" });
        
        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password);

        if (!isPasswordCorrect)
            return res.json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: foundAdmin.email, id: foundAdmin._id }, "test", { expiresIn: "1h" });

        return res.json({ result: foundAdmin, token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addTeacher = async (req, res) => {

    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { firstName, lastName, email, branch, contact, gender, year, password, confirmPassword } = req.body;

        const foundTeacher = await Teacher.findOne({ email });

        if (foundTeacher)
            return res.json({ message: "Teacher already exists" });

        if (password !== confirmPassword)
            return res.json({ message: "Passwords do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newTeacher = new Teacher({ firstName, lastName, email, branch, contact, gender, year, password: hashedPassword });

        await newTeacher.save();

        return res.json({ message: "Teacher added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addStudent = async (req, res) => {

    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { firstName, lastName, email, branch, contact, gender, section, year, password, confirmPassword } = req.body;

        const foundStudent = await Student.findOne({ email });

        if (foundStudent)
            return res.json({ message: "Student already exists" });

        if (password !== confirmPassword)
            return res.json({ message: "Passwords do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newStudent = new Student({ firstName, lastName, email, branch, contact, gender, section, year, password: hashedPassword });

        await newStudent.save();

        return res.json({ message: "Student added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addSubject = async (req, res) => {

    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { subject, branch, year } = req.body;

        const foundSubject = await Subject.findOne({ subject, branch, year });

        if (foundSubject)
            return res.json({ message: "Subject already exists" });

        const newSubject = new Subject({ subject, branch, year });

        await newSubject.save();

        return res.json({ message: "Subject added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addAdmin = async (req, res) => {

    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        const foundAdmin = await Admin.findOne({ email });

        if (foundAdmin)
            return res.json({ message: "Admin already exists" });

        if (password !== confirmPassword)
            return res.json({ message: "Passwords do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword });

        await newAdmin.save();

        return res.json({ message: "Admin added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showTeachers = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const data = await Teacher.find();

        if (data.length === 0) {
            return res.json({ message: "Teachers not found" })
        } else {
            return res.json({ data });
        }
        
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showStudents = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const data = await Student.find();

        if (data.length === 0) {
            return res.json({ message: "Students not found" })
        } else {
            return res.json({ data });
        }

    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showSubjects = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const data = await Subject.find();

        if (data.length === 0) {
            return res.json({ message: "Subjects not found" })
        } else {
            return res.json({ data });
        }

    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}