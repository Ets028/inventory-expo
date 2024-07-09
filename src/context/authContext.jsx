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
  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      const response = await apiLoginUser(email, password);
      const { token } = response.data;
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const { userId, username, role } = decodedToken;
      console.log(decodedToken)
      const userInfo = { userId, username, role };
      setAuthState({ token, userInfo });
      await saveToken(token);
      router.replace('/(drawer)/(tabs)/home');
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