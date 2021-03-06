import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { CLEAR } from "../../constants/actionTypes";

const ShowStudentSubjects = () => {

    const datas = useSelector(state => state.dataReducer.data);

    const id = JSON.parse(localStorage.getItem("profile")).result._id;

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch({ type: CLEAR });
    }, [location])

    return (
      <div className="form-table">

            <table className="table">

              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Subject</th>
                </tr>
              </thead>

              <tbody>
              
                {
                  datas &&
                  (
                      datas.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{data.subject}</td>
                      </tr>
                    ))
                  )
                }

              </tbody>

            </table>

          </div>

    );
}

export default ShowStudentSubjects;