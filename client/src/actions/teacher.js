import { ADD_ATTENDANCE, ADD_TEST, LOGIN, LOGOUT, MARK_ATTENDANCE, MARK_TEST, SHOW_ATTENDANCE, SHOW_MARKS, UPDATE_TEACHER, UPDATE_TEACHER_PASSWORD } from "../constants/actionTypes";
import * as api from "../api/teacher.js";

export const teacherLogin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.teacherLogin(formData);

        dispatch({ type: LOGIN, data });
        
        if (data?.message)
            alert(data.message);
        else
            history.push("/teacher/showTeacher");
            
    } catch (error) {
        console.log(error.message);
    }
}

export const teacherLogout = (history) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
        history.push("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTeacher = (id, formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateTeacher(id, formData);

        dispatch({ type: UPDATE_TEACHER, data });

        history.push("/teacher/showTeacher");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTeacherPassword = (id, formData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateTeacherPassword(id, formData);

        dispatch({ type: UPDATE_TEACHER_PASSWORD, data });

        history.push("/teacher/updateTeacherPassword");
    } catch (error) {
        console.log(error.message);
    }
}

export const markAttendance = (formData) => async (dispatch) => {
    try {
        const { data } = await api.markAttendance(formData);

        dispatch({ type: MARK_ATTENDANCE, payload: data })
    } catch (error) {
        console.log(error.message);   
    }
}

export const addAttendance = (checked, date, subject, branch, history) => async (dispatch) => {
    try {
        const { data } = await api.addAttendance(checked, date, subject, branch);

        dispatch({ type: ADD_ATTENDANCE, data })

        history.push("/teacher/markAttendance");
    } catch (error) {
        console.log(error);
    }
}

export const markTest = (formData) => async (dispatch) => {
    try {
        const { data } = await api.markTest(formData);

        dispatch({ type: MARK_TEST, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const addTest = (inputMarks, subject, branch, test, totalMarks, history) => async (dispatch) => {
    try {
        const { data } = await api.addTest(inputMarks, subject, branch, test, totalMarks);

        dispatch({ type: ADD_TEST, data });

        history.push("/teacher/markTest");
    } catch (error) {
        console.log(error);
    }
}

export const showMarks = (formData) => async (dispatch) => {
    try {
        const { data } = await api.showMarks(formData);

        dispatch({ type: SHOW_MARKS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const showAttendance = (formData) => async (dispatch) => {
    try {
        const { data } = await api.showAttendance(formData);

        dispatch({ type: SHOW_ATTENDANCE, payload: data});
    } catch (error) {
        console.log(error);
    }
}