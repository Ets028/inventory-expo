import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Image, StyleSheet, View } from "react-native";
import Layout from "../Layout";
import { deleteBarang, getBarangById } from "@/hooks/useBarang";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/Theme";
import DeleteDialog from "../DialogHapus";
import { useState } from "react";

export default function DetailBarang() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [DialogVisible, setDialogVisible] = useState(false);

  const {
    data: item,
    isLoading,
  } = useQuery({
    queryKey: ["barang", params.id],
    queryFn: () => getBarangById(params.id),
  });

  if (isLoading) {
    return (
      <Layout>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.isLoading}
        />
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <Text style={styles.text}>Barang tidak ditemukan</Text>
      </Layout>
    );
  }
  
  const HandleDelete = async () => {
    try{
      await deleteBarang(item?.data.id);
      Alert.alert("Success", "Barang Berhasil Dihapus");
      router.push("/inventory")
    }
    catch(error){
      Alert.alert("Error", error.message);
    }
  }


  return (
    <Layout>
      <View styles={styles.container}>
        <Card style={styles.card}>
          <Image source={{ uri: item?.data.image_url }} style={styles.image} />
        </Card>
        <Card style={styles.cardContent}>
          <Text style={styles.text}>Kode Barang: {item?.data.kode_barang}</Text>
          <Text style={styles.text}>Nama Barang: {item?.data.nama_barang}</Text>
          <Text style={styles.text}>Kategori: {item?.data.kategori}</Text>
          <Text style={styles.text}>Stok: {item?.data.stok}</Text>
          <Text style={styles.text}>Satuan: {item?.data.satuan}</Text>
          <Card.Actions>
            <Button
              icon={() => <MaterialIcons name="edit" size={16} color="white" />}
              mode="contained"
              style={styles.buttonEdit}
              onPress={() => router.push(`/barang/(edit)/${item?.data.id}`)}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              icon={() => (
                <Ionicons name="trash-outline" size={16} color="white" />
              )}
              style={styles.buttonHapus}
              onPress={() => setDialogVisible(true)}
            >Hapus</Button>
          </Card.Actions>
        </Card>
        <DeleteDialog
          visible={DialogVisible}
          onDismiss={() => setDialogVisible(false)}
          onDelete={HandleDelete}/>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cardContent: {
    marginTop: 10,
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    padding: 4,
    marginHorizontal: 10,
  },
  buttonHapus: {
    backgroundColor: "red",
  },
  buttonEdit: {
    backgroundColor: Theme.colors.primary,
  },
});
