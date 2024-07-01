import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Layout from "@/components/Layout";
import {
  approvePermintaanById,
  deletePermintaan,
  getPermintaanById,
} from "@/hooks/usePermintaan";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "react-native-paper";
import { Theme } from "@/constants/Theme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DeleteDialog from "../DialogHapus";

export default function PermintaanById() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [DialogVisible, setDialogVisible] = useState(false);

  const { data: permintaan, isLoading, error } = useQuery({
    queryKey: ["permintaan", params.id],
    queryFn: () => getPermintaanById(params.id),
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const approveMutation = useMutation({
    mutationFn: approvePermintaanById,
    onSuccess: () => {
      Alert.alert("Success", "Permintaan Berhasil Diapprove");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleApprove = async () => {
    try {
      const approve = await approveMutation.mutateAsync(params.id);
      return approve;
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deletePermintaan,
    onSuccess: () => {
      Alert.alert("Success", "Permintaan Berhasil Dihapus");
      router.push("/permintaan");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(permintaan?.data.id);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "approved":
        return styles.approved;
      case "sudah dipenuhi":
        return styles.sudahDipenuhi;
      case "belum dipenuhi":
        return styles.belumDipenuhi;
      default:
        return styles.defaultStatus;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.Loadingcontainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      </Layout>
    );
  }

  if (error || !permintaan) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {error ? "Failed to load permintaan" : "Permintaan data is empty"}
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.text}>
              No Permintaan: {permintaan?.no_permintaan}
            </Text>
            <Text style={styles.text}>
              Customer: {permintaan?.nama_customer}
            </Text>
            <Text style={styles.text}>
              Nama Barang: {permintaan?.barang?.nama_barang}
            </Text>
            <Text style={styles.text}>Jumlah: {permintaan?.jumlah}</Text>
            <Text style={styles.text}>
              Deskripsi: {permintaan?.deskripsi}
            </Text>
            <TouchableOpacity onLongPress={handleApprove}>
              <Text
                style={[
                  styles.status,
                  getStatusStyle(permintaan?.status),
                ]}
              >
                Status: {permintaan?.status}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => setDialogVisible(true)}
            >
              <FontAwesome name="trash-o" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() =>
                router.push(`/permintaan/(edit)/${permintaan?.data.id}`)
              }
            >
              <MaterialIcons name="mode-edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Card>
        <DeleteDialog
          visible={DialogVisible}
          onDismiss={() => setDialogVisible(false)}
          onDelete={handleDelete}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    marginTop: 10,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 5,
    padding: 15,
    width: "100%",
    backgroundColor: Theme.colors.surface,
  },
  cardContent: {
    flexDirection: "column",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    padding: 4,
    marginHorizontal: 1,
  },
  status: {
    fontSize: 16,
    padding: 4,
    marginHorizontal: 1,
    fontWeight: "bold",
    marginTop: 4,
  },
  pending: {
    color: "red",
    backgroundColor: "yellow",
    padding: 5,
    borderRadius: 5,
  },
  approved: {
    color: "green",
    backgroundColor: "lightgreen",
    padding: 5,
    borderRadius: 5,
  },
  sudahDipenuhi: {
    color: "blue",
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
  },
  belumDipenuhi: {
    color: "white",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  defaultStatus: {
    color: "black",
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 5,
  },
  buttonEdit: {
    backgroundColor: Theme.colors.secondary,
    padding: 4,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    top: 5,
    right: 5,
    position: "absolute",
    alignItems: "flex-end",
  },
});
