import React, { createContext, useState, useContext } from 'react';
import { loginUser as apiLoginUser } from '@/hooks/useLogin';
import { saveToken, removeToken } from '@/service/tokenManager';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userInfo: null,
  });
  const [role, setRole] = useState(null); // Pisahkan role dari authState
  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      const response = await apiLoginUser(email, password);
      const { token } = response.data;
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const { userId, role, nama_lengkap: namaLengkap, alamat, telepon } = decodedToken;
      console.log(decodedToken)
      const userInfo = { userId, namaLengkap, alamat, telepon };
      setAuthState({ token, userInfo });
      setRole(role);
      await saveToken(token);
      router.replace('/(drawer)/(tabs)/home');
    } catch (error) {
      console.error('Login gagal:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    setAuthState({ token: null, userInfo: null });
    setRole(null); // Clear role
    await removeToken();
  };

  return (
    <AuthContext.Provider value={{ ...authState, role, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);