import React from "react";
import MainCard from "./MainCard";

const Home = () => {
    return (
        
        <div className="centered">

            <div className="container row">

                <div className="col-lg-12">
                    <h1 id="main-heading" className="display-5">College ERP</h1>
                </div>

                <MainCard name="admin" />
                <MainCard name="student" />
                <MainCard name="teacher" />

            </div>

        </div>
    );
}

export default Home;