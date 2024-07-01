import { axiosInstance } from "./api";

export const getPermintaan = async () => {
    try {
        const response = await axiosInstance.get("/permintaan");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPermintaanById = async (id) => {
    try {
        const response = await axiosInstance.get(`/permintaan/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deletePermintaan = async (id) => {
    try {
        const response = await axiosInstance.delete(`/permintaan/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const approvePermintaanById = async (id, status) => {
    try {
        const response = await axiosInstance.patch(`/permintaan/approved/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createPermintaan = async (data) => {
    data = {
        no_permintaan: data.no_permintaan,
        nama_customer: data.nama_customer,
        barangId: data.barangId,
        jumlah: data.jumlah,
        deskripsi: data.deskripsi,
    }
    try {
        const response = await axiosInstance.post("/permintaan", data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updatePermintaan = async (id, data) => {
    data = {
        no_permintaan: data.no_permintaan,
        nama_customer: data.nama_customer,
        barangId: data.barangId,
        jumlah: data.jumlah,
        deskripsi: data.deskripsi,
        status: data.status
    }
    try {
        const response = await axiosInstance.patch(`/permintaan/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}