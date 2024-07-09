import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';

export default function ListTransaksiMasuk({ item }) {
    return (
          <View style={styles.card}>
            <View style={styles.header}>
            <Text style={styles.text}>No. Transaksi: {item.no_transaksi_masuk}</Text>
            <MaterialCommunityIcons name="file-document-outline" size={28} color={Theme.colors.primary} />
            </View>
            <Text style={styles.text}>Nama Barang: {item.barang?.nama_barang}</Text>
            <Text style={styles.text}>Jumlah: {item.jumlah}</Text>
            <Text style={styles.text}>Tgl. Transaksi: {item.tanggal_masuk}</Text>
          </View>
    )
  }

const styles = StyleSheet.create({
      header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      card : {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        elevation: 5,
        backgroundColor: Theme.colors.surface,
      },
      text: {
        fontSize: 18,
        fontWeight: 'bold',
      },
})