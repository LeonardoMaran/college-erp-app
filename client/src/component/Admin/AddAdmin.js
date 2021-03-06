import React, { useState } from "react";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../actions/admin";

const AddAdmin = () => {

    const dispatch = useDispatch();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addAdmin(formData));
    };

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="admin" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required/><br />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input type="email" className="form-control" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/><br />
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Add</button>

                </form>

            </div>

        </div>
    );
}

export default AddAdmin;