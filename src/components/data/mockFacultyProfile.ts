import { FacultyProfile } from '../types/FacultyProfileTypes';

export const mockFacultyProfile: FacultyProfile = {
  employeeId: 'FAC001234',
  firstName: 'Dr. Priya',
  lastName: 'Sharma',
  title: 'Dr.',
  email: 'priya_sharma@srmap.edu.in',
  phone: '+91 9876543210',
  alternatePhone: '+91 9876543211',
  dateOfBirth: '1980-05-15',
  gender: 'Female',
  nationality: 'Indian',
  bloodGroup: 'A+',
  
  permanentAddress: {
    street: '456 Faculty Housing, University Campus',
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    pincode: '522502',
    country: 'India'
  },
  currentAddress: {
    street: '456 Faculty Housing, University Campus',
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    pincode: '522502',
    country: 'India'
  },
  
  department: 'Computer Science & Engineering',
  school: 'School of Engineering & Technology',
  designation: 'Associate Professor',
  joiningDate: '2018-07-15',
  experience: 12,
  employmentType: 'Full-time',
  
  qualifications: [
    {
      degree: 'Ph.D',
      specialization: 'Machine Learning',
      university: 'Indian Institute of Technology, Madras',
      year: 2015,
      grade: 'First Class'
    },
    {
      degree: 'M.Tech',
      specialization: 'Computer Science',
      university: 'Indian Institute of Technology, Delhi',
      year: 2010,
      grade: 'First Class with Distinction'
    },
    {
      degree: 'B.Tech',
      specialization: 'Computer Science & Engineering',
      university: 'National Institute of Technology, Warangal',
      year: 2008,
      grade: 'First Class with Distinction'
    }
  ],
  
  previousExperience: [
    {
      organization: 'Infosys Technologies Ltd.',
      position: 'Senior Research Scientist',
      duration: '2015-2018',
      description: 'Led research in machine learning applications for enterprise software',
      achievements: [
        'Published 8 research papers in top-tier conferences',
        'Led a team of 12 researchers',
        'Developed 3 patent-pending algorithms'
      ]
    }
  ],
  
  researchAreas: ['Machine Learning', 'Artificial Intelligence', 'Natural Language Processing', 'Computer Vision'],
  publications: [
    {
      title: 'Deep Learning Approaches for Natural Language Understanding',
      journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
      year: 2023,
      authors: ['Priya Sharma', 'Rajesh Kumar', 'Deepika Reddy'],
      citations: 45,
      doi: '10.1109/TPAMI.2023.1234567',
      type: 'Journal'
    }
  ],
  researchProjects: [
    {
      title: 'AI-Powered Educational Platform for Rural India',
      fundingAgency: 'Department of Science and Technology, Govt. of India',
      amount: 2500000,
      duration: '2022-2025',
      role: 'Principal Investigator',
      status: 'Ongoing'
    }
  ],
  patents: [
    {
      title: 'Intelligent Tutoring System using Deep Learning',
      applicationNumber: 'IN202341012345',
      status: 'Published',
      year: 2023
    }
  ],
  
  coursesTeaching: [
    {
      courseCode: 'CS301',
      courseName: 'Machine Learning',
      level: 'UG',
      credits: 4,
      semester: 'Odd'
    }
  ],
  teachingLoad: 12,
  studentsSupervised: {
    phd: 5,
    masters: 8,
    undergraduate: 15
  },
  
  technicalSkills: ['Python', 'TensorFlow', 'PyTorch', 'R', 'MATLAB', 'Java', 'C++'],
  softwareTools: ['Jupyter', 'Git', 'Docker', 'AWS', 'Google Cloud'],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Hindi', proficiency: 'Fluent' },
    { language: 'Telugu', proficiency: 'Fluent' }
  ],
  certifications: [
    {
      name: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      date: '2023-06-15',
      validUntil: '2026-06-15',
      credentialId: 'AWS-ML-2023-789'
    }
  ],
  
  awards: [
    {
      title: 'Young Faculty Research Excellence Award',
      organization: 'SRM University AP',
      year: 2023,
      description: 'For outstanding research contributions in AI and ML'
    }
  ],
  memberships: [
    {
      organization: 'Association for Computing Machinery (ACM)',
      membershipType: 'Senior Member',
      since: 2020
    }
  ],
  editorialRoles: [
    {
      journal: 'Journal of Machine Learning Research',
      role: 'Reviewer',
      since: 2021
    }
  ],
  
  administrativeRoles: [
    {
      position: 'Program Coordinator - M.Tech AI & ML',
      department: 'Computer Science & Engineering',
      duration: '2022-Present',
      responsibilities: ['Curriculum design', 'Student admissions', 'Industry partnerships']
    }
  ],
  
  workshops: [
    {
      title: 'Deep Learning Workshop for Faculty',
      organizer: 'IIT Madras',
      date: '2023-08-15',
      type: 'Attended'
    }
  ],
  conferences: [
    {
      name: 'International Conference on Machine Learning',
      location: 'Hawaii, USA',
      year: 2023,
      role: 'Speaker'
    }
  ],
  
  budgetAllocated: 5000000,
  budgetUtilized: 3200000,
  labsManaged: ['AI Research Lab', 'Computer Vision Lab'],
  
  teachingRating: 4.8,
  researchImpact: 8.7,
  publicationCount: 25,
  citationCount: 456,
  
  linkedin: 'https://linkedin.com/in/priya-sharma-phd',
  googleScholar: 'https://scholar.google.com/citations?user=xyz123',
  researchGate: 'https://researchgate.net/profile/Priya-Sharma',
  orcid: 'https://orcid.org/0000-0000-0000-0000',
  
  emergencyContact: {
    name: 'Rajesh Sharma',
    relationship: 'Spouse',
    phone: '+91 9876543213',
    email: 'rajesh.sharma@gmail.com'
  },
  
  profileCompletion: 95,
  lastUpdated: '2024-01-15'
};