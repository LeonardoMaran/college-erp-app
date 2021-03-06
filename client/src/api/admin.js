import axios from "axios";

const API = axios.create({ baseURL: "https://college-erp-app.herokuapp.com/admin" })

API.interceptors.request.use(req => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req;
})

export const adminLogin = (formData) => API.post("/adminLogin", formData);
export const addTeacher = (formData) => API.post("/addTeacher", formData);
export const addStudent = (formData) => API.post("/addStudent", formData);
export const addAdmin = (formData) => API.post("/addAdmin", formData);
export const addSubject = (formData) => API.post("/addSubject", formData);
export const showTeachers = () => API.get("/showTeachers");
export const showStudents = () => API.get("/showStudents");
export const showSubjects = () => API.get("/showSubjects");