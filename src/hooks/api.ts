// api.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-gamma-khaki-47.vercel.app/api",
});
