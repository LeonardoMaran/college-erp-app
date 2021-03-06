import { LOGIN, LOGOUT, SHOW_STUDENT_ATTENDANCE, SHOW_STUDENT_SUBJECTS, SHOW_TEST_MARKS, UPDATE_STUDENT, UPDATE_STUDENT_PASSWORD } from "../constants/actionTypes";
import * as api from "../api/student.js";

export const studentLogin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.studentLogin(formData);

        dispatch({ type: LOGIN, data });
        
        if (data?.message)
            alert(data.message);
        else
            history.push("/student/showStudent");
            
    } catch (error) {
        console.log(error.message);
    }
}

export const studentLogout = (history) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
        history.push("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateStudent = (id, formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateStudent(id, formData);

        dispatch({ type: UPDATE_STUDENT, data });

        history.push("/student/showStudent");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateStudentPassword = (id, formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateStudentPassword(id, formData);

        dispatch({ type: UPDATE_STUDENT_PASSWORD, data });

        history.push("/student/updateStudentPassword");
    } catch (error) {
        console.log(error.message);
    }
}

export const showTestMarks = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.showTestMarks(id, formData);

        dispatch({ type: SHOW_TEST_MARKS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const showStudentAttendance = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.showStudentAttendance(id, formData);

        dispatch({ type: SHOW_STUDENT_ATTENDANCE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const showStudentSubjects = (id) => async (dispatch) => {
    try {
        const { data } = await api.showStudentSubjects(id);

        dispatch({ type: SHOW_STUDENT_SUBJECTS, payload: data })
    } catch (error) {
        console.log(error);
    }
}