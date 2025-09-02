export interface OperationsStaff {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
  department: string;
  experience: number;
  phone: string;
  dateOfJoining: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  responsibilities: string[];
  skills: string[];
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    category: string;
  }>;
  performanceMetrics: {
    applicationsProcessed: number;
    interviewsCoordinated: number;
    placementSuccess: number;
    studentSatisfaction: number;
  };
  profileImage: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachStaff {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
  department: string;
  experience: number;
  phone: string;
  dateOfJoining: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  responsibilities: string[];
  skills: string[];
  companiesManaged: string[];
  partnerships: Array<{
    company: string;
    type: string;
    since: string;
    status: string;
  }>;
  performanceMetrics: {
    companiesOnboarded: number;
    jobsPosted: number;
    placementSuccess: number;
    relationshipScore: number;
  };
  profileImage: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
  department: string;
  experience: number;
  phone: string;
  dateOfJoining: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  responsibilities: string[];
  skills: string[];
  systemAccess: string[];
  managementAreas: string[];
  performanceMetrics: {
    systemUptime: number;
    userSatisfaction: number;
    dataAccuracy: number;
    processEfficiency: number;
  };
  profileImage: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

// Operations Team Data
export const operationsTeam: OperationsStaff[] = [
  {
    id: 'ops_001',
    name: 'Suresh Babu',
    email: 'suresh.babu@srmap.edu.in',
    employeeId: 'SRMOPS001',
    designation: 'Operations Manager',
    department: 'Placement Operations',
    experience: 8,
    phone: '+91 9876543270',
    dateOfJoining: '2016-03-15',
    dateOfBirth: '1985-11-28',
    gender: 'Male',
    address: {
      street: '15 Operations Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Placement Process Management',
      'Student Application Coordination',
      'Interview Scheduling & Logistics',
      'Documentation & Compliance',
      'Data Management & Reporting',
      'Process Optimization'
    ],
    skills: [
      'Project Management',
      'Process Optimization',
      'Data Analysis',
      'Stakeholder Management',
      'Quality Assurance',
      'Team Leadership'
    ],
    achievements: [
      {
        title: 'Process Excellence Award',
        description: 'Recognition for streamlining placement operations',
        date: '2023-07-15',
        category: 'Professional'
      },
      {
        title: '95% Placement Rate Achievement',
        description: 'Led team to achieve highest placement rate in university history',
        date: '2023-05-20',
        category: 'Performance'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 2500,
      interviewsCoordinated: 450,
      placementSuccess: 95,
      studentSatisfaction: 4.6
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T09:15:00Z',
    createdAt: '2016-03-15T00:00:00Z',
    updatedAt: '2024-01-21T16:30:00Z'
  },
  {
    id: 'ops_002',
    name: 'Kavitha Reddy',
    email: 'kavitha.reddy@srmap.edu.in',
    employeeId: 'SRMOPS002',
    designation: 'Senior Operations Executive',
    department: 'Placement Operations',
    experience: 6,
    phone: '+91 9876543271',
    dateOfJoining: '2018-07-01',
    dateOfBirth: '1988-02-14',
    gender: 'Female',
    address: {
      street: '18 Operations Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Application Processing',
      'Student Database Management',
      'Interview Coordination',
      'Document Verification',
      'Progress Tracking',
      'Quality Control'
    ],
    skills: [
      'Database Management',
      'Application Processing',
      'Quality Control',
      'Excel Advanced',
      'Communication',
      'Time Management'
    ],
    achievements: [
      {
        title: 'Employee of the Year',
        description: 'Outstanding performance in operations management',
        date: '2022-12-31',
        category: 'Recognition'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 1800,
      interviewsCoordinated: 320,
      placementSuccess: 88,
      studentSatisfaction: 4.4
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T14:20:00Z',
    createdAt: '2018-07-01T00:00:00Z',
    updatedAt: '2024-01-18T11:45:00Z'
  },
  {
    id: 'ops_003',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@srmap.edu.in',
    employeeId: 'SRMOPS003',
    designation: 'Operations Executive',
    department: 'Placement Operations',
    experience: 4,
    phone: '+91 9876543272',
    dateOfJoining: '2020-09-10',
    dateOfBirth: '1990-06-08',
    gender: 'Male',
    address: {
      street: '22 Operations Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Student Registration',
      'Profile Management',
      'Interview Logistics',
      'Data Entry & Validation',
      'Report Generation',
      'Administrative Support'
    ],
    skills: [
      'Data Management',
      'Administrative Skills',
      'Report Generation',
      'Student Support',
      'Process Following',
      'Attention to Detail'
    ],
    achievements: [
      {
        title: 'Best Process Improvement',
        description: 'Implemented automated data validation system',
        date: '2023-03-10',
        category: 'Innovation'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 1200,
      interviewsCoordinated: 180,
      placementSuccess: 82,
      studentSatisfaction: 4.2
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T16:45:00Z',
    createdAt: '2020-09-10T00:00:00Z',
    updatedAt: '2024-01-15T13:20:00Z'
  },
  {
    id: 'ops_004',
    name: 'Preethi Nair',
    email: 'preethi.nair@srmap.edu.in',
    employeeId: 'SRMOPS004',
    designation: 'Training Coordinator',
    department: 'Training & Development',
    experience: 5,
    phone: '+91 9876543273',
    dateOfJoining: '2019-05-20',
    dateOfBirth: '1987-12-03',
    gender: 'Female',
    address: {
      street: '25 Training Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Training Program Coordination',
      'Workshop Organization',
      'Skill Development Planning',
      'Vendor Management',
      'Progress Monitoring',
      'Resource Allocation'
    ],
    skills: [
      'Training Coordination',
      'Program Management',
      'Vendor Relations',
      'Event Organization',
      'Resource Planning',
      'Performance Tracking'
    ],
    achievements: [
      {
        title: 'Training Excellence Award',
        description: 'Successful coordination of 50+ training programs',
        date: '2023-09-15',
        category: 'Achievement'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 900,
      interviewsCoordinated: 150,
      placementSuccess: 85,
      studentSatisfaction: 4.5
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-19T12:30:00Z',
    createdAt: '2019-05-20T00:00:00Z',
    updatedAt: '2024-01-14T10:15:00Z'
  },
  {
    id: 'ops_005',
    name: 'Venkat Rao',
    email: 'venkat.rao@srmap.edu.in',
    employeeId: 'SRMOPS005',
    designation: 'Data Analyst',
    department: 'Analytics & Reporting',
    experience: 3,
    phone: '+91 9876543274',
    dateOfJoining: '2021-11-15',
    dateOfBirth: '1992-08-22',
    gender: 'Male',
    address: {
      street: '30 Analytics Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Data Analysis & Reporting',
      'Performance Metrics Tracking',
      'Dashboard Development',
      'Trend Analysis',
      'Predictive Modeling',
      'Data Visualization'
    ],
    skills: [
      'Data Analysis',
      'Excel Advanced',
      'Python',
      'SQL',
      'Tableau',
      'Statistical Analysis'
    ],
    achievements: [
      {
        title: 'Analytics Innovation Award',
        description: 'Developed predictive placement success model',
        date: '2023-11-20',
        category: 'Innovation'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 800,
      interviewsCoordinated: 120,
      placementSuccess: 90,
      studentSatisfaction: 4.3
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T11:00:00Z',
    createdAt: '2021-11-15T00:00:00Z',
    updatedAt: '2024-01-20T15:45:00Z'
  }
];

// Outreach Team Data
export const outreachTeam: OutreachStaff[] = [
  {
    id: 'out_001',
    name: 'Ravi Teja',
    email: 'ravi.teja@srmap.edu.in',
    employeeId: 'SRMOUT001',
    designation: 'Senior Outreach Manager',
    department: 'Corporate Relations',
    experience: 10,
    phone: '+91 9876543275',
    dateOfJoining: '2014-04-01',
    dateOfBirth: '1983-01-15',
    gender: 'Male',
    address: {
      street: '10 Outreach Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Corporate Partnership Development',
      'Relationship Management',
      'Job Opportunity Sourcing',
      'Industry Collaboration',
      'Strategic Planning',
      'Team Leadership'
    ],
    skills: [
      'Business Development',
      'Relationship Management',
      'Negotiation',
      'Strategic Planning',
      'Market Analysis',
      'Communication'
    ],
    companiesManaged: [
      'TCS Digital',
      'Microsoft India',
      'Amazon',
      'Flipkart',
      'Google India',
      'IBM',
      'Accenture',
      'Wipro'
    ],
    partnerships: [
      {
        company: 'TCS Digital',
        type: 'Premier Partner',
        since: '2015-06-01',
        status: 'Active'
      },
      {
        company: 'Microsoft India',
        type: 'Strategic Partner',
        since: '2016-03-15',
        status: 'Active'
      },
      {
        company: 'Amazon',
        type: 'Hiring Partner',
        since: '2017-08-20',
        status: 'Active'
      }
    ],
    achievements: [
      {
        title: 'Partnership Excellence Award',
        description: 'Successfully onboarded 25+ companies in 2023',
        date: '2023-12-15',
        category: 'Achievement'
      },
      {
        title: 'Industry Recognition',
        description: 'Best Corporate Relations Manager - Education Sector',
        date: '2022-10-10',
        category: 'Recognition'
      }
    ],
    performanceMetrics: {
      companiesOnboarded: 35,
      jobsPosted: 180,
      placementSuccess: 92,
      relationshipScore: 4.7
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T08:30:00Z',
    createdAt: '2014-04-01T00:00:00Z',
    updatedAt: '2024-01-21T14:20:00Z'
  },
  {
    id: 'out_002',
    name: 'Deepika Sharma',
    email: 'deepika.sharma@srmap.edu.in',
    employeeId: 'SRMOUT002',
    designation: 'Outreach Executive',
    department: 'Corporate Relations',
    experience: 6,
    phone: '+91 9876543276',
    dateOfJoining: '2018-02-10',
    dateOfBirth: '1989-09-18',
    gender: 'Female',
    address: {
      street: '12 Outreach Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Company Outreach',
      'Job Posting Coordination',
      'Event Organization',
      'Alumni Relations',
      'Market Research',
      'Content Creation'
    ],
    skills: [
      'Outreach Strategy',
      'Event Management',
      'Content Marketing',
      'Social Media',
      'Research Skills',
      'Networking'
    ],
    companiesManaged: [
      'Infosys',
      'Cognizant',
      'HCL Technologies',
      'Tech Mahindra',
      'L&T Infotech',
      'Mindtree'
    ],
    partnerships: [
      {
        company: 'Infosys',
        type: 'Hiring Partner',
        since: '2018-09-01',
        status: 'Active'
      },
      {
        company: 'Cognizant',
        type: 'Training Partner',
        since: '2019-03-15',
        status: 'Active'
      }
    ],
    achievements: [
      {
        title: 'Best Outreach Campaign',
        description: 'Successful social media outreach increasing engagement by 150%',
        date: '2023-06-20',
        category: 'Marketing'
      }
    ],
    performanceMetrics: {
      companiesOnboarded: 22,
      jobsPosted: 125,
      placementSuccess: 87,
      relationshipScore: 4.4
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T10:15:00Z',
    createdAt: '2018-02-10T00:00:00Z',
    updatedAt: '2024-01-19T13:45:00Z'
  },
  {
    id: 'out_003',
    name: 'Manoj Krishna',
    email: 'manoj.krishna@srmap.edu.in',
    employeeId: 'SRMOUT003',
    designation: 'Corporate Relations Associate',
    department: 'Corporate Relations',
    experience: 4,
    phone: '+91 9876543277',
    dateOfJoining: '2020-06-15',
    dateOfBirth: '1991-04-30',
    gender: 'Male',
    address: {
      street: '14 Outreach Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Lead Generation',
      'Initial Company Contact',
      'Data Management',
      'Follow-up Communication',
      'Event Support',
      'Documentation'
    ],
    skills: [
      'Lead Generation',
      'CRM Management',
      'Communication',
      'Data Analysis',
      'Email Marketing',
      'Cold Calling'
    ],
    companiesManaged: [
      'Capgemini',
      'DXC Technology',
      'NTT Data',
      'Hexaware',
      'Mphasis',
      'Zensar'
    ],
    partnerships: [
      {
        company: 'Capgemini',
        type: 'New Partner',
        since: '2023-01-10',
        status: 'Active'
      },
      {
        company: 'DXC Technology',
        type: 'Hiring Partner',
        since: '2022-08-15',
        status: 'Active'
      }
    ],
    achievements: [
      {
        title: 'New Partnership Award',
        description: 'Successfully established 10 new company partnerships',
        date: '2023-08-15',
        category: 'Achievement'
      }
    ],
    performanceMetrics: {
      companiesOnboarded: 18,
      jobsPosted: 95,
      placementSuccess: 84,
      relationshipScore: 4.2
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T15:30:00Z',
    createdAt: '2020-06-15T00:00:00Z',
    updatedAt: '2024-01-17T11:20:00Z'
  }
];

// Admin Team Data
export const adminTeam: AdminStaff[] = [
  {
    id: 'adm_001',
    name: 'Dr. Rajesh Menon',
    email: 'rajesh.menon@srmap.edu.in',
    employeeId: 'SRMADM001',
    designation: 'Super Administrator',
    department: 'Information Technology',
    experience: 15,
    phone: '+91 9876543280',
    dateOfJoining: '2010-01-15',
    dateOfBirth: '1975-07-12',
    gender: 'Male',
    address: {
      street: '5 Admin Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'System Administration',
      'User Management',
      'Security Management',
      'Data Governance',
      'Platform Strategy',
      'Technology Leadership'
    ],
    skills: [
      'System Administration',
      'Database Management',
      'Network Security',
      'Cloud Architecture',
      'Strategic Planning',
      'Team Leadership'
    ],
    systemAccess: [
      'Full System Access',
      'User Management',
      'Security Settings',
      'Database Administration',
      'System Configuration',
      'Audit Logs'
    ],
    managementAreas: [
      'Platform Strategy',
      'Technology Infrastructure',
      'Data Management',
      'Security Policies',
      'User Experience',
      'Performance Monitoring'
    ],
    achievements: [
      {
        title: 'Digital Transformation Leader',
        description: 'Led successful migration to cloud-based platform',
        date: '2023-04-15',
        category: 'Technology'
      },
      {
        title: 'Security Excellence Award',
        description: 'Implemented robust security framework with zero breaches',
        date: '2022-11-20',
        category: 'Security'
      }
    ],
    performanceMetrics: {
      systemUptime: 99.9,
      userSatisfaction: 4.8,
      dataAccuracy: 99.5,
      processEfficiency: 95
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T07:00:00Z',
    createdAt: '2010-01-15T00:00:00Z',
    updatedAt: '2024-01-21T18:30:00Z'
  },
  {
    id: 'adm_002',
    name: 'Sunitha Rao',
    email: 'sunitha.rao@srmap.edu.in',
    employeeId: 'SRMADM002',
    designation: 'System Administrator',
    department: 'Information Technology',
    experience: 8,
    phone: '+91 9876543281',
    dateOfJoining: '2016-09-01',
    dateOfBirth: '1986-03-25',
    gender: 'Female',
    address: {
      street: '7 Admin Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Daily System Operations',
      'User Support',
      'Data Backup & Recovery',
      'System Monitoring',
      'Performance Optimization',
      'Documentation'
    ],
    skills: [
      'Linux Administration',
      'Database Management',
      'Backup & Recovery',
      'Monitoring Tools',
      'Troubleshooting',
      'Documentation'
    ],
    systemAccess: [
      'System Operations',
      'User Support',
      'Backup Management',
      'Performance Monitoring',
      'Log Analysis',
      'Basic Configuration'
    ],
    managementAreas: [
      'Daily Operations',
      'User Support',
      'System Health',
      'Data Integrity',
      'Performance Tuning'
    ],
    achievements: [
      {
        title: 'System Reliability Award',
        description: 'Maintained 99.8% system uptime for 2 consecutive years',
        date: '2023-01-15',
        category: 'Operations'
      }
    ],
    performanceMetrics: {
      systemUptime: 99.8,
      userSatisfaction: 4.5,
      dataAccuracy: 99.2,
      processEfficiency: 88
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T16:45:00Z',
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2024-01-19T14:20:00Z'
  },
  {
    id: 'adm_003',
    name: 'Kiran Kumar',
    email: 'kiran.kumar@srmap.edu.in',
    employeeId: 'SRMADM003',
    designation: 'Data Administrator',
    department: 'Data Management',
    experience: 6,
    phone: '+91 9876543282',
    dateOfJoining: '2018-03-20',
    dateOfBirth: '1988-11-08',
    gender: 'Male',
    address: {
      street: '9 Admin Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Data Quality Management',
      'Database Optimization',
      'Report Generation',
      'Data Migration',
      'Analytics Support',
      'Compliance Monitoring'
    ],
    skills: [
      'SQL Advanced',
      'Data Modeling',
      'ETL Processes',
      'Report Development',
      'Data Visualization',
      'Quality Assurance'
    ],
    systemAccess: [
      'Database Access',
      'Report Generation',
      'Data Export/Import',
      'Analytics Tools',
      'Quality Control',
      'Archive Management'
    ],
    managementAreas: [
      'Data Quality',
      'Database Performance',
      'Reporting Systems',
      'Data Analytics',
      'Compliance'
    ],
    achievements: [
      {
        title: 'Data Quality Excellence',
        description: 'Achieved 99.5% data accuracy across all systems',
        date: '2023-07-30',
        category: 'Quality'
      }
    ],
    performanceMetrics: {
      systemUptime: 99.7,
      userSatisfaction: 4.3,
      dataAccuracy: 99.5,
      processEfficiency: 92
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T13:15:00Z',
    createdAt: '2018-03-20T00:00:00Z',
    updatedAt: '2024-01-18T16:40:00Z'
  }
];

// Combine all staff
export const allStaff = {
  operations: operationsTeam,
  outreach: outreachTeam,
  admin: adminTeam
};

// Export counts
export const staffCounts = {
  operations: operationsTeam.length,
  outreach: outreachTeam.length,
  admin: adminTeam.length,
  total: operationsTeam.length + outreachTeam.length + adminTeam.length
};