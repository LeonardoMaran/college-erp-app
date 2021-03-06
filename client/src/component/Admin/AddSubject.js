import React, { useState } from "react";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { addSubject } from "../../actions/admin";


const AddSubject = () => {

    const dispatch = useDispatch();

    const initialState = {
        subject: "",
        branch: "",
        year: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addSubject(formData));
    };

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="subject" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required/><br />
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

                    <button type="submit" className="btn btn-outline-dark btn-md">Add</button>

                </form>

            </div>

        </div>
    );
}

export default AddSubject;