import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import ListPermintaan from "@/components/permintaan/ListPermintaan";
import { getPermintaan } from "@/hooks/usePermintaan";
import { FAB } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

const Permintaan = () => {
  const router = useRouter();
  const { userInfo: { role } } = useAuth();
  const [permintaan, setPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const permintaanData = await getPermintaan();
      setPermintaan(permintaanData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  if (isLoading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>{error.message}</Text>
      </View>
    );
  }

  if (role === "petugas") {
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>Anda tidak memiliki akses ke halaman ini</Text>
        <Button mode="contained" onPress={() => router.push("/home")}>
          Kembali
        </Button>
      </View>
    );
  }

  return (
    <Layout>
      <View>
        <FlatList
          data={permintaan} // Menggunakan data langsung dari useQuery
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListPermintaan item={item} />}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          showsVerticalScrollIndicator={false}
        />
        <Link href="/permintaan/tambah" asChild>
          <FAB style={styles.fab} color="white" icon="plus" />
        </Link>
      </View>
    </Layout>
  );
};

export default Permintaan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    margin: -5,
    padding: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 5,
    backgroundColor: "#007AFF",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  }
});
