import React, { useState } from "react";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { updateTeacherPassword } from "../../actions/teacher";
import { useHistory } from "react-router-dom";

const UpdateTeacherPassword = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialData = {
        password: "",
        newPassword: "",
        confirmPassword: ""
    }

    const initialState = JSON.parse(localStorage.getItem("profile")).result;
    const id = initialState._id;

    const [formData, setFormData] = useState(initialData);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(updateTeacherPassword(id, formData, history));
    };

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="password" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Update</button>

                </form>

            </div>

        </div>
    );
}

export default UpdateTeacherPassword;