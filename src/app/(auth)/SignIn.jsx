import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/defaultStyles';
import { TextInput } from 'react-native-paper';
import Button from '@/components/Button';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuth } from '@/context/authContext'; // Sesuaikan dengan path ke AuthContext
import Logo from '@/components/Logo';
import Layout from '@/components/Layout';
import { Theme } from '@/constants/Theme';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email atau Username tidak valid')
    .required('Email atau Username wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

export default function SignIn() {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await loginUser(values.email, values.password);
    } catch (err) {
      setError('Login gagal, periksa email dan password Anda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: 'admin@gmail.com', password: 'adm' }}
        validationSchema={loginSchema}
        onSubmit={(values) => 
          handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.container}>
            <Logo/>
            <Text style={[defaultStyles.header, { bottom: 10}]}>WELCOME BACK</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              editable={!loading}
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              editable={!loading}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            {error && <Text style={styles.error}>{error}</Text>}
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting || loading}
            >
              {loading ? <ActivityIndicator color="white" /> : 'SIGN IN'}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    marginVertical: 15,
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: Theme.colors.primary,
    width: '90%',
  },
});
