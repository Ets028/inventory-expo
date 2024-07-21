import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FAB } from 'react-native-paper';
import Layout from '@/components/Layout';
import ListTrxKeluar from '@/components/transaksi/keluar/ListTrxKeluar';
import { getTransaksiKeluar } from '@/hooks/useTransaksiKeluar';
import { useRouter } from 'expo-router';
import DownloadExcel from '@/components/DownloadExcel';
import { useAuth } from '@/context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const TransaksiKeluarScreen = () => {
  const { userInfo: { role } } = useAuth();
  const router = useRouter();
  const [transaksikeluar, setTransaksiKeluar] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getTransaksiKeluar();
      setTransaksiKeluar(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatedDataforExport = (data) => {
    return data.map((item) => ({
      no_permintaan: item.permintaan?.no_permintaan,
      no_transaksi_keluar: item.no_transaksi_keluar,
      nama_customer: item.customer?.nama_customer,
      nama_barang: item.barang?.nama_barang,
      jumlah: item.jumlah,
      tanggal: item.tanggal_keluar
    }));
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Layout>
    );
  }

  if (!transaksikeluar.length) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Data transaksi keluar tidak ditemukan</Text>
          <Button title="Kembali" onPress={() => router.push("/home")} />
        </View>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Error: Terjadi kesalahan saat memuat data.</Text>
          <Button title="Kembali" onPress={() => router.push("/home")} />
        </View>
      </Layout>
    );
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setFilterDate(selectedDate);
    } else {
      setFilterDate(null);
    }
  };

  const filteredData = filterDate
    ? transaksikeluar.filter(item => 
        new Date(item.tanggal_keluar).toDateString() === filterDate.toDateString()
      )
    : transaksikeluar;

  const dataForExport = formatedDataforExport(filteredData);

  return (
    <Layout>
      <View style={styles.filterContainer}>
        <Button title="Filter by Date" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {filterDate && (
          <Button title="Clear Filter" onPress={() => setFilterDate(null)} />
        )}
      </View>
      <View>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ListTrxKeluar item={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={fetchData}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
        />
      </View>
      {(role === 'supervisor' || role === 'admin') && (
        <FAB style={styles.fab} color="white" icon="plus" onPress={() => router.push("/transaksi/keluar/tambah")} />
      )}
      <DownloadExcel data={dataForExport} fileName={`TransaksiKeluar ${formattedDate}`} />
    </Layout>
  );
};

export default TransaksiKeluarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 10,
    backgroundColor: '#007AFF',
  },
  fabRole: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 10,
    backgroundColor: 'red',
  },
});
