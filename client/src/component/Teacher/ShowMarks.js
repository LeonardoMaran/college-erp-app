import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { useLocation } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";
import { showMarks } from "../../actions/teacher";

const ShowMarks = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const initialState = {
        test: "",
        subject: "",
        branch: "",
        section: "",
        year: ""
    };

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(showMarks(formData))
    };

    useEffect(() => {
        dispatch({ type: CLEAR });
    }, [location])

    return (

      <div className="centered">

            <div className="form-card">

                <Image name="marks" />

                <form onSubmit={handleSubmit}>

                    <div className="col">
                        <select className="form-select" name="test" onChange={handleChange} required>
                            <option value="" defaultValue hidden >Test Name</option>
                            <option value="MST">MST</option>
                            <option value="ESE">ESE</option>
                            <option value="TA">TA</option>
                        </select><br />
                    </div>

                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="subject" placeholder="Subject" onChange={handleChange} required/><br />
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
                                    <th scope="col">Name</th>
                                    <th scope="col">Test</th>
                                    <th scope="col">Marks</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                {
                                    datas.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{`${data?.firstName} ${data?.lastName}`}</td>
                                        <td>{data?.test}</td>
                                        <td>{data?.marks}</td>
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

export default ShowMarks;