import React, { useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import Layout from "@/components/Layout";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import Button from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPermintaan } from "@/hooks/usePermintaan";
import { Picker } from "@react-native-picker/picker"; // Import Picker from react-native-picker
import { useRouter } from "expo-router";
import { getBarang } from "@/hooks/useBarang";

// Validation schema
const validationSchema = Yup.object().shape({
  no_permintaan: Yup.string().required("No. Permintaan harus diisi"),
  nama_customer: Yup.string().required("Nama Customer harus diisi"),
  barangId: Yup.number().required("Nama Barang harus diisi"),
  deskripsi: Yup.string().required("Deskripsi harus diisi"),
  jumlah: Yup.number().required("Jumlah harus diisi").min(1, "Jumlah harus lebih dari 0"),
});

export default function TambahPermintaan() {
  const router = useRouter();

  const [kodeBarang, setKodeBarang] = useState("");

  const mutate = useMutation({
    mutationFn: createPermintaan,
  });

  const { data: barang, isLoading: isBarangLoading } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  const handleSubmit = async (values) => {
    try {
      await mutate.mutateAsync(values);
      console.log(values)
      Alert.alert("Permintaan berhasil ditambahkan");
      router.push("/permintaan");
    } catch (error) {
        console.log('error:', error)
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          no_permintaan: "PRMB" + Math.floor(1000 + Math.random() * 9000).toString(),
          nama_customer: "",
          barangId: null,
          deskripsi: "",
          jumlah: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            <TextInput
              mode="outlined"
              label="No. Permintaan"
              style={styles.input}
              value={values.no_permintaan}
              onChangeText={handleChange("no_permintaan")}
              onBlur={handleBlur("no_permintaan")}
              error={touched.no_permintaan && errors.no_permintaan}
              editable={false}
            />
            <TextInput
              label="Nama Customer"
              style={styles.input}
              mode="outlined"
              value={values.nama_customer}
              onChangeText={handleChange("nama_customer")}
              onBlur={handleBlur("nama_customer")}
              error={touched.nama_customer && errors.nama_customer}
            />
            <TextInput
              label="Kode Barang"
              style={styles.input}
              mode="outlined"
              value={kodeBarang}
              editable={false}
            />
            {isBarangLoading ? (
              <TextInput
                mode="outlined"
                label="Loading barang..."
                style={styles.input}
                editable={false}
              />
            ) : (
              <Picker
                selectedValue={values.barangId}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setFieldValue("barangId", itemValue);
                  const selectedBarang = barang.data.find(b => b.id === itemValue);
                  setKodeBarang(selectedBarang ? selectedBarang.kode_barang : "");
                }}
              >
                <Picker.Item label="Pilih Barang" value={null} />
                {barang?.data.map((barang) => (
                  <Picker.Item key={barang.id} label={barang.nama_barang} value={barang.id} />
                ))}
              </Picker>
            )}
            {touched.barangId && errors.barangId && (
              <Text style={styles.errorText}>{errors.barangId}</Text>
            )}
            <TextInput
              label="Jumlah"
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              value={values.jumlah}
              onChangeText={handleChange("jumlah")}
              onBlur={handleBlur("jumlah")}
              error={touched.jumlah && errors.jumlah}
            />
            <TextInput
              label="Deskripsi"
              style={styles.input}
              mode="outlined"
              value={values.deskripsi}
              onChangeText={handleChange("deskripsi")}
              onBlur={handleBlur("deskripsi")}
              error={touched.deskripsi && errors.deskripsi}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
            >
              Tambah
            </Button>
          </View>
        )}
      </Formik>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    width: "100%",
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
    marginLeft: 15,
  },
});
