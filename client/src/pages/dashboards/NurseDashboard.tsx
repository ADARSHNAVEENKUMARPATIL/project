import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Clipboard, Heart, Pill, UserCheck } from 'lucide-react';

export default function NurseDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Pending Tasks', value: '7', icon: Clipboard, color: 'blue' },
    { title: 'Patients Assigned', value: '23', icon: UserCheck, color: 'green' },
    { title: 'Medications Due', value: '5', icon: Pill, color: 'orange' },
    { title: 'Vitals Recorded', value: '18', icon: Heart, color: 'red' }
  ];

  const quickActions = [
    { title: 'Daily Tasks', icon: Clipboard, action: () => window.location.href = '/tasks' },
    { title: 'Record Vitals', icon: Heart, action: () => alert('Recording Vitals') },
    { title: 'Medication Admin', icon: Pill, action: () => alert('Medication Administration') },
    { title: 'Doctor Assist', icon: UserCheck, action: () => window.location.href = '/nurse-assignment' }
  ];

  return (
    <DashboardLayout 
      title={`Nurse ${user?.name} Dashboard`}
      userRole="nurse"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Check vitals - Room 204', priority: 'High', status: 'Pending' },
              { task: 'Administer medication - Room 207', priority: 'Medium', status: 'Completed' },
              { task: 'Update patient chart - Room 203', priority: 'Low', status: 'Pending' },
              { task: 'Assist with procedure - OR 1', priority: 'High', status: 'In Progress' }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{task.task}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Critical Patients</span>
              <span className="font-semibold text-red-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Stable Patients</span>
              <span className="font-semibold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Discharge Ready</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Admissions</span>
              <span className="font-semibold">4</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}