import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = {
  client: {
    id: 1,
    name: 'Mario Rossi',
    role: 'client',
    email: 'mario@ristorante.it',
    clientId: 1,
    avatar: '👤'
  },
  team: {
    id: 2,
    name: 'Maria Bianchi',
    role: 'team',
    email: 'maria@meraviglia.it',
    avatar: '👩‍💼'
  },
  boss: {
    id: 3,
    name: 'Luca Verdi',
    role: 'boss',
    email: 'luca@meraviglia.it',
    avatar: '👨‍💼'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('demoRole');
    if (savedRole && MOCK_USERS[savedRole]) {
      setUser(MOCK_USERS[savedRole]);
    }
  }, []);

  const login = (role) => {
    if (MOCK_USERS[role]) {
      setUser(MOCK_USERS[role]);
      localStorage.setItem('demoRole', role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoRole');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
