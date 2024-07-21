import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import Button from '@/components/Button'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getSupplierById, updateSupplier } from '@/hooks/useSupplier';
import Layout from '@/components/Layout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/service/queryClient'

const validationSchema = Yup.object().shape({
  nama_supplier: Yup.string().required('Nama supplier harus diisi'),
  alamat: Yup.string().required('Alamat harus diisi'),
  telepon: Yup.string().required('Telepon harus diisi'),
  email: Yup.string().required('Email harus diisi'),
});

const EditSupplier = () => {

  const { id } = useLocalSearchParams()
  const router = useRouter()

  const { data: supplierId, isLoading} = useQuery({
    queryKey: ['supplierId', id],
    queryFn: () => getSupplierById(id),
  })

  const mutation = useMutation({
    mutationFn: (values) => updateSupplier(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(['supplierId', id])
    }
  })

  if(!supplierId?.data){
    return (
      <Layout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Data Tidak Ditemukan</Text>
          <Button style={styles.button} onPress={() => router.push('/supplier')}>Kembali</Button>
        </View>
      </Layout>
    )
  }

  if(isLoading){
    return (
      <Layout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <Formik
        initialValues=
        {{
          nama_supplier: supplierId?.data.nama_supplier,
          alamat: supplierId?.data.alamat,
          telepon: supplierId?.data.telepon,
          email: supplierId?.data.email
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values)
          mutation.mutateAsync(values).then(() => {
            Alert.alert("Success", "Data supplier berhasil diupdate");
            router.push("/supplier");
          }).catch(error => {
            Alert.alert("Error", error.message);
            router.push("/home");
          })
        }}
        > 
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Nama supplier"
              onChangeText={handleChange('nama_supplier')}
              onBlur={handleBlur('nama_supplier')}
              value={values.nama_supplier}
              error={touched.nama_supplier && errors.nama_supplier}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Alamat"
              onChangeText={handleChange('alamat')}
              onBlur={handleBlur('alamat')}
              value={values.alamat}
              error={touched.alamat && errors.alamat}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Telepon"
              onChangeText={handleChange('telepon')}
              onBlur={handleBlur('telepon')}
              value={values.telepon}
              error={touched.telepon && errors.telepon}
            />
            <TextInput
              style={styles.input}
              label="Email"
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
            />
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
            >
              {mutation.isLoading ? <ActivityIndicator size="small" color="white" /> : 'Edit'}
            </Button>
          </View>
       )}

      </Formik>
    </Layout>
  )
}

export default EditSupplier

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  }
})