import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'wouter';
import DashboardLayout from '../../components/DashboardLayout';
import { Clipboard, Heart, Pill, UserCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: number;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'In Progress';
  patient?: string;
  room?: string;
}

export default function NurseDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, task: 'Check vitals', priority: 'High', status: 'Pending', patient: 'John Doe', room: '204' },
    { id: 2, task: 'Administer medication', priority: 'Medium', status: 'Completed', patient: 'Sarah Wilson', room: '207' },
    { id: 3, task: 'Update patient chart', priority: 'Low', status: 'Pending', patient: 'Mike Brown', room: '203' },
    { id: 4, task: 'Assist with procedure', priority: 'High', status: 'In Progress', patient: 'Emily Davis', room: 'OR 1' }
  ]);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const stats = [
    { title: 'Pending Tasks', value: tasks.filter(t => t.status === 'Pending').length.toString(), icon: Clipboard, color: 'blue' },
    { title: 'Patients Assigned', value: '23', icon: UserCheck, color: 'green' },
    { title: 'Medications Due', value: '5', icon: Pill, color: 'orange' },
    { title: 'Vitals Recorded', value: '18', icon: Heart, color: 'red' }
  ];

  const quickActions = [
    { title: 'Daily Tasks', icon: Clipboard, action: () => setLocation('/tasks') },
    { title: 'Record Vitals', icon: Heart, action: () => setShowVitalsModal(true) },
    { title: 'Medication Admin', icon: Pill, action: () => setShowMedicationModal(true) },
    { title: 'Doctor Assist', icon: UserCheck, action: () => setLocation('/nurse-assignment') }
  ];

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <DashboardLayout 
      title={`Nurse ${user?.name} Dashboard`}
      userRole="nurse"
      stats={stats}
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                   onClick={() => setSelectedTask(task)}>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{task.task} - Room {task.room}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patient: {task.patient} | Priority: {task.priority}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    task.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    task.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}>
                    {task.status}
                  </span>
                  {task.status !== 'Completed' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTaskStatus(task.id, task.status === 'Pending' ? 'In Progress' : 'Completed');
                      }}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      {task.status === 'Pending' ? 'Start' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Patient Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Critical Patients</span>
              <span className="font-semibold text-red-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Stable Patients</span>
              <span className="font-semibold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Discharge Ready</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">New Admissions</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showVitalsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Record Vitals</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Patient</label>
                <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>John Doe - Room 204</option>
                  <option>Sarah Wilson - Room 207</option>
                  <option>Mike Brown - Room 203</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Blood Pressure</label>
                  <input type="text" placeholder="120/80" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Heart Rate</label>
                  <input type="text" placeholder="72 bpm" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Temperature</label>
                  <input type="text" placeholder="98.6°F" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Oxygen Sat</label>
                  <input type="text" placeholder="98%" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowVitalsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Vitals recorded successfully!');
                  setShowVitalsModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Record Vitals
              </button>
            </div>
          </div>
        </div>
      )}

      {showMedicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Medication Administration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Patient</label>
                <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>Sarah Wilson - Room 207</option>
                  <option>John Doe - Room 204</option>
                  <option>Mike Brown - Room 203</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Medication</label>
                <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>Lisinopril 10mg</option>
                  <option>Metformin 500mg</option>
                  <option>Aspirin 81mg</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Dosage Time</label>
                <input type="time" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Notes</label>
                <textarea placeholder="Patient response, side effects, etc." className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" rows={3}></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowMedicationModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Medication administered and logged!');
                  setShowMedicationModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Administer & Log
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Task Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Task</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedTask.task}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Patient</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedTask.patient}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Room</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedTask.room}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</label>
                <p className={`${selectedTask.priority === 'High' ? 'text-red-600' : selectedTask.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
                  {selectedTask.priority}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                <p className="text-gray-900 dark:text-gray-100">{selectedTask.status}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Close
              </button>
              {selectedTask.status !== 'Completed' && (
                <button 
                  onClick={() => {
                    const newStatus = selectedTask.status === 'Pending' ? 'In Progress' : 'Completed';
                    updateTaskStatus(selectedTask.id, newStatus);
                    setSelectedTask(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {selectedTask.status === 'Pending' ? 'Start Task' : 'Complete Task'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}