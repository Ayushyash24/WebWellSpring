import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  role: 'student' | 'counsellor';
  email: string;
  name: string;
  anonymousId?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'counsellor') => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: 'student' | 'counsellor',
    extraData?: Record<string, any>
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const generateId = () => `user_${Math.random().toString(36).substr(2, 9)}`;
const generateAnonymousId = () => `anonymous_${Math.random().toString(36).substr(2, 9)}`;

// localStorage helpers
const getUsers = (): Record<string, any> => {
  try { return JSON.parse(localStorage.getItem('ws_users') || '{}'); } catch { return {}; }
};
const saveUsers = (users: Record<string, any>) => {
  localStorage.setItem('ws_users', JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ws_current_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'counsellor') => {
    const users = getUsers();
    const found = Object.values(users).find(
      (u: any) => u.email === email && u.password === password
    ) as any;

    if (!found) throw new Error('Invalid email or password. Please try again.');
    if (found.role !== role)
      throw new Error(`This account is a ${found.role} account. Please use the correct portal.`);

    const { password: _p, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('ws_current_user', JSON.stringify(safeUser));
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: 'student' | 'counsellor',
    extraData?: Record<string, any>
  ) => {
    const users = getUsers();
    const existing = Object.values(users).find((u: any) => u.email === email);
    if (existing) throw new Error('An account with this email already exists.');

    const id = generateId();
    const newUser: any = {
      id,
      role,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      ...(role === 'student' && { anonymousId: generateAnonymousId() }),
      ...extraData,
    };

    users[id] = newUser;
    saveUsers(users);

    const { password: _p, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('ws_current_user', JSON.stringify(safeUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('ws_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading WellSpring...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
