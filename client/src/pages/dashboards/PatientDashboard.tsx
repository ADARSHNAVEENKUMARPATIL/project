import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, FileText, Pill, Download, Phone, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: 'June 15, 2025', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Cardiology', status: 'upcoming' },
    { id: 2, date: 'June 22, 2025', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'General', status: 'upcoming' }
  ]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPrescriptionsModal, setShowPrescriptionsModal] = useState(false);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const stats = [
    { title: 'Upcoming Appointments', value: appointments.filter(a => a.status === 'upcoming').length.toString(), icon: Calendar, color: 'blue' },
    { title: 'Active Prescriptions', value: '3', icon: Pill, color: 'green' },
    { title: 'Medical Records', value: '12', icon: FileText, color: 'purple' },
    { title: 'Test Results', value: '5', icon: Download, color: 'orange' }
  ];

  const quickActions = [
    { title: 'Book Appointment', icon: Calendar, action: () => setShowBookingModal(true) },
    { title: 'View Prescriptions', icon: Pill, action: () => setShowPrescriptionsModal(true) },
    { title: 'Medical Records', icon: FileText, action: () => setShowRecordsModal(true) },
    { title: 'Teleconsult', icon: Phone, action: () => startTeleconsult() }
  ];

  const startTeleconsult = () => {
    const confirmed = confirm('Start a teleconsultation session? You will be connected with the next available doctor.');
    if (confirmed) {
      alert('Connecting you to Dr. Williams for a teleconsultation...');
    }
  };

  return (
    <DashboardLayout 
      title={`Welcome, ${user?.name}`}
      userRole="patient"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {appointments.filter(a => a.status === 'upcoming').map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                   onClick={() => setSelectedAppointment(appointment)}>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{appointment.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800">
                      Join Call
                    </button>
                    <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Prescriptions</h3>
          <div className="space-y-3">
            {[
              { medicine: 'Lisinopril 10mg', doctor: 'Dr. Smith', date: 'June 10, 2025', status: 'Active' },
              { medicine: 'Metformin 500mg', doctor: 'Dr. Johnson', date: 'May 15, 2025', status: 'Active' },
              { medicine: 'Atorvastatin 20mg', doctor: 'Dr. Smith', date: 'April 20, 2025', status: 'Expired' }
            ].map((prescription, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{prescription.medicine}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed by {prescription.doctor}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{prescription.date}</span>
                  <span className={`block text-xs px-2 py-1 rounded mt-1 ${
                    prescription.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                    'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                  }`}>
                    {prescription.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Book New Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Department</label>
                <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>Cardiology</option>
                  <option>General Medicine</option>
                  <option>Dermatology</option>
                  <option>Orthopedics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Preferred Doctor</label>
                <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>Dr. Smith (Cardiology)</option>
                  <option>Dr. Johnson (General)</option>
                  <option>Dr. Williams (Dermatology)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Preferred Date</label>
                <input type="date" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Reason for Visit</label>
                <textarea placeholder="Brief description of your concern..." className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" rows={3}></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Appointment request submitted! You will receive confirmation within 24 hours.');
                  setShowBookingModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrescriptionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">All Prescriptions</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                { medicine: 'Lisinopril 10mg', doctor: 'Dr. Smith', date: 'June 10, 2025', status: 'Active', instructions: 'Take once daily with food' },
                { medicine: 'Metformin 500mg', doctor: 'Dr. Johnson', date: 'May 15, 2025', status: 'Active', instructions: 'Take twice daily with meals' },
                { medicine: 'Atorvastatin 20mg', doctor: 'Dr. Smith', date: 'April 20, 2025', status: 'Expired', instructions: 'Take once daily at bedtime' },
                { medicine: 'Aspirin 81mg', doctor: 'Dr. Smith', date: 'March 15, 2025', status: 'Active', instructions: 'Take once daily with breakfast' }
              ].map((prescription, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{prescription.medicine}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed by {prescription.doctor}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      prescription.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                      'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                    }`}>
                      {prescription.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.instructions}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{prescription.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowPrescriptionsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecordsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Medical Records</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[
                { type: 'Lab Results', date: 'June 12, 2025', doctor: 'Dr. Smith', description: 'Blood work - Cholesterol panel' },
                { type: 'Imaging', date: 'May 28, 2025', doctor: 'Dr. Johnson', description: 'Chest X-ray - Normal' },
                { type: 'Visit Notes', date: 'May 15, 2025', doctor: 'Dr. Johnson', description: 'Annual physical examination' },
                { type: 'Lab Results', date: 'April 20, 2025', doctor: 'Dr. Smith', description: 'Lipid profile - Follow-up' }
              ].map((record, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{record.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{record.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">By {record.doctor}</p>
                    </div>
                    <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                      Download
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{record.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowRecordsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
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
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Doctor</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.doctor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date & Time</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedAppointment.date} at {selectedAppointment.time}</p>
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
                  alert('Joining teleconsultation...');
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Join Call
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}