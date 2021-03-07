import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Student from "../models/studentModel.js";
import Subject from "../models/subjectModel.js";
import Attendance from "../models/attendanceModel.js";
import Mark from "../models/markModel.js"; 

dotenv.config();
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN || "";

export const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundStudent = await Student.findOne({ email });

        if (!foundStudent)
            return res.json({ message: "Student doesn't exists" });
        
        const isPasswordCorrect = await bcrypt.compare(password, foundStudent.password);

        if (!isPasswordCorrect)
            return res.json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: foundStudent.email, id: foundStudent._id }, JWT_AUTH_TOKEN, { expiresIn: "1h" });

        return res.json({ result: foundStudent, token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const updateStudent = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { id } = req.params;
        const { firstName, lastName, email, branch, gender, year, contact, password, section } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.json({ message: `No student with id: ${id}` });

        const updatedStudent = { firstName, lastName, email, branch, gender, section, year, contact, password, _id: id };

        await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

        const token = jwt.sign({ email: updatedStudent.email, id: updatedStudent._id }, JWT_AUTH_TOKEN, { expiresIn: "1h" });

        return res.json({ result: updatedStudent, message: "Successfully updated", token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const updateStudentPassword = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { id } = req.params;
        const { password, newPassword, confirmPassword } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.json({ message: `No student with id: ${id}` });

        const foundStudent = await Student.findById(id);

        if (!foundStudent)
            return res.json({ message: "Student not found" });
            
        const isPasswordCorrect = await bcrypt.compare(password, foundStudent.password);

        if (!isPasswordCorrect || newPassword !== confirmPassword)
            return res.json({ message: "Passwords did not match" });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatedStudent = { 
            _id: foundStudent._id,
            email: foundStudent.email, 
            firstName: foundStudent.firstName, 
            lastName: foundStudent.lastName, 
            branch: foundStudent.branch, 
            year: foundStudent.year,
            gender: foundStudent.gender, 
            section: foundStudent.section, 
            contact: foundStudent.contact, 
            password: hashedPassword 
        };

        await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

        const token = jwt.sign({ email: updatedStudent.email, id: updatedStudent._id }, JWT_AUTH_TOKEN, { expiresIn: "1h" });

        return res.json({ result: updatedStudent, message: "Successfully updated", token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showTestMarks = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { test, subject } = req.body;
        const { id } = req.params;
    
        const foundStudent = await Student.findById(id);

        if (!foundStudent)
            return res.json({ message: "Student entered is wrong" });

        const foundSubject = await Subject.findOne({ subject, branch: foundStudent.branch, year: foundStudent.year });
        
        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        const existingMark = await Mark.findOne({ student: foundStudent._id, subject: foundSubject._id, test });

        if (!existingMark)
            return res.json({ message: "Marks entered not found" });

        let returnedData = [{ test: existingMark.test, marks: existingMark.testMarks }];

        return res.json({ data: returnedData });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showStudentAttendance = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { subject, date } = req.body;
        const { id } = req.params;
    
        const foundStudent = await Student.findById(id);
        
        if (!foundStudent)
            return res.json({ message: "Student entered is wrong" });

        const foundSubject = await Subject.findOne({ branch: foundStudent.branch, subject, year: foundStudent.year });

        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        const enteredAttendance = await Attendance.findOne({ date, subject: foundSubject._id });

        if (!enteredAttendance)
            return res.json({ message: "Attendance entered is wrong" });
        
        const presentOrNot = enteredAttendance.student.filter(stu => (String(stu) === String(foundStudent._id)));
        
        if (presentOrNot.length === 0)
            return res.json({ message: "Student not present" });

        return res.json({ data: [{ date }] });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showStudentSubjects = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });
        
    try {
        const { id } = req.params;

        const foundStudent = await Student.findById(id);
        
        if (!foundStudent)
            return res.json({ message: "Student entered is wrong" });

        const data = await Subject.find({ branch: foundStudent.branch, year: foundStudent.year });

        if (data.length === 0) {
            return res.json({ message: "No subjects found" });
        }
        
        return res.json({ data });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}