import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Layout from '@/components/Layout';
import { TextInput } from 'react-native-paper';
import Button from '@/components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBarang } from '@/hooks/useBarang';
import { Picker } from '@react-native-picker/picker';
import { getSupplier } from '@/hooks/useSupplier';
import { createTrxMasuk } from '@/hooks/useTransaksiMasuk';

const validationSchema = Yup.object().shape({
  no_transaksi_masuk: Yup.string().required('No Transaksi Masuk harus diisi'),
  supplierId: Yup.string().required('Supplier harus diisi'),
  barangId: Yup.string().required('Barang harus diisi'),
  jumlah: Yup.string().required('Jumlah harus diisi'),
  tanggal_masuk: Yup.string().required('Tgl. Transaksi harus diisi'),
  jam_masuk: Yup.string().required('Jam Transaksi harus diisi'),
  nama_penerima: Yup.string().required('Nama Penerima harus diisi'),
});

export default function TambahTrxMasukScreen() {

  const {data: barangs } = useQuery({
    queryKey: ["barangs"],
    queryFn: getBarang,
  })

  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSupplier,
  })

  const mutation = useMutation({
    mutationFn: (values) => createTrxMasuk(values),
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toTimeString().split(' ')[0].slice(0, 5);


  return (
    <Layout>
      <View style={styles.container}>
        <Formik
          initialValues={{
            no_transaksi_masuk: 'PNRM' + Math.floor(1000 + Math.random() * 9000).toString(),
            supplierId: '',
            barangId: '',
            jumlah: parseInt(1),
            tanggal_masuk: formattedDate,
            jam_masuk: formattedTime,
            nama_penerima: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            mutation.mutateAsync(values)
              .then(() => {
                console.log('Trx masuk created successfully');
                Alert.alert('Success', 'Data transaksi masuk berhasil ditambahkan');
                router.push('/transaksiMasuk');
              })
              .catch((error) => {
                console.error('Failed to create trx masuk:', error);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <TextInput
                label="No Transaksi masuk"
                mode="outlined"
                style={styles.input}
                value={values.no_transaksi_masuk}
                onChangeText={handleChange('no_transaksi_masuk')}
                onBlur={handleBlur('no_transaksi_masuk')}
              />
              {touched.no_transaksi_masuk && errors.no_transaksi_masuk && (
                <Text style={styles.error}>{errors.no_transaksi_masuk}</Text>
              )}
              <Picker
              selectedValue={values.supplierId}
              onValueChange={(itemValue) =>
                setFieldValue('supplierId', itemValue)
              }
              style={styles.picker}
              >
                <Picker.Item label="Pilih Supplier" value={null}/>
                {suppliers?.data?.map((s) => (
                  <Picker.Item
                    key={s.id}
                    label={s.nama_supplier}
                    value={s.id}
                  />
                ))}
              </Picker>
              {touched.supplierId && errors.supplierId && (
                <Text style={styles.error}>{errors.supplierId}</Text>
              )}
              <Picker
                selectedValue={values.barangId}
                onValueChange={(itemValue) =>
                  setFieldValue('barangId', itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Pilih Barang" value={null}/>
                {barangs?.data?.map((b) => (
                  <Picker.Item
                    key={b.id}
                    label={b.nama_barang}
                    value={b.id}
                  />
                ))}
              </Picker>
              {touched.barangId && errors.barangId && (
                <Text style={styles.error}>{errors.barangId}</Text>
              )}
              <TextInput
                label="Jumlah"
                mode="outlined"
                style={styles.input}
                value={values.jumlah}
                keyboardType="numeric"
                onChangeText={handleChange('jumlah')}
                onBlur={handleBlur('jumlah')}
              />
              {touched.jumlah && errors.jumlah && (
                <Text style={styles.error}>{errors.jumlah}</Text>
              )}
              <TextInput
                label="Tgl Masuk"
                mode="outlined"
                style={styles.input}
                value={values.tanggal_masuk}
                onChangeText={handleChange('tanggal_masuk')}
                onBlur={handleBlur('tanggal_masuk')}
                editable={false}
              />
              {touched.tanggal_masuk && errors.tanggal_masuk && (
                <Text style={styles.error}>{errors.tanggal_masuk}</Text>
              )}
              <TextInput
                label="Jam Masuk"
                mode="outlined"
                style={styles.input}
                value={values.jam_masuk}
                onChangeText={handleChange('jam_masuk')}
                onBlur={handleBlur('jam_masuk')}
                editable={false}
              />
              {touched.jam_keluar && errors.jam_keluar && (
                <Text style={styles.error}>{errors.jam_keluar}</Text>
              )}
              <TextInput
                label="Penerima"
                mode="outlined"
                style={styles.input}
                value={values.nama_penerima}
                onChangeText={handleChange('nama_penerima')}
                onBlur={handleBlur('nama_penerima')}
              />
              {touched.nama_penerima && errors.nama_penerima && (
                <Text style={styles.error}>{errors.nama_penerima}</Text>
              )}
              <Button mode="contained" style={styles.button} onPress={handleSubmit}>Simpan</Button>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  form: {
    padding: 10
  },
  input: {
    marginBottom: 10
  },
  picker: {
    height: 50,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    width: '100%',
    borderRadius: 10
  },
  error: {
    color: 'red',
    marginBottom: 10
  }
})