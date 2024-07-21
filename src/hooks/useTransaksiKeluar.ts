import { axiosInstance } from "./api";

type Ttrx = {
  no_transaksi_keluar: string,
  permintaanId: number,
  barangId: number,
  jumlah: number,
  tanggal_keluar: string,
  jam_keluar: string,
  nama_pengirim: string
}

export const getTransaksiKeluar = async () => {
    try {
      const response = await axiosInstance.get('/transaksi/keluar')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

export const createTrx = async (trx: Ttrx) => {
    try {
      const response = await axiosInstance.post('/transaksi/keluar', trx)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message)
    }
  }