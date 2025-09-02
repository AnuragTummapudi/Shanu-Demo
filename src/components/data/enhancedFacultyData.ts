export interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: 'Assistant Professor' | 'Associate Professor' | 'Professor' | 'Dean' | 'Head of Department';
  school: string;
  department: string;
  specialization: string;
  experience: number;
  qualification: string;
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
  personalDetails: {
    maritalStatus: string;
    emergencyContact: string;
    bloodGroup: string;
  };
  academicBackground: {
    phd: { university: string; year: number; thesis: string; };
    masters: { degree: string; university: string; year: number; };
    bachelors: { degree: string; university: string; year: number; };
  };
  researchInterests: string[];
  publications: Array<{
    title: string;
    journal: string;
    year: number;
    citations: number;
    type: 'Journal' | 'Conference' | 'Book Chapter';
  }>;
  courses: Array<{
    code: string;
    name: string;
    credits: number;
    semester: string;
    students: number;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    category: string;
  }>;
  projects: Array<{
    title: string;
    fundingAgency: string;
    amount: number;
    duration: string;
    status: 'Ongoing' | 'Completed' | 'Approved';
  }>;
  mentorship: {
    phdStudents: number;
    mastersStudents: number;
    undergraduateProjects: number;
  };
  committees: string[];
  profileImage: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

// Faculty from School of Computing & Information Technology
export const csitFaculty: Faculty[] = [
  {
    id: 'fac_csit_001',
    name: 'Dr. Lakshmi Venkatesh',
    email: 'lakshmi.venkatesh@srmap.edu.in',
    employeeId: 'SRMFAC001',
    designation: 'Professor',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Machine Learning & Artificial Intelligence',
    experience: 15,
    qualification: 'Ph.D. in Computer Science',
    phone: '+91 9876543250',
    dateOfJoining: '2010-07-15',
    dateOfBirth: '1978-05-10',
    gender: 'Female',
    address: {
      street: '12-A Faculty Colony, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543251',
      bloodGroup: 'O+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Science, Bangalore',
        year: 2008,
        thesis: 'Deep Learning Approaches for Natural Language Processing'
      },
      masters: {
        degree: 'M.Tech in Computer Science',
        university: 'Indian Institute of Technology, Madras',
        year: 2003
      },
      bachelors: {
        degree: 'B.Tech in Computer Science',
        university: 'National Institute of Technology, Warangal',
        year: 2001
      }
    },
    researchInterests: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'AI Ethics'
    ],
    publications: [
      {
        title: 'Advanced Deep Learning Techniques for Sentiment Analysis',
        journal: 'IEEE Transactions on Neural Networks',
        year: 2023,
        citations: 145,
        type: 'Journal'
      },
      {
        title: 'Ethical AI: Challenges and Solutions in Modern Computing',
        journal: 'ACM Computing Surveys',
        year: 2022,
        citations: 98,
        type: 'Journal'
      },
      {
        title: 'Machine Learning Applications in Healthcare',
        journal: 'International Conference on Machine Learning',
        year: 2023,
        citations: 67,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'CS601',
        name: 'Machine Learning',
        credits: 4,
        semester: 'Fall 2023',
        students: 45
      },
      {
        code: 'CS701',
        name: 'Deep Learning',
        credits: 3,
        semester: 'Spring 2024',
        students: 35
      },
      {
        code: 'CS501',
        name: 'Artificial Intelligence',
        credits: 4,
        semester: 'Fall 2023',
        students: 60
      }
    ],
    achievements: [
      {
        title: 'Best Faculty Award',
        description: 'Excellence in teaching and research',
        date: '2023-08-15',
        category: 'Academic'
      },
      {
        title: 'IEEE Fellow',
        description: 'Elected as IEEE Fellow for contributions to AI',
        date: '2022-01-10',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'AI-Powered Healthcare Diagnosis System',
        fundingAgency: 'Department of Science and Technology',
        amount: 2500000,
        duration: '2022-2025',
        status: 'Ongoing'
      },
      {
        title: 'Natural Language Processing for Indian Languages',
        fundingAgency: 'AICTE',
        amount: 1500000,
        duration: '2021-2023',
        status: 'Completed'
      }
    ],
    mentorship: {
      phdStudents: 8,
      mastersStudents: 12,
      undergraduateProjects: 25
    },
    committees: [
      'Academic Council',
      'Research Committee',
      'PhD Admission Committee',
      'IEEE Computer Society Chapter'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T09:30:00Z',
    createdAt: '2010-07-15T00:00:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  },
  {
    id: 'fac_csit_002',
    name: 'Prof. Krishna Murthy',
    email: 'krishna.murthy@srmap.edu.in',
    employeeId: 'SRMFAC002',
    designation: 'Associate Professor',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Cybersecurity & Network Systems',
    experience: 12,
    qualification: 'Ph.D. in Information Security',
    phone: '+91 9876543252',
    dateOfJoining: '2012-08-01',
    dateOfBirth: '1980-11-25',
    gender: 'Male',
    address: {
      street: '15-B Faculty Colony, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543253',
      bloodGroup: 'B+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Statistical Institute, Kolkata',
        year: 2011,
        thesis: 'Advanced Cryptographic Protocols for Secure Communication'
      },
      masters: {
        degree: 'M.Tech in Information Security',
        university: 'Indian Institute of Technology, Delhi',
        year: 2006
      },
      bachelors: {
        degree: 'B.Tech in Computer Science',
        university: 'Jawaharlal Nehru Technological University',
        year: 2004
      }
    },
    researchInterests: [
      'Cybersecurity',
      'Network Security',
      'Cryptography',
      'Blockchain Technology',
      'IoT Security'
    ],
    publications: [
      {
        title: 'Blockchain-based Security Framework for IoT Networks',
        journal: 'IEEE Transactions on Information Forensics and Security',
        year: 2023,
        citations: 89,
        type: 'Journal'
      },
      {
        title: 'Advanced Intrusion Detection Systems using Machine Learning',
        journal: 'Computer Networks',
        year: 2022,
        citations: 76,
        type: 'Journal'
      }
    ],
    courses: [
      {
        code: 'CS651',
        name: 'Network Security',
        credits: 3,
        semester: 'Fall 2023',
        students: 40
      },
      {
        code: 'CS752',
        name: 'Cryptography and Security',
        credits: 4,
        semester: 'Spring 2024',
        students: 30
      }
    ],
    achievements: [
      {
        title: 'Outstanding Research Award',
        description: 'Recognition for cybersecurity research contributions',
        date: '2023-03-20',
        category: 'Research'
      }
    ],
    projects: [
      {
        title: 'Secure IoT Framework for Smart Cities',
        fundingAgency: 'Ministry of Electronics and IT',
        amount: 3000000,
        duration: '2023-2026',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 5,
      mastersStudents: 8,
      undergraduateProjects: 18
    },
    committees: [
      'IT Security Committee',
      'Research Ethics Committee',
      'Placement Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T11:45:00Z',
    createdAt: '2012-08-01T00:00:00Z',
    updatedAt: '2024-01-18T16:30:00Z'
  },
  {
    id: 'fac_csit_003',
    name: 'Dr. Sangeetha Ravi',
    email: 'sangeetha.ravi@srmap.edu.in',
    employeeId: 'SRMFAC003',
    designation: 'Assistant Professor',
    school: 'School of Computing & Information Technology',
    department: 'Information Technology',
    specialization: 'Data Science & Analytics',
    experience: 8,
    qualification: 'Ph.D. in Data Science',
    phone: '+91 9876543254',
    dateOfJoining: '2016-07-20',
    dateOfBirth: '1985-09-12',
    gender: 'Female',
    address: {
      street: '8-C Faculty Colony, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Single',
      emergencyContact: '+91 9876543255',
      bloodGroup: 'A+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Technology, Bombay',
        year: 2015,
        thesis: 'Big Data Analytics for Predictive Modeling in Healthcare'
      },
      masters: {
        degree: 'M.Tech in Computer Science',
        university: 'Indian Institute of Technology, Hyderabad',
        year: 2011
      },
      bachelors: {
        degree: 'B.E. in Computer Science',
        university: 'Anna University, Chennai',
        year: 2009
      }
    },
    researchInterests: [
      'Big Data Analytics',
      'Predictive Modeling',
      'Healthcare Informatics',
      'Statistical Machine Learning',
      'Data Visualization'
    ],
    publications: [
      {
        title: 'Predictive Analytics in Healthcare: A Comprehensive Survey',
        journal: 'Journal of Medical Internet Research',
        year: 2023,
        citations: 112,
        type: 'Journal'
      },
      {
        title: 'Big Data Processing Frameworks: Performance Analysis',
        journal: 'IEEE Big Data Conference',
        year: 2022,
        citations: 45,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'IT541',
        name: 'Data Science Fundamentals',
        credits: 4,
        semester: 'Fall 2023',
        students: 55
      },
      {
        code: 'IT642',
        name: 'Big Data Analytics',
        credits: 3,
        semester: 'Spring 2024',
        students: 42
      }
    ],
    achievements: [
      {
        title: 'Young Researcher Award',
        description: 'Outstanding contributions in data science research',
        date: '2022-12-15',
        category: 'Research'
      }
    ],
    projects: [
      {
        title: 'AI-driven Drug Discovery Platform',
        fundingAgency: 'Science and Engineering Research Board',
        amount: 1800000,
        duration: '2022-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 3,
      mastersStudents: 6,
      undergraduateProjects: 15
    },
    committees: [
      'Data Science Curriculum Committee',
      'Student Welfare Committee',
      'Industry Collaboration Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T08:15:00Z',
    createdAt: '2016-07-20T00:00:00Z',
    updatedAt: '2024-01-19T10:45:00Z'
  },
  // Adding more CSIT faculty...
  {
    id: 'fac_csit_004',
    name: 'Dr. Rajesh Kanna',
    email: 'rajesh.kanna@srmap.edu.in',
    employeeId: 'SRMFAC004',
    designation: 'Head of Department',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Software Engineering & Systems',
    experience: 18,
    qualification: 'Ph.D. in Software Engineering',
    phone: '+91 9876543256',
    dateOfJoining: '2008-06-10',
    dateOfBirth: '1975-03-08',
    gender: 'Male',
    address: {
      street: '1-A Faculty Colony, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543257',
      bloodGroup: 'AB+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Science, Bangalore',
        year: 2006,
        thesis: 'Formal Methods in Software Engineering and Verification'
      },
      masters: {
        degree: 'M.Tech in Software Engineering',
        university: 'Indian Institute of Technology, Kanpur',
        year: 2001
      },
      bachelors: {
        degree: 'B.Tech in Computer Science',
        university: 'National Institute of Technology, Trichy',
        year: 1999
      }
    },
    researchInterests: [
      'Software Engineering',
      'Formal Methods',
      'Software Testing',
      'Agile Methodologies',
      'Software Architecture'
    ],
    publications: [
      {
        title: 'Formal Verification of Distributed Software Systems',
        journal: 'ACM Transactions on Software Engineering',
        year: 2023,
        citations: 156,
        type: 'Journal'
      },
      {
        title: 'Agile Testing Strategies for Large-Scale Software Projects',
        journal: 'International Conference on Software Engineering',
        year: 2022,
        citations: 89,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'CS401',
        name: 'Software Engineering',
        credits: 4,
        semester: 'Fall 2023',
        students: 75
      },
      {
        code: 'CS702',
        name: 'Advanced Software Architecture',
        credits: 3,
        semester: 'Spring 2024',
        students: 25
      }
    ],
    achievements: [
      {
        title: 'Distinguished Educator Award',
        description: 'Excellence in computer science education',
        date: '2023-09-25',
        category: 'Teaching'
      },
      {
        title: 'ACM Senior Member',
        description: 'Senior membership in ACM',
        date: '2018-05-10',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Automated Software Testing Framework',
        fundingAgency: 'AICTE',
        amount: 2200000,
        duration: '2021-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 10,
      mastersStudents: 15,
      undergraduateProjects: 35
    },
    committees: [
      'Academic Council',
      'Board of Studies',
      'Placement Committee',
      'Industry Advisory Board'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T07:45:00Z',
    createdAt: '2008-06-10T00:00:00Z',
    updatedAt: '2024-01-21T15:20:00Z'
  },
  {
    id: 'fac_csit_005',
    name: 'Dr. Priya Subramanian',
    email: 'priya.subramanian@srmap.edu.in',
    employeeId: 'SRMFAC005',
    designation: 'Associate Professor',
    school: 'School of Computing & Information Technology',
    department: 'Information Technology',
    specialization: 'Human-Computer Interaction',
    experience: 10,
    qualification: 'Ph.D. in Human-Computer Interaction',
    phone: '+91 9876543258',
    dateOfJoining: '2014-08-15',
    dateOfBirth: '1982-07-20',
    gender: 'Female',
    address: {
      street: '11-D Faculty Colony, University Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543259',
      bloodGroup: 'O-'
    },
    academicBackground: {
      phd: {
        university: 'Carnegie Mellon University, USA',
        year: 2013,
        thesis: 'Adaptive User Interfaces for Accessibility and Usability'
      },
      masters: {
        degree: 'M.S. in Human-Computer Interaction',
        university: 'University of Washington, USA',
        year: 2009
      },
      bachelors: {
        degree: 'B.Tech in Information Technology',
        university: 'Indian Institute of Technology, Madras',
        year: 2007
      }
    },
    researchInterests: [
      'Human-Computer Interaction',
      'User Experience Design',
      'Accessibility Technologies',
      'Mobile Computing',
      'Augmented Reality'
    ],
    publications: [
      {
        title: 'Inclusive Design Principles for Mobile Applications',
        journal: 'ACM Transactions on Computer-Human Interaction',
        year: 2023,
        citations: 78,
        type: 'Journal'
      },
      {
        title: 'AR-based Learning Interfaces for Special Needs Education',
        journal: 'CHI Conference on Human Factors in Computing Systems',
        year: 2022,
        citations: 65,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'IT451',
        name: 'Human-Computer Interaction',
        credits: 3,
        semester: 'Fall 2023',
        students: 48
      },
      {
        code: 'IT552',
        name: 'User Experience Design',
        credits: 4,
        semester: 'Spring 2024',
        students: 38
      }
    ],
    achievements: [
      {
        title: 'Best Paper Award',
        description: 'CHI 2022 Best Paper Award for accessibility research',
        date: '2022-05-10',
        category: 'Research'
      }
    ],
    projects: [
      {
        title: 'Accessible Learning Technologies for Rural Education',
        fundingAgency: 'Google Research Grant',
        amount: 1200000,
        duration: '2023-2025',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 4,
      mastersStudents: 7,
      undergraduateProjects: 20
    },
    committees: [
      'UX Design Committee',
      'Student Experience Committee',
      'International Relations Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T14:30:00Z',
    createdAt: '2014-08-15T00:00:00Z',
    updatedAt: '2024-01-17T12:15:00Z'
  }
];

// Faculty from School of Engineering
export const engineeringFaculty: Faculty[] = [
  {
    id: 'fac_eng_001',
    name: 'Dr. Venkatesh Reddy',
    email: 'venkatesh.reddy@srmap.edu.in',
    employeeId: 'SRMFAC101',
    designation: 'Professor',
    school: 'School of Engineering',
    department: 'Mechanical Engineering',
    specialization: 'Thermal Engineering & Energy Systems',
    experience: 20,
    qualification: 'Ph.D. in Mechanical Engineering',
    phone: '+91 9876543260',
    dateOfJoining: '2005-07-01',
    dateOfBirth: '1970-12-15',
    gender: 'Male',
    address: {
      street: '5-A Engineering Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543261',
      bloodGroup: 'B+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Technology, Delhi',
        year: 2004,
        thesis: 'Heat Transfer Enhancement in Solar Thermal Systems'
      },
      masters: {
        degree: 'M.Tech in Thermal Engineering',
        university: 'Indian Institute of Technology, Bombay',
        year: 1996
      },
      bachelors: {
        degree: 'B.Tech in Mechanical Engineering',
        university: 'Osmania University',
        year: 1994
      }
    },
    researchInterests: [
      'Renewable Energy Systems',
      'Heat Transfer',
      'Computational Fluid Dynamics',
      'Solar Thermal Engineering',
      'Energy Storage'
    ],
    publications: [
      {
        title: 'Advanced Solar Thermal Collectors: Design and Performance Analysis',
        journal: 'Applied Energy',
        year: 2023,
        citations: 234,
        type: 'Journal'
      },
      {
        title: 'CFD Analysis of Heat Transfer in Nanofluids',
        journal: 'International Journal of Heat and Mass Transfer',
        year: 2022,
        citations: 187,
        type: 'Journal'
      }
    ],
    courses: [
      {
        code: 'ME501',
        name: 'Heat Transfer',
        credits: 4,
        semester: 'Fall 2023',
        students: 52
      },
      {
        code: 'ME602',
        name: 'Renewable Energy Systems',
        credits: 3,
        semester: 'Spring 2024',
        students: 38
      }
    ],
    achievements: [
      {
        title: 'INAE Fellow',
        description: 'Fellow of Indian National Academy of Engineering',
        date: '2021-12-01',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Solar Energy Harvesting for Rural Applications',
        fundingAgency: 'Ministry of New and Renewable Energy',
        amount: 4500000,
        duration: '2022-2025',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 12,
      mastersStudents: 18,
      undergraduateProjects: 40
    },
    committees: [
      'Engineering Council',
      'Research Committee',
      'Energy Systems Advisory Board'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T09:00:00Z',
    createdAt: '2005-07-01T00:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  },
  {
    id: 'fac_eng_002',
    name: 'Dr. Sujatha Krishnan',
    email: 'sujatha.krishnan@srmap.edu.in',
    employeeId: 'SRMFAC102',
    designation: 'Associate Professor',
    school: 'School of Engineering',
    department: 'Electrical & Electronics Engineering',
    specialization: 'Power Electronics & Drives',
    experience: 14,
    qualification: 'Ph.D. in Electrical Engineering',
    phone: '+91 9876543262',
    dateOfJoining: '2011-08-20',
    dateOfBirth: '1978-04-22',
    gender: 'Female',
    address: {
      street: '7-B Engineering Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543263',
      bloodGroup: 'A+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Science, Bangalore',
        year: 2010,
        thesis: 'Advanced Control Strategies for Power Electronic Converters'
      },
      masters: {
        degree: 'M.Tech in Power Electronics',
        university: 'Indian Institute of Technology, Kharagpur',
        year: 2005
      },
      bachelors: {
        degree: 'B.Tech in Electrical Engineering',
        university: 'National Institute of Technology, Calicut',
        year: 2003
      }
    },
    researchInterests: [
      'Power Electronics',
      'Electric Vehicle Technologies',
      'Renewable Energy Integration',
      'Motor Drives',
      'Smart Grid Technologies'
    ],
    publications: [
      {
        title: 'Efficient Power Conversion Systems for Electric Vehicles',
        journal: 'IEEE Transactions on Power Electronics',
        year: 2023,
        citations: 143,
        type: 'Journal'
      },
      {
        title: 'Grid Integration of Renewable Energy Sources',
        journal: 'IEEE Power Electronics Conference',
        year: 2022,
        citations: 89,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'EE561',
        name: 'Power Electronics',
        credits: 4,
        semester: 'Fall 2023',
        students: 44
      },
      {
        code: 'EE662',
        name: 'Electric Drives',
        credits: 3,
        semester: 'Spring 2024',
        students: 32
      }
    ],
    achievements: [
      {
        title: 'IEEE Senior Member',
        description: 'Senior membership in IEEE',
        date: '2019-03-15',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Smart Charging Infrastructure for Electric Vehicles',
        fundingAgency: 'Department of Heavy Industry',
        amount: 3200000,
        duration: '2023-2026',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 6,
      mastersStudents: 10,
      undergraduateProjects: 28
    },
    committees: [
      'Electrical Safety Committee',
      'Industry Collaboration Committee',
      'Women in Engineering Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T13:20:00Z',
    createdAt: '2011-08-20T00:00:00Z',
    updatedAt: '2024-01-18T14:35:00Z'
  },
  // Adding more engineering faculty...
  {
    id: 'fac_eng_003',
    name: 'Dr. Anil Kumar Patel',
    email: 'anil.patel@srmap.edu.in',
    employeeId: 'SRMFAC103',
    designation: 'Assistant Professor',
    school: 'School of Engineering',
    department: 'Civil Engineering',
    specialization: 'Structural Engineering & Earthquake Engineering',
    experience: 9,
    qualification: 'Ph.D. in Civil Engineering',
    phone: '+91 9876543264',
    dateOfJoining: '2015-07-10',
    dateOfBirth: '1984-08-18',
    gender: 'Male',
    address: {
      street: '9-C Engineering Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Single',
      emergencyContact: '+91 9876543265',
      bloodGroup: 'O+'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Technology, Roorkee',
        year: 2014,
        thesis: 'Seismic Performance Assessment of RC Buildings'
      },
      masters: {
        degree: 'M.Tech in Structural Engineering',
        university: 'Indian Institute of Technology, Delhi',
        year: 2010
      },
      bachelors: {
        degree: 'B.Tech in Civil Engineering',
        university: 'Sardar Vallabhbhai National Institute of Technology',
        year: 2008
      }
    },
    researchInterests: [
      'Earthquake Engineering',
      'Structural Dynamics',
      'Reinforced Concrete Structures',
      'Seismic Retrofitting',
      'Finite Element Analysis'
    ],
    publications: [
      {
        title: 'Seismic Vulnerability Assessment of RC Buildings',
        journal: 'Engineering Structures',
        year: 2023,
        citations: 76,
        type: 'Journal'
      },
      {
        title: 'Performance-Based Seismic Design of High-Rise Buildings',
        journal: 'Earthquake Engineering Conference',
        year: 2022,
        citations: 54,
        type: 'Conference'
      }
    ],
    courses: [
      {
        code: 'CE521',
        name: 'Structural Analysis',
        credits: 4,
        semester: 'Fall 2023',
        students: 48
      },
      {
        code: 'CE622',
        name: 'Earthquake Engineering',
        credits: 3,
        semester: 'Spring 2024',
        students: 26
      }
    ],
    achievements: [
      {
        title: 'Young Engineer Award',
        description: 'Recognition from Institution of Engineers India',
        date: '2020-11-20',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Seismic Risk Assessment of School Buildings',
        fundingAgency: 'National Disaster Management Authority',
        amount: 1800000,
        duration: '2022-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 3,
      mastersStudents: 5,
      undergraduateProjects: 16
    },
    committees: [
      'Infrastructure Development Committee',
      'Safety Committee',
      'Technical Education Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T11:45:00Z',
    createdAt: '2015-07-10T00:00:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  }
];

// Faculty from School of Management
export const managementFaculty: Faculty[] = [
  {
    id: 'fac_mgmt_001',
    name: 'Dr. Radhika Sharma',
    email: 'radhika.sharma@srmap.edu.in',
    employeeId: 'SRMFAC201',
    designation: 'Dean',
    school: 'School of Management',
    department: 'Business Administration',
    specialization: 'Strategic Management & Leadership',
    experience: 22,
    qualification: 'Ph.D. in Management Studies',
    phone: '+91 9876543266',
    dateOfJoining: '2003-06-15',
    dateOfBirth: '1968-09-10',
    gender: 'Female',
    address: {
      street: '2-A Management Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543267',
      bloodGroup: 'AB-'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Management, Ahmedabad',
        year: 2002,
        thesis: 'Strategic Leadership in Emerging Markets: An Indian Perspective'
      },
      masters: {
        degree: 'MBA in Strategic Management',
        university: 'Indian Institute of Management, Bangalore',
        year: 1992
      },
      bachelors: {
        degree: 'B.Com (Honors)',
        university: 'Delhi University',
        year: 1990
      }
    },
    researchInterests: [
      'Strategic Management',
      'Leadership Development',
      'Corporate Governance',
      'Organizational Behavior',
      'Emerging Markets Strategy'
    ],
    publications: [
      {
        title: 'Strategic Leadership in the Digital Age',
        journal: 'Harvard Business Review',
        year: 2023,
        citations: 298,
        type: 'Journal'
      },
      {
        title: 'Corporate Strategy in Emerging Markets',
        journal: 'Academy of Management Review',
        year: 2022,
        citations: 245,
        type: 'Journal'
      }
    ],
    courses: [
      {
        code: 'MBA701',
        name: 'Strategic Management',
        credits: 3,
        semester: 'Fall 2023',
        students: 65
      },
      {
        code: 'MBA802',
        name: 'Leadership and Change Management',
        credits: 2,
        semester: 'Spring 2024',
        students: 45
      }
    ],
    achievements: [
      {
        title: 'Distinguished Management Educator',
        description: 'National award for excellence in management education',
        date: '2022-08-15',
        category: 'Academic'
      },
      {
        title: 'Board of Directors',
        description: 'Independent Director on multiple corporate boards',
        date: '2020-01-01',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Leadership Development for Digital Transformation',
        fundingAgency: 'Management Development Institute',
        amount: 2800000,
        duration: '2023-2025',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 15,
      mastersStudents: 25,
      undergraduateProjects: 50
    },
    committees: [
      'Board of Governors',
      'Academic Council',
      'Executive Committee',
      'Industry Advisory Board'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T08:00:00Z',
    createdAt: '2003-06-15T00:00:00Z',
    updatedAt: '2024-01-21T17:30:00Z'
  },
  {
    id: 'fac_mgmt_002',
    name: 'Prof. Sunil Agarwal',
    email: 'sunil.agarwal@srmap.edu.in',
    employeeId: 'SRMFAC202',
    designation: 'Professor',
    school: 'School of Management',
    department: 'Business Administration',
    specialization: 'Finance & Investment Management',
    experience: 16,
    qualification: 'Ph.D. in Finance',
    phone: '+91 9876543268',
    dateOfJoining: '2009-08-01',
    dateOfBirth: '1975-06-25',
    gender: 'Male',
    address: {
      street: '4-B Management Faculty Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    personalDetails: {
      maritalStatus: 'Married',
      emergencyContact: '+91 9876543269',
      bloodGroup: 'B-'
    },
    academicBackground: {
      phd: {
        university: 'Indian Institute of Management, Calcutta',
        year: 2008,
        thesis: 'Risk Management in Indian Capital Markets'
      },
      masters: {
        degree: 'MBA in Finance',
        university: 'Indian Institute of Management, Lucknow',
        year: 2001
      },
      bachelors: {
        degree: 'B.Com (Honors)',
        university: 'University of Rajasthan',
        year: 1999
      }
    },
    researchInterests: [
      'Financial Risk Management',
      'Investment Analysis',
      'Corporate Finance',
      'Behavioral Finance',
      'Capital Markets'
    ],
    publications: [
      {
        title: 'Risk-Return Analysis in Emerging Market Portfolios',
        journal: 'Journal of Finance',
        year: 2023,
        citations: 167,
        type: 'Journal'
      },
      {
        title: 'Behavioral Biases in Investment Decision Making',
        journal: 'Financial Analysts Journal',
        year: 2022,
        citations: 134,
        type: 'Journal'
      }
    ],
    courses: [
      {
        code: 'MBA621',
        name: 'Financial Management',
        credits: 3,
        semester: 'Fall 2023',
        students: 58
      },
      {
        code: 'MBA722',
        name: 'Investment Analysis',
        credits: 3,
        semester: 'Spring 2024',
        students: 42
      }
    ],
    achievements: [
      {
        title: 'CFA Institute Recognition',
        description: 'Outstanding contribution to financial education',
        date: '2021-05-10',
        category: 'Professional'
      }
    ],
    projects: [
      {
        title: 'Financial Literacy Programs for Rural Communities',
        fundingAgency: 'Reserve Bank of India',
        amount: 1500000,
        duration: '2022-2024',
        status: 'Ongoing'
      }
    ],
    mentorship: {
      phdStudents: 8,
      mastersStudents: 12,
      undergraduateProjects: 30
    },
    committees: [
      'Finance Committee',
      'Investment Committee',
      'Risk Management Committee'
    ],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T15:45:00Z',
    createdAt: '2009-08-01T00:00:00Z',
    updatedAt: '2024-01-19T12:20:00Z'
  }
];

// Combine all faculty
export const allFaculty: Faculty[] = [
  ...csitFaculty,
  ...engineeringFaculty,
  ...managementFaculty
];

// Export by school for easy filtering
export const facultyBySchool = {
  'School of Computing & Information Technology': csitFaculty,
  'School of Engineering': engineeringFaculty,
  'School of Management': managementFaculty
};

// Export counts
export const facultyCounts = {
  total: allFaculty.length,
  bySchool: {
    csit: csitFaculty.length,
    engineering: engineeringFaculty.length,
    management: managementFaculty.length
  }
};