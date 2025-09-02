export interface JobPosting {
  id: string;
  title: string;
  company: string;
  type: 'full-time' | 'internship' | 'part-time';
  status: 'active' | 'closed' | 'draft';
  applications: number;
  deadline: string;
  salaryRange: string;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  date: string;
  roles: string[];
  eligibility: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  applicants: number;
  selected: number;
}

export const defaultOperationsProfile = {
  // Personal Information
  firstName: 'Kavya',
  lastName: 'Sharma',
  email: 'kavya.sharma@srmap.edu.in',
  phone: '+91 98765 43210',
  dateOfBirth: '1988-07-18',
  gender: 'Female',
  address: 'Block C, Faculty Quarters, SRM University AP, Amaravati - 522502',
  
  // Professional Information
  employeeId: 'OPS2019001',
  designation: 'Operations Manager',
  department: 'Placement & Training Cell',
  school: 'University Wide',
  dateOfJoining: '2019-03-01',
  reportingManager: 'Dr. Rajesh Kumar',
  
  // Experience & Expertise
  totalExperience: '10 years',
  placementExperience: '6 years',
  educationExperience: '4 years',
  specializations: ['Placement Operations', 'Student Coordination', 'Event Management', 'Data Analytics'],
  
  // Current Responsibilities
  schoolsHandled: ['School of Engineering & Technology', 'School of Management'],
  departmentsHandled: ['Computer Science', 'Information Technology', 'Electronics', 'Business Administration'],
  operationAreas: ['Job Posting Management', 'Student Coordination', 'Drive Organization', 'Selection Process'],
  
  // Performance Metrics
  jobsPosted: '85',
  drivesOrganized: '32',
  studentsPlaced: '420',
  averageProcessingTime: '2.5 days',
  
  // Skills & Tools
  technicalSkills: ['Data Management', 'Process Optimization', 'Analytics', 'Project Management'],
  softSkills: ['Coordination', 'Communication', 'Problem Solving', 'Leadership'],
  tools: ['Microsoft Excel', 'HRMS Systems', 'Google Workspace', 'Zoom', 'Applicant Tracking Systems'],
  certifications: ['Project Management Professional', 'Six Sigma Green Belt', 'Google Analytics'],
  
  // Languages
  languages: ['English', 'Telugu', 'Hindi'],
  
  // System Information
  lastUpdated: '2024-01-15',
  profileVersion: '1.1'
};

export const defaultJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TCS',
    type: 'full-time',
    status: 'active',
    applications: 150,
    deadline: '2024-02-15',
    salaryRange: '₹4-6 LPA'
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    company: 'Infosys',
    type: 'internship',
    status: 'active',
    applications: 85,
    deadline: '2024-02-20',
    salaryRange: '₹25,000/month'
  }
];

export const defaultPlacementDrives: PlacementDrive[] = [
  {
    id: '1',
    companyName: 'Microsoft',
    date: '2024-03-15',
    roles: ['Software Developer', 'Cloud Engineer'],
    eligibility: 'CSE, IT - 7.5+ CGPA',
    status: 'scheduled',
    applicants: 120,
    selected: 0
  },
  {
    id: '2',
    companyName: 'Amazon',
    date: '2024-02-28',
    roles: ['SDE-1', 'Business Analyst'],
    eligibility: 'All branches - 8.0+ CGPA',
    status: 'completed',
    applicants: 200,
    selected: 25
  }
];