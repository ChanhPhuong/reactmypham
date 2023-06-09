
// import axios from "axios";
import axios from './customize-axios'
const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}
const putupdateUser = (name, job) => {
    return axios.put("/api/users/2", { name, job });
}
const deleteUser = (id) => {
    return axios.delete(`/api/user/${id}`);
}
const loginAip = (email, password) => {
    return axios.post("/api/login", { email, password });
}

export { fetchAllUser, postCreateUser, putupdateUser, deleteUser, loginAip };
