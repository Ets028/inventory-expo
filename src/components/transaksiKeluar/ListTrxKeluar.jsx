import { StyleSheet, View, Text } from "react-native";
import { Card} from "react-native-paper";
import { Theme } from '@/constants/Theme'
import {Ionicons} from '@expo/vector-icons'

export default function ListTrxKeluar({ item }) {
  return (
    <Card style={styles.Card}>
      <Card.Content>
        <View style={styles.header}>
        <Text style={styles.text}>No Permintaan: {item.permintaan?.no_permintaan}</Text>
        <Ionicons name="document-text-outline" size={24} color={Theme.colors.primary} />
        </View>
        <Text style={styles.text}>No Keluar: {item.no_transaksi_keluar}</Text>
        <Text style={styles.text}>Tujuan: {item.permintaan?.nama_customer}</Text>
        <Text style={styles.text}>Nama Barang: {item.barang?.nama_barang}</Text>
        <Text style={styles.text}>Nama Pengirim: {item.nama_pengirim}</Text>
        <Text style={styles.text}>Jumlah: {item.jumlah}</Text>
        <Text style={styles.text}>Tanggal: {item.tanggal_keluar}</Text>
        <Text style={styles.text}>Jam: {item.jam_keluar}</Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  Card: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    color: "#333",
    fontWeight: "bold",
  },
})