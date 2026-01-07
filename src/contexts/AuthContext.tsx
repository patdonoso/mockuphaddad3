import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('haddad_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in production, this would call an API
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check stored users
      const users = JSON.parse(localStorage.getItem('haddad_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
        setUser(userData);
        localStorage.setItem('haddad_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem('haddad_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }
      
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
      };
      
      users.push(newUser);
      localStorage.setItem('haddad_users', JSON.stringify(users));
      
      const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userData);
      localStorage.setItem('haddad_user', JSON.stringify(userData));
      
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('haddad_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
