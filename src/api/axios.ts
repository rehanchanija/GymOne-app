import axios from 'axios';
import {getToken, isTokenExpired, clearAuth} from '@/utils/auth';

const instance = axios.create({
  baseURL: 'https://api.gymone.example.com',
  timeout: 15000,
});

instance.interceptors.request.use(async config => {
  const token = await getToken();
  const expired = await isTokenExpired();
  if (token && !expired) {
    const headers: any = config.headers || {};
    headers.Authorization = `Bearer ${token}`;
    config.headers = headers;
  }
  return config;
});

instance.interceptors.response.use(
  r => r,
  async e => {
    const status = e?.response?.status;
    if (status === 401) {
      await clearAuth();
    }
    return Promise.reject(e);
  },
);

export default instance;
