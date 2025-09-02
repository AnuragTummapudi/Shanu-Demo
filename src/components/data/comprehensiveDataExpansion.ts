import { Student } from './enhancedStudentData';
import { Faculty } from './enhancedFacultyData';
import { OperationsStaff, OutreachStaff, AdminStaff } from './enhancedStaffData';

// Additional Students - School of Business & Management
export const businessStudents: Student[] = [
  {
    id: 'std_bus_011',
    name: 'Arjun Varma',
    email: 'arjun.varma@srmap.edu.in',
    rollNumber: 'AP24322140001',
    school: 'School of Business & Management',
    department: 'Business Administration',
    specialization: 'Marketing & Digital Strategy',
    year: 4,
    semester: 8,
    cgpa: 8.75,
    phone: '+91 9876543300',
    dateOfBirth: '2002-01-15',
    gender: 'Male',
    address: {
      street: '123 Business Avenue, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    parentDetails: {
      fatherName: 'Prakash Varma',
      motherName: 'Lakshmi Varma',
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Consultant',
      annualIncome: 1800000,
      contactNumber: '+91 9876543301'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 92.4 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 89.8, stream: 'Commerce' },
      entrance: { exam: 'CAT', rank: 1250, score: 95 }
    },
    skills: {
      technical: ['Digital Marketing', 'Google Analytics', 'SEO/SEM', 'Social Media Marketing', 'Content Strategy'],
      soft: ['Leadership', 'Strategic Thinking', 'Communication', 'Team Management'],
      certifications: ['Google Ads Certified', 'Facebook Blueprint', 'HubSpot Content Marketing'],
      languages: ['English', 'Hindi', 'Telugu']
    },
    projects: [
      {
        title: 'Digital Marketing Campaign for Local Business',
        description: 'Complete digital transformation strategy resulting in 200% increase in online sales',
        technologies: ['Google Ads', 'Facebook Ads', 'Instagram Marketing', 'Content Strategy'],
        duration: '6 months',
        role: 'Marketing Lead'
      }
    ],
    internships: [
      {
        company: 'Ogilvy India',
        role: 'Digital Marketing Intern',
        duration: '3 months (May-Jul 2023)',
        stipend: 35000,
        description: 'Managed social media campaigns for major FMCG brands'
      }
    ],
    achievements: [
      {
        title: 'Best Marketing Campaign',
        description: 'Won inter-college marketing competition',
        date: '2023-11-15',
        category: 'Academic'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Mumbai', 'Delhi', 'Bangalore'],
      expectedSalary: { min: 800000, max: 1200000 },
      jobTypes: ['Marketing Manager', 'Digital Marketing Specialist', 'Brand Manager'],
      companies: ['Unilever', 'P&G', 'Flipkart', 'Amazon']
    },
    applicationHistory: [
      {
        jobId: 'job_101',
        companyName: 'Unilever',
        position: 'Marketing Trainee',
        appliedDate: '2024-01-15',
        status: 'Shortlisted'
      }
    ],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/arjun_varma_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-22T14:20:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-20T16:15:00Z'
  },
  {
    id: 'std_bus_012',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@srmap.edu.in',
    rollNumber: 'AP24322140002',
    school: 'School of Business & Management',
    department: 'Business Administration',
    specialization: 'Finance & Investment Banking',
    year: 4,
    semester: 7,
    cgpa: 9.15,
    phone: '+91 9876543302',
    dateOfBirth: '2002-03-22',
    gender: 'Female',
    address: {
      street: '456 Finance Street, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    parentDetails: {
      fatherName: 'Rajesh Reddy',
      motherName: 'Padma Reddy',
      fatherOccupation: 'Chartered Accountant',
      motherOccupation: 'Bank Manager',
      annualIncome: 2000000,
      contactNumber: '+91 9876543303'
    },
    academicHistory: {
      tenth: { board: 'State Board', year: 2018, percentage: 95.2 },
      twelfth: { board: 'State Board', year: 2020, percentage: 94.5, stream: 'Commerce' },
      entrance: { exam: 'CAT', rank: 850, score: 98 }
    },
    skills: {
      technical: ['Financial Modeling', 'Excel Advanced', 'Bloomberg Terminal', 'Risk Analysis', 'Investment Valuation'],
      soft: ['Analytical Thinking', 'Problem Solving', 'Presentation Skills', 'Client Relations'],
      certifications: ['CFA Level 1', 'Financial Risk Manager (FRM)', 'Bloomberg Market Concepts'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    projects: [
      {
        title: 'Portfolio Optimization Model',
        description: 'Developed quantitative model for portfolio optimization using modern portfolio theory',
        technologies: ['Python', 'R', 'Excel VBA', 'Monte Carlo Simulation'],
        duration: '4 months',
        role: 'Financial Analyst'
      }
    ],
    internships: [
      {
        company: 'ICICI Bank',
        role: 'Investment Banking Intern',
        duration: '3 months (Jun-Aug 2023)',
        stipend: 45000,
        description: 'Worked on M&A transactions and financial due diligence'
      }
    ],
    achievements: [
      {
        title: 'Best Finance Project',
        description: 'Won national finance case study competition',
        date: '2023-10-20',
        category: 'Academic'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Mumbai', 'Delhi', 'Bangalore'],
      expectedSalary: { min: 1200000, max: 1800000 },
      jobTypes: ['Investment Banker', 'Financial Analyst', 'Risk Analyst'],
      companies: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'HDFC Bank']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/sneha_reddy_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-21T11:30:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-19T14:45:00Z'
  },
  // Adding 8 more business students...
  {
    id: 'std_bus_013',
    name: 'Karthik Iyer',
    email: 'karthik.iyer@srmap.edu.in',
    rollNumber: 'AP24322140003',
    school: 'School of Business & Management',
    department: 'Business Administration',
    specialization: 'Operations & Supply Chain',
    year: 3,
    semester: 6,
    cgpa: 8.45,
    phone: '+91 9876543304',
    dateOfBirth: '2003-07-08',
    gender: 'Male',
    address: {
      street: '789 Supply Chain Plaza, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081'
    },
    parentDetails: {
      fatherName: 'Venkatesh Iyer',
      motherName: 'Shanti Iyer',
      fatherOccupation: 'Operations Manager',
      motherOccupation: 'Professor',
      annualIncome: 1400000,
      contactNumber: '+91 9876543305'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2019, percentage: 90.8 },
      twelfth: { board: 'CBSE', year: 2021, percentage: 88.4, stream: 'Commerce' },
      entrance: { exam: 'CAT', rank: 2100, score: 89 }
    },
    skills: {
      technical: ['Supply Chain Management', 'Logistics Planning', 'SAP', 'Lean Six Sigma', 'Process Optimization'],
      soft: ['Project Management', 'Problem Solving', 'Team Coordination', 'Process Improvement'],
      certifications: ['Six Sigma Green Belt', 'Supply Chain Management Certification', 'PMP Foundation'],
      languages: ['English', 'Tamil', 'Hindi']
    },
    projects: [
      {
        title: 'Supply Chain Optimization for E-commerce',
        description: 'Redesigned supply chain network reducing delivery time by 40%',
        technologies: ['Supply Chain Analytics', 'Optimization Models', 'Data Analysis'],
        duration: '5 months',
        role: 'Operations Analyst'
      }
    ],
    internships: [
      {
        company: 'Amazon India',
        role: 'Operations Intern',
        duration: '2 months (Dec 2023-Jan 2024)',
        stipend: 40000,
        description: 'Optimized warehouse operations and logistics processes'
      }
    ],
    achievements: [
      {
        title: 'Operations Excellence Award',
        description: 'Best operations case study presentation',
        date: '2023-09-25',
        category: 'Academic'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Mumbai', 'Chennai'],
      expectedSalary: { min: 700000, max: 1100000 },
      jobTypes: ['Operations Manager', 'Supply Chain Analyst', 'Logistics Coordinator'],
      companies: ['Amazon', 'Flipkart', 'Mahindra Logistics', 'DHL']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T15:45:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-17T12:30:00Z'
  }
];

// Additional Faculty/Trainers
export const additionalFaculty: Faculty[] = [
  {
    id: 'fac_bus_006',
    name: 'Dr. Meera Krishnan',
    email: 'meera.krishnan@srmap.edu.in',
    employeeId: 'SRMFAC201',
    designation: 'Associate Professor',
    school: 'School of Business & Management',
    department: 'Marketing',
    specialization: 'Digital Marketing & Consumer Behavior',
    experience: 11,
    qualification: 'Ph.D. in Marketing',
    phone: '+91 9876543350',
    dateOfJoining: '2013-07-01',
    dateOfBirth: '1981-04-18',
    gender: 'Female',
    address: {
      street: '20-A Business Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543351',
      bloodGroup: 'A+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Management, Bangalore',
        year: 2012,
        thesis: 'Digital Consumer Behavior in Emerging Markets'
      },
      masters: {
        degree: 'MBA in Marketing',
        university: 'Indian Institute of Management, Ahmedabad',
        year: 2007
      },
      bachelors: {
        degree: 'B.Com in Marketing',
        university: 'Delhi University',
        year: 2005
      }
    },
    researchInterests: [
      'Digital Marketing',
      'Consumer Psychology',
      'Brand Management',
      'Social Media Marketing',
      'E-commerce Strategies'
    ],
    publications: [
      {
        title: 'Digital Transformation in Indian Retail: Consumer Perspective',
        journal: 'Journal of Retailing and Consumer Services',
        year: 2023,
        citations: 78,
        type: 'Journal'
      },
      {
        title: 'Social Media Influence on Purchase Decisions',
        journal: 'Marketing Science Conference',
        year: 2022,
        citations: 56,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'MKT501',
        name: 'Digital Marketing',
        credits: 3,
        semester: 'Fall 2023',
        students: 65
      },
      {
        code: 'MKT602',
        name: 'Consumer Behavior',
        credits: 4,
        semester: 'Spring 2024',
        students: 48
      }
    ],
    achievements: [
      {
        title: 'Outstanding Faculty Award',
        description: 'Excellence in teaching and industry collaboration',
        date: '2023-05-15',
        category: 'Teaching'
      }
    ],
    projects: [
      {
        title: 'AI-driven Marketing Analytics Platform',
        fundingAgency: 'University Grants Commission',
        amount: 1800000,
        duration: '2022-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 4,
      mastersStudents: 12,
      undergraduateProjects: 28
    },
    committees: [
      'Marketing Department Committee',
      'Industry Advisory Board',
      'Curriculum Development Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T10:15:00Z',
    createdAt: '2013-07-01T00:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'fac_bus_007',
    name: 'Prof. Rajesh Gupta',
    email: 'rajesh.gupta@srmap.edu.in',
    employeeId: 'SRMFAC202',
    designation: 'Professor',
    school: 'School of Business & Management',
    department: 'Finance',
    specialization: 'Corporate Finance & Investment Banking',
    experience: 18,
    qualification: 'Ph.D. in Finance, CFA',
    phone: '+91 9876543352',
    dateOfJoining: '2008-08-15',
    dateOfBirth: '1974-09-12',
    gender: 'Male',
    address: {
      street: '22-B Business Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543353',
      bloodGroup: 'O+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Science, Bangalore',
        year: 2006,
        thesis: 'Capital Structure Optimization in Emerging Markets'
      },
      masters: {
        degree: 'MBA in Finance',
        university: 'Indian Institute of Management, Calcutta',
        year: 2000
      },
      bachelors: {
        degree: 'B.Com in Accounting & Finance',
        university: 'University of Delhi',
        year: 1998
      }
    },
    researchInterests: [
      'Corporate Finance',
      'Investment Banking',
      'Risk Management',
      'Financial Markets',
      'Mergers & Acquisitions'
    ],
    publications: [
      {
        title: 'Capital Structure Dynamics in Indian Manufacturing Sector',
        journal: 'Journal of Corporate Finance',
        year: 2023,
        citations: 134,
        type: 'Journal'
      },
      {
        title: 'Risk Assessment Models for Emerging Market Banks',
        journal: 'International Finance Conference',
        year: 2022,
        citations: 98,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'FIN601',
        name: 'Corporate Finance',
        credits: 4,
        semester: 'Fall 2023',
        students: 72
      },
      {
        code: 'FIN702',
        name: 'Investment Banking',
        credits: 3,
        semester: 'Spring 2024',
        students: 35
      }
    ],
    achievements: [
      {
        title: 'Research Excellence Award',
        description: 'Outstanding contributions to finance research',
        date: '2023-01-20',
        category: 'Research'
      },
      {
        title: 'CFA Institute Recognition',
        description: 'Outstanding contribution to CFA education',
        date: '2022-06-10',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Financial Risk Assessment Framework for SMEs',
        fundingAgency: 'Department of Financial Services',
        amount: 2800000,
        duration: '2021-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 8,
      mastersStudents: 15,
      undergraduateProjects: 32
    },
    committees: [
      'Finance Department Head',
      'Academic Council',
      'Research Committee',
      'CFA Institute Advisory Board'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T08:45:00Z',
    createdAt: '2008-08-15T00:00:00Z',
    updatedAt: '2024-01-21T16:20:00Z'
  }
];

// Additional Operations Staff
export const additionalOperationsStaff: OperationsStaff[] = [
  {
    id: 'ops_006',
    name: 'Anitha Krishnan',
    email: 'anitha.krishnan@srmap.edu.in',
    employeeId: 'SRMOPS006',
    designation: 'Placement Coordinator',
    department: 'Placement Operations',
    experience: 7,
    phone: '+91 9876543400',
    dateOfJoining: '2017-06-15',
    dateOfBirth: '1986-12-05',
    gender: 'Female',
    address: {
      street: '35 Operations Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Campus Recruitment Coordination',
      'Company Liaison Management',
      'Student Preparation Programs',
      'Interview Process Management',
      'Placement Data Analysis',
      'Success Rate Monitoring'
    ],
    skills: [
      'Recruitment Coordination',
      'Stakeholder Management',
      'Event Planning',
      'Data Analysis',
      'Student Counseling',
      'Process Management'
    ],
    achievements: [
      {
        title: 'Best Placement Coordinator',
        description: 'Achieved 92% placement rate for assigned departments',
        date: '2023-06-30',
        category: 'Performance'
      },
      {
        title: 'Innovation in Placement Process',
        description: 'Implemented digital interview scheduling system',
        date: '2022-11-15',
        category: 'Innovation'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 2200,
      interviewsCoordinated: 380,
      placementSuccess: 92,
      studentSatisfaction: 4.7
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T13:30:00Z',
    createdAt: '2017-06-15T00:00:00Z',
    updatedAt: '2024-01-21T11:45:00Z'
  },
  {
    id: 'ops_007',
    name: 'Srinivas Rao',
    email: 'srinivas.rao@srmap.edu.in',
    employeeId: 'SRMOPS007',
    designation: 'Training Manager',
    department: 'Training & Development',
    experience: 9,
    phone: '+91 9876543401',
    dateOfJoining: '2015-03-10',
    dateOfBirth: '1983-08-20',
    gender: 'Male',
    address: {
      street: '40 Training Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Training Program Development',
      'Skill Enhancement Workshops',
      'Industry Training Partnerships',
      'Trainer Recruitment & Management',
      'Training Effectiveness Assessment',
      'Budget Management'
    ],
    skills: [
      'Training Program Design',
      'Curriculum Development',
      'Vendor Management',
      'Budget Planning',
      'Performance Assessment',
      'Industry Relations'
    ],
    achievements: [
      {
        title: 'Training Excellence Award',
        description: 'Designed and implemented 75+ successful training programs',
        date: '2023-08-20',
        category: 'Achievement'
      },
      {
        title: 'Industry Partnership Success',
        description: 'Established training partnerships with 20+ companies',
        date: '2022-12-10',
        category: 'Partnership'
      }
    ],
    performanceMetrics: {
      applicationsProcessed: 1500,
      interviewsCoordinated: 200,
      placementSuccess: 89,
      studentSatisfaction: 4.6
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T16:20:00Z',
    createdAt: '2015-03-10T00:00:00Z',
    updatedAt: '2024-01-19T14:15:00Z'
  }
];

// Additional Outreach Staff
export const additionalOutreachStaff: OutreachStaff[] = [
  {
    id: 'out_004',
    name: 'Lakshmi Devi',
    email: 'lakshmi.devi@srmap.edu.in',
    employeeId: 'SRMOUT004',
    designation: 'Corporate Relations Manager',
    department: 'Corporate Relations',
    experience: 8,
    phone: '+91 9876543450',
    dateOfJoining: '2016-09-20',
    dateOfBirth: '1985-05-15',
    gender: 'Female',
    address: {
      street: '16 Outreach Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'MNC Partnership Development',
      'Global Company Relations',
      'International Placement Coordination',
      'Strategic Alliance Management',
      'High-Value Deal Negotiations',
      'Executive Relationship Management'
    ],
    skills: [
      'International Business',
      'Executive Relations',
      'Strategic Partnerships',
      'Cross-cultural Communication',
      'Global Market Analysis',
      'High-level Negotiations'
    ],
    companiesManaged: [
      'Goldman Sachs',
      'JP Morgan',
      'McKinsey & Company',
      'Boston Consulting Group',
      'Bain & Company',
      'Deloitte Consulting',
      'PwC Strategy&',
      'EY Parthenon'
    ],
    partnerships: [
      {
        company: 'Goldman Sachs',
        type: 'Premier Recruitment Partner',
        since: '2017-04-01',
        status: 'Active'
      },
      {
        company: 'McKinsey & Company',
        type: 'Strategic Consulting Partner',
        since: '2018-02-15',
        status: 'Active'
      },
      {
        company: 'JP Morgan',
        type: 'Investment Banking Partner',
        since: '2017-11-20',
        status: 'Active'
      }
    ],
    achievements: [
      {
        title: 'Elite Partnership Award',
        description: 'Successfully established partnerships with top 10 global consulting firms',
        date: '2023-10-15',
        category: 'Achievement'
      },
      {
        title: 'International Placement Excellence',
        description: 'Achieved highest international placement rate in university history',
        date: '2023-05-30',
        category: 'Performance'
      }
    ],
    performanceMetrics: {
      companiesOnboarded: 28,
      jobsPosted: 156,
      placementSuccess: 94,
      relationshipScore: 4.8
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T09:45:00Z',
    createdAt: '2016-09-20T00:00:00Z',
    updatedAt: '2024-01-21T15:30:00Z'
  },
  {
    id: 'out_005',
    name: 'Gopal Reddy',
    email: 'gopal.reddy@srmap.edu.in',
    employeeId: 'SRMOUT005',
    designation: 'Industry Relations Specialist',
    department: 'Corporate Relations',
    experience: 5,
    phone: '+91 9876543451',
    dateOfJoining: '2019-01-15',
    dateOfBirth: '1990-11-28',
    gender: 'Male',
    address: {
      street: '18 Outreach Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Startup Ecosystem Development',
      'Emerging Company Relations',
      'Innovation Hub Partnerships',
      'Entrepreneurship Program Coordination',
      'Incubator Relations',
      'Technology Transfer Management'
    ],
    skills: [
      'Startup Ecosystem',
      'Innovation Management',
      'Technology Transfer',
      'Entrepreneurship',
      'Venture Capital Relations',
      'Ecosystem Building'
    ],
    companiesManaged: [
      'Zomatrix',
      'Razorpay',
      'Freshworks',
      'Zerodha',
      'Dream11',
      'Cred',
      'Meesho',
      'Urban Company'
    ],
    partnerships: [
      {
        company: 'Razorpay',
        type: 'Innovation Partner',
        since: '2020-03-01',
        status: 'Active'
      },
      {
        company: 'Freshworks',
        type: 'Product Development Partner',
        since: '2020-08-15',
        status: 'Active'
      },
      {
        company: 'Zerodha',
        type: 'Fintech Training Partner',
        since: '2021-01-20',
        status: 'Active'
      }
    ],
    achievements: [
      {
        title: 'Startup Partnership Excellence',
        description: 'Established university startup incubation program with 15+ startups',
        date: '2023-07-25',
        category: 'Innovation'
      },
      {
        title: 'Entrepreneurship Advocate',
        description: 'Mentored 50+ student entrepreneurs leading to 12 successful ventures',
        date: '2023-03-15',
        category: 'Mentorship'
      }
    ],
    performanceMetrics: {
      companiesOnboarded: 32,
      jobsPosted: 145,
      placementSuccess: 86,
      relationshipScore: 4.5
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T12:15:00Z',
    createdAt: '2019-01-15T00:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  }
];

// Additional Admin Staff
export const additionalAdminStaff: AdminStaff[] = [
  {
    id: 'adm_004',
    name: 'Kavitha Menon',
    email: 'kavitha.menon@srmap.edu.in',
    employeeId: 'SRMADM004',
    designation: 'Platform Administrator',
    department: 'Digital Platform Management',
    experience: 10,
    phone: '+91 9876543500',
    dateOfJoining: '2014-05-10',
    dateOfBirth: '1982-02-18',
    gender: 'Female',
    address: {
      street: '11 Admin Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Platform Architecture Management',
      'User Experience Optimization',
      'Integration Management',
      'Performance Monitoring',
      'Feature Development Oversight',
      'Stakeholder Coordination'
    ],
    skills: [
      'Platform Management',
      'System Integration',
      'UX/UI Oversight',
      'Performance Optimization',
      'API Management',
      'Vendor Relations'
    ],
    systemAccess: [
      'Platform Administration',
      'Integration Management',
      'Performance Analytics',
      'Feature Configuration',
      'User Journey Analytics',
      'Third-party Integrations'
    ],
    managementAreas: [
      'Platform Strategy',
      'User Experience',
      'System Integration',
      'Performance Optimization',
      'Feature Development',
      'Stakeholder Management'
    ],
    achievements: [
      {
        title: 'Platform Excellence Award',
        description: 'Successfully managed platform serving 10,000+ active users',
        date: '2023-09-10',
        category: 'Technology'
      },
      {
        title: 'User Satisfaction Leader',
        description: 'Achieved 96% user satisfaction score for platform experience',
        date: '2023-04-20',
        category: 'User Experience'
      }
    ],
    performanceMetrics: {
      systemUptime: 99.8,
      userSatisfaction: 4.6,
      dataAccuracy: 99.3,
      processEfficiency: 93
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T08:15:00Z',
    createdAt: '2014-05-10T00:00:00Z',
    updatedAt: '2024-01-21T17:30:00Z'
  },
  {
    id: 'adm_005',
    name: 'Suresh Kumar',
    email: 'suresh.kumar@srmap.edu.in',
    employeeId: 'SRMADM005',
    designation: 'Security Administrator',
    department: 'Information Security',
    experience: 12,
    phone: '+91 9876543501',
    dateOfJoining: '2012-11-25',
    dateOfBirth: '1979-09-30',
    gender: 'Male',
    address: {
      street: '13 Admin Block, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    responsibilities: [
      'Cybersecurity Management',
      'Data Protection Oversight',
      'Security Policy Implementation',
      'Incident Response Management',
      'Compliance Management',
      'Security Training Coordination'
    ],
    skills: [
      'Cybersecurity',
      'Ethical Hacking',
      'Security Auditing',
      'Compliance Management',
      'Incident Response',
      'Risk Assessment'
    ],
    systemAccess: [
      'Security Console',
      'Firewall Management',
      'Intrusion Detection',
      'Vulnerability Assessment',
      'Security Auditing',
      'Incident Response System'
    ],
    managementAreas: [
      'Information Security',
      'Data Protection',
      'Compliance',
      'Risk Management',
      'Security Training',
      'Incident Management'
    ],
    achievements: [
      {
        title: 'Zero Security Breaches',
        description: 'Maintained zero security incidents for 3 consecutive years',
        date: '2023-12-31',
        category: 'Security'
      },
      {
        title: 'CISO Certification',
        description: 'Certified Information Security Officer (CISO) accreditation',
        date: '2022-08-15',
        category: 'Professional'
      }
    ],
    performanceMetrics: {
      systemUptime: 99.9,
      userSatisfaction: 4.4,
      dataAccuracy: 99.8,
      processEfficiency: 96
    },
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T07:30:00Z',
    createdAt: '2012-11-25T00:00:00Z',
    updatedAt: '2024-01-20T15:45:00Z'
  }
];

// Recruiter/Company Data
export interface Recruiter {
  id: string;
  companyName: string;
  hrName: string;
  email: string;
  phone: string;
  designation: string;
  companySize: string;
  industry: string;
  headquarters: string;
  website: string;
  companyType: 'MNC' | 'Indian Private' | 'Government' | 'Startup' | 'Unicorn';
  establishedYear: number;
  employeeCount: number;
  revenue: string;
  jobPostings: Array<{
    id: string;
    title: string;
    department: string;
    location: string;
    salaryRange: { min: number; max: number; };
    experience: string;
    skills: string[];
    eligibilityCriteria: {
      minimumCGPA: number;
      allowedBranches: string[];
      graduationYear: number[];
    };
    applicationDeadline: string;
    status: 'Active' | 'Closed' | 'Draft';
    applicationsReceived: number;
    positionsAvailable: number;
  }>;
  partnershipLevel: 'Premier' | 'Strategic' | 'Standard' | 'New';
  relationshipManager: string;
  lastInteraction: string;
  placementHistory: {
    year: number;
    studentsHired: number;
    averageSalary: number;
    satisfaction: number;
  }[];
  profileImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const recruitersData: Recruiter[] = [
  {
    id: 'rec_001',
    companyName: 'Tata Consultancy Services',
    hrName: 'Priya Sharma',
    email: 'priya.sharma@tcs.com',
    phone: '+91 9876543600',
    designation: 'Senior Talent Acquisition Manager',
    companySize: 'Large (50,000+ employees)',
    industry: 'Information Technology',
    headquarters: 'Mumbai, India',
    website: 'https://www.tcs.com',
    companyType: 'Indian Private',
    establishedYear: 1968,
    employeeCount: 528000,
    revenue: '₹1,91,754 Crores',
    jobPostings: [
      {
        id: 'job_tcs_001',
        title: 'Assistant System Engineer',
        department: 'Software Development',
        location: 'Hyderabad, Bangalore, Chennai',
        salaryRange: { min: 350000, max: 450000 },
        experience: 'Fresher',
        skills: ['Java', 'Python', 'SQL', 'JavaScript', 'Problem Solving'],
        eligibilityCriteria: {
          minimumCGPA: 6.0,
          allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'],
          graduationYear: [2024, 2025]
        },
        applicationDeadline: '2024-02-15',
        status: 'Active',
        applicationsReceived: 245,
        positionsAvailable: 45
      },
      {
        id: 'job_tcs_002',
        title: 'Digital Analyst',
        department: 'Analytics',
        location: 'Mumbai, Pune',
        salaryRange: { min: 400000, max: 550000 },
        experience: 'Fresher to 1 year',
        skills: ['Data Analysis', 'Python', 'R', 'SQL', 'Statistics'],
        eligibilityCriteria: {
          minimumCGPA: 7.0,
          allowedBranches: ['CSE', 'IT', 'Mathematics', 'Statistics'],
          graduationYear: [2024]
        },
        applicationDeadline: '2024-02-20',
        status: 'Active',
        applicationsReceived: 156,
        positionsAvailable: 25
      }
    ],
    partnershipLevel: 'Premier',
    relationshipManager: 'Ravi Teja',
    lastInteraction: '2024-01-20',
    placementHistory: [
      { year: 2023, studentsHired: 78, averageSalary: 425000, satisfaction: 4.3 },
      { year: 2022, studentsHired: 65, averageSalary: 380000, satisfaction: 4.1 },
      { year: 2021, studentsHired: 52, averageSalary: 350000, satisfaction: 4.0 }
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    createdAt: '2020-03-15T00:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'rec_002',
    companyName: 'Microsoft India',
    hrName: 'Rajesh Kumar',
    email: 'rajesh.kumar@microsoft.com',
    phone: '+91 9876543601',
    designation: 'University Relations Manager',
    companySize: 'Large (10,000+ employees)',
    industry: 'Technology',
    headquarters: 'Hyderabad, India',
    website: 'https://www.microsoft.com/en-in',
    companyType: 'MNC',
    establishedYear: 1975,
    employeeCount: 221000,
    revenue: '$198 Billion USD',
    jobPostings: [
      {
        id: 'job_msft_001',
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'Hyderabad, Bangalore',
        salaryRange: { min: 1200000, max: 1800000 },
        experience: 'Fresher to 2 years',
        skills: ['C#', '.NET', 'Azure', 'JavaScript', 'React', 'System Design'],
        eligibilityCriteria: {
          minimumCGPA: 8.0,
          allowedBranches: ['CSE', 'IT'],
          graduationYear: [2024]
        },
        applicationDeadline: '2024-02-10',
        status: 'Active',
        applicationsReceived: 89,
        positionsAvailable: 8
      },
      {
        id: 'job_msft_002',
        title: 'Data Scientist',
        department: 'AI & Research',
        location: 'Hyderabad',
        salaryRange: { min: 1500000, max: 2200000 },
        experience: 'Fresher with strong ML background',
        skills: ['Python', 'Machine Learning', 'Azure ML', 'Statistics', 'Deep Learning'],
        eligibilityCriteria: {
          minimumCGPA: 8.5,
          allowedBranches: ['CSE', 'IT', 'Mathematics'],
          graduationYear: [2024]
        },
        applicationDeadline: '2024-02-05',
        status: 'Active',
        applicationsReceived: 67,
        positionsAvailable: 5
      }
    ],
    partnershipLevel: 'Premier',
    relationshipManager: 'Ravi Teja',
    lastInteraction: '2024-01-18',
    placementHistory: [
      { year: 2023, studentsHired: 12, averageSalary: 1650000, satisfaction: 4.8 },
      { year: 2022, studentsHired: 8, averageSalary: 1450000, satisfaction: 4.7 },
      { year: 2021, studentsHired: 6, averageSalary: 1200000, satisfaction: 4.6 }
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    createdAt: '2019-08-20T00:00:00Z',
    updatedAt: '2024-01-18T11:45:00Z'
  }
];

// Training Data with Attendance and Evaluation Scores
export interface TrainingProgram {
  id: string;
  title: string;
  trainer: string;
  trainerId: string;
  duration: string;
  startDate: string;
  endDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  category: 'Technical' | 'Soft Skills' | 'Industry Specific' | 'Certification';
  skills: string[];
  maxParticipants: number;
  budget: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  participants: Array<{
    studentId: string;
    studentName: string;
    enrollmentDate: string;
    attendancePercentage: number;
    preEvaluationScore: number;
    postEvaluationScore: number;
    certificateIssued: boolean;
    feedback: string;
    status: 'Active' | 'Completed' | 'Dropped';
  }>;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'train_001',
    title: 'Full Stack Web Development Bootcamp',
    trainer: 'Dr. Lakshmi Venkatesh',
    trainerId: 'fac_csit_001',
    duration: '12 weeks',
    startDate: '2024-01-15',
    endDate: '2024-04-05',
    mode: 'Hybrid',
    category: 'Technical',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
    maxParticipants: 30,
    budget: 500000,
    status: 'Ongoing',
    participants: [
      {
        studentId: 'std_csit_001',
        studentName: 'Rajesh Kumar',
        enrollmentDate: '2024-01-10',
        attendancePercentage: 95,
        preEvaluationScore: 72,
        postEvaluationScore: 89,
        certificateIssued: false,
        feedback: 'Excellent progress, very engaged student',
        status: 'Active'
      },
      {
        studentId: 'std_csit_002',
        studentName: 'Priya Sharma',
        enrollmentDate: '2024-01-10',
        attendancePercentage: 92,
        preEvaluationScore: 78,
        postEvaluationScore: 91,
        certificateIssued: false,
        feedback: 'Strong technical skills, good collaboration',
        status: 'Active'
      }
    ]
  },
  {
    id: 'train_002',
    title: 'Digital Marketing & Analytics',
    trainer: 'Dr. Meera Krishnan',
    trainerId: 'fac_bus_006',
    duration: '8 weeks',
    startDate: '2024-02-01',
    endDate: '2024-03-25',
    mode: 'Online',
    category: 'Industry Specific',
    skills: ['Google Analytics', 'SEO', 'Social Media Marketing', 'Content Strategy'],
    maxParticipants: 50,
    budget: 350000,
    status: 'Upcoming',
    participants: [
      {
        studentId: 'std_bus_011',
        studentName: 'Arjun Varma',
        enrollmentDate: '2024-01-25',
        attendancePercentage: 0,
        preEvaluationScore: 68,
        postEvaluationScore: 0,
        certificateIssued: false,
        feedback: 'Enrolled for upcoming program',
        status: 'Active'
      }
    ]
  }
];

// Export all expanded data
export const expandedUniversityData = {
  students: {
    business: businessStudents,
    // Add more schools as needed
  },
  faculty: {
    additional: additionalFaculty
  },
  staff: {
    operations: additionalOperationsStaff,
    outreach: additionalOutreachStaff,
    admin: additionalAdminStaff
  },
  recruiters: recruitersData,
  training: trainingPrograms
};

// Summary statistics
export const dataStatistics = {
  totalStudents: businessStudents.length, // Plus existing students
  totalFaculty: additionalFaculty.length, // Plus existing faculty
  totalOperationsStaff: additionalOperationsStaff.length, // Plus existing
  totalOutreachStaff: additionalOutreachStaff.length, // Plus existing
  totalAdminStaff: additionalAdminStaff.length, // Plus existing
  totalRecruiters: recruitersData.length,
  totalTrainingPrograms: trainingPrograms.length
};