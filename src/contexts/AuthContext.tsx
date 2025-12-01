import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../services/api';

type DecodedToken = { role?: 'admin' | 'member'; exp?: number };

type AuthState = {
  token: string | null;
  role: 'admin' | 'member' | null;
  isAuthenticated: boolean;
};

type AuthContextType = {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'member' | null>(null);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = useCallback(async () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    await AsyncStorage.removeItem('auth_token');
    setToken(null);
    setRole(null);
  }, []);

  const scheduleAutoLogout = useCallback(
    (exp: number) => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      const ms = exp * 1000 - Date.now();
      if (ms > 0) logoutTimer.current = setTimeout(() => logout(), ms);
    },
    [logout],
  );

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await authApi.login(username, password);
      const t = res.token as string;
      await AsyncStorage.setItem('auth_token', t);
      const d = jwtDecode<DecodedToken>(t);
      const r = d.role || null;
      setToken(t);
      setRole(r);
      if (d.exp) scheduleAutoLogout(d.exp);
    },
    [scheduleAutoLogout],
  );

  useEffect(() => {
    AsyncStorage.getItem('auth_token').then(t => {
      if (t) {
        const d = jwtDecode<DecodedToken>(t);
        const r = d.role || null;
        setToken(t);
        setRole(r);
        if (d.exp) scheduleAutoLogout(d.exp);
      }
    });
  }, [scheduleAutoLogout]);

  const value = useMemo(
    () => ({
      state: { token, role, isAuthenticated: !!token },
      login,
      logout,
    }),
    [token, role, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext');
  return ctx;
}