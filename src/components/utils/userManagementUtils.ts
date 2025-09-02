import { User } from '../types';

export const getRoleColor = (role: string) => {
  const colors = {
    student: 'bg-blue-100 text-blue-800',
    faculty: 'bg-green-100 text-green-800',
    outreach: 'bg-purple-100 text-purple-800',
    operations: 'bg-orange-100 text-orange-800',
    admin: 'bg-red-100 text-red-800'
  };
  return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'success-light';
    case 'inactive': return 'info-light';
    case 'suspended': return 'error-light';
    case 'pending': return 'warning-light';
    default: return 'info-light';
  }
};

export const filterUsers = (
  users: User[], 
  searchTerm: string, 
  filterRole: string, 
  filterStatus: string
) => {
  return users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });
};

export const updateUserStatus = (users: User[], userId: number, newStatus: User['status']) => {
  return users.map(user => 
    user.id === userId ? { ...user, status: newStatus } : user
  );
};

export const deleteUser = (users: User[], userId: number) => {
  return users.filter(user => user.id !== userId);
};

export const getUserStats = (users: User[]) => {
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    byRole: {
      student: users.filter(u => u.role === 'student').length,
      faculty: users.filter(u => u.role === 'faculty').length,
      outreach: users.filter(u => u.role === 'outreach').length,
      operations: users.filter(u => u.role === 'operations').length,
      admin: users.filter(u => u.role === 'admin').length
    }
  };
  return stats;
};

export const validateUser = (user: Partial<User>) => {
  const errors: string[] = [];
  
  if (!user.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!user.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Invalid email format');
  }
  
  if (!user.role) {
    errors.push('Role is required');
  }
  
  if (!user.department?.trim()) {
    errors.push('Department is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateUserReport = (users: User[]) => {
  const stats = getUserStats(users);
  const reportData = {
    generatedAt: new Date().toISOString(),
    totalUsers: stats.total,
    activeUsers: stats.active,
    usersByRole: stats.byRole,
    recentRegistrations: users
      .filter(u => {
        const joinDate = new Date(u.joinDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return joinDate > thirtyDaysAgo;
      })
      .length,
    profileCompletionAverage: Math.round(
      users.reduce((sum, u) => sum + u.profileCompleted, 0) / users.length
    )
  };
  
  return reportData;
};