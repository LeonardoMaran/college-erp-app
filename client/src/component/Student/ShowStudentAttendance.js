import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { useLocation } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";
import { showStudentAttendance } from "../../actions/student";

const ShowStudentAttendance = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const id = JSON.parse(localStorage.getItem("profile")).result._id;

    const initialState = {
        subject: "",
        date: ""
    };

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(showStudentAttendance(id, formData));
    };

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
                            <input className="date" type="date" name="date" placeholder="Date" onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="subject" placeholder="Subject" onChange={handleChange} required/><br />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-dark btn-md">Show</button>

                </form>

            </div>

            {
                datas &&
                (
                    <div className="form-table">

                        <table className="table">

                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Present</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                {
                                    datas.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{data?.date}</td>
                                        <td>True</td>
                                    </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

        </div>

    );
}

export default ShowStudentAttendance;