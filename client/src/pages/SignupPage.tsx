import { useState } from 'react';
import { Link, Redirect } from 'wouter';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SignupPage() {
  const { signup, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as UserRole,
    specialty: '',
    department: '',
    patientId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Redirect to={`/dashboard/${user.role}`} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    const userData: any = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    // Add role-specific fields
    if (formData.role === 'doctor' && formData.specialty) {
      userData.specialty = formData.specialty;
    }
    if (formData.role === 'nurse' && formData.department) {
      userData.department = formData.department;
    }
    if (formData.role === 'patient' && formData.patientId) {
      userData.patientId = formData.patientId;
    }

    const success = await signup(userData);
    if (success) {
      // Navigation will be handled by the redirect above
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-emerald-700 text-white flex items-center justify-center py-8">
      <div className="bg-white/90 text-teal-900 rounded-xl p-10 shadow-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
            <UserPlus className="h-10 w-10 text-teal-700" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Create Account</h1>
          <p className="text-teal-700">Join the MEDORA healthcare network</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-teal-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-teal-800 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
              >
                <option value="patient">Patient</option>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </div>
          </div>

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

          {/* Role-specific fields */}
          {formData.role === 'doctor' && (
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-teal-800 mb-1">
                Specialty
              </label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                placeholder="e.g., Cardiology, Pediatrics"
              />
            </div>
          )}

          {formData.role === 'nurse' && (
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-teal-800 mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                placeholder="e.g., Emergency, ICU"
              />
            </div>
          )}

          {formData.role === 'patient' && (
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-teal-800 mb-1">
                Patient ID (Optional)
              </label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                placeholder="e.g., P001"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Create password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-800 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300 pr-12"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-700 text-white py-3 px-4 rounded-lg hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-teal-700 hover:text-teal-900 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}