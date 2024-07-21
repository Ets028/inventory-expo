import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import supabase from "@/service/supabaseClient";
import { axiosInstance } from "@/hooks/api";
import Layout from "../Layout";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

// Validasi schema menggunakan Yup
const TambahBarangSchema = Yup.object().shape({
  kode_barang: Yup.string().required("Kode Barang is required"),
  nama_barang: Yup.string().required("Nama Barang is required"),
  kategori: Yup.string().required("Kategori is required"),
  stok: Yup.number().required("Stok is required"),
  satuan: Yup.string().required("Satuan is required"),
  image_url: Yup.string().nullable(),
});

const TambahBarang = () => {
  const { userInfo: { role } } = useAuth();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk memilih gambar dari galeri
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Mengakses elemen pertama dalam array assets
    }
  };

  const handleSubmit = async (values) => {
    //jika bukan supervisor, maka error
    if (role !== "supervisor") {
      Alert.alert("Error", "Anda tidak memiliki akses untuk menambahkan barang");
      router.push("/inventory");
      return;
    } else {
      try {
        let imageUrl = values.image_url;
  
        if (!imageUrl && image && image.uri) {
          const imageUri = image.uri;
          const fileName = imageUri.split("/").pop();
  
          const response = await fetch(imageUri);
          const arrayBuffer = await response.arrayBuffer();
  
          // Upload image menggunakan Supabase
          const { data: uploadedData, error } = await supabase.storage
            .from("images")
            .upload(fileName, arrayBuffer, {
              cacheControl: "3600",
              upsert: false,
            });
  
          if (error) {
            throw new Error(error.message);
          }
          const { data } = await supabase.storage
          .from("images")
          .getPublicUrl(uploadedData.path);
          
          imageUrl = data.publicUrl;
        }
        
        const response = await axiosInstance.post("/barang", {
          ...values,
          image_url: imageUrl,
        });
  
        console.log(response.data);
  
        setLoading(false);
        router.replace("/(drawer)/(tabs)/inventory");
      } catch (error) {
        setLoading(false);
        console.log(error);
        Alert.alert("Error", error.response.data.message);
      }
  }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Formik
          initialValues={{
            kode_barang: "",
            nama_barang: "",
            kategori: "",
            stok: 0,
            satuan: "",
            image_url: "",
          }}
          validationSchema={TambahBarangSchema}
          onSubmit={(values) => {
            if (
              values.kode_barang &&
              values.nama_barang &&
              values.kategori &&
              values.stok &&
              values.satuan &&
              (values.image_url || image)
            ) {
              handleSubmit(values);
            } else {
              Alert.alert("Error", "All fields are required");
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="Kode Barang"
                style={styles.input}
                value={values.kode_barang}
                onChangeText={handleChange("kode_barang")}
                mode="outlined"
              />
              {errors.kode_barang && (
                <Text style={styles.errorText}>{errors.kode_barang}</Text>
              )}
              <TextInput
                label="Nama Barang"
                style={styles.input}
                value={values.nama_barang}
                onChangeText={handleChange("nama_barang")}
                mode="outlined"
              />
              {errors.nama_barang && (
                <Text style={styles.errorText}>{errors.nama_barang}</Text>
              )}
              <TextInput
                label="Kategori"
                style={styles.input}
                value={values.kategori}
                onChangeText={handleChange("kategori")}
                mode="outlined"
              />
              {errors.kategori && (
                <Text style={styles.errorText}>{errors.kategori}</Text>
              )}
              <TextInput
                label="Stok"
                style={styles.input}
                value={values.stok.toString()}
                keyboardType="numeric"
                onChangeText={handleChange("stok")}
                mode="outlined"
              />
              {errors.stok && (
                <Text style={styles.errorText}>{errors.stok}</Text>
              )}
              <TextInput
                label="Satuan"
                style={styles.input}
                value={values.satuan}
                onChangeText={handleChange("satuan")}
                mode="outlined"
              />
              {errors.satuan && (
                <Text style={styles.errorText}>{errors.satuan}</Text>
              )}
              <View style={styles.imageInputContainer}>
                <TextInput
                  label="Image URL"
                  style={[styles.input, styles.imageInput]}
                  value={values.image_url}
                  onChangeText={handleChange("image_url")}
                  mode="outlined"
                />
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={pickImage}
                >
                  <Ionicons
                    name="image"
                    size={24}
                    color="black"
                    style={styles.imageIcon}
                  />
                </TouchableOpacity>
              </View>
              {image && (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                  />
                </View>
              )}
              <Button style={styles.button} mode="contained" onPress={handleSubmit}>
                {loading ? <ActivityIndicator color="white" /> : "Tambah"}
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default TambahBarang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageInput: {
    flex: 1,
  },
  imagePicker: {
    padding: 8,
    left: 10,
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  button: {
    width: "100%",
  },
});
