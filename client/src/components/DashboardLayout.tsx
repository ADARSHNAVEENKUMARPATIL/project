import React, { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  Stethoscope, 
  Heart, 
  User,
  Calendar,
  Users,
  Clipboard,
  Settings
} from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface QuickAction {
  title: string;
  icon: React.ElementType;
  action: () => void;
}

interface DashboardLayoutProps {
  title: string;
  userRole: UserRole;
  stats: Stat[];
  quickActions: QuickAction[];
  children: React.ReactNode;
}

const roleIcons = {
  'super-admin': Shield,
  'doctor': Stethoscope,
  'nurse': Heart,
  'patient': User
};

const roleColors = {
  'super-admin': 'purple',
  'doctor': 'blue',
  'nurse': 'green',
  'patient': 'orange'
};

const navigationItems = {
  'super-admin': [
    { name: 'Dashboard', icon: Home, href: '/dashboard/super-admin' },
    { name: 'User Management', icon: Users, href: '#' },
    { name: 'System Settings', icon: Settings, href: '#' }
  ],
  'doctor': [
    { name: 'Dashboard', icon: Home, href: '/dashboard/doctor' },
    { name: 'Appointments', icon: Calendar, href: '#' },
    { name: 'Availability', icon: Users, href: '/doctor-availability' }
  ],
  'nurse': [
    { name: 'Dashboard', icon: Home, href: '/dashboard/nurse' },
    { name: 'Tasks', icon: Clipboard, href: '/tasks' },
    { name: 'Assignments', icon: Users, href: '/nurse-assignment' }
  ],
  'patient': [
    { name: 'Dashboard', icon: Home, href: '/dashboard/patient' },
    { name: 'Appointments', icon: Calendar, href: '#' },
    { name: 'Records', icon: Users, href: '#' }
  ]
};

export default function DashboardLayout({ title, userRole, stats, quickActions, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const RoleIcon = roleIcons[userRole];
  const roleColor = roleColors[userRole];
  const navItems = navigationItems[userRole];

  const handleLogout = () => {
    logout();
  };

  const getColorClasses = (color: string) => {
    const classes = {
      purple: 'border-purple-500 text-purple-600',
      blue: 'border-blue-500 text-blue-600',
      green: 'border-green-500 text-green-600',
      orange: 'border-orange-500 text-orange-600',
      red: 'border-red-500 text-red-600'
    };
    return classes[color as keyof typeof classes] || classes.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <RoleIcon className={`h-8 w-8 text-${roleColor}-600`} />
            <span className="text-xl font-bold text-gray-800">MEDORA</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full bg-${roleColor}-100 flex items-center justify-center`}>
              <span className={`font-semibold text-${roleColor}-600`}>
                {user?.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-600 capitalize">{userRole.replace('-', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Message */}
          <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-${roleColor}-500`}>
            <h2 className={`text-xl font-semibold text-${roleColor}-600 mb-2`}>
              Welcome back, {user?.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Here's an overview of your dashboard for today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`bg-white p-6 rounded-lg shadow-sm border-t-4 ${getColorClasses(stat.color)} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                    </div>
                    <IconComponent className={`h-8 w-8 text-${stat.color}-400`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
                  >
                    <IconComponent className={`h-8 w-8 text-${roleColor}-600 mx-auto mb-2`} />
                    <p className="text-sm font-medium text-gray-800">{action.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Content */}
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}