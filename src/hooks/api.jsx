// api.js
import axios from "axios";
import { getToken } from "@/service/tokenManager";

export const axiosInstance = axios.create({
    baseURL: "https://backend-ten-rust.vercel.app//api",
});