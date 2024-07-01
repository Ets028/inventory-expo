import { saveToken, getToken } from "@/service/tokenManager";
import { axiosInstance } from "./api";

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', {email, password});
    return response.data;
  } catch (error) {
    // console.log("Axios error:", error);
    throw error.response?.data || { error: "Unknown error occurred" };
  }
};
