import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { getBarangById, editBarang } from "@/hooks/useBarang";
import { useAuth } from "@/context/authContext";
import Layout from "../Layout";
import { TextInput } from "react-native-paper";
import { Theme } from "@/constants/Theme";
import Button from "../Button";

const EditBarangSchema = Yup.object().shape({
  kode_barang: Yup.string().required("Kode Barang is required"),
  nama_barang: Yup.string().required("Nama Barang is required"),
  kategori: Yup.string().required("Kategori is required"),
  stok: Yup.number().required("Stok is required"),
  satuan: Yup.string().required("Satuan is required"),
  image_url: Yup.string().required("image is required"),
});

const EditBarang = () => {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { role } = useAuth();

  if (role !== "supervisor") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Hanya supervisor yang diizinkan mengakses
        </Text>
      </View>
    );
  }

  const { data: item, isLoading } = useQuery({
    queryKey: ["barang", id],
    queryFn: () => getBarangById(id),
  });

  const handleEditBarang = async (values) => {
    try {
      await editBarang(
        id,
        values.kode_barang,
        values.nama_barang,
        values.kategori,
        values.stok,
        values.satuan,
        values.image_url
      );
      queryClient.invalidateQueries(["barang", id]); // Update query cache
      router.back(); // Navigate back or to a success page
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <Layout style={styles.container}>
      <Formik
        initialValues={{
          kode_barang: item?.data.kode_barang,
          nama_barang: item?.data.nama_barang,
          kategori: item?.data.kategori,
          stok: item?.data.stok,
          satuan: item?.data.satuan,
          image_url: item?.data.image_url,
        }}
        validationSchema={EditBarangSchema}
        onSubmit={handleEditBarang}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text>Kode Barang</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("kode_barang")}
              onBlur={handleBlur("kode_barang")}
              value={values.kode_barang}
            />
            {touched.kode_barang && errors.kode_barang && (
              <Text style={styles.errorText}>{errors.kode_barang}</Text>
            )}

            <Text>Nama Barang</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("nama_barang")}
              onBlur={handleBlur("nama_barang")}
              value={values.nama_barang}
            />
            {touched.nama_barang && errors.nama_barang && (
              <Text style={styles.errorText}>{errors.nama_barang}</Text>
            )}

            <Text>Kategori</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("kategori")}
              onBlur={handleBlur("kategori")}
              value={values.kategori}
            />
            {touched.kategori && errors.kategori && (
              <Text style={styles.errorText}>{errors.kategori}</Text>
            )}

            <Text>Stok</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("stok")}
              onBlur={handleBlur("stok")}
              value={values.stok.toString()}
              keyboardType="numeric"
            />
            {touched.stok && errors.stok && (
              <Text style={styles.errorText}>{errors.stok}</Text>
            )}

            <Text>Satuan</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("satuan")}
              onBlur={handleBlur("satuan")}
              value={values.satuan}
            />
            {touched.satuan && errors.satuan && (
              <Text style={styles.errorText}>{errors.satuan}</Text>
            )}

            <Text>Image</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              onChangeText={handleChange("image_url")}
              onBlur={handleBlur("image_url")}
              value={values.image_url}
            />
            {touched.image_url && errors.image_url && (
              <Text style={styles.errorText}>{errors.image_url}</Text>
            )}

            <Button style={styles.button} onPress={handleSubmit}>
              Edit
            </Button>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 10,
  },
  input: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: Theme.colors.primary,
    width: "100%",
    paddingVertical: 5,
  },
});

export default EditBarang;
