import React, { useState } from "react";
import Image from "./Image";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../actions/admin";
import { studentLogin } from "../actions/student";
import { teacherLogin } from "../actions/teacher";

const Login = ({ name }) => {

    const initialState = {
        email: "",
        password: ""
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();

        switch (name) {
            case "admin":
                dispatch(adminLogin(formData, history));
                break;

            case "student":
                dispatch(studentLogin(formData, history));
                break;

            case "teacher":
                dispatch(teacherLogin(formData, history));
                break;

            default:
                break;
        }
        
    }

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    }

    return (
        <div className="centered">

            <div className="form-card">

                <Image name={name} />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Login</button>
                    <Link to="/">
                        <button type="submit" className="btn btn-outline-dark btn-md">Back</button>
                    </Link>

                </form>

            </div>

        </div>
    );
}

export default Login;