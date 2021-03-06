import React, { useState } from "react";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { updateStudent } from "../../actions/student";
import { useHistory } from "react-router-dom";

const UpdateStudent = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = JSON.parse(localStorage.getItem("profile")).result;
    const id = initialState._id;

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(updateStudent(id, formData, history));
    };

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="student" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} /><br />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} /><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} /><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} /><br />
                        </div>
                        <div className="col">
                            <select className="form-select" name="gender" onChange={handleChange} >
                                <option value="" defaultValue hidden >Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <select className="form-select" name="section" onChange={handleChange} >
                                <option value="" defaultValue hidden >Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Update</button>

                </form>

            </div>

        </div>
    );
}

export default UpdateStudent;