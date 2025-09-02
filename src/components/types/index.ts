export type PageType = 
  | 'dashboard'
  | 'job-detail'
  | 'internship-detail'
  | 'profile-edit'
  | 'resume-builder'
  | 'training-session'
  | 'attendance-marking'
  | 'student-evaluation'
  | 'company-detail'
  | 'company-add'
  | 'pipeline-management'
  | 'target-setting'
  | 'drive-management'
  | 'student-management'
  | 'job-posting'
  | 'bulk-operations'
  | 'user-management'
  | 'system-settings'
  | 'report-generation'
  | 'analytics-detail';

export interface NavigationState {
  currentPage: PageType;
  pageData?: any;
  breadcrumb: { label: string; page: PageType; data?: any }[];
}

export interface Job {
  id: number;
  title: string;
  company: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  ctc?: string;
  stipend?: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibleStudents: number;
  applications: number;
  shortlisted: number;
  selected: number;
  status: 'active' | 'completed' | 'cancelled';
  postedDate: string;
  tags: string[];
  companyLogo?: string;
  benefits?: string[];
  duration?: string; // For internships
}

export interface Student {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  cgpa: number;
  semester: number;
  dateOfBirth: string;
  address: string;
  fatherName: string;
  motherName: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    percentage: number;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  achievements: string[];
  languages: Array<{
    language: string;
    proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
  }>;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  resumeUrl?: string;
  profileCompleted: number;
  course?: string;
  isShortlisted?: boolean;
  applicationStatus?: 'shortlisted' | 'not_shortlisted';
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  website?: string;
  description: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };
  address: string;
  employees: string;
  founded: string;
  status: 'contacted' | 'negotiation' | 'onboarded' | 'closed';
  ctcRange: string;
  positions: number;
  lastContact: string;
  nextAction: string;
  documents: Array<{
    name: string;
    type: string;
    uploadDate: string;
  }>;
  notes: string;
  hiringRate?: number;
  performance?: 'low' | 'medium' | 'high';
  responseRate?: number;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';
  department: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  joinDate: string;
  phone?: string;
  profileCompleted: number;
  permissions: string[];
}
}