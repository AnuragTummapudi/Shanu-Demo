// Enhanced data structures with all requested features
export interface EnhancedJob extends Job {
  salarySlabId?: string;
  companyRating: number;
  hiringTimeline: string;
  interviewRounds: string[];
  placementStats: {
    applied: number;
    shortlisted: number;
    selected: number;
  };
}

export interface StudentApplication {
  id: number;
  studentId: number;
  jobId: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'on-hold';
  salaryOffered?: string;
  interviewDate?: string;
  feedback?: string;
  nextRound?: string;
}

export interface OutreachTarget {
  id: number;
  targetType: 'companies' | 'ctc' | 'placements' | 'partnerships';
  title: string;
  target: number;
  achieved: number;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  progress: number;
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
}

export interface DriveData {
  id: number;
  company: string;
  date: string;
  type: 'campus' | 'virtual' | 'pool';
  positions: number;
  ctcRange: string;
  eligibleDepartments: string[];
  registrations: number;
  shortlisted: number;
  selected: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  coordinator: string;
  venue?: string;
  rounds: string[];
}

export interface TicketData {
  id: number;
  ticketId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'academic' | 'placement' | 'training' | 'general';
  createdBy: string;
  assignedTo: string;
  createdDate: string;
  updatedDate: string;
  responses: Array<{
    id: number;
    author: string;
    message: string;
    timestamp: string;
    attachments?: string[];
  }>;
}

export interface AttendanceRecord {
  id: number;
  sessionId: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  department: string;
  status: 'present' | 'absent' | 'late';
  timestamp?: string;
  remarks?: string;
}

export interface CSVUploadData {
  filename: string;
  uploadDate: string;
  uploadedBy: string;
  recordsProcessed: number;
  recordsSuccess: number;
  recordsFailed: number;
  status: 'processing' | 'completed' | 'failed';
  errorLog?: string[];
}

// Enhanced mock data with Indian names and INR currency
export const enhancedJobsData: EnhancedJob[] = [
  {
    id: 1,
    title: 'Software Development Engineer',
    company: 'TechMahindra Limited',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    ctc: '₹6.5L - ₹8.5L',
    description: 'Join our dynamic software development team to build scalable applications using modern technologies.',
    requirements: [
      'Strong programming skills in Java/Python/JavaScript',
      'Understanding of data structures and algorithms',
      'Experience with web development frameworks'
    ],
    eligibility: {
      minCGPA: 7.0,
      departments: ['CSE', 'IT'],
      maxBacklogs: 2,
      batch: '2025'
    },
    applicationDeadline: '2025-02-15',
    postedDate: '2025-01-10',
    applicants: 156,
    status: 'active',
    skills: ['Java', 'Python', 'JavaScript', 'React', 'Node.js'],
    experience: 'Freshers',
    benefits: ['Health Insurance', 'PF/ESI', 'Training & Certification', 'Flexible Hours'],
    workMode: 'Hybrid',
    bondPeriod: '2 years',
    salarySlabId: '10-15',
    companyRating: 4.2,
    hiringTimeline: '4-6 weeks',
    interviewRounds: ['Technical Round 1', 'Technical Round 2', 'HR Round'],
    placementStats: {
      applied: 156,
      shortlisted: 45,
      selected: 12
    }
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'Infosys Limited',
    location: 'Bangalore, Karnataka',
    type: 'Internship',
    stipend: '₹25,000/month',
    description: 'Work with our data science team on real-world machine learning projects.',
    requirements: [
      'Strong foundation in statistics and mathematics',
      'Programming skills in Python/R',
      'Knowledge of machine learning algorithms'
    ],
    eligibility: {
      minCGPA: 8.0,
      departments: ['CSE', 'IT', 'ECE'],
      maxBacklogs: 0,
      batch: '2025'
    },
    applicationDeadline: '2025-02-01',
    postedDate: '2025-01-08',
    applicants: 203,
    status: 'active',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'],
    experience: 'Freshers',
    benefits: ['Stipend', 'Mentorship', 'Certificate', 'Pre-placement Offer Opportunity'],
    workMode: 'On-site',
    ctc: '₹25,000/month',
    salarySlabId: 'internship',
    companyRating: 4.5,
    hiringTimeline: '3-4 weeks',
    interviewRounds: ['Technical Assessment', 'Technical Interview', 'HR Round'],
    placementStats: {
      applied: 203,
      shortlisted: 60,
      selected: 20
    }
  }
];

export const studentApplications: StudentApplication[] = [
  {
    id: 1,
    studentId: 1,
    jobId: 1,
    jobTitle: 'Software Development Engineer',
    company: 'TechMahindra Limited',
    appliedDate: '2025-01-15',
    status: 'shortlisted',
    interviewDate: '2025-01-25',
    nextRound: 'Technical Round 2'
  },
  {
    id: 2,
    studentId: 1,
    jobId: 2,
    jobTitle: 'Data Science Intern',
    company: 'Infosys Limited',
    appliedDate: '2025-01-12',
    status: 'interviewed',
    feedback: 'Good technical knowledge, needs improvement in communication'
  }
];

export const outreachTargets: OutreachTarget[] = [
  {
    id: 1,
    targetType: 'companies',
    title: 'New Company Partnerships',
    target: 50,
    achieved: 32,
    unit: 'companies',
    deadline: '2025-06-30',
    priority: 'high',
    assignedTo: 'Priya Krishnamurthy',
    progress: 64,
    status: 'on-track'
  },
  {
    id: 2,
    targetType: 'ctc',
    title: 'Average Package Improvement',
    target: 8.5,
    achieved: 7.8,
    unit: 'LPA',
    deadline: '2025-05-31',
    priority: 'high',
    assignedTo: 'Rajesh Naidu',
    progress: 92,
    status: 'ahead'
  },
  {
    id: 3,
    targetType: 'placements',
    title: 'Placement Rate Target',
    target: 95,
    achieved: 76,
    unit: '%',
    deadline: '2025-07-31',
    priority: 'medium',
    assignedTo: 'Kavitha Reddy',
    progress: 80,
    status: 'on-track'
  }
];

export const driveData: DriveData[] = [
  {
    id: 1,
    company: 'TechMahindra Limited',
    date: '2025-02-15',
    type: 'campus',
    positions: 45,
    ctcRange: '₹6.5L - ₹8.5L',
    eligibleDepartments: ['CSE', 'IT'],
    registrations: 156,
    shortlisted: 45,
    selected: 12,
    status: 'scheduled',
    coordinator: 'Suresh Venkat',
    venue: 'Main Auditorium',
    rounds: ['Aptitude Test', 'Technical Round', 'HR Round']
  },
  {
    id: 2,
    company: 'Infosys Limited',
    date: '2025-02-01',
    type: 'virtual',
    positions: 60,
    ctcRange: '₹3.6L - ₹25L',
    eligibleDepartments: ['CSE', 'IT', 'ECE'],
    registrations: 203,
    shortlisted: 60,
    selected: 20,
    status: 'completed',
    coordinator: 'Lakshmi Narayanan',
    rounds: ['Online Assessment', 'Technical Interview', 'HR Round']
  }
];

export const ticketsData: TicketData[] = [
  {
    id: 1,
    ticketId: 'TKT-2025-001',
    title: 'Resume Builder Not Working',
    description: 'Unable to save resume data after filling all sections',
    priority: 'high',
    status: 'in-progress',
    category: 'technical',
    createdBy: 'Sumanth Bolisetty',
    assignedTo: 'Operations Team',
    createdDate: '2025-01-15',
    updatedDate: '2025-01-16',
    responses: [
      {
        id: 1,
        author: 'Operations Team',
        message: 'We are investigating the issue. Please try clearing your browser cache.',
        timestamp: '2025-01-16 10:30 AM'
      }
    ]
  },
  {
    id: 2,
    ticketId: 'TKT-2025-002',
    title: 'Job Application Status Not Updated',
    description: 'Applied for TechMahindra role but status still shows as applied',
    priority: 'medium',
    status: 'open',
    category: 'placement',
    createdBy: 'Meera Iyer',
    assignedTo: 'Placement Team',
    createdDate: '2025-01-14',
    updatedDate: '2025-01-14',
    responses: []
  }
];

export const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    sessionId: 1,
    studentId: 1,
    studentName: 'Sumanth Bolisetty',
    rollNo: 'AP24322130096',
    department: 'CSE',
    status: 'present',
    timestamp: '2025-01-16 10:00 AM'
  },
  {
    id: 2,
    sessionId: 1,
    studentId: 2,
    studentName: 'Meera Iyer',
    rollNo: 'AP24322130097',
    department: 'CSE',
    status: 'late',
    timestamp: '2025-01-16 10:15 AM',
    remarks: 'Arrived 15 minutes late'
  }
];