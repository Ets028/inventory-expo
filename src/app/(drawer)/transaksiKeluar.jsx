import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, FAB } from 'react-native-paper'
import Layout from '@/components/Layout'
import ListTrxKeluar from '@/components/transaksiKeluar/ListTrxKeluar'
import { getTransaksiKeluar } from '@/hooks/useTransaksi'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Page = () => {

  const router = useRouter();
  const { data: dataKeluar, isLoading } = useQuery({
    queryKey: ['transaksikeluar'],
    queryFn: getTransaksiKeluar
  })

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
          <Button mode="contained" onPress={() => router.push("/home") }>Kembali</Button>
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <View>
        <FlatList
          data={dataKeluar?.data}
          renderItem={({ item }) => <ListTrxKeluar item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <FAB style={styles.fab} color="white" icon="plus" onPress={() => router.push("/transaksiKeluar/tambah")} />
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
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 10,
    backgroundColor: '#007AFF',
  },
})