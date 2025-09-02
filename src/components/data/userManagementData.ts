import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Sumanth Reddy',
    email: 'sumanth.reddy@university.edu.in',
    role: 'student',
    department: 'Computer Science',
    status: 'active',
    lastLogin: '2025-01-15 09:30',
    joinDate: '2021-08-15',
    phone: '+91 9876543210',
    profileCompleted: 85,
    permissions: ['view_jobs', 'apply_jobs', 'view_training']
  },
  {
    id: 2,
    name: 'Dr. Lakshmi Narasimhan',
    email: 'lakshmi.narasimhan@university.edu.in',
    role: 'faculty',
    department: 'Computer Science',
    status: 'active',
    lastLogin: '2025-01-15 08:45',
    joinDate: '2015-06-01',
    phone: '+91 9876543100',
    profileCompleted: 100,
    permissions: ['manage_training', 'view_students', 'mark_attendance', 'generate_reports']
  },
  {
    id: 3,
    name: 'Kavitha Reddy',
    email: 'kavitha.reddy@university.edu.in',
    role: 'outreach',
    department: 'Placement Cell',
    status: 'active',
    lastLogin: '2025-01-15 10:15',
    joinDate: '2019-03-10',
    phone: '+91 9876543200',
    profileCompleted: 95,
    permissions: ['manage_companies', 'view_analytics', 'contact_companies', 'manage_partnerships']
  },
  {
    id: 4,
    name: 'Ravi Shankar',
    email: 'ravi.shankar@university.edu.in',
    role: 'operations',
    department: 'Placement Cell',
    status: 'active',
    lastLogin: '2025-01-15 07:20',
    joinDate: '2020-01-15',
    phone: '+91 9876543300',
    profileCompleted: 90,
    permissions: ['manage_jobs', 'coordinate_drives', 'manage_students', 'bulk_operations']
  },
  {
    id: 5,
    name: 'Dr. Ashok Kumar',
    email: 'ashok.kumar@university.edu.in',
    role: 'admin',
    department: 'Administration',
    status: 'active',
    lastLogin: '2025-01-15 08:00',
    joinDate: '2018-07-01',
    phone: '+91 9876543400',
    profileCompleted: 100,
    permissions: ['full_access', 'user_management', 'system_settings', 'all_reports']
  },
  // Add more mock users...
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    name: `User ${i + 6}`,
    email: `user${i + 6}@university.edu.in`,
    role: ['student', 'faculty', 'outreach', 'operations'][Math.floor(Math.random() * 4)] as User['role'],
    department: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical'][Math.floor(Math.random() * 4)],
    status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as User['status'],
    lastLogin: '2025-01-14 10:30',
    joinDate: '2023-08-15',
    profileCompleted: Math.floor(Math.random() * 40) + 60,
    permissions: ['basic_access']
  }))
];

export const userStatsData = [
  { name: 'Students', value: 1247, color: '#4f46e5' },
  { name: 'Faculty', value: 45, color: '#6366f1' },
  { name: 'Outreach', value: 8, color: '#8b5cf6' },
  { name: 'Operations', value: 12, color: '#06b6d4' },
  { name: 'Admin', value: 5, color: '#10b981' }
];

export const departmentData = [
  { name: 'Computer Science', users: 567, active: 534 },
  { name: 'Information Technology', users: 423, active: 398 },
  { name: 'Electronics', users: 234, active: 221 },
  { name: 'Mechanical', users: 189, active: 176 },
  { name: 'Civil', users: 145, active: 132 }
];

export const rolePermissions = {
  student: [
    'view_jobs',
    'apply_jobs',
    'view_training',
    'track_applications',
    'update_profile',
    'view_resume'
  ],
  faculty: [
    'manage_training',
    'view_students',
    'mark_attendance',
    'generate_reports',
    'evaluate_students',
    'manage_sessions'
  ],
  outreach: [
    'manage_companies',
    'view_analytics',
    'contact_companies',
    'manage_partnerships',
    'track_targets',
    'generate_outreach_reports'
  ],
  operations: [
    'manage_jobs',
    'coordinate_drives',
    'manage_students',
    'bulk_operations',
    'view_all_applications',
    'manage_selection_process'
  ],
  admin: [
    'full_access',
    'user_management',
    'system_settings',
    'all_reports',
    'backup_restore',
    'audit_logs'
  ]
};

export const systemSettings = [
  {
    category: 'General',
    settings: [
      { key: 'site_name', label: 'Site Name', value: 'University Placement Portal', type: 'text' },
      { key: 'timezone', label: 'Timezone', value: 'Asia/Kolkata', type: 'select' },
      { key: 'date_format', label: 'Date Format', value: 'DD/MM/YYYY', type: 'select' },
      { key: 'language', label: 'Default Language', value: 'English', type: 'select' }
    ]
  },
  {
    category: 'Authentication',
    settings: [
      { key: 'session_timeout', label: 'Session Timeout (minutes)', value: '60', type: 'number' },
      { key: 'password_policy', label: 'Password Policy', value: 'Strong', type: 'select' },
      { key: 'two_factor', label: 'Two Factor Authentication', value: false, type: 'boolean' },
      { key: 'login_attempts', label: 'Max Login Attempts', value: '5', type: 'number' }
    ]
  },
  {
    category: 'Notifications',
    settings: [
      { key: 'email_notifications', label: 'Email Notifications', value: true, type: 'boolean' },
      { key: 'sms_notifications', label: 'SMS Notifications', value: false, type: 'boolean' },
      { key: 'push_notifications', label: 'Push Notifications', value: true, type: 'boolean' },
      { key: 'notification_frequency', label: 'Notification Frequency', value: 'Daily', type: 'select' }
    ]
  }
];