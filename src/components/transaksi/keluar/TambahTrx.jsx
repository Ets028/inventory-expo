import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Layout from '@/components/Layout';
import { TextInput } from 'react-native-paper';
import Button from '@/components/Button';
import { Picker } from '@react-native-picker/picker';
import { getPermintaan } from '@/hooks/usePermintaan';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Theme } from '@/constants/Theme';
import { createTrx } from '@/hooks/useTransaksiKeluar';

const validationSchema = Yup.object().shape({
  no_transaksi_keluar: Yup.string().required('No Transaksi Keluar harus diisi'),
  permintaanId: Yup.string().required('Permintaan harus diisi'),
  nama_pengirim: Yup.string().required('Nama Pengirim harus diisi'),
  tanggal_keluar: Yup.string().required('Tgl Keluar harus diisi'),
  jam_keluar: Yup.string().required('Jam Keluar harus diisi'),
  jumlah: Yup.string().required('Jumlah harus diisi'),
  barangId: Yup.string().required('Barang harus diisi'),
  customerId: Yup.string().required('Customer harus diisi'),
});

const TambahTrxScreen = () => {
  const { data: permintaan, isLoading: isPermintaanLoading } = useQuery({
    queryKey: ["permintaan"],
    queryFn: getPermintaan,
  });

  const mutation = useMutation({
    mutationFn: (values) => createTrx(values),
  });

  const [selectedPermintaan, setSelectedPermintaan] = useState(null);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toTimeString().split(' ')[0].slice(0, 5);

  return (
    <Layout>
      <View style={styles.container}>
        <Formik
          initialValues={{
            no_transaksi_keluar: 'PGRM' + Math.floor(1000 + Math.random() * 9000).toString(),
            permintaanId: null,
            nama_pengirim: '',
            tanggal_keluar: formattedDate,
            jam_keluar: formattedTime,
            jumlah: parseInt(1),
            barangId: '', // Untuk menampilkan nama_barang di input
            customerId: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Di sini Anda dapat mengirim values dengan id barang yang sesuai
            const barangIdToSend = permintaan.find(p => p.id === values.permintaanId)?.barang.id;
            const csId = permintaan.find(p => p.id === values.permintaanId)?.customerId
            const valuesToSend = { ...values, barangId: barangIdToSend, customerId: csId };
            console.log(valuesToSend);
            mutation.mutateAsync(valuesToSend)
              .then(() => {
                Alert.alert('Sukses', 'Transaksi keluar ditambahkan');
              })
              .catch((error) => {
                console.error('Error saat menyimpan transaksi:', error);
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
              <Picker
                selectedValue={values.permintaanId}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  const selected = permintaan.find(p => p.id === itemValue);
                  setFieldValue('permintaanId', itemValue);
                  setSelectedPermintaan(selected);
                  setFieldValue('barangId', selected ? selected.barang?.nama_barang : '');
                  setFieldValue('customerId', selected ? selected.customer?.nama_customer : '');
                }}
              >
                <Picker.Item label="Pilih Permintaan" value={null} />
                {permintaan?.map((p) => (
                  <Picker.Item
                    key={p.id}
                    label={p.no_permintaan}
                    value={p.id}
                  />
                ))}
              </Picker>
              <TextInput
                label="No Transaksi Keluar"
                mode="outlined"
                style={styles.input}
                value={values.no_transaksi_keluar}
                onChangeText={handleChange('no_transaksi_keluar')}
                onBlur={handleBlur('no_transaksi_keluar')}
              />
              {touched.no_transaksi_keluar && errors.no_transaksi_keluar && (
                <Text style={styles.error}>{errors.no_transaksi_keluar}</Text>
              )}
              <TextInput
                label="Tujuan"
                mode="outlined"
                style={styles.input}
                value={values.customerId}
                onChangeText={handleChange('customerId')}
                onBlur={handleBlur('customerId')}
                editable={false} // Disable editing
              />
              {touched.customerId && errors.customerId && (
                <Text style={styles.error}>{errors.customerId}</Text>
              )}
              <TextInput
                label="Barang"
                mode="outlined"
                style={styles.input}
                value={values.barangId} // Menampilkan nama_barang di sini
                onChangeText={handleChange('barangId')}
                onBlur={handleBlur('barangId')}
                editable={false} // Disable editing
              />
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
                label="Tgl Keluar"
                mode="outlined"
                style={styles.input}
                value={values.tanggal_keluar}
                onChangeText={handleChange('tanggal_keluar')}
                onBlur={handleBlur('tanggal_keluar')}
                editable={false}
              />
              {touched.tanggal_keluar && errors.tanggal_keluar && (
                <Text style={styles.error}>{errors.tanggal_keluar}</Text>
              )}
              <TextInput
                label="Jam Keluar"
                mode="outlined"
                style={styles.input}
                value={values.jam_keluar}
                onChangeText={handleChange('jam_keluar')}
                onBlur={handleBlur('jam_keluar')}
                editable={false}
              />
              {touched.jam_keluar && errors.jam_keluar && (
                <Text style={styles.error}>{errors.jam_keluar}</Text>
              )}
              <TextInput
                label="Pengirim"
                mode="outlined"
                style={styles.input}
                value={values.nama_pengirim}
                onChangeText={handleChange('nama_pengirim')}
                onBlur={handleBlur('nama_pengirim')}
              />
              {touched.nama_pengirim && errors.nama_pengirim && (
                <Text style={styles.error}>{errors.nama_pengirim}</Text>
              )}
              <Button mode="contained" style={styles.button} onPress={handleSubmit}>Simpan</Button>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default TambahTrxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 10,
    flex: 1,
    marginTop: 20,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  button: {
    marginTop: 30,
    width: '100%',
  },
  picker: {
    height: 50,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Theme.colors.primary,
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
});
