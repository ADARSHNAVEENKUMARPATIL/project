import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'wouter';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, Users, FileText, Video } from 'lucide-react';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const stats = [
    { title: "Today's Appointments", value: '8', icon: Calendar, color: 'blue' },
    { title: 'Active Patients', value: '156', icon: Users, color: 'green' },
    { title: 'Pending Reports', value: '12', icon: FileText, color: 'orange' },
    { title: 'Teleconsults', value: '3', icon: Video, color: 'purple' }
  ];

  const quickActions = [
    { title: 'View Schedule', icon: Calendar, action: () => alert('Opening Schedule') },
    { title: 'Patient Records', icon: FileText, action: () => alert('Opening Patient Records') },
    { title: 'Telemedicine', icon: Video, action: () => alert('Starting Telemedicine') },
    { title: 'Availability', icon: Users, action: () => setLocation('/doctor-availability') }
  ];

  return (
    <DashboardLayout 
      title={`Dr. ${user?.name} Dashboard`}
      userRole="doctor"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Appointments</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 AM', patient: 'John Doe', type: 'Consultation' },
              { time: '10:30 AM', patient: 'Sarah Wilson', type: 'Follow-up' },
              { time: '02:00 PM', patient: 'Mike Brown', type: 'Check-up' },
              { time: '03:30 PM', patient: 'Emily Davis', type: 'Consultation' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{appointment.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Completed consultation with John Doe</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Updated prescription for Sarah Wilson</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Reviewed lab results for Mike Brown</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}