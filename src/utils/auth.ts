import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'admin' | 'user';

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const TOKEN_EXP_KEY = 'token_exp';

export const saveAuth = async (token: string, role: UserRole, exp?: number) => {
  const ops: [string, string][] = [
    [TOKEN_KEY, token],
    [ROLE_KEY, role],
  ];
  if (exp) {
    ops.push([TOKEN_EXP_KEY, String(exp)]);
  }
  await AsyncStorage.multiSet(ops);
};

export const getToken = async () => {
  const v = await AsyncStorage.getItem(TOKEN_KEY);
  return v;
};

export const getRole = async () => {
  const v = await AsyncStorage.getItem(ROLE_KEY);
  return (v as UserRole | null) || null;
};

export const getTokenExp = async () => {
  const v = await AsyncStorage.getItem(TOKEN_EXP_KEY);
  return v ? Number(v) : null;
};

export const isTokenExpired = async () => {
  const exp = await getTokenExp();
  if (!exp) {
    return false;
  }
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
};

export const clearAuth = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY, TOKEN_EXP_KEY]);
};
