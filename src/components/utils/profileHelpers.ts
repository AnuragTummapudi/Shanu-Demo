// Helper function to safely parse name into first and last name
export const parseName = (fullName: string = '') => {
  const nameParts = fullName.trim().split(' ');
  return {
    firstName: nameParts[0] || 'Student',
    lastName: nameParts.slice(1).join(' ') || 'Name'
  };
};

// Helper function to safely get initials
export const getInitials = (fullName: string = '') => {
  const { firstName, lastName } = parseName(fullName);
  return `${firstName[0] || 'S'}${lastName[0] || 'N'}`;
};

// Helper function to format time
export const formatTime = (timestamp: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Helper function to get role-specific colors
export const getRoleColor = (role: string) => {
  const colors = {
    student: 'bg-blue-500',
    faculty: 'bg-emerald-500',
    outreach: 'bg-purple-500',
    operations: 'bg-orange-500',
    admin: 'bg-red-500'
  };
  return colors[role as keyof typeof colors] || 'bg-slate-500';
};

// Helper function to get role labels
export const getRoleLabel = (role: string) => {
  const labels = {
    student: 'Student',
    faculty: 'Faculty',
    outreach: 'Outreach',
    operations: 'Operations',
    admin: 'Admin'
  };
  return labels[role as keyof typeof labels] || role;
};

// Helper function to determine role from email
export const determineRoleFromEmail = (email: string) => {
  const emailLower = email.toLowerCase();
  
  if (emailLower.includes('admin')) return 'admin';
  if (emailLower.includes('dr.') || emailLower.includes('prof.')) return 'faculty';
  if (emailLower.includes('placement') || emailLower.includes('outreach')) return 'outreach';
  if (emailLower.includes('ops.') || emailLower.includes('coord.')) return 'operations';
  
  return 'student'; // Default role
};