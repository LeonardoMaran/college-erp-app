import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"
import { CLEAR } from "../../constants/actionTypes";

const ShowStudents = () => {

  const datas = useSelector(state => state.dataReducer.data);

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
                  <th scope="col">Name</th>
                  <th scope="col">Section</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Year</th>
                </tr>
              </thead>

              <tbody>
              
                {
                  datas &&
                  (
                      datas.map((data, index) => (
                      <tr key={data?._id}>
                        <th scope="row">{index+1}</th>
                        <td>{`${data?.firstName} ${data?.lastName}`}</td>
                        <td>{data?.section}</td>
                        <td>{data?.branch}</td>
                        <td>{data?.year}</td>
                      </tr>
                    ))
                  )
                }

              </tbody>

            </table>

          </div>

    );
}

export default ShowStudents;