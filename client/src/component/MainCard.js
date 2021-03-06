import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";


const MainCard = ({ name }) => {
    return (
        <div className="card col-lg-4">
            <div className="main-card">
                <Image name={name} />
                <Link to={`/${name}/${name}Login`}>
                    <button type="button" className="btn btn-outline-dark btn-md btn-main">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default MainCard;