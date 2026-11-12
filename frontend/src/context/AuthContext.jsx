import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import api, { ensureCsrfCookie } from '../lib/axios';

const AuthContext = createContext(null);
const USER_CACHE_KEY = 'invitory_user_cache';

function getCachedUser() {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCachedUser(u) {
  try {
    if (u) {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(USER_CACHE_KEY);
    }
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCachedUser);
  const [loading, setLoading] = useState(() => !getCachedUser());
  const initialFetchRef = useRef(null);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/api/user');
      setUser(data.user);
      setCachedUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      setCachedUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    // Guard against React StrictMode's double-invoke in development: two
    // concurrent /api/user requests on first load can race with the session
    // cookie Laravel issues for each one, corrupting CSRF state for the
    // subsequent login/register call. Only the first invocation should fire.
    if (!initialFetchRef.current) {
      initialFetchRef.current = refreshUser().finally(() => setLoading(false));
    }
  }, [refreshUser]);

  const login = async (email, password) => {
    await ensureCsrfCookie();
    await api.post('/api/login', { email, password });
    return refreshUser();
  };

  const register = async (name, email, password, passwordConfirmation) => {
    await ensureCsrfCookie();
    await api.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    return refreshUser();
  };

  const logout = async () => {
    await api.post('/api/logout');
    setUser(null);
    setCachedUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
