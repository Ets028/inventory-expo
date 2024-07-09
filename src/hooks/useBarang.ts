
import { axiosInstance } from "./api";

type Tbarang = {
    kode_barang: string,
    nama_barang: string,
    kategori: string,
    stok: number,
    satuan: string,
    image_url: string
}

export const getBarang = async () => {
    try {
        const response = await axiosInstance.get('/barang');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}
export const getBarangById = async (id: Number) => {
    try {
        const response = await axiosInstance.get(`/barang/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}
export const deleteBarang = async (id: Number) => {
    try {
        const response = await axiosInstance.delete(`/barang/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}

export const addBarang = async (data: Tbarang) => {
    try {
        const response = await axiosInstance.post('/barang', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}

export const editBarang = async (id: Number, data: Tbarang) => {
    try {
        const response = await axiosInstance.patch(`/barang/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}