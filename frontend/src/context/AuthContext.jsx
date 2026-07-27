import { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const TOKEN_KEY = 'prepwise_token';
const USER_KEY = 'prepwise_user';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: nextUser } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      toast.success('Logged in successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to log in');
      throw error;
    }
  };

  const register = async (payload) => {
    try {
      const response = await api.post('/auth/register', payload);
      const { token, user: nextUser } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      toast.success('Account created successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to register');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    toast.success('Logged out');
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user) }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
