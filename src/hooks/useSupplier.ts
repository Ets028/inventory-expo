import { axiosInstance } from "./api";

export const getSupplier = async () => {
    try{
        const response = await axiosInstance.get('/supplier')
        return response.data
    }catch(error){
        console.error(error)
    }
}