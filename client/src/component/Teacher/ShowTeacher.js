import React from "react";
import Image from "../Image";

const ShowTeacher = () => {

    const data = JSON.parse(localStorage.getItem("profile")).result;

    return (
            <div className="centered">

                <div className="form-table">

                    <Image name="teacher" />

                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row">First Name</th>
                            <td>{data.firstName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Last Name</th>
                            <td>{data.lastName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Branch</th>
                            <td>{data.branch}</td>
                        </tr>
                        <tr>
                            <th scope="row">Year</th>
                            <td>{data.year}</td>
                        </tr>
                        <tr>
                            <th scope="row">Contact</th>
                            <td>{data.contact}</td>
                        </tr>
                        <tr>
                            <th scope="row">Gender</th>
                            <td>{data.gender}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            </div>
    );
}

export default ShowTeacher;