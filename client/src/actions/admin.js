import { LOGIN, LOGOUT, ADD_TEACHER, ADD_STUDENT, ADD_ADMIN, ADD_SUBJECT, FETCH_ALL_TEACHERS, FETCH_ALL_STUDENTS, FETCH_ALL_SUBJECTS } from "../constants/actionTypes";
import * as api from "../api/admin.js";

export const adminLogin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.adminLogin(formData);
        
        dispatch({ type: LOGIN, data });
        
        if (data?.message)
            alert(data.message);
        else
            history.push("/admin/showAdmin");
            
    } catch (error) {
        console.log(error.message);
    }
}

export const adminLogout = (history) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
        history.push("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const addTeacher = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addTeacher(formData);

        dispatch({ type: ADD_TEACHER, data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addStudent = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addStudent(formData);

        dispatch({ type: ADD_STUDENT, data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addAdmin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addAdmin(formData);

        dispatch({ type: ADD_ADMIN, data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addSubject = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addSubject(formData);

        dispatch({ type: ADD_SUBJECT, data });
    } catch (error) {
        console.log(error.message);
    }
}

export const showTeachers = () => async (dispatch) => {
    try {
        const { data } = await api.showTeachers();

        dispatch({ type: FETCH_ALL_TEACHERS, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const showStudents = () => async (dispatch) => {
    try {
        const { data } = await api.showStudents();

        dispatch({ type: FETCH_ALL_STUDENTS, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const showSubjects = () => async (dispatch) => {
    try {
        const { data } = await api.showSubjects();

        dispatch({ type: FETCH_ALL_SUBJECTS, payload: data })
    } catch (error) {
        console.log(error);
    }
}