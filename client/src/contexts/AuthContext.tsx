import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { apiRequest } from '../lib/queryClient';

export type UserRole = 'super-admin' | 'doctor' | 'nurse' | 'patient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  specialty?: string; // For doctors
  department?: string; // For nurses
  patientId?: string; // For patients
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - In a real app, this would be in a backend
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@medora.com',
    password: 'admin123',
    name: 'System Administrator',
    role: 'super-admin'
  },
  {
    id: '2',
    email: 'dr.smith@medora.com',
    password: 'doctor123',
    name: 'Dr. Smith',
    role: 'doctor',
    specialty: 'Cardiology'
  },
  {
    id: '3',
    email: 'nurse.johnson@medora.com',
    password: 'nurse123',
    name: 'Nurse Johnson',
    role: 'nurse',
    department: 'Emergency'
  },
  {
    id: '4',
    email: 'john.doe@medora.com',
    password: 'patient123',
    name: 'John Doe',
    role: 'patient',
    patientId: 'P001'
  }
];

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('medora_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid credentials for the selected role');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medora_user');
    toast.success('Logged out successfully');
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      toast.error('User with this email already exists');
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('medora_user', JSON.stringify(userWithoutPassword));
    toast.success('Account created successfully!');
    setIsLoading(false);
    return true;
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