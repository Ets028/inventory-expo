import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Layout from '@/components/Layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from 'react-native-paper'
import Button from '@/components/Button'
import { Theme } from '@/constants/Theme'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCustomerById, updateCustomer } from '@/hooks/useCustomer'
import { useRouter } from 'expo-router'
import { queryClient } from '@/service/queryClient'


const validationSchema = Yup.object().shape({
    nama_customer: Yup.string().required('Nama Customer harus diisi'),
    alamat: Yup.string().required('Alamat harus diisi'),
    telepon: Yup.string().required('Telepon harus diisi'),
    email: Yup.string().required('Email harus diisi'),
});

const EditCustomer = () => {
    const router = useRouter()
    const params = useLocalSearchParams()

    const { data: customerId } = useQuery({
        queryKey: ['customerId', params.id],
        queryFn: () => getCustomerById(params.id),
    })

    const mutation = useMutation({
        mutationFn: (values) => {
            updateCustomer(params.id, values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customerId', params.id])
            queryClient.refetchQueries(['customer']) 
        }
    })

  return (
    <Layout>
      <Formik
      initialValues={{
        nama_customer: customerId?.data?.nama_customer || '',
        alamat: customerId?.data?.alamat,
        telepon: customerId?.data?.telepon,
        email: customerId?.data?.email,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutation.mutateAsync(values).then(() => {
            Alert.alert("Success", "Data customer berhasil diubah")
            router.push("/customer")
        }).catch((error) => {
            console.log(error)
            Alert.alert("Error", error.message)
        })
      }}
      > 
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Nama Customer"
              value={values.nama_customer}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
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
              onChangeText={handleChange('telepon')}
              onBlur={handleBlur('telepon')}
              error={errors.telepon && touched.telepon}
            />
            <TextInput
              label="Email"
              value={values.email}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email && touched.email}
            />
            <Button
              mode='contained'
              style={styles.button}
              onPress={handleSubmit}>
                {mutation.isLoading ? "Loading..." : "Simpan"}
              </Button>
          </View>
        )}
      </Formik>
    </Layout>
  )
}

export default EditCustomer

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%'
  },
  button: {
    marginTop: 20,
    width: '100%',
  }
})