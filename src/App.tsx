import React, { useState } from 'react';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import OutreachDashboard from './components/OutreachDashboard';
import OperationsDashboard from './components/OperationsDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import { NavigationProvider, NavigatedPage } from './components/navigation/NavigationProvider';
import AuthenticationSystem from './components/auth/AuthenticationSystem';

type UserRole = 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';

interface AuthenticatedUser {
  email: string;
  role: UserRole;
  name: string;
  department: string;
  verified: boolean;
}

function DashboardWithNavigation({ 
  user, 
  onLogout 
}: { 
  user: AuthenticatedUser; 
  onLogout: () => void;
}) {
  // Render role-specific dashboard wrapped with navigation
  const renderDashboard = () => {
    // Pass user data and logout function to each dashboard
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} onLogout={onLogout} />;
      case 'faculty':
        return <FacultyDashboard user={user} onLogout={onLogout} />;
      case 'outreach':
        return <OutreachDashboard user={user} onLogout={onLogout} />;
      case 'operations':
        return <OperationsDashboard user={user} onLogout={onLogout} />;
      case 'admin':
        return <SuperAdminDashboard user={user} onLogout={onLogout} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-4">Your role is not recognized in the system.</p>
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Return to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background">
        {renderDashboard()}
      </div>
    </NavigationProvider>
  );
}

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);

  const handleAuthentication = (user: AuthenticatedUser) => {
    // Set the authenticated user - role is determined during authentication
    setAuthenticatedUser(user);
  };

  const handleLogout = () => {
    // Clear authentication and return to login screen
    setAuthenticatedUser(null);
  };

  // Show authentication screen if no user is authenticated
  if (!authenticatedUser) {
    return <AuthenticationSystem onAuthenticated={handleAuthentication} />;
  }

  // Show authenticated user's dashboard directly
  return (
    <div className="unified-theme">
      <DashboardWithNavigation 
        user={authenticatedUser}
        onLogout={handleLogout}
      />
    </div>
  );
}