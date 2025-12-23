import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {login as loginApi} from '@/api/endpoints';
import {clearAuth, getRole, getToken, saveAuth, UserRole} from '@/utils/auth';

type AuthState = {
  token: string | null;
  role: UserRole | null;
  loading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      const t = await getToken();
      const r = await getRole();
      setToken(t);
      setRole(r);
      setLoading(false);
    };
    boot();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginApi({email, password});
    await saveAuth(res.token, res.role, res.exp);
    setToken(res.token);
    setRole(res.role);
  };

  const logout = async () => {
    await clearAuth();
    setToken(null);
    setRole(null);
  };

  const value = useMemo(
    () => ({token, role, loading, login, logout}),
    [token, role, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
