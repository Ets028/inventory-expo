import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import ListPermintaan from "@/components/permintaan/ListPermintaan";
import { getPermintaan } from "@/hooks/usePermintaan";
import { FAB } from "react-native-paper";
import { Link, useFocusEffect, useRouter } from "expo-router";

const Permintaan = () => {
  const router = useRouter();
  const [permintaan, setPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchPermintaan();
  }, []);

  const fetchPermintaan = async () => {
    try {
      const data = await getPermintaan();
      setPermintaan(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch permintaan:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useFocusEffect(() => {
    fetchPermintaan();
  });

  if (isLoading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#0000ff" style={styles.isLoading} />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.textError}>Permintaan tidak ditemukan</Text>
          <Button mode="contained" onPress={() => router.push("/home")}>
            Kembali
          </Button>
        </View>
      </Layout>
    );
  }

  if (!permintaan) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.textError}>Permintaan tidak ditemukan</Text>
          <Button style={styles.button} mode="contained" onPress={() => router.push("/home")}>
            Kembali
          </Button>
          <Link href="/permintaan/tambah" asChild>
            <FAB style={styles.fab} color="white" icon="plus" />
          </Link>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <FlatList
          data={permintaan}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListPermintaan item={item} />}
          contentContainerStyle={styles.list}
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
    paddingBottom: 20,
    width: "100%",
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
