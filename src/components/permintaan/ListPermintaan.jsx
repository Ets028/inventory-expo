import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Card } from "react-native-paper";
import { Theme } from "@/constants/Theme";

export default function ListPermintaan({ item }) {
  const router = useRouter();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "Approved":
        return styles.approved;
      case "Sudah Dipenuhi":
        return styles.sudahDipenuhi;
      case "Belum Dipenuhi":
        return styles.belumDipenuhi;
      default:
        return styles.defaultStatus;
    }
  };

  return (
    <View style={styles.card}>
      <Link href={{ pathname: "/permintaan/[id]", params: { id: item.id } }} asChild>
        <TouchableOpacity
        >
            <View style={styles.header}>
              <Text style={styles.item}>No Permintaan: {item.no_permintaan}</Text>
              <Ionicons
                name="document-text-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.item}>Nama Barang: {item.barang?.nama_barang}</Text>
            <Text style={styles.item}>Nama Customer: {item.customer?.nama_customer}</Text>
            <Text style={styles.item}>Deskripsi: {item.deskripsi}</Text>
            <Text style={[styles.item, getStatusStyle(item.status)]}>
              {item.status}
            </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  item: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  pending: {
    color: "red",
    backgroundColor: "yellow",
    padding: 4,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  approved: {
    color: "green",
    backgroundColor: "lightgreen",
    padding: 4,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sudahDipenuhi: {
    color: "blue",
    backgroundColor: "lightblue",
    padding: 4,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  belumDipenuhi: {
    color: "red",
    backgroundColor: "yellow",
    padding: 4,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  defaultStatus: {
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
});
