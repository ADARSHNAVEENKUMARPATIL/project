import { Link } from 'wouter';
import { Shield, Stethoscope, Heart, User } from 'lucide-react';

export default function HomePage() {
  const roles = [
    {
      title: 'Super Admin',
      icon: Shield,
      path: '/login/super-admin',
      description: 'System administration and oversight',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-700'
    },
    {
      title: 'Doctor',
      icon: Stethoscope,
      path: '/login/doctor',
      description: 'Patient care and medical services',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-700'
    },
    {
      title: 'Nurse',
      icon: Heart,
      path: '/login/nurse',
      description: 'Patient support and care coordination',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-700'
    },
    {
      title: 'Patient',
      icon: User,
      path: '/login/patient',
      description: 'Access medical records and appointments',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-emerald-700 text-white">
      {/* Header */}
      <header className="text-center p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold font-display mb-6 tracking-tight">
            Welcome to <span className="text-emerald-300">MEDORA</span>
          </h1>
          <p className="text-2xl font-light opacity-90 mb-10">
            Seamless Healthcare Management for Every Role
          </p>
        </div>
      </header>

      {/* Role Selection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 my-12 max-w-7xl mx-auto">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Link
              key={role.title}
              to={role.path}
              className="bg-white/90 text-teal-900 rounded-xl p-8 text-center shadow-2xl hover:shadow-teal-300/30 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`${role.bgColor} w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner`}>
                <IconComponent className={`h-8 w-8 ${role.iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold mb-3 font-display group-hover:text-teal-700 transition-colors">
                {role.title}
              </h2>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                {role.description}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Demo Credentials */}
      <section className="max-w-4xl mx-auto px-10 mb-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Demo Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="font-medium">Super Admin</p>
              <p>admin@medora.com</p>
              <p>admin123</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Doctor</p>
              <p>dr.smith@medora.com</p>
              <p>doctor123</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Nurse</p>
              <p>nurse.johnson@medora.com</p>
              <p>nurse123</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Patient</p>
              <p>john.doe@medora.com</p>
              <p>patient123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-8 mt-auto bg-teal-900/70 backdrop-blur-sm">
        <p className="text-sm opacity-80 tracking-wide">
          Built with ❤️ for Healthcare Management | <span className="font-semibold opacity-100">Team MEDORA</span>
        </p>
      </footer>
    </div>
  );
}