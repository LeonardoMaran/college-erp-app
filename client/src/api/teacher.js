import axios from "axios";

const API = axios.create({ baseURL: "https://college-erp-app.herokuapp.com/teacher" })

API.interceptors.request.use(req => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req;
})

export const teacherLogin = (formData) => API.post("/teacherLogin", formData);
export const updateTeacher = (id, formData) => API.patch(`/updateTeacher/${id}`, formData);
export const updateTeacherPassword = (id, formData) => API.patch(`/updateTeacherPassword/${id}`, formData);
export const markAttendance = (formData) => API.post("/markAttendance", formData);
export const addAttendance = (checked, date, subject, branch) => API.post("/addAttendance", { checked, date, subject, branch });
export const markTest = (formData) => API.post("/markTest", formData);
export const addTest = (inputMarks, subject, branch, test, totalMarks) => API.post("/addTest", { inputMarks, subject, branch, test, totalMarks });
export const showMarks = (formData) => API.post("/showMarks", formData);
export const showAttendance = (formData) => API.post("/showAttendance", formData);