import React from "react";
import Login from "./Login";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ShowAdmin from "./Admin/ShowAdmin";
import AddStudent from "./Admin/AddStudent"
import AdminNavbar from "./Admin/AdminNavbar";
import AddSubject from "./Admin/AddSubject";
import AddAdmin from "./Admin/AddAdmin";
import AddTeacher from "./Admin/AddTeacher";
import ShowTeachers from "./Admin/ShowTeachers";
import ShowStudents from "./Admin/ShowStudents";
import ShowSubjects from "./Admin/ShowSubjects";
import TeacherNavbar from "./Teacher/TeacherNavbar";
import ShowTeacher from "./Teacher/ShowTeacher";
import UpdateTeacher from "./Teacher/UpdateTeacher";
import UpdateTeacherPassword from "./Teacher/UpdateTeacherPassword";
import MarkAttendance from "./Teacher/MarkAttendance";
import MarkTest from "./Teacher/MarkTest";
import ShowMarks from "./Teacher/ShowMarks";
import ShowAttendance from "./Teacher/ShowAttendance";
import StudentNavbar from "./Student/StudentNavbar";
import ShowStudent from "./Student/ShowStudent";
import UpdateStudent from "./Student/UpdateStudent";
import UpdateStudentPassword from "./Student/UpdateStudentPassword";
import ShowTestMarks from "./Student/ShowTestMarks";
import ShowStudentSubjects from "./Student/ShowStudentSubjects";
import ShowStudentAttendance from "./Student/ShowStudentAttendance";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admin/adminLogin">
                    <Login name="admin" />
                </Route>
                <Route exact path="/student/studentLogin">
                    <Login name="student" />
                </Route>
                <Route exact path="/teacher/teacherLogin">
                    <Login name="teacher" />
                </Route>
                <Route exact path="/admin/showAdmin">
                    <AdminNavbar />
                    <ShowAdmin />
                </Route>
                <Route exact path="/admin/addStudent" >
                    <AdminNavbar />
                    <AddStudent />
                </Route>
                <Route exact path="/admin/addTeacher" >
                    <AdminNavbar />
                    <AddTeacher />
                </Route>
                <Route exact path="/admin/addAdmin" >
                    <AdminNavbar />
                    <AddAdmin />
                </Route>
                <Route exact path="/admin/addSubject" >
                    <AdminNavbar />
                    <AddSubject />
                </Route>
                <Route exact path="/admin/showSubjects" >
                    <AdminNavbar />
                    <ShowSubjects />
                </Route>
                <Route exact path="/admin/showTeachers" >
                    <AdminNavbar />
                    <ShowTeachers />
                </Route>
                <Route exact path="/admin/showStudents" >
                    <AdminNavbar />
                    <ShowStudents />
                </Route>
                <Route exact path="/teacher/showTeacher" >
                    <TeacherNavbar />
                    <ShowTeacher />
                </Route>
                <Route exact path="/teacher/updateTeacher" >
                    <TeacherNavbar />
                    <UpdateTeacher />
                </Route>
                <Route exact path="/teacher/updateTeacherPassword" >
                    <TeacherNavbar />
                    <UpdateTeacherPassword />
                </Route>
                <Route exact path="/teacher/markAttendance" >
                    <TeacherNavbar />
                    <MarkAttendance />
                </Route>
                <Route exact path="/teacher/markTest" >
                    <TeacherNavbar />
                    <MarkTest />
                </Route>
                <Route exact path="/teacher/showMarks" >
                    <TeacherNavbar />
                    <ShowMarks />
                </Route>
                <Route exact path="/teacher/showAttendance" >
                    <TeacherNavbar />
                    <ShowAttendance />
                </Route>
                <Route exact path="/student/showStudent" >
                    <StudentNavbar />
                    <ShowStudent />
                </Route>
                <Route exact path="/student/updateStudent" >
                    <StudentNavbar />
                    <UpdateStudent />
                </Route>
                <Route exact path="/student/updateStudentPassword" >
                    <StudentNavbar />
                    <UpdateStudentPassword />
                </Route>
                <Route exact path="/student/showTestMarks" >
                    <StudentNavbar />
                    <ShowTestMarks />
                </Route>
                <Route exact path="/student/showStudentSubjects" >
                    <StudentNavbar />
                    <ShowStudentSubjects />
                </Route>
                <Route exact path="/student/showStudentAttendance" >
                    <StudentNavbar />
                    <ShowStudentAttendance />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;