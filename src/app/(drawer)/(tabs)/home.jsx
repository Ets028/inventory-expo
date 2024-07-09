import { Theme } from '@/constants/Theme';
import { useAuth } from '@/context/authContext';
import { getTransaksiKeluar } from '@/hooks/useTransaksiKeluar';
import { getPermintaan } from '@/hooks/usePermintaan';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HistoryItem from '@/components/HistoryItem';
import profile from '../../../../assets/profile.png';

const HomeScreen = () => {
  const { userInfo } = useAuth();

  const { data: history } = useQuery({
    queryKey: ['transaksikeluar'],
    queryFn: getTransaksiKeluar,
  });

  const { data: permintaan } = useQuery({
    queryKey: ['permintaan'],
    queryFn: getPermintaan,
  });

  const totalPermintaan = permintaan?.data?.length || 0;
  const sudahDipenuhi = permintaan?.data?.filter(item => item.status === 'Sudah Dipenuhi').length || 0;
  const belumDipenuhi = permintaan?.data?.filter(item => item.status === 'Belum Dipenuhi').length || 0;
  const jumlahBarangKeluar = permintaan?.data?.reduce((total, item) => total + item.jumlah, 0) || 0;

  return (
    <View style={styles.container}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        <Image source={profile} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userInfo.username}</Text>
          <Text style={styles.role}>{userInfo.role}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Grid of Cards */}
      <View style={styles.gridContainer}>
        <View style={styles.gridCard}>
          <Text style={styles.gridCardText}>Permintaan Cabang</Text>
          <Text style={styles.gridCardText}>{totalPermintaan}</Text>
        </View>
        <View style={[styles.gridCard, { backgroundColor: Theme.colors.success }]}>
          <Text style={styles.gridCardText}>Sudah Dipenuhi</Text>
          <Text style={styles.gridCardText}>{sudahDipenuhi}</Text>
        </View>
        <View style={[styles.gridCard, { backgroundColor: Theme.colors.info }]}>
          <Text style={styles.gridCardText}>Belum Dipenuhi</Text>
          <Text style={styles.gridCardText}>{belumDipenuhi}</Text>
        </View>
        <View style={[styles.gridCard, { backgroundColor: Theme.colors.secondary }]}>
          <Text style={styles.gridCardText}>Jumlah barang keluar</Text>
          <Text style={styles.gridCardText}>{jumlahBarangKeluar}</Text>
        </View>
      </View>

      {/* History List */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>History {new Date().toLocaleDateString()}</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={history?.data}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: Theme.colors.surface,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Theme.colors.error,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridCardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Theme.colors.primary,
    borderRadius: 4,
  },
  viewAllButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;
