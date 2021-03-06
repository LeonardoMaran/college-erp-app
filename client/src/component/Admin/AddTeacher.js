import React, { useState } from "react";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { addTeacher } from "../../actions/admin";


const AddTeacher = () => {

    const dispatch = useDispatch();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        branch: "",
        contact: "",
        gender: "",
        year: "",
        password: "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addTeacher(formData));

    };

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="teacher" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required/><br />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <select className="form-select" name="branch" onChange={handleChange} required>
                                <option value="" defaultValue hidden >Branch</option>
                                <option value="CS">CS</option>
                                <option value="IT">IT</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="ECE">ECE</option>
                                <option value="EXTC">EXTC</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Civil">Civil</option>
                                <option value="Production">Production</option>
                            </select><br />
                        </div>
                        <div className="col">
                            <select className="form-select" name="year" onChange={handleChange} required>
                                <option value="" defaultValue hidden >Year</option>
                                <option value="1">First Year</option>
                                <option value="2">Second Year</option>
                                <option value="3">Third Year</option>
                                <option value="4">Fourth Year</option>
                            </select><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required/><br />
                        </div>
                        <div className="col">
                            <select className="form-select" name="gender" onChange={handleChange} required>
                                <option value="" defaultValue hidden >Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/><br />
                        </div>
                        <div className="col">
                            <input className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Add</button>

                </form>

            </div>

        </div>
    );
}

export default AddTeacher;