import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { StyleSheet, View, ActivityIndicator, Text, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { getPermintaanById, updatePermintaan } from "@/hooks/usePermintaan";
import { Picker } from "@react-native-picker/picker";
import { getBarang } from "@/hooks/useBarang";
import { Theme } from "@/constants/Theme";
import Button from "../Button";
import { getCustomer } from "@/hooks/useCustomer";

const schema = Yup.object().shape({
  no_permintaan: Yup.string().required("No. Permintaan is required"),
  customerId: Yup.string().required("Nama Customer is required"),
  barangId: Yup.number().required("Barang is required"),
  jumlah: Yup.number()
    .required("Jumlah is required")
    .min(1, "Jumlah harus lebih dari 0"),
  deskripsi: Yup.string().required("Deskripsi is required"),
  status: Yup.string().required("Status is required"),
});

export default function EditPermintaan() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data: permintaan, isLoading: isPermintaanLoading } = useQuery({
    queryKey: ["permintaan", params.id],
    queryFn: () => getPermintaanById(params.id),
  });

  const { data: barang, isLoading: isBarangLoading } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  const {data: customer } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomer,
  })

  const mutation = useMutation({
    mutationFn: (values) => updatePermintaan(params.id, values),
  });

  if (isPermintaanLoading || isBarangLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Layout>
    );
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const updatedValues = {
      ...values,
      barangId: Number(values.barangId),
      jumlah: Number(values.jumlah),
      customerId: Number(values.customerId),
    };

    try {
      await mutation.mutateAsync(updatedValues);
      Alert.alert("Success", "Permintaan updated successfully");
      console.log(values)
      router.push("/permintaan");
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          no_permintaan: permintaan?.no_permintaan || "",
          customerId: permintaan?.customer?.id || null,
          barangId: permintaan?.barang?.id || null,
          jumlah: permintaan?.jumlah || "",
          deskripsi: permintaan?.deskripsi || "",
          status: permintaan?.status || "",
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View style={styles.container}>
            <TextInput
              label="No. Permintaan"
              value={values.no_permintaan}
              onChangeText={handleChange("no_permintaan")}
              onBlur={handleBlur("no_permintaan")}
              mode="outlined"
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              style={styles.input}
            />
            <Picker
            selectedValue={values.customerId}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setFieldValue("customerId", itemValue);
            }}
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
            <Picker
              selectedValue={values.barangId}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setFieldValue("barangId", itemValue);
              }}
            >
              <Picker.Item label="Pilih Barang" value={null} />
              {barang?.data.map((barang) => (
                <Picker.Item
                  key={barang.id}
                  label={barang.nama_barang}
                  value={barang.id}
                />
              ))}
            </Picker>
            {errors.barangId && (
              <Text style={styles.errorText}>{errors.barangId}</Text>
            )}
            <TextInput
              label="Jumlah"
              value={values.jumlah}
              onChangeText={handleChange("jumlah")}
              onBlur={handleBlur("jumlah")}
              mode="outlined"
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              style={styles.input}
              keyboardType="numeric" // Make sure this input is numeric
            />
            <TextInput
              label="Deskripsi"
              value={values.deskripsi}
              onChangeText={handleChange("deskripsi")}
              onBlur={handleBlur("deskripsi")}
              mode="outlined"
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              style={styles.input}
            />
            <TextInput
              label="Status"
              value={values.status}
              onChangeText={handleChange("status")}
              onBlur={handleBlur("status")}
              mode="outlined"
              style={styles.input}
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              editable={false}
            />
            <Button mode="contained" onPress={handleSubmit}>
              {isLoading ? <ActivityIndicator size="small" color="white" /> : "Update"}
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
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  picker: {
    width: "90%",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
    marginLeft: 15,
  },
});
