import { axiosInstance } from "./api";

type Supplier = {
    id: number;
    nama_supplier: string;
    alamat: string;
    telepon: string;
    email: string;
}

export const getSupplier = async () => {
    try{
        const response = await axiosInstance.get('/supplier')
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const getSupplierById = async (id: number) => {
    try{
        const response = await axiosInstance.get(`/supplier/${id}`)
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const createSupplier = async (data: Supplier) => {
    try{
        const response = await axiosInstance.post('/supplier', data)
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const updateSupplier = async (id: number, data: Supplier) => {
    try{
        const response = await axiosInstance.patch(`/supplier/${id}`, data)
        return response.data
    }catch(error){
        console.error(error)
    }
}

export const deleteSupplier = async (id: number) => {
    try{
        const response = await axiosInstance.delete(`/supplier/${id}`)
        return response.data
    }catch(error){
        console.error(error)
    }
}

