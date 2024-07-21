import { View, Text, StyleSheet, Alert } from 'react-native'
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import Button from '@/components/Button'
import { Theme } from '@/constants/Theme'
import { useMutation } from '@tanstack/react-query'
import { createCustomer } from '@/hooks/useCustomer'
import { useRouter } from 'expo-router'
import { queryClient } from '@/service/queryClient'
import { useAuth } from '@/context/authContext'


const validationSchema = Yup.object().shape({
  nama_customer: Yup.string().required('Nama Customer harus diisi'),
  alamat: Yup.string().required('Alamat harus diisi'),
  telepon: Yup.string().required('Telepon harus diisi'),
  email: Yup.string().required('Email harus diisi'),
});

const TambahCustomer = () => {
  const { userInfo: { role } } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (values) => createCustomer(values),
    onSuccess: () => {
      queryClient.invalidateQueries(['customer'])
    }
  })

  const handleSubmit = (values) => {
    if (role !== "supervisor") {
      Alert.alert("Error", "Anda tidak memiliki akses untuk menambahkan customer");
      return;
    } try {
      setIsLoading(true);
      mutation.mutateAsync(values);
      Alert.alert("Success", "Customer Berhasil Ditambah");
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      router.push('/customer')
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          nama_customer: '',
          alamat: '',
          telepon: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Nama Customer"
              value={values.nama_customer}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              onChangeText={handleChange('nama_customer')}
              onBlur={handleBlur('nama_customer')}
              error={errors.nama_customer && touched.nama_customer}
            />
            <TextInput
              label="Alamat"
              value={values.alamat}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              onChangeText={handleChange('alamat')}
              onBlur={handleBlur('alamat')}
              error={errors.alamat && touched.alamat}
            />
            <TextInput
              label="Telepon"
              value={values.telepon}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              onChangeText={handleChange('telepon')}
              onBlur={handleBlur('telepon')}
              error={errors.telepon && touched.telepon}
            />
            <TextInput
              label="Email"
              keyboardType="email-address"
              enterKeyHint='enter'
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email && touched.email}
            />
            <Button mode='contained' style={styles.button} onPress={handleSubmit}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </Layout>
  )
}

export default TambahCustomer

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