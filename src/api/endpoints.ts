import api from './axios';

export type LoginRequest = {email: string; password: string};
export type LoginResponse = {
  token: string;
  role: 'admin' | 'user';
  exp?: number;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
};

export const getUserDashboard = async () => {
  const res = await api.get<{
    calories: number;
    steps: number;
    durationMin: number;
    week: {day: string; value: number}[];
  }>('/user/dashboard');
  return res.data;
};

export const getUserWorkouts = async () => {
  const res = await api.get<
    {
      id: string;
      name: string;
      exercises: {name: string; reps: number; durationMin: number}[];
      assignedAt: string;
      completed: boolean;
    }[]
  >('/user/workouts');
  return res.data;
};

export const completeWorkout = async (id: string) => {
  await api.post(`/user/workouts/${id}/complete`);
};

export const getExerciseLibrary = async () => {
  const res = await api.get<
    {
      id: string;
      name: string;
      muscle: string;
      difficulty: string;
      imageUrl?: string;
      instructions?: string;
    }[]
  >('/exercises');
  return res.data;
};

export const getUserProgress = async () => {
  const res = await api.get<{
    weight: {date: string; value: number}[];
    calories: {date: string; value: number}[];
    steps: {date: string; value: number}[];
  }>('/user/progress');
  return res.data;
};

export const getAdminDashboard = async () => {
  const res = await api.get<{
    totalMembers: number;
    activeUsers: number;
    completionRate: number;
  }>('/admin/dashboard');
  return res.data;
};

export const getMembers = async () => {
  const res = await api.get<
    {id: string; name: string; email: string; active: boolean}[]
  >('/admin/members');
  return res.data;
};

export const createMember = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post('/admin/members', {name, email, password});
  return res.data;
};

export const deactivateMember = async (id: string) => {
  await api.delete(`/admin/members/${id}`);
};

export const getWorkoutsAdmin = async () => {
  const res = await api.get<{id: string; name: string; exercises: number}[]>(
    '/admin/workouts',
  );
  return res.data;
};

export const createWorkout = async (payload: {
  name: string;
  exercises: any[];
}) => {
  const res = await api.post('/admin/workouts', payload);
  return res.data;
};

export const assignWorkout = async (workoutId: string, memberId: string) => {
  await api.post(`/admin/workouts/${workoutId}/assign`, {memberId});
};

export const getExercisesAdmin = async () => {
  const res = await api.get<{id: string; name: string; muscle: string}[]>(
    '/admin/exercises',
  );
  return res.data;
};

export const createExercise = async (payload: {
  name: string;
  muscle: string;
  difficulty: string;
  instructions?: string;
  mediaUrl?: string;
}) => {
  const res = await api.post('/admin/exercises', payload);
  return res.data;
};

export const getMemberProgress = async (memberId: string) => {
  const res = await api.get<{
    weight: {date: string; value: number}[];
    calories: {date: string; value: number}[];
  }>(`/admin/members/${memberId}/progress`);
  return res.data;
};

export const getGroupMessages = async () => {
  const res = await api.get<
    {id: string; text: string; sender: string; createdAt: string}[]
  >('/chat/group');
  return res.data;
};

export const sendGroupMessage = async (text: string) => {
  const res = await api.post('/chat/group', {text});
  return res.data;
};

export const getPrivateMessages = async (userId: string) => {
  const res = await api.get<
    {id: string; text: string; sender: string; createdAt: string}[]
  >(`/chat/private/${userId}`);
  return res.data;
};

export const sendPrivateMessage = async (userId: string, text: string) => {
  const res = await api.post(`/chat/private/${userId}`, {text});
  return res.data;
};
