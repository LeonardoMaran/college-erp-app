import React from "react";
import admin from "../images/admin.svg";
import student from "../images/student.svg";
import teacher from "../images/teacher.svg";
import attendance from "../images/attendance.svg";
import marks from "../images/marks.svg";
import password from "../images/password.svg";
import subject from "../images/subject.svg";

const Image = ({ name }) => {

    let imgSrc;

    switch (name) {
        case "admin":
            imgSrc = admin;
            break;
        case "student":
            imgSrc = student;
            break;
        case "teacher":
            imgSrc = teacher;
            break;
        case "password":
            imgSrc = password;
            break;
        case "subject":
            imgSrc = subject;
            break;
        case "marks":
            imgSrc = marks;
            break;
        case "attendance":
            imgSrc = attendance;
            break;

        default: imgSrc = "";
    }
    return (
        <>
            <img src={imgSrc} alt={name[0].toUpperCase() + name.substring(1)} />
            <p className="lead">{name[0].toUpperCase() + name.substring(1)}</p>
        </>
    );
}

export default Image;