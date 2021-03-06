import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { useLocation, useHistory } from "react-router-dom";
import { CLEAR } from "../../constants/actionTypes";
import { addTest, markTest } from "../../actions/teacher";

const MarkTest = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const initialState = {
        test: "",
        branch: "",
        year: ""
    };

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);
    const [inputMarks, setInputMarks] = useState([]);
    const [test, setTest] = useState("");
    const [subject, setSubject] = useState("");
    const [branch, setBranch] = useState("");
    const [totalMarks, setTotalMarks] = useState(0);


    const handleChange = (event) => {
        setFormData(() => ({...formData, [event.target.name] : event.target.value}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(markTest(formData));
        setBranch(formData.branch);
        setTest(formData.test);
        if (formData.test === "MST" || formData.test === "TA")
            setTotalMarks(20);
        else
            setTotalMarks(60);

    };

    const handleInputChange = (event) => {
        setInputMarks(prevInput => {
            if (prevInput.length !== 0) {
                const data = prevInput.filter(input => input.studentId !== event.target.name);
                const newData = [ ...data, { studentId: event.target.name, studentMarks: Number(event.target.value) }];
                return newData;
            } else {
                return [ ...prevInput, { studentId: event.target.name, studentMarks: Number(event.target.value) } ];
            }
        })
    }

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    }

    const handleInputs = async (event) => {
        event.preventDefault();
        dispatch(addTest(inputMarks, subject, branch, test, totalMarks, history));
        setInputMarks([]);
    }

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
                    <form onSubmit={handleInputs}>

                        <div className="form-table">

                            <div className="row">
                                <div className="col">
                                    <input className="form-control" type="text" name="subject" placeholder="Subject"  onChange={handleSubjectChange} required/><br />
                                </div>
                            </div>

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">Sr No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Branch</th>
                                        <th scope="col">Section</th>
                                        <th scope="col">Marks</th>
                                    </tr>
                                </thead>

                                <tbody>
                                
                                    {
                                        datas.map((data, index) => (
                                        <tr key={data?._id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{`${data?.firstName} ${data?.lastName}`}</td>
                                            <td>{data?.branch}</td>
                                            <td>{data?.section}</td>
                                            <td><input className="form-control marks-input" type="number" name={data?._id} min={0} max={totalMarks} onChange={handleInputChange} /><p>/{totalMarks}</p></td>
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

export default MarkTest;