import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { useLocation } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";
import { showTestMarks } from "../../actions/student";

const ShowTestMarks = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const id = JSON.parse(localStorage.getItem("profile")).result._id;

    const initialState = {
        test: "",
        subject: ""
    };

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(showTestMarks(id, formData))
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
                                    <th scope="col">Test</th>
                                    <th scope="col">Marks</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                {
                                    datas.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
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

export default ShowTestMarks;