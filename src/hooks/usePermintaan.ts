import { axiosInstance } from "./api";

type Tpermintaan = {
    no_permintaan: String
    customerId: Number
    barangId: String
    jumlah: Number
    deskripsi: String
}   

export const getPermintaan = async () => {
    try {
        const response = await axiosInstance.get("/permintaan");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPermintaanById = async (id: Number) => {
    try {
        const response = await axiosInstance.get(`/permintaan/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deletePermintaan = async (id: Number) => {
    try {
        const response = await axiosInstance.delete(`/permintaan/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const approvePermintaanById = async (id: Number, status: String) => {
    try {
        const response = await axiosInstance.patch(`/permintaan/approved/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createPermintaan = async (data: Tpermintaan) => {
    try {
        const response = await axiosInstance.post("/permintaan", data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updatePermintaan = async (id: Number, data: Tpermintaan) => {
    try {
        const response = await axiosInstance.patch(`/permintaan/${id}`, data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}