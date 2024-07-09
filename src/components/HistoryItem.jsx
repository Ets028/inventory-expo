import { Image, Text, View, StyleSheet } from "react-native";

export default function HistoryItem({ item }) {
    return (
      <View style={styles.historyCard}>
        <Image source={{ uri: item.barang?.image_url }} style={styles.historyImage} />
        <View style={styles.historyCardContent}>
          <Text style={styles.text} >{item.permintaan?.no_permintaan}</Text>
          <Text style={styles.text}>{item.no_transaksi_keluar}</Text>
          <Text style={styles.text}>{item.barang?.nama_barang}</Text>
          <Text style={styles.text}>{item.barang?.kode_barang}</Text>
          <Text style={styles.text}>{item.jumlah}</Text>
          <Text style={styles.text}>{item.tanggal_keluar}</Text>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    historyCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    historyImage: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginRight: 10,
    },
    historyCardContent: {
      flex: 1,
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });