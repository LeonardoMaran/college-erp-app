import { ADD_ATTENDANCE, ADD_TEST, LOGIN, LOGOUT, UPDATE_TEACHER, UPDATE_TEACHER_PASSWORD } from "../constants/actionTypes";

const reducer = (state = { teacherData: null }, action) => {
    switch(action.type) {
        case LOGIN:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, teacherData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, teacherData: null };

        case UPDATE_TEACHER:
            if (action?.data.message === "Successfully updated")
                localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            alert(action?.data.message);
            return { ...state, teacherData: action?.data };

        case UPDATE_TEACHER_PASSWORD:
            if (action?.data.message === "Successfully updated")
                localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            alert(action?.data.message);
            return { ...state, teacherData: action?.data };

        case ADD_ATTENDANCE:
            alert(action?.data.message);
            return ({ ...state, teacherData: action?.data });

        case ADD_TEST:
            alert(action?.data.message);
            return ({ ...state, teacherData: action?.data });

        default:
            return state;
    }
}

export default reducer;