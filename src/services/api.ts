import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (username: string, password: string) => {
    const res = await api.post('/auth/login', { username, password });
    return res.data;
  },
};

export const adminApi = {
  dashboard: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },
  addMember: async (payload: {
    name: string;
    phone: string;
    age: number;
    gender: string;
    planType: string;
  }) => {
    const res = await api.post('/admin/members', payload);
    return res.data;
  },
  expenses: async () => {
    const res = await api.get('/admin/expenses');
    return res.data;
  },
  addExpense: async (payload: { title: string; amount: number; date: string }) => {
    const res = await api.post('/admin/expenses', payload);
    return res.data;
  },
  payments: async () => {
    const res = await api.get('/admin/payments');
    return res.data;
  },
  addPayment: async (payload: { memberId: string; amount: number }) => {
    const res = await api.post('/admin/payments', payload);
    return res.data;
  },
  exercises: async () => {
    const res = await api.get('/admin/exercises');
    return res.data;
  },
  addExercise: async (payload: { name: string; videoUrl: string }) => {
    const res = await api.post('/admin/exercises', payload);
    return res.data;
  },
  workoutPlans: async () => {
    const res = await api.get('/admin/workout-plans');
    return res.data;
  },
  createWorkoutPlan: async (payload: { name: string; days: any }) => {
    const res = await api.post('/admin/workout-plans', payload);
    return res.data;
  },
  announcements: async () => {
    const res = await api.get('/admin/announcements');
    return res.data;
  },
  addAnnouncement: async (payload: { type: 'video' | 'message'; content: string }) => {
    const res = await api.post('/admin/announcements', payload);
    return res.data;
  },
  members: async () => {
    const res = await api.get('/admin/members');
    return res.data;
  },
  grantAccess: async (payload: { memberId: string; username: string; password: string }) => {
    const res = await api.post('/admin/access', payload);
    return res.data;
  },
};

export const memberApi = {
  me: async () => {
    const res = await api.get('/member/me');
    return res.data;
  },
  attendance: async () => {
    const res = await api.get('/member/attendance');
    return res.data;
  },
  markAttendance: async () => {
    const res = await api.post('/member/attendance');
    return res.data;
  },
  workouts: async () => {
    const res = await api.get('/member/workouts');
    return res.data;
  },
  saveCustomWorkout: async (payload: { exercises: string[] }) => {
    const res = await api.post('/member/workouts/custom', payload);
    return res.data;
  },
  announcements: async () => {
    const res = await api.get('/member/announcements');
    return res.data;
  },
};