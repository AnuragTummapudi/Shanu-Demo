import { PageType } from './NavigationTypes';

export const getDefaultTitle = (page: PageType): string => {
  switch (page) {
    case 'dashboard': return 'Dashboard';
    case 'job-detail': return 'Job Details';
    case 'company-detail': return 'Company Details';
    case 'student-detail': return 'Student Profile';
    case 'profile-edit': return 'Edit Profile';
    case 'resume-builder': return 'Resume Builder';
    case 'resume-management': return 'Resume Management';
    case 'skills-management': return 'Skills Management';
    case 'interview-management': return 'Interview Management';
    case 'training-management': return 'Training Management';
    case 'document-management': return 'Document Management';
    case 'notification-center': return 'Notification Center';
    case 'assessment-system': return 'Assessment System';
    case 'training-session': return 'Training Session';
    case 'attendance-marking': return 'Mark Attendance';
    case 'report-generation': return 'Generate Reports';
    case 'user-management': return 'User Management';
    case 'faculty-profile': return 'Faculty Profile';
    case 'student-profile': return 'Student Profile';
    case 'operations-profile': return 'Operations Profile';
    case 'outreach-profile': return 'Outreach Profile';
    case 'super-admin-profile': return 'Super Admin Profile';
    case 'raise-ticket': return 'Support Ticket';
    case 'test-navigation': return 'Navigation Test';
    case 'applications-list': return 'Applications Management';
    case 'company-management': return 'Company Management';
    case 'interview-scheduler': return 'Interview Scheduler';
    case 'performance-analytics': return 'Performance Analytics';
    case 'application-detail': return 'Application Details';
    case 'application-edit': return 'Edit Application';
    case 'company-add': return 'Add Company';
    case 'company-analytics': return 'Company Analytics';
    case 'partnership-management': return 'Partnership Management';
    case 'settings': return 'Settings';
    case 'course-management': return 'Course Management';
    case 'course-add': return 'Add Course';
    case 'course-edit': return 'Edit Course';
    default: return 'Page';
  }
};

export const getQuickNavigationItems = (userRole: string) => {
  const commonItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'Home' },
    { label: 'Profile', href: '/profile', icon: 'User' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
    { label: 'Help', href: '/help', icon: 'HelpCircle' }
  ];

  const roleSpecificItems: Record<string, any[]> = {
    student: [
      { label: 'My Resume', href: '/resume-management', icon: 'FileText' },
      { label: 'Applications', href: '/applications', icon: 'Briefcase' },
      { label: 'Jobs', href: '/jobs', icon: 'Search' },
      { label: 'Training', href: '/training', icon: 'BookOpen' }
    ],
    faculty: [
      { label: 'Students', href: '/students', icon: 'Users' },
      { label: 'Interviews', href: '/interviews', icon: 'Calendar' },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' }
    ],
    operations: [
      { label: 'Job Management', href: '/jobs', icon: 'Briefcase' },
      { label: 'Company Management', href: '/companies', icon: 'Building' },
      { label: 'Applications', href: '/applications', icon: 'FileText' }
    ],
    outreach: [
      { label: 'Companies', href: '/companies', icon: 'Building' },
      { label: 'Partnerships', href: '/partnerships', icon: 'Handshake' },
      { label: 'Events', href: '/events', icon: 'Calendar' }
    ],
    admin: [
      { label: 'Users', href: '/users', icon: 'Users' },
      { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
      { label: 'System', href: '/system', icon: 'Settings' }
    ]
  };

  return [...(roleSpecificItems[userRole] || []), ...commonItems];
};

export const getNavigationPath = (currentPage: PageType, userRole: string): string[] => {
  const basePath = `/${userRole}-dashboard`;
  
  switch (currentPage) {
    case 'resume-management':
      return [basePath, '/resume-management'];
    case 'profile-edit':
      return [basePath, '/profile', '/profile-edit'];
    case 'applications-list':
      return [basePath, '/applications'];
    case 'application-detail':
      return [basePath, '/applications', '/application-detail'];
    case 'job-detail':
      return [basePath, '/jobs', '/job-detail'];
    default:
      return [basePath];
  }
};

export const isResumeAccessiblePage = (page: PageType): boolean => {
  const resumeAccessiblePages: PageType[] = [
    'dashboard',
    'applications-list', 
    'application-detail',
    'job-detail',
    'resume-management',
    'profile-edit'
  ];
  
  return resumeAccessiblePages.includes(page);
};