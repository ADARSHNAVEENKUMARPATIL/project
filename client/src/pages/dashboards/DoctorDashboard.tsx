import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'wouter';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, Users, FileText, Video, Clock, MessageSquare, Activity } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  time: string;
  patient: string;
  type: string;
}

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const stats = [
    { title: "Today's Appointments", value: '8', icon: Calendar, color: 'blue' },
    { title: 'Active Patients', value: '156', icon: Users, color: 'green' },
    { title: 'Pending Reports', value: '12', icon: FileText, color: 'orange' },
    { title: 'Teleconsults', value: '3', icon: Video, color: 'purple' }
  ];

  const quickActions = [
    { title: 'View Schedule', icon: Calendar, action: () => setShowScheduleModal(true) },
    { title: 'Patient Records', icon: FileText, action: () => setShowPatientModal(true) },
    { title: 'Telemedicine', icon: Video, action: () => startTelehealth() },
    { title: 'Availability', icon: Users, action: () => setLocation('/doctor-availability') }
  ];

  const startTelehealth = () => {
    const confirmed = confirm('Start a new telemedicine session?');
    if (confirmed) {
      alert('Telemedicine session started! Patient will be notified.');
    }
  };

  return (
    <DashboardLayout 
      title={`Dr. ${user?.name} Dashboard`}
      userRole="doctor"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Today's Appointments</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', patient: 'John Doe', type: 'Consultation' },
              { time: '10:30 AM', patient: 'Sarah Wilson', type: 'Follow-up' },
              { time: '02:00 PM', patient: 'Mike Brown', type: 'Check-up' },
              { time: '03:30 PM', patient: 'Emily Davis', type: 'Consultation' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                   onClick={() => setSelectedAppointment(appointment)}>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{appointment.patient}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{appointment.time}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                      View
                    </button>
                    <button className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800">
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Completed consultation with John Doe</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Updated prescription for Sarah Wilson</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Reviewed lab results for Mike Brown</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Weekly Schedule</h3>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">{day}</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">9:00 AM - 5:00 PM</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button 
                onClick={() => setLocation('/doctor-availability')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {showPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Patient Records</h3>
            <div className="space-y-3">
              {[
                { name: 'John Doe', age: '45', condition: 'Hypertension', lastVisit: '2025-06-10' },
                { name: 'Sarah Wilson', age: '32', condition: 'Diabetes', lastVisit: '2025-06-08' },
                { name: 'Mike Brown', age: '58', condition: 'Heart Disease', lastVisit: '2025-06-05' }
              ].map((patient, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{patient.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Age: {patient.age} | {patient.condition}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last visit: {patient.lastVisit}</p>
                    </div>
                    <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowPatientModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Add New Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Patient</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.patient}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Time</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.time}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert(`Starting consultation with ${selectedAppointment.patient}`);
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}