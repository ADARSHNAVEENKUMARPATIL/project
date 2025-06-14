import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { apiRequest } from '../lib/queryClient';

export type UserRole = 'super-admin' | 'doctor' | 'nurse' | 'patient';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  specialty?: string | null; // For doctors
  department?: string | null; // For nurses
  patientId?: string | null; // For patients
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('medora_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('medora_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });

      if (response.user) {
        setUser(response.user);
        localStorage.setItem('medora_user', JSON.stringify(response.user));
        toast.success(`Welcome back, ${response.user.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials or role mismatch');
        return false;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medora_user');
    toast.success('Logged out successfully');
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.user) {
        setUser(response.user);
        localStorage.setItem('medora_user', JSON.stringify(response.user));
        toast.success('Account created successfully!');
        return true;
      } else {
        toast.error('Failed to create account');
        return false;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}