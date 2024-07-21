import React, { createContext, useState, useContext } from 'react';
import { loginUser as apiLoginUser } from '@/hooks/useLogin';
import { saveToken, removeToken } from '@/service/tokenManager';
import { useRouter } from 'expo-router';
import { Buffer } from 'buffer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userInfo: null,
  });
  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      const response = await apiLoginUser(email, password);
      const { token } = response.data;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = Buffer.from(base64, 'base64').toString('utf-8');
      const decodedToken = JSON.parse(decodedData);
      const { userId, username, role } = decodedToken;
      console.log(decodedToken);
      const userInfo = { userId, username, role };
      setAuthState({ token, userInfo });
      await saveToken(token);
      router.replace('/home');
    } catch (error) {
      console.error('Login gagal:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    setAuthState({ token: null, userInfo: null }); // Clear role
    await removeToken();
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
