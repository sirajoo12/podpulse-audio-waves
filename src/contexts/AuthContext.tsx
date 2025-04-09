
import React, { createContext, useState, useContext, useEffect } from 'react';

// Mock user type - would be replaced with Supabase auth in a real app
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'listener' | 'creator' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes - in a real app, this would come from Supabase auth
const MOCK_USER: User = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@podpulse.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  role: 'creator'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for user session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('podpulse-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async () => {
    // Simulate login with a mock user
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser(MOCK_USER);
    localStorage.setItem('podpulse-user', JSON.stringify(MOCK_USER));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    localStorage.removeItem('podpulse-user');
    setIsLoading(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
