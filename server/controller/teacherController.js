import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Subject from "../models/subjectModel.js";
import Mark from "../models/markModel.js";

export const teacherLogin = async (req, res) => {
    try {
        const  { email, password } = req.body;
        
        const foundTeacher = await Teacher.findOne({ email });

        if (!foundTeacher)
            return res.json({ message: "Teacher doesn't exists" });
        
        const isPasswordCorrect = await bcrypt.compare(password, foundTeacher.password);

        if (!isPasswordCorrect)
            return res.json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: foundTeacher.email, id: foundTeacher._id }, "test", { expiresIn: "1h" });

        return res.json({ result: foundTeacher, token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const updateTeacher = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { id } = req.params;
        const { firstName, lastName, email, branch, gender, year, contact, password } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.json({ message: `No teacher with id: ${id}` });

        const updatedTeacher = { firstName, lastName, email, branch, gender, year, contact, password, _id: id };

        await Teacher.findByIdAndUpdate(id, updatedTeacher, { new: true });

        const token = jwt.sign({ email: updatedTeacher.email, id: updatedTeacher._id }, "test", { expiresIn: "1h" });

        return res.json({ result: updatedTeacher, message: "Successfully updated", token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const updateTeacherPassword = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { id } = req.params;
        const { password, newPassword, confirmPassword } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.json({ message: `No teacher with id: ${id}` });

        const foundTeacher = await Teacher.findById(id);

        if (!foundTeacher)
            return res.json({ message: "Teacher not found" });
            
        const isPasswordCorrect = await bcrypt.compare(password, foundTeacher.password);

        if (!isPasswordCorrect || newPassword !== confirmPassword)
            return res.json({ message: "Passwords did not match" });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatedTeacher = { 
            _id: foundTeacher._id,
            email: foundTeacher.email, 
            firstName: foundTeacher.firstName, 
            lastName: foundTeacher.lastName, 
            branch: foundTeacher.branch, 
            gender: foundTeacher.gender, 
            year: foundTeacher.year, 
            contact: foundTeacher.contact, 
            password: hashedPassword 
        };

        await Teacher.findByIdAndUpdate(id, updatedTeacher, { new: true });

        const token = jwt.sign({ email: updatedTeacher.email, id: updatedTeacher._id }, "test", { expiresIn: "1h" });

        return res.json({ result: updatedTeacher, message: "Successfully updated", token });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const markAttendance = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { section, branch, year } = req.body;

        const data = await Student.find({ section, branch, year });

        if (data.length === 0) {
            return res.json({ message: "No students found" });
        } else {
            return res.json({ data });
        }
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addAttendance = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { subject, date, checked, branch } = req.body;

        const foundSubject = await Subject.findOne({ branch, subject });

        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        const existingAttendance = await Attendance.findOne({ subject: foundSubject._id, date });

        if (existingAttendance)
            return res.json({ message: "Attendance already exists" });

        if (checked.length === 0)
            return res.json({ message: "No students marked"});

        const studentData = checked.map(data => mongoose.Types.ObjectId(data.id));

        const newAttendance = new Attendance({ date, student: studentData, subject: foundSubject._id });

        await newAttendance.save();

        return res.json({ message: "Attendance added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const markTest = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { test, branch, year } = req.body;

        const data = await Student.find({ branch, year });

        if (data.length === 0) {
            return res.json({ message: "No students found" });
        } else {
            return res.json({ data });
        }
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const addTest = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { inputMarks, subject, branch, test, totalMarks } = req.body;

        const foundSubject = await Subject.findOne({ branch, subject });

        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        if (inputMarks.length === 0)
            return res.json({ message: "No students marked"});

        const foundMark = await Mark.findOne({ subject: foundSubject._id, test });
        
        if (foundMark)
            return res.json({ message: "Mark already exists" });

        for (let i = 0; i < inputMarks.length; i++) {

            let studentId = mongoose.Types.ObjectId(inputMarks[i].studentId);

            const newMark = new Mark({ student: studentId, subject: foundSubject._id, test, totalMarks, testMarks: inputMarks[i].studentMarks });

            await newMark.save();
        }

        return res.json({ message: "Mark added successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showMarks = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { test, subject, branch, section, year } = req.body;

        const foundSubject = await Subject.findOne({ branch, subject, year });

        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        const foundMarks = await Mark.find({ test, subject: foundSubject._id, });

        if (foundMarks.length === 0)
            return res.json({ message: "Marks entered is wrong" });

        let returnedData = [];

        for (let i = 0; i < foundMarks.length; i++) {

            const student = await Student.findById(String(foundMarks[i].student));

            if (student)
                returnedData.push({ firstName: student.firstName, lastName: student.lastName, test: foundMarks[i].test, marks: foundMarks[i].testMarks, branch, year });
        }
        
        return res.json({ data: returnedData });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

export const showAttendance = async (req, res) => {

    if(!req.userId)
        return res.json({ message: "Unauthenticated" });

    try {
        const { subject, date, branch, section, year } = req.body;

        const foundSubject = await Subject.findOne({ branch, subject, year });

        if (!foundSubject)
            return res.json({ message: "Subject entered is wrong" });

        const foundAttendance = await Attendance.findOne({ date, subject: foundSubject._id });

        if (!foundAttendance)
            return res.json({ message: "Attendance entered is wrong" });
        
        let returnedData = [];

        for (let i = 0; i < foundAttendance.student.length; i++) {

            const student = await Student.findById(String(foundAttendance.student[i]));

            if (student)
                returnedData.push({ firstName: student.firstName, lastName: student.lastName, date });
        }

        return res.json({ data: returnedData });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}