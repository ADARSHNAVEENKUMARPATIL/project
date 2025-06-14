import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, FileText, Pill, Download } from 'lucide-react';

export default function PatientDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'blue' },
    { title: 'Active Prescriptions', value: '3', icon: Pill, color: 'green' },
    { title: 'Medical Records', value: '12', icon: FileText, color: 'purple' },
    { title: 'Test Results', value: '5', icon: Download, color: 'orange' }
  ];

  const quickActions = [
    { title: 'Book Appointment', icon: Calendar, action: () => alert('Booking Appointment') },
    { title: 'View Prescriptions', icon: Pill, action: () => alert('Viewing Prescriptions') },
    { title: 'Medical Records', icon: FileText, action: () => alert('Viewing Medical Records') },
    { title: 'Teleconsult', icon: Download, action: () => alert('Starting Teleconsult') }
  ];

  return (
    <DashboardLayout 
      title={`Welcome, ${user?.name}`}
      userRole="patient"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {[
              { date: 'June 15, 2025', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Cardiology' },
              { date: 'June 22, 2025', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'General' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Prescriptions</h3>
          <div className="space-y-3">
            {[
              { medicine: 'Lisinopril 10mg', doctor: 'Dr. Smith', date: 'June 10, 2025' },
              { medicine: 'Metformin 500mg', doctor: 'Dr. Johnson', date: 'May 15, 2025' },
              { medicine: 'Atorvastatin 20mg', doctor: 'Dr. Smith', date: 'April 20, 2025' }
            ].map((prescription, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{prescription.medicine}</p>
                  <p className="text-sm text-gray-600">Prescribed by {prescription.doctor}</p>
                </div>
                <span className="text-sm text-gray-600">{prescription.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}