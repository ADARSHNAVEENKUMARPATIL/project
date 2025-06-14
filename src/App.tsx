import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import NurseDashboard from './pages/dashboards/NurseDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorAvailability from './pages/DoctorAvailability';
import NurseAssignment from './pages/NurseAssignment';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard/super-admin" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/doctor" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/nurse" element={
            <ProtectedRoute allowedRoles={['nurse']}>
              <NurseDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/patient" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          
          {/* Feature Routes */}
          <Route path="/doctor-availability" element={
            <ProtectedRoute allowedRoles={['doctor', 'nurse', 'super-admin']}>
              <DoctorAvailability />
            </ProtectedRoute>
          } />
          
          <Route path="/nurse-assignment" element={
            <ProtectedRoute allowedRoles={['nurse', 'super-admin']}>
              <NurseAssignment />
            </ProtectedRoute>
          } />
          
          <Route path="/tasks" element={
            <ProtectedRoute allowedRoles={['nurse', 'doctor']}>
              <TaskManager />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;