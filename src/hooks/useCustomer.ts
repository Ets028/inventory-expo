import { axiosInstance } from "./api";

type Tcustomer = {
    nama_customer: string;
    alamat: string;
    email: string;
    telepon: string;
};

export const getCustomer = async () => {
    try {
        const response = await axiosInstance.get("/customer");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCustomerById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/customer/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCustomer = async (data: Tcustomer) => {
    try {
        const response = await axiosInstance.post("/customer", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateCustomer = async (id: number, data: Tcustomer) => {
    try {
        const response = await axiosInstance.patch(`/customer/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}