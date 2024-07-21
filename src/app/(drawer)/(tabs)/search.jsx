import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { getBarang } from '@/hooks/useBarang'; // Pastikan Anda sudah memiliki hook ini
import Layout from '@/components/Layout';
import ListItem from '@/components/barang/ListItem'; // Komponen untuk menampilkan item barang
import { Theme } from '@/constants/Theme';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { data: barangData, isLoading, error } = useQuery({
    queryKey: ['barang'],
    queryFn: getBarang,
    initialData: { data: [] }, // Set initial data to empty array
  });

  useEffect(() => {// Logging barangData untuk memastikan strukturnya benar
  }, [barangData]);

  useEffect(() => {
    if (query && Array.isArray(barangData.data)) {
      const filtered = barangData.data.filter(item =>
        item.nama_barang.toLowerCase().includes(query.toLowerCase())
        || item.kode_barang.toLowerCase().includes(query.toLowerCase())
      );
  // Logging hasil filter
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
        <Searchbar
          style={styles.input}
          selectionColor={Theme.colors.primary}
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
              <Text style={styles.emptyMessage}>Barang tidak ditemukan</Text>
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
    marginBottom: 10,
    marginTop: -20,
    borderRadius: 10,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  },
});
