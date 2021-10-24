import axios from "axios";

axios.defaults.withCredentials = true;

const auth = axios.create({
    baseURL: "http://localhost:8080"
})

export default auth;