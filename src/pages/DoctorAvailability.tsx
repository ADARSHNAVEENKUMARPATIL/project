import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, User, Check, X } from 'lucide-react';

export default function DoctorAvailability() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailableTime, setUnavailableTime] = useState({ from: '', to: '' });
  const [note, setNote] = useState('');

  const doctors = [
    { id: '1', name: 'Dr. Smith', specialty: 'Cardiology', status: 'available', lastUpdate: '2 hours ago' },
    { id: '2', name: 'Dr. Johnson', specialty: 'Pediatrics', status: 'unavailable', lastUpdate: '30 minutes ago' },
    { id: '3', name: 'Dr. Williams', specialty: 'Neurology', status: 'available', lastUpdate: '1 hour ago' },
    { id: '4', name: 'Dr. Brown', specialty: 'Orthopedics', status: 'available', lastUpdate: '15 minutes ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Availability</h1>
          <p className="text-gray-600">Manage and view doctor availability status</p>
        </div>

        {/* Doctor Controls (if user is doctor) */}
        {user?.role === 'doctor' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Update Your Availability</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Status */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Current Status</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAvailable ? (
                    <><Check className="h-4 w-4 mr-1" /> Available</>
                  ) : (
                    <><X className="h-4 w-4 mr-1" /> Unavailable</>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setIsAvailable(true)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Set Available
                  </button>
                  <button
                    onClick={() => setIsAvailable(false)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Set Unavailable
                  </button>
                </div>
              </div>

              {/* Temporary Unavailable */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Set Temporary Unavailable</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="time"
                      value={unavailableTime.from}
                      onChange={(e) => setUnavailableTime(prev => ({ ...prev, from: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="time"
                      value={unavailableTime.to}
                      onChange={(e) => setUnavailableTime(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Set Temporary
                  </button>
                </div>
              </div>

              {/* Availability Note */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Availability Note</h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="Add note about your availability (optional)"
                />
                <button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Availability Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Doctor Availability Status</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.status === 'available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.status === 'available' ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctor.lastUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Message
                      </button>
                      {user?.role === 'nurse' && (
                        <button className="text-green-600 hover:text-green-900">
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}