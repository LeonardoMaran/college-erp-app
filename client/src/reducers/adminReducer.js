import { ADD_ADMIN, ADD_STUDENT, ADD_SUBJECT, ADD_TEACHER, LOGIN, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { adminData: null }, action) => {
    switch(action.type) {
        case LOGIN:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, adminData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, adminData: null };

        case ADD_TEACHER:
            alert(action?.data.message);
            return { ...state, adminData: action?.data };

        case ADD_SUBJECT:
            alert(action?.data.message);
            return { ...state, adminData: action?.data };

        case ADD_STUDENT:
            alert(action?.data.message);
            return { ...state, adminData: action?.data };

        case ADD_ADMIN:
            alert(action?.data.message);
            return { ...state, adminData: action?.data };

        default:
            return state;
    }
}

export default reducer;