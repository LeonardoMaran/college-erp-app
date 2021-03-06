import axios from "axios";

const API = axios.create({ baseURL: "https://college-erp-app.herokuapp.com/student" })

API.interceptors.request.use(req => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req;
})

export const studentLogin = (formData) => API.post("/studentLogin", formData);
export const updateStudent = (id, formData) => API.patch(`/updateStudent/${id}`, formData);
export const updateStudentPassword = (id, formData) => API.patch(`/updateStudentPassword/${id}`, formData);
export const showTestMarks = (id, formData) => API.post(`/showTestMarks/${id}`, formData);
export const showStudentSubjects = (id) => API.get(`/showStudentSubjects/${id}`);
export const showStudentAttendance = (id, formData) => API.post(`/showStudentAttendance/${id}`, formData);