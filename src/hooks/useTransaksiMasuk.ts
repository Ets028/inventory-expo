//useTransaksiMasuk
import { axiosInstance } from "./api";

type TtrxMasuk = {
    no_transaksi_masuk: string,
    supplierId: number,
    barangId: number,
    jumlah: number,
    tanggal_masuk: string,
    jam_masuk: string,
    nama_penerima: string
}

export const getTransaksiMasuk = async () => {
    try {
        const response = await axiosInstance.get('/transaksi/masuk')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const createTrxMasuk = async (trx: TtrxMasuk) => {
    try {
        const response = await axiosInstance.post('/transaksi/masuk', trx)
        return response.data
    } catch (error) {
        console.log(error)
    }
}