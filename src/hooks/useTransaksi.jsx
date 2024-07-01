import { axiosInstance } from "./api";

export const getTransaksiKeluar = async () => {
    try {
      const response = await axiosInstance.get('/transaksi/keluar')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

export const createTransaksiKeluar = async (data) => {
    data = {
        no_transaksi_keluar: data.no_transaksi_keluar,
        permintaanId: data.permintaanId,
        barangId: data.barangId,
        jumlah: data.jumlah,
        tanggal_keluar: data.tanggal_keluar,
        jam_keluar: data.jam_keluar,
        nama_pengirim: data.nama_pengirim
    }
    try {
      const response = await axiosInstance.post('/transaksi/keluar', data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }