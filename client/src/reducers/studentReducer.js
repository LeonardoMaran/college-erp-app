import { LOGIN, LOGOUT, UPDATE_STUDENT, UPDATE_STUDENT_PASSWORD } from "../constants/actionTypes";

const reducer = (state = { studentData: null }, action) => {
    switch(action.type) {
        case LOGIN:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, studentData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, studentData: null };

        case UPDATE_STUDENT:
            if (action?.data.message === "Successfully updated")
                localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            alert(action?.data.message);
            return { ...state, studentData: action?.data };

        case UPDATE_STUDENT_PASSWORD:
            if (action?.data.message === "Successfully updated")
                localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            alert(action?.data.message);
            return { ...state, studentData: action?.data };

        default:
            return state;
    }
}

export default reducer;