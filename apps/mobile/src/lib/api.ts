import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5050/api/v1' });
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('alat_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
