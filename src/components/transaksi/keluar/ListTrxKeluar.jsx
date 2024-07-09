import { StyleSheet, View, Text } from "react-native";
import { Card} from "react-native-paper";
import { Theme } from '@/constants/Theme'
import {Ionicons} from '@expo/vector-icons'

export default function ListTrxKeluar({ item }) {
  return (
    <View style={styles.Card}>
      <Card.Content>
        <View style={styles.header}>
        <Text style={styles.text}>No Permintaan: {item.permintaan?.no_permintaan}</Text>
        <Ionicons name="document-text-outline" style={{left: 10}} size={28} color={Theme.colors.primary} />
        </View>
        <Text style={styles.text}>No Keluar: {item.no_transaksi_keluar}</Text>
        <Text style={styles.text}>Tujuan: {item.customer?.nama_customer}</Text>
        <Text style={styles.text}>Nama Barang: {item.barang?.nama_barang}</Text>
        <Text style={styles.text}>Nama Pengirim: {item.nama_pengirim}</Text>
        <Text style={styles.text}>Jumlah: {item.jumlah}</Text>
        <Text style={styles.text}>Tanggal: {item.tanggal_keluar}</Text>
        <Text style={styles.text}>Jam: {item.jam_keluar}</Text>
      </Card.Content>
    </View>
  )
}

const styles = StyleSheet.create({
  Card: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.surface,
    elevation: 5,
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: Theme.colors.text
  },
})