import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 5000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient;