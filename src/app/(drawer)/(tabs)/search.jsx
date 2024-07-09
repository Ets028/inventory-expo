import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import { getBarang } from '@/hooks/useBarang'; // Pastikan Anda sudah memiliki hook ini
import Layout from '@/components/Layout';
import ListItem from '@/components/barang/ListItem'; // Komponen untuk menampilkan item barang

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { data: barangData, isLoading, error } = useQuery({
    queryKey: ['barang'],
    queryFn: getBarang,
    initialData: { data: [] }, // Set initial data to empty array
  });

  useEffect(() => {
    console.log('Barang Data:', barangData); // Logging barangData untuk memastikan strukturnya benar
  }, [barangData]);

  useEffect(() => {
    if (query && Array.isArray(barangData.data)) {
      const filtered = barangData.data.filter(item =>
        item.nama_barang.toLowerCase().includes(query.toLowerCase())
        || item.kode_barang.toLowerCase().includes(query.toLowerCase())
      );
      console.log('Filtered Data:', filtered); // Logging hasil filter
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [query, barangData]);

  const handleSearch = (text) => {
    setQuery(text);
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <Text>Error loading data: {error.message}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Cari barang..."
          value={query}
          onChangeText={handleSearch}
        />
        {query && (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <Text style={styles.emptyMessage}>Item tidak ditemukan</Text>
            )}
          />
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
  },
});
