import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { showStudentSubjects, studentLogout } from "../../actions/student";

const StudentNavbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const data = JSON.parse(localStorage.getItem("profile"));
    const [name, setName] = useState(`${data.result.firstName} ${data.result.lastName}`);

    const handleClick = () => {
        dispatch(studentLogout(history));
        setName(null);
    }

    useEffect (() => {
        const token = data?.token;

        if (token) {
            const decodedData = decode(token);
            if (decodedData.exp * 1000 < new Date().getTime())
                handleClick();
        }

        setName(`${data.result.firstName} ${data.result.lastName}`);
    }, [location]);


    return (
        <nav className="navbar navbar-expand-lg navbar-light">

            <div className="container-fluid">

                <h4 className="navbar-brand">ERP</h4>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#burgerSymbol">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="burgerSymbol">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/student/showStudent">{name}</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/student/updateStudent">Update Profile</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/student/updateStudentPassword">Update Password</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/student/showTestMarks">Test Performance</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/student/showStudentAttendance">Check Attendance</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => dispatch(showStudentSubjects(data.result._id))} to="/student/showStudentSubjects">Subjects</Link>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-outline-dark btn-md" onClick={handleClick} >Log Out</button>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default StudentNavbar;