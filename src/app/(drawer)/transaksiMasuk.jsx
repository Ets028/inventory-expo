import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '@/components/Layout';
import { ActivityIndicator, Card, FAB } from 'react-native-paper';
import { Theme } from '@/constants/Theme';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { getTransaksiMasuk } from '@/hooks/useTransaksiMasuk';
import ListTransaksiMasuk from '@/components/transaksi/masuk/ListTrxMasuk';
import DownloadExcel from '@/components/DownloadExcel';

const Page = () => {
  const router = useRouter();

  const { data: transaksiMasuk, isLoading, isError } = useQuery({
    queryKey: ['transaksiMasuk'],
    queryFn: getTransaksiMasuk,
  });

  const formatedDataforExport = (data) => {
    return data.map((item) => ({
      "No Transaksi Masuk": item.no_transaksi_masuk,
      "Nama Barang": item.barang?.nama_barang,
      "Nama Supplier": item.supplier?.nama_supplier,
      "Jumlah": item.jumlah,
      "Tanggal": item.tanggal_masuk,
      "Penerima": item.nama_penerima
    }))
  }

  if (!transaksiMasuk) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#0000ff" />
        <FAB style={styles.fab} icon="plus" color={Theme.colors.primary} />
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Data transaksi masuk tidak ditemukan</Text>
          <Button mode="contained" onPress={() => router.push("/home")}>Kembali</Button>
        </View>
      </Layout>
    )
  }

  const formatedData = formatedDataforExport(transaksiMasuk?.data)
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  return (
    <Layout>
      <View>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
          <FlatList
            data={transaksiMasuk?.data}
            renderItem={({ item }) => <ListTransaksiMasuk item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        }
      </View>
        <FAB style={styles.fab} icon="plus" color={Theme.colors.surface} onPress={() => router.push("/transaksi/masuk/tambah")} />
        <DownloadExcel data={formatedData} fileName={`Transaksi_Masuk ${formattedDate}`} />
    </Layout>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 10,
    backgroundColor: Theme.colors.primary,
  },
})