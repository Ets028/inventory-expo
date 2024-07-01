import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListBarang({ item }) {
  return (
    <Link
      href={{ pathname: "/barang/[id]", params: { id: item.id }}} asChild
      style={styles.Link}
    >
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.kodeBarang}>{item.kode_barang}</Text>
          <Text style={styles.namaBarang}>{item.nama_barang}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "center",
  },
  kodeBarang: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  namaBarang: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  Link: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
