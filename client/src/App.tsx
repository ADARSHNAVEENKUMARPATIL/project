import { Route, Switch, Redirect } from 'wouter';
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
        <Switch>
          {/* Public Routes */}
          <Route path="/" component={HomePage} />
          <Route path="/login/:role">
            {(params) => <LoginPage />}
          </Route>
          <Route path="/signup" component={SignupPage} />
          
          {/* Protected Routes */}
          <Route path="/dashboard/super-admin">
            <ProtectedRoute allowedRoles={['super-admin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          </Route>
          
          <Route path="/dashboard/doctor">
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          </Route>
          
          <Route path="/dashboard/nurse">
            <ProtectedRoute allowedRoles={['nurse']}>
              <NurseDashboard />
            </ProtectedRoute>
          </Route>
          
          <Route path="/dashboard/patient">
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          </Route>
          
          {/* Feature Routes */}
          <Route path="/doctor-availability">
            <ProtectedRoute allowedRoles={['doctor', 'nurse', 'super-admin']}>
              <DoctorAvailability />
            </ProtectedRoute>
          </Route>
          
          <Route path="/nurse-assignment">
            <ProtectedRoute allowedRoles={['nurse', 'super-admin']}>
              <NurseAssignment />
            </ProtectedRoute>
          </Route>
          
          <Route path="/tasks">
            <ProtectedRoute allowedRoles={['nurse', 'doctor']}>
              <TaskManager />
            </ProtectedRoute>
          </Route>
          
          {/* Fallback */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;