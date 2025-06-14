import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Shield, Stethoscope, Heart, User, Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const roleIcons = {
  'super-admin': Shield,
  'doctor': Stethoscope,
  'nurse': Heart,
  'patient': User
};

const roleNames = {
  'super-admin': 'Super Admin',
  'doctor': 'Doctor',
  'nurse': 'Nurse',
  'patient': 'Patient'
};

export default function LoginPage() {
  const { role } = useParams<{ role: string }>();
  const { login, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // Validate role parameter
  if (!role || !Object.keys(roleIcons).includes(role)) {
    return <Navigate to="/" replace />;
  }

  const userRole = role as UserRole;
  const IconComponent = roleIcons[userRole];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await login(formData.email, formData.password, userRole);
    
    if (success) {
      // Navigation will be handled by the redirect above
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-emerald-700 text-white flex items-center justify-center">
      <div className="bg-white/90 text-teal-900 rounded-xl p-10 shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
            <IconComponent className="h-10 w-10 text-teal-700" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">
            {roleNames[userRole]} Login
          </h1>
          <p className="text-teal-700">Enter your credentials to access the dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-800 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/signup"
              className="font-medium text-teal-700 hover:text-teal-600 transition-colors"
            >
              Create new account
            </Link>
            <a href="#" className="font-medium text-teal-700 hover:text-teal-600 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-700 text-white py-3 px-4 rounded-lg hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-teal-700 hover:text-teal-900 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}