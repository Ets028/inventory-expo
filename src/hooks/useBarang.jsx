//fetch barang

import { axiosInstance } from "./api";

export const getBarang = async () => {
    try {
        const response = await axiosInstance.get('/barang');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}
export const getBarangById = async (id) => {
    try {
        const response = await axiosInstance.get(`/barang/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}
export const deleteBarang = async (id) => {
    try {
        const response = await axiosInstance.delete(`/barang/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}

export const addBarang = async ({kode_barang, nama_barang, kategori, stok, satuan, image_url}) => {
    const data = {
        kode_barang,
        nama_barang,
        kategori,
        stok,
        satuan,
        image_url
    }
    try {
        const response = await axiosInstance.post('/barang', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}

export const editBarang = async (id, {kode_barang, nama_barang, kategori, stok, satuan, image_url}) => {
    const data = {
        kode_barang,
        nama_barang,
        kategori,
        stok,
        satuan,
        image_url
    }
    try {
        const response = await axiosInstance.patch(`/barang/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }    
}