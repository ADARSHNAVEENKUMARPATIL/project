import { Redirect } from 'wouter';
import { useAuth, UserRole } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}