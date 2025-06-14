import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, Users, Activity, Settings } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Users', value: '1,247', icon: Users, color: 'blue' },
    { title: 'Active Sessions', value: '89', icon: Activity, color: 'green' },
    { title: 'System Health', value: '98%', icon: Shield, color: 'purple' },
    { title: 'Configurations', value: '156', icon: Settings, color: 'orange' }
  ];

  const quickActions = [
    { title: 'User Management', icon: Users, action: () => alert('User Management') },
    { title: 'System Settings', icon: Settings, action: () => alert('System Settings') },
    { title: 'Security Logs', icon: Shield, action: () => alert('Security Logs') },
    { title: 'Analytics', icon: Activity, action: () => alert('Analytics') }
  ];

  return (
    <DashboardLayout 
      title="Super Admin Dashboard"
      userRole="super-admin"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent System Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New doctor registered: Dr. Williams</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">System backup completed successfully</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Security update installed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Server Uptime</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database Status</span>
              <span className="font-semibold text-green-600">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Connections</span>
              <span className="font-semibold">234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Used</span>
              <span className="font-semibold">67%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}