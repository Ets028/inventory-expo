// api.js
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://eighty-hoops-smoke.loca.lt/api",
});