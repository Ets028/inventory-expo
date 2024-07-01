import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getBarang } from "@/hooks/useBarang";
import { Theme } from "@/constants/Theme";
import ListBarang from "@/components/barang/ListBarang";
import Layout from "@/components/Layout";
import { useRouter } from "expo-router";
import { FAB } from "react-native-paper";

const ViewBarang = () => {
  const router = useRouter();
  const {
    data: barang,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  return (
    <Layout>
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingContainer}
          />
        )}
        {isError && (
          <Text style={styles.errorText}>Error: {error.message}</Text>
        )}
        {!isLoading && !isError && (
          <FlatList
            data={barang?.data}
            renderItem={({ item }) => <ListBarang item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            numColumns={2}
          />
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          color="white"
          onPress={() => router.push("/barang/tambah")}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Theme.colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Theme.colors.primary,
  },
});

export default ViewBarang;
