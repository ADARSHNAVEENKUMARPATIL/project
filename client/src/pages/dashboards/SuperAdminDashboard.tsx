import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, Users, Activity, Settings, UserPlus, Database, Bell, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    { id: 1, name: 'Dr. Smith', email: 'smith@hospital.com', role: 'Doctor', status: 'active', lastLogin: '2025-06-14 08:30' },
    { id: 2, name: 'Nurse Johnson', email: 'johnson@hospital.com', role: 'Nurse', status: 'active', lastLogin: '2025-06-14 07:45' },
    { id: 3, name: 'Patient Doe', email: 'doe@email.com', role: 'Patient', status: 'active', lastLogin: '2025-06-13 19:20' },
    { id: 4, name: 'Dr. Williams', email: 'williams@hospital.com', role: 'Doctor', status: 'inactive', lastLogin: '2025-06-10 16:15' }
  ]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  const stats = [
    { title: 'Total Users', value: systemUsers.length.toString(), icon: Users, color: 'blue' },
    { title: 'Active Sessions', value: systemUsers.filter(u => u.status === 'active').length.toString(), icon: Activity, color: 'green' },
    { title: 'System Health', value: '98%', icon: Shield, color: 'purple' },
    { title: 'Configurations', value: '156', icon: Settings, color: 'orange' }
  ];

  const quickActions = [
    { title: 'User Management', icon: Users, action: () => setShowUserModal(true) },
    { title: 'System Settings', icon: Settings, action: () => setShowSettingsModal(true) },
    { title: 'Security Logs', icon: Shield, action: () => viewSecurityLogs() },
    { title: 'Analytics', icon: BarChart3, action: () => setShowAnalyticsModal(true) }
  ];

  const viewSecurityLogs = () => {
    alert('Security Logs:\n\n• 2025-06-14 08:45 - Successful login: Dr. Smith\n• 2025-06-14 08:30 - Failed login attempt from unknown IP\n• 2025-06-14 07:45 - Successful login: Nurse Johnson\n• 2025-06-13 23:30 - System backup completed\n• 2025-06-13 19:20 - Successful login: Patient Doe');
  };

  const toggleUserStatus = (userId: number) => {
    setSystemUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  return (
    <DashboardLayout 
      title="Super Admin Dashboard"
      userRole="super-admin"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent System Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">New doctor registered: Dr. Williams</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">System backup completed successfully</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Security update installed</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">System Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Server Uptime</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Database Status</span>
              <span className="font-semibold text-green-600">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Active Connections</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Storage Used</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">67%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">User Management</h3>
            <div className="space-y-3">
              {systemUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email} | {user.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last login: {user.lastLogin}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {user.status}
                    </span>
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Add New User
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Automatic Backups</span>
                <button className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                <button className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Two-Factor Auth</span>
                <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Maintenance Mode</span>
                <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert('Settings saved successfully!');
                  setShowSettingsModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAnalyticsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">System Analytics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Daily Logins</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">127</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">Appointments</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">89</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-600 dark:text-purple-400">New Patients</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">23</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-600 dark:text-orange-400">System Load</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">67%</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Usage Trends</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Peak usage: 10:00 AM - 2:00 PM</p>
                  <p>• Most active day: Tuesday</p>
                  <p>• Average session duration: 45 minutes</p>
                  <p>• Mobile usage: 35% of total</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowAnalyticsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">User Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedUser.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                <p className={selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                  {selectedUser.status}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Login</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedUser.lastLogin}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  toggleUserStatus(selectedUser.id);
                  setSelectedUser(null);
                }}
                className={`px-4 py-2 text-white rounded hover:opacity-80 ${
                  selectedUser.status === 'active' ? 'bg-red-600' : 'bg-green-600'
                }`}
              >
                {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}