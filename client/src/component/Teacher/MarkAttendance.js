import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { markAttendance, addAttendance } from "../../actions/teacher";
import { useLocation, useHistory } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";

const MarkAttendance = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const initialState = {
        section: "",
        branch: "",
        year: ""
    };

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);
    const [checked, setChecked] = useState([]);
    const [date, setDate] = useState(null);
    const [subject, setSubject] = useState("");
    const [branch, setBranch] = useState("");


    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(markAttendance(formData));
        setBranch(formData.branch);
    };

    const handleCheckChange = (event) => {
        setChecked(prevCheck => [...prevCheck, { [event.target.name]: event.target.value }])
    }

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleChecks = async (event) => {
        event.preventDefault();
        dispatch(addAttendance(checked, date, subject, branch, history));
        setChecked([]);
    }

    useEffect(() => {
        dispatch({ type: CLEAR });
    }, [location])

    return (
        <div className="centered">

            <div className="form-card">

                <Image name="attendance" />

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <select className="form-select" name="section" onChange={handleChange} required>
                                <option value="" defaultValue hidden >Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select><br />
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

                    <button type="submit" className="btn btn-outline-dark btn-md">Mark</button>

                </form>

            </div>

            {
                datas &&
                (
                    <form onSubmit={handleChecks}>

                        <div className="form-table">

                            <div className="row">
                                <div className="col">
                                    <input className="form-control" type="text" name="subject" placeholder="Subject"  onChange={handleSubjectChange} required/><br />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input className="date" type="date" name="date" placeholder="Date" onChange={handleDateChange} required/><br />
                                </div>
                            </div>

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">Sr No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Branch</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Present</th>
                                    </tr>
                                </thead>

                                <tbody>
                                
                                    {
                                        datas.map((data, index) => (
                                        <tr key={data?._id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{`${data?.firstName} ${data?.lastName}`}</td>
                                            <td>{data?.branch}</td>
                                            <td>{data?.year}</td>
                                            <td><input className="form-check-input" type="checkbox" name="id" value={data?._id} onChange={handleCheckChange} /></td>
                                        </tr>
                                        ))
                                    }

                                </tbody>

                            </table>

                            <button type="submit" className="btn btn-outline-dark btn-md">Submit</button>

                        </div>

                    </form>

                )
            }

        </div>

    );
}

export default MarkAttendance;