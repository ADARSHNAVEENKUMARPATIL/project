import React, { useState } from 'react';
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Task {
  id: number;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: 'Check vitals for Room 204', priority: 'high', completed: false, createdAt: '2025-01-13T09:00:00Z' },
    { id: 2, description: 'Administer medication to Patient #12345', priority: 'medium', completed: true, createdAt: '2025-01-13T08:30:00Z' },
    { id: 3, description: 'Update patient chart for Room 207', priority: 'low', completed: false, createdAt: '2025-01-13T08:00:00Z' }
  ]);

  const [newTask, setNewTask] = useState({
    description: '',
    priority: 'medium' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.description.trim()) return;

    const task: Task = {
      id: Date.now(),
      description: newTask.description,
      priority: newTask.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ description: '', priority: 'medium' });
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Manage patient care tasks efficiently</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Task</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E.g., Administer medication to Room 203"
                required
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </button>
          </form>
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Pending Tasks</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingTasks.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending tasks</p>
              ) : (
                pendingTasks.map(task => (
                  <div key={task.id} className={`border rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">{task.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Created {new Date(task.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Mark as complete"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete task"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Completed Tasks</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {completedTasks.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {completedTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No completed tasks</p>
              ) : (
                completedTasks.map(task => (
                  <div key={task.id} className="border rounded-lg p-4 bg-gray-50 border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <p className="font-medium text-gray-600 line-through">{task.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span>Completed</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Mark as pending"
                        >
                          <Clock className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete task"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}