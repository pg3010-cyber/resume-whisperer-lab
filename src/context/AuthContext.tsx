import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/api";

interface User { id: string; name: string; email: string; }

interface AuthCtx {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login:  (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<User | null>(null);
  const [token,     setToken]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("rw_token");
    const savedUser  = localStorage.getItem("rw_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    localStorage.setItem("rw_token", data.token);
    localStorage.setItem("rw_user",  JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await authApi.signup(name, email, password);
    localStorage.setItem("rw_token", data.token);
    localStorage.setItem("rw_user",  JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("rw_token");
    localStorage.removeItem("rw_user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}