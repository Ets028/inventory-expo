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
import { Theme } from "@/constants/Theme";
import { getCustomer } from "@/hooks/useCustomer";

// Validation schema
const validationSchema = Yup.object().shape({
  no_permintaan: Yup.string().required("No. Permintaan harus diisi"),
  customerId: Yup.number().required("Nama Customer harus diisi"),
  barangId: Yup.number().required("Nama Barang harus diisi"),
  deskripsi: Yup.string().required("Deskripsi harus diisi"),
  jumlah: Yup.number().required("Jumlah harus diisi").min(1, "Jumlah harus lebih dari 0"),
});

export default function TambahPermintaan() {
  const router = useRouter();

  const [kodeBarang, setKodeBarang] = useState("");

  const { data: barang, isLoading: isBarangLoading } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  const {data: customer, isLoading: isCustomerLoading} = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomer
  })

  const handleSubmit = async (values) => {
    try {
      await createPermintaan(values);
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
          customerId: null,
          barangId: null,
          deskripsi: "",
          jumlah: parseInt(1),
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
              activeOutlineColor={Theme.colors.primary}
            />
            {isCustomerLoading ? (
              <TextInput
                mode="outlined"
                label="Loading customer..."
                style={styles.input}
                editable={false}
              />
            ) : (
              <Picker
              selectedValue={values.customerId}
              style={styles.picker}
              onValueChange={(itemValue) => setFieldValue("customerId", itemValue)}
              >
                <Picker.Item label="Pilih Customer" value={null} />
                {customer?.data.map((customer) => (
                  <Picker.Item
                    key={customer.id}
                    label={customer.nama_customer}
                    value={customer.id}
                  />
                ))}
              </Picker>
            )}
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
              label="Kode Barang"
              style={styles.input}
              mode="outlined"
              value={kodeBarang}
              editable={false}
            />
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
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
    marginLeft: 15,
  },
});
