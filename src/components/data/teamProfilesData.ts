export interface TeamProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  school?: string;
  joinDate: string;
  employeeId: string;
  designation: string;
  profilePicture?: string;
  bio: string;
  specialization?: string;
  experience: number;
  budget?: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  permissions: string[];
  achievements: string[];
  stats: {
    [key: string]: any;
  };
  targets?: {
    monthly: number;
    achieved: number;
    percentage: number;
  };
  recentActivities?: Array<{
    id: number;
    activity: string;
    timestamp: string;
    type: string;
  }>;
}

// Outreach Team Profile
export const outreachProfile: TeamProfile = {
  id: 'OUT001',
  name: 'Srilakshmi Venkatesh',
  email: 'srilakshmi.venkatesh@srmap.edu.in',
  phone: '+91 9876543200',
  role: 'outreach',
  department: 'Placement Cell',
  school: 'SET',
  joinDate: '2019-03-10',
  employeeId: 'EMP2019003',
  designation: 'Senior Outreach Manager',
  bio: 'Experienced industry liaison specialist with 8+ years in corporate partnerships. Expert in building strategic relationships with leading companies and driving placement opportunities for students across South India.',
  specialization: 'Corporate Relations, Partnership Development, Industry Connect',
  experience: 8,
  permissions: ['manage_companies', 'view_analytics', 'contact_companies', 'manage_partnerships'],
  achievements: [
    'Secured partnerships with 45+ companies in 2024',
    'Achieved 120% of annual placement targets',
    'Best Outreach Performance Award 2023',
    'Negotiated ₹15L+ average package increase',
    'Industry Excellence Recognition 2022'
  ],
  stats: {
    companiesContacted: 156,
    partnershipsSecured: 45,
    placementRate: 87,
    avgPackageNegotiated: 12.5,
    studentsPlacements: 234,
    meetingsScheduled: 89
  },
  targets: {
    monthly: 20,
    achieved: 16,
    percentage: 80
  },
  recentActivities: [
    {
      id: 1,
      activity: 'Scheduled meeting with TechMahindra HR Director',
      timestamp: '2 hours ago',
      type: 'meeting'
    },
    {
      id: 2,
      activity: 'Secured partnership with Infosys for 25 positions',
      timestamp: '1 day ago',
      type: 'partnership'
    },
    {
      id: 3,
      activity: 'Negotiated salary increase for CSE batch',
      timestamp: '2 days ago',
      type: 'negotiation'
    }
  ]
};

// Operations Team Profile
export const operationsProfile: TeamProfile = {
  id: 'OPS001',
  name: 'Ramesh Naidu',
  email: 'ramesh.naidu@srmap.edu.in',
  phone: '+91 9876543300',
  role: 'operations',
  department: 'Placement Cell',
  school: 'SET',
  joinDate: '2020-01-15',
  employeeId: 'EMP2020001',
  designation: 'Operations Manager & Drive Coordinator',
  bio: 'Strategic operations leader with 6+ years experience in placement coordination. Specializes in seamless recruitment drive management and student-company interface optimization across multiple campuses.',
  specialization: 'Drive Coordination, Student Management, Process Optimization',
  experience: 6,
  permissions: ['manage_jobs', 'coordinate_drives', 'manage_students', 'bulk_operations'],
  achievements: [
    'Coordinated 85+ recruitment drives in 2024',
    'Streamlined placement process reducing time by 40%',
    'Operations Excellence Award 2023',
    'Managed 500+ student placements',
    'Zero-error drive coordination record'
  ],
  stats: {
    drivesCoordinated: 85,
    studentsManaged: 567,
    interviewsScheduled: 1245,
    successfulPlacements: 234,
    averageProcessingTime: 3.2,
    satisfactionScore: 4.8
  },
  recentActivities: [
    {
      id: 1,
      activity: 'Coordinated TCS recruitment drive - 45 students selected',
      timestamp: '3 hours ago',
      type: 'drive'
    },
    {
      id: 2,
      activity: 'Allocated interview rooms for Wipro drive',
      timestamp: '5 hours ago',
      type: 'coordination'
    },
    {
      id: 3,
      activity: 'Updated student eligibility for upcoming drives',
      timestamp: '1 day ago',
      type: 'management'
    }
  ]
};

// Super Admin Profile
export const superAdminProfile: TeamProfile = {
  id: 'ADM001',
  name: 'Dr. Krishnamurthy Rao',
  email: 'krishnamurthy.rao@srmap.edu.in',
  phone: '+91 9876543400',
  role: 'admin',
  department: 'Administration',
  school: 'SET',
  joinDate: '2018-07-01',
  employeeId: 'EMP2018001',
  designation: 'Director - Placement & Training',
  bio: 'Visionary leader with 12+ years in higher education administration. Pioneered digital transformation in placement processes and established industry partnerships across South India and nationally.',
  specialization: 'Strategic Planning, System Administration, Policy Development',
  experience: 12,
  budget: {
    allocated: 25000000, // ₹2.5 crores
    spent: 18750000,     // ₹1.875 crores
    remaining: 6250000   // ₹62.5 lakhs
  },
  permissions: ['full_access', 'user_management', 'system_settings', 'all_reports'],
  achievements: [
    'Increased placement rate from 65% to 94% in 5 years',
    'Implemented AI-driven placement analytics',
    'Excellence in Education Leadership Award 2023',
    'Established partnerships with 150+ companies',
    'Reduced placement process time by 60%',
    'National Recognition for Digital Innovation'
  ],
  stats: {
    totalStudents: 2847,
    placementRate: 94,
    companiesPartnered: 156,
    systemUptime: 99.8,
    userSatisfaction: 4.9,
    averageCTC: 8.5,
    processEfficiency: 87
  },
  recentActivities: [
    {
      id: 1,
      activity: 'Approved new partnership with Microsoft India',
      timestamp: '2 hours ago',
      type: 'approval'
    },
    {
      id: 2,
      activity: 'Reviewed quarterly placement analytics',
      timestamp: '4 hours ago',
      type: 'review'
    },
    {
      id: 3,
      activity: 'System configuration update for new academic year',
      timestamp: '1 day ago',
      type: 'system'
    }
  ]
};

// Faculty Profile
export const facultyProfile = {
  id: 'FAC001',
  name: 'Dr. Priya Narasimhan',
  email: 'priya.narasimhan@srmap.edu.in',
  phone: '+91 9876543100',
  role: 'faculty',
  department: 'CSE',
  school: 'SET',
  joinDate: '2015-06-01',
  employeeId: 'EMP2015001',
  designation: 'Professor & Training Coordinator',
  bio: 'Experienced educator with 15+ years in Computer Science. Specializes in Machine Learning and Data Structures. Published 25+ research papers and guided 50+ students from Tamil Nadu and Andhra Pradesh.',
  specialization: 'Machine Learning, Data Structures, Algorithms',
  experience: 15,
  budget: {
    allocated: 5000000, // ₹50 lakhs
    spent: 3250000,     // ₹32.5 lakhs
    remaining: 1750000  // ₹17.5 lakhs
  },
  permissions: ['manage_training', 'view_students', 'mark_attendance', 'generate_reports'],
  achievements: [
    'Best Teacher Award 2023',
    'Published 25+ research papers',
    'Guided 50+ final year projects',
    'Training Excellence Award 2022'
  ],
  stats: {
    studentsManaged: 120,
    trainingHours: 480,
    placementRate: 85
  }
};

// Current users for chat functionality
export const teamChatUsers = {
  outreach: {
    id: 'outreach1',
    name: 'Srilakshmi Venkatesh',
    role: 'outreach',
    email: 'srilakshmi.venkatesh@srmap.edu.in',
    status: 'online' as const
  },
  operations: {
    id: 'ops1',
    name: 'Ramesh Naidu',
    role: 'operations',
    email: 'ramesh.naidu@srmap.edu.in',
    status: 'online' as const
  },
  admin: {
    id: 'admin1',
    name: 'Dr. Krishnamurthy Rao',
    role: 'admin',
    email: 'krishnamurthy.rao@srmap.edu.in',
    status: 'online' as const
  },
  faculty: {
    id: 'faculty1',
    name: 'Dr. Priya Narasimhan',
    role: 'faculty',
    email: 'priya.narasimhan@srmap.edu.in',
    status: 'online' as const
  }
};

// Communication matrix - defines who can chat with whom
export const communicationMatrix = {
  outreach: ['operations', 'admin'],
  operations: ['outreach', 'admin', 'faculty'],
  admin: ['outreach', 'operations', 'faculty'],
  faculty: ['operations', 'admin'],
  student: ['operations']
};

// Performance status helpers
export const getPerformanceStatus = (percentage: number): 'low' | 'medium' | 'high' => {
  if (percentage >= 80) return 'high';
  if (percentage >= 60) return 'medium';
  return 'low';
};

export const getPerformanceLabel = (status: 'low' | 'medium' | 'high'): string => {
  switch (status) {
    case 'high': return 'Excellent';
    case 'medium': return 'Good';
    case 'low': return 'Needs Improvement';
  }
};