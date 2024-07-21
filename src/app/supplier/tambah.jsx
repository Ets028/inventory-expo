import { View, Text, StyleSheet, Alert } from 'react-native'
import Layout from '@/components/Layout'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native-paper'
import Button from '@/components/Button'
import { Theme } from '@/constants/Theme'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { createSupplier } from '@/hooks/useSupplier'
import { queryClient } from '@/service/queryClient'


const validationSchema = Yup.object().shape({
    nama_supplier: Yup.string().required('Nama supplier harus diisi'),
    alamat: Yup.string().required('Alamat harus diisi'),
    telepon: Yup.string().required('Telepon harus diisi'),
    email: Yup.string().required('Email harus diisi'),
});

const TambahSupplier = () => {

    const router = useRouter()

    const mutation = useMutation({
        mutationKey: ['supplier'],
        mutationFn: (values) => {
            createSupplier(values)
        },
        onSuccess: ( ) => {
            queryClient.invalidateQueries(['supplier'])
            queryClient.refetchQueries(['supplier'])
        }
    })

  return (
    <Layout>
      <Formik
      initialValues={{
        nama_supplier: '',
        alamat: '',
        telepon: '',
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutation.mutateAsync(values).then(() => {
            console.log(values)
            Alert.alert("Success", "Data supplier berhasil ditambahkan")
            router.back()
        }).catch((error) => {
            console.log(error)
            Alert.alert("Error", error.message)
        })
      }}
      > 
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Nama Supplier"
              value={values.nama_supplier}
              style={styles.input}
              mode='outlined'
              outlineColor={Theme.colors.primary}
              activeOutlineColor={Theme.colors.primary}
              onChangeText={handleChange('nama_supplier')}
              onBlur={handleBlur('nama_supplier')}
              error={errors.nama_supplier && touched.nama_supplier}
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
            <Button mode='contained' style={styles.button}  onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </Layout>
  )
}

export default TambahSupplier

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