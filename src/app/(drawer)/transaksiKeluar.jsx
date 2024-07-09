import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, FAB } from 'react-native-paper'
import Layout from '@/components/Layout'
import ListTrxKeluar from '@/components/transaksi/keluar/ListTrxKeluar'
import { getTransaksiKeluar } from '@/hooks/useTransaksiKeluar'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import DownloadExcel from '@/components/DownloadExcel'
import { useAuth } from '@/context/authContext'

const TransaksiKeluarScreen = () => {
  const { userInfo: { role } } = useAuth()
  const router = useRouter();

  const { data: dataKeluar, isLoading, isError, error } = useQuery({
    queryKey: ['transaksikeluar'],
    queryFn: getTransaksiKeluar
  })

  const formatedDataforExport = (data) => {
    return data.map((item) => ({
      no_permintaan: item.permintaan?.no_permintaan,
      no_transaksi_keluar: item.no_transaksi_keluar,
      nama_customer: item.customer?.nama_customer,
      nama_barang: item.barang?.nama_barang,
      jumlah: item.jumlah,
      tanggal: item.tanggal_keluar
    }))
  }

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Layout>
    )
  }

  if (!dataKeluar) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Data transaksi keluar tidak ditemukan</Text>
          <Button mode="contained" onPress={() => router.push("/home")}>Kembali</Button>
        </View>
      </Layout>
    )
  }

  if (dataKeluar?.data.length === 0) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Data transaksi keluar tidak ditemukan</Text>
          <Button mode="contained" onPress={() => router.push("/home")}>Kembali</Button>
        </View>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Error: {error.message}</Text>
          <Button mode="contained" onPress={() => router.push("/home")}>Kembali</Button>
        </View>
      </Layout>
    )
  }

  const formatedData = formatedDataforExport(dataKeluar?.data)
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  return (
    <Layout>
      <View>
        <FlatList
          data={dataKeluar?.data}
          renderItem={({ item }) => <ListTrxKeluar item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      { role === 'supervisor' && (
        <FAB style={styles.fab} color="white" icon="plus" onPress={() => router.push("/transaksi/keluar/tambah")} />
      )}
      { role === 'admin' && (
        <FAB style={styles.fab} color="white" icon="plus" onPress={() => router.push("/transaksi/keluar/tambah")} />
      )}
      <DownloadExcel data={formatedData} fileName={`TransaksiKeluar ${formattedDate}`} />
    </Layout>
  )
}

export default TransaksiKeluarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 10,
    backgroundColor: '#007AFF',
  },
})