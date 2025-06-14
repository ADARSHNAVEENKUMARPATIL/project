import React, { useState } from 'react';
import { UserCheck, Clock, Trash2 } from 'lucide-react';

export default function NurseAssignment() {
  const [assignments, setAssignments] = useState([
    { id: 1, doctor: 'Dr. Smith', nurse: 'Nurse Johnson', shift: 'morning', status: 'active' },
    { id: 2, doctor: 'Dr. Williams', nurse: 'Nurse Brown', shift: 'afternoon', status: 'active' }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    doctor: '',
    nurse: '',
    shift: 'morning'
  });

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
  const nurses = ['Nurse Johnson', 'Nurse Smith', 'Nurse Brown', 'Nurse Davis'];
  const shifts = [
    { value: 'morning', label: 'Morning (7AM - 3PM)' },
    { value: 'afternoon', label: 'Afternoon (3PM - 11PM)' },
    { value: 'night', label: 'Night (11PM - 7AM)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.doctor || !newAssignment.nurse) return;

    const assignment = {
      id: Date.now(),
      doctor: newAssignment.doctor,
      nurse: newAssignment.nurse,
      shift: newAssignment.shift,
      status: 'active'
    };

    setAssignments(prev => [...prev, assignment]);
    setNewAssignment({ doctor: '', nurse: '', shift: 'morning' });
  };

  const deleteAssignment = (id: number) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nurse-Doctor Assignment</h1>
          <p className="text-gray-600">Assign nurses to assist doctors</p>
        </div>

        {/* Assignment Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Assignment</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor
              </label>
              <select
                value={newAssignment.doctor}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, doctor: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select Doctor --</option>
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Nurse
              </label>
              <select
                value={newAssignment.nurse}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, nurse: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select Nurse --</option>
                {nurses.map(nurse => (
                  <option key={nurse} value={nurse}>{nurse}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift
              </label>
              <select
                value={newAssignment.shift}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, shift: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {shifts.map(shift => (
                  <option key={shift.value} value={shift.value}>{shift.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Assign Nurse
              </button>
            </div>
          </form>
        </div>

        {/* Current Assignments */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Current Assignments</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {assignments.length} Active
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nurse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shift
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{assignment.doctor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.nurse}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {shifts.find(s => s.value === assignment.shift)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
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