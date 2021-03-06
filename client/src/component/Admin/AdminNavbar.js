import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { adminLogout, showTeachers, showStudents, showSubjects } from "../../actions/admin";

const AdminNavbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const data = JSON.parse(localStorage.getItem("profile"));
    const [name, setName] = useState(`${data.result.firstName} ${data.result.lastName}`);

    const handleClick = () => {
        dispatch(adminLogout(history));
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
                            <Link className="nav-link" to="/admin/showAdmin">{name}</Link>
                        </li>

                        <li className="nav-item dropdown">

                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Add
                            </a>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/addTeacher">Add Teacher</Link></li>
                                <li><Link className="dropdown-item" to="/admin/addStudent">Add Student</Link></li>
                                <li><Link className="dropdown-item" to="/admin/addSubject">Add Subject</Link></li>
                                <li><Link className="dropdown-item" to="/admin/addAdmin">Add Admin</Link></li>
                            </ul>

                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => dispatch(showTeachers())} to="/admin/showTeachers">Teachers</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => dispatch(showStudents())} to="/admin/showStudents">Students</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => dispatch(showSubjects())} to="/admin/showSubjects">Subjects</Link>
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

export default AdminNavbar;