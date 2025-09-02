export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  school: string;
  department: string;
  specialization: string;
  year: number;
  semester: number;
  cgpa: number;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  parentDetails: {
    fatherName: string;
    motherName: string;
    fatherOccupation: string;
    motherOccupation: string;
    annualIncome: number;
    contactNumber: string;
  };
  academicHistory: {
    tenth: { board: string; year: number; percentage: number; };
    twelfth: { board: string; year: number; percentage: number; stream: string; };
    entrance?: { exam: string; rank: number; score: number; };
  };
  skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
    languages: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    duration: string;
    role: string;
  }>;
  internships: Array<{
    company: string;
    role: string;
    duration: string;
    stipend: number;
    description: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    category: string;
  }>;
  placementStatus: {
    isRegistered: boolean;
    preferredLocations: string[];
    expectedSalary: { min: number; max: number; };
    jobTypes: string[];
    companies: string[];
  };
  applicationHistory: Array<{
    jobId: string;
    companyName: string;
    position: string;
    appliedDate: string;
    status: 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Selected' | 'Rejected';
  }>;
  profileImage: string;
  resumeUrl?: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

// School of Computing & Information Technology Students
export const csitStudents: Student[] = [
  {
    id: 'std_csit_001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@srmap.edu.in',
    rollNumber: 'AP24322130096',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    year: 4,
    semester: 8,
    cgpa: 8.95,
    phone: '+91 9876543210',
    dateOfBirth: '2002-03-15',
    gender: 'Male',
    address: {
      street: '123 Tech Street, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    parentDetails: {
      fatherName: 'Suresh Kumar',
      motherName: 'Lakshmi Devi',
      fatherOccupation: 'Software Engineer',
      motherOccupation: 'Teacher',
      annualIncome: 1200000,
      contactNumber: '+91 9876543211'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 94.5 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 96.2, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 2456, score: 285 }
    },
    skills: {
      technical: ['Python', 'Java', 'React', 'Node.js', 'MongoDB', 'TensorFlow', 'Docker', 'AWS'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Work'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Oracle Java SE 11'],
      languages: ['English', 'Hindi', 'Telugu']
    },
    projects: [
      {
        title: 'E-Commerce Recommendation System',
        description: 'Built an AI-powered recommendation system using collaborative filtering and deep learning',
        technologies: ['Python', 'TensorFlow', 'Django', 'PostgreSQL', 'Redis'],
        duration: '6 months',
        role: 'Lead Developer'
      },
      {
        title: 'Smart Campus Management System',
        description: 'Full-stack web application for campus resource management',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
        duration: '4 months',
        role: 'Full Stack Developer'
      }
    ],
    internships: [
      {
        company: 'Microsoft India',
        role: 'Software Development Intern',
        duration: '3 months (May-July 2023)',
        stipend: 50000,
        description: 'Worked on Azure ML platform features and contributed to production code'
      }
    ],
    achievements: [
      {
        title: 'Best Final Year Project',
        description: 'Won university-wide competition for AI-based healthcare diagnosis system',
        date: '2024-01-15',
        category: 'Academic'
      },
      {
        title: 'Google Code-in Winner',
        description: 'Top 50 in Google Code-in competition',
        date: '2023-12-10',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Hyderabad', 'Chennai'],
      expectedSalary: { min: 1200000, max: 1800000 },
      jobTypes: ['Software Engineer', 'ML Engineer', 'Data Scientist'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart']
    },
    applicationHistory: [
      {
        jobId: 'job_001',
        companyName: 'TCS Digital',
        position: 'Software Engineer',
        appliedDate: '2024-01-10',
        status: 'Selected'
      },
      {
        jobId: 'job_002',
        companyName: 'Microsoft',
        position: 'SDE Intern',
        appliedDate: '2024-01-05',
        status: 'Interview Scheduled'
      }
    ],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/rajesh_kumar_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-22T10:30:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'std_csit_002',
    name: 'Priya Sharma',
    email: 'priya.sharma@srmap.edu.in',
    rollNumber: 'AP24322130097',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Cybersecurity',
    year: 4,
    semester: 7,
    cgpa: 9.12,
    phone: '+91 9876543212',
    dateOfBirth: '2002-07-22',
    gender: 'Female',
    address: {
      street: '456 Cyber Lane, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    parentDetails: {
      fatherName: 'Vikram Sharma',
      motherName: 'Sunita Sharma',
      fatherOccupation: 'Bank Manager',
      motherOccupation: 'Doctor',
      annualIncome: 1500000,
      contactNumber: '+91 9876543213'
    },
    academicHistory: {
      tenth: { board: 'ICSE', year: 2018, percentage: 96.8 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 94.5, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 1876, score: 298 }
    },
    skills: {
      technical: ['Python', 'C++', 'Penetration Testing', 'Kali Linux', 'Wireshark', 'Nmap', 'Metasploit'],
      soft: ['Analytical Thinking', 'Attention to Detail', 'Problem Solving'],
      certifications: ['CEH (Certified Ethical Hacker)', 'CISSP', 'CompTIA Security+'],
      languages: ['English', 'Hindi', 'Punjabi']
    },
    projects: [
      {
        title: 'Network Intrusion Detection System',
        description: 'Machine learning-based network security monitoring system',
        technologies: ['Python', 'Scikit-learn', 'Scapy', 'Flask'],
        duration: '5 months',
        role: 'Security Researcher'
      },
      {
        title: 'Blockchain-based Voting System',
        description: 'Secure and transparent voting system using blockchain technology',
        technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
        duration: '4 months',
        role: 'Blockchain Developer'
      }
    ],
    internships: [
      {
        company: 'Wipro Cybersecurity',
        role: 'Security Analyst Intern',
        duration: '3 months (Jun-Aug 2023)',
        stipend: 35000,
        description: 'Conducted vulnerability assessments and penetration testing'
      }
    ],
    achievements: [
      {
        title: 'Best Cybersecurity Project',
        description: 'Won state-level cybersecurity competition',
        date: '2023-11-20',
        category: 'Technical'
      },
      {
        title: 'Women in Tech Scholarship',
        description: 'Recipient of prestigious scholarship for women in technology',
        date: '2023-08-15',
        category: 'Scholarship'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Pune', 'Delhi'],
      expectedSalary: { min: 1000000, max: 1500000 },
      jobTypes: ['Security Analyst', 'Cybersecurity Engineer', 'Penetration Tester'],
      companies: ['Wipro', 'TCS', 'Infosys', 'IBM']
    },
    applicationHistory: [
      {
        jobId: 'job_003',
        companyName: 'IBM Security',
        position: 'Security Analyst',
        appliedDate: '2024-01-12',
        status: 'Shortlisted'
      }
    ],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/priya_sharma_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-22T09:15:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'std_csit_003',
    name: 'Arun Reddy',
    email: 'arun.reddy@srmap.edu.in',
    rollNumber: 'AP24322130098',
    school: 'School of Computing & Information Technology',
    department: 'Information Technology',
    specialization: 'Data Science & Analytics',
    year: 3,
    semester: 6,
    cgpa: 8.76,
    phone: '+91 9876543214',
    dateOfBirth: '2003-01-10',
    gender: 'Male',
    address: {
      street: '789 Data Drive, Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032'
    },
    parentDetails: {
      fatherName: 'Ramesh Reddy',
      motherName: 'Kavitha Reddy',
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Homemaker',
      annualIncome: 800000,
      contactNumber: '+91 9876543215'
    },
    academicHistory: {
      tenth: { board: 'State Board', year: 2019, percentage: 91.2 },
      twelfth: { board: 'State Board', year: 2021, percentage: 93.8, stream: 'Science (PCM)' },
      entrance: { exam: 'EAMCET', rank: 3456, score: 142 }
    },
    skills: {
      technical: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop'],
      soft: ['Data Analysis', 'Statistical Thinking', 'Presentation Skills'],
      certifications: ['Microsoft Azure Data Scientist', 'Tableau Desktop Specialist'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    projects: [
      {
        title: 'Customer Churn Prediction Model',
        description: 'Predictive analytics model for telecom customer retention',
        technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
        duration: '3 months',
        role: 'Data Scientist'
      },
      {
        title: 'Real-time Stock Market Dashboard',
        description: 'Interactive dashboard for stock market analysis',
        technologies: ['Python', 'Streamlit', 'Yahoo Finance API', 'Plotly'],
        duration: '2 months',
        role: 'Data Analyst'
      }
    ],
    internships: [
      {
        company: 'Accenture Analytics',
        role: 'Data Analytics Intern',
        duration: '2 months (Dec 2023-Jan 2024)',
        stipend: 25000,
        description: 'Worked on client data analysis projects and visualization'
      }
    ],
    achievements: [
      {
        title: 'Best Data Science Project',
        description: 'Winner of university data science hackathon',
        date: '2023-10-15',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Hyderabad', 'Mumbai'],
      expectedSalary: { min: 800000, max: 1200000 },
      jobTypes: ['Data Scientist', 'Data Analyst', 'Business Analyst'],
      companies: ['Accenture', 'Deloitte', 'EY', 'KPMG']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T14:20:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: 'std_csit_004',
    name: 'Meera Nair',
    email: 'meera.nair@srmap.edu.in',
    rollNumber: 'AP24322130099',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Full Stack Development',
    year: 4,
    semester: 8,
    cgpa: 9.05,
    phone: '+91 9876543216',
    dateOfBirth: '2002-05-18',
    gender: 'Female',
    address: {
      street: '321 Web Avenue, Kondapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500084'
    },
    parentDetails: {
      fatherName: 'Krishnan Nair',
      motherName: 'Priya Nair',
      fatherOccupation: 'Engineer',
      motherOccupation: 'Nurse',
      annualIncome: 1000000,
      contactNumber: '+91 9876543217'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 95.4 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 92.8, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 3211, score: 268 }
    },
    skills: {
      technical: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js', 'Next.js', 'TypeScript'],
      soft: ['UI/UX Design', 'Project Management', 'Client Communication'],
      certifications: ['Meta React Developer', 'MongoDB Certified Developer'],
      languages: ['English', 'Malayalam', 'Hindi']
    },
    projects: [
      {
        title: 'Social Media Platform',
        description: 'Full-featured social media application with real-time chat',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
        duration: '6 months',
        role: 'Full Stack Developer'
      },
      {
        title: 'E-Learning Management System',
        description: 'Comprehensive platform for online education',
        technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe API'],
        duration: '4 months',
        role: 'Lead Developer'
      }
    ],
    internships: [
      {
        company: 'Zomato',
        role: 'Frontend Developer Intern',
        duration: '3 months (May-Jul 2023)',
        stipend: 40000,
        description: 'Developed user interface components for food delivery app'
      }
    ],
    achievements: [
      {
        title: 'Outstanding Web Developer',
        description: 'Recognition for exceptional web development skills',
        date: '2023-12-05',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Mumbai', 'Kochi'],
      expectedSalary: { min: 1200000, max: 1600000 },
      jobTypes: ['Full Stack Developer', 'Frontend Developer', 'Software Engineer'],
      companies: ['Swiggy', 'Zomato', 'Paytm', 'PhonePe']
    },
    applicationHistory: [
      {
        jobId: 'job_004',
        companyName: 'Swiggy',
        position: 'Frontend Developer',
        appliedDate: '2024-01-08',
        status: 'Selected'
      }
    ],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/meera_nair_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-22T08:45:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-19T13:20:00Z'
  },
  {
    id: 'std_csit_005',
    name: 'Suresh Babu',
    email: 'suresh.babu@srmap.edu.in',
    rollNumber: 'AP24322130100',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Cloud Computing',
    year: 3,
    semester: 5,
    cgpa: 8.45,
    phone: '+91 9876543218',
    dateOfBirth: '2003-09-25',
    gender: 'Male',
    address: {
      street: '654 Cloud Street, Miyapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500049'
    },
    parentDetails: {
      fatherName: 'Venkat Babu',
      motherName: 'Sita Devi',
      fatherOccupation: 'Farmer',
      motherOccupation: 'Homemaker',
      annualIncome: 400000,
      contactNumber: '+91 9876543219'
    },
    academicHistory: {
      tenth: { board: 'State Board', year: 2019, percentage: 88.5 },
      twelfth: { board: 'State Board', year: 2021, percentage: 90.2, stream: 'Science (PCM)' },
      entrance: { exam: 'EAMCET', rank: 5678, score: 128 }
    },
    skills: {
      technical: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Python'],
      soft: ['Infrastructure Design', 'Problem Solving', 'Documentation'],
      certifications: ['AWS Solutions Architect Associate', 'Azure Fundamentals'],
      languages: ['English', 'Telugu']
    },
    projects: [
      {
        title: 'Serverless Web Application',
        description: 'Scalable web app using AWS Lambda and DynamoDB',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3'],
        duration: '3 months',
        role: 'Cloud Engineer'
      }
    ],
    internships: [],
    achievements: [
      {
        title: 'AWS Scholarship Recipient',
        description: 'Selected for AWS cloud computing scholarship program',
        date: '2023-09-10',
        category: 'Scholarship'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Hyderabad', 'Bangalore', 'Chennai'],
      expectedSalary: { min: 600000, max: 1000000 },
      jobTypes: ['Cloud Engineer', 'DevOps Engineer', 'System Administrator'],
      companies: ['AWS', 'Microsoft', 'IBM', 'Oracle']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T16:30:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-12T09:15:00Z'
  },
  // Adding 5 more CS/IT students
  {
    id: 'std_csit_006',
    name: 'Kavya Krishnan',
    email: 'kavya.krishnan@srmap.edu.in',
    rollNumber: 'AP24322130101',
    school: 'School of Computing & Information Technology',
    department: 'Information Technology',
    specialization: 'Mobile App Development',
    year: 4,
    semester: 7,
    cgpa: 8.89,
    phone: '+91 9876543220',
    dateOfBirth: '2002-11-12',
    gender: 'Female',
    address: {
      street: '987 Mobile Lane, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081'
    },
    parentDetails: {
      fatherName: 'Krishnan Iyer',
      motherName: 'Radha Krishnan',
      fatherOccupation: 'Software Architect',
      motherOccupation: 'Professor',
      annualIncome: 1800000,
      contactNumber: '+91 9876543221'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 93.6 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 91.4, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 4567, score: 245 }
    },
    skills: {
      technical: ['Flutter', 'Dart', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST APIs'],
      soft: ['UI/UX Design', 'Agile Development', 'User Research'],
      certifications: ['Google Flutter Certified', 'iOS Developer Certification'],
      languages: ['English', 'Tamil', 'Hindi']
    },
    projects: [
      {
        title: 'Health Tracking Mobile App',
        description: 'Cross-platform health monitoring application with AI insights',
        technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Health APIs'],
        duration: '5 months',
        role: 'Mobile Developer'
      }
    ],
    internships: [
      {
        company: 'Byju\'s',
        role: 'Mobile App Developer Intern',
        duration: '3 months (Jun-Aug 2023)',
        stipend: 45000,
        description: 'Developed educational app features for K-12 students'
      }
    ],
    achievements: [
      {
        title: 'Best Mobile App',
        description: 'Won inter-college mobile app development competition',
        date: '2023-11-30',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Hyderabad', 'Mumbai'],
      expectedSalary: { min: 1000000, max: 1400000 },
      jobTypes: ['Mobile App Developer', 'iOS Developer', 'Android Developer'],
      companies: ['Flipkart', 'Paytm', 'Ola', 'Uber']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T11:20:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-16T14:45:00Z'
  },
  {
    id: 'std_csit_007',
    name: 'Vikram Singh',
    email: 'vikram.singh@srmap.edu.in',
    rollNumber: 'AP24322130102',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Game Development',
    year: 3,
    semester: 6,
    cgpa: 8.23,
    phone: '+91 9876543222',
    dateOfBirth: '2003-04-08',
    gender: 'Male',
    address: {
      street: '147 Game Street, Kukatpally',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500072'
    },
    parentDetails: {
      fatherName: 'Rajveer Singh',
      motherName: 'Preet Kaur',
      fatherOccupation: 'Army Officer',
      motherOccupation: 'Teacher',
      annualIncome: 900000,
      contactNumber: '+91 9876543223'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2019, percentage: 87.9 },
      twelfth: { board: 'CBSE', year: 2021, percentage: 89.6, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 6789, score: 220 }
    },
    skills: {
      technical: ['Unity3D', 'C#', 'Unreal Engine', 'C++', 'Blender', '3D Modeling', 'OpenGL'],
      soft: ['Creative Thinking', 'Storytelling', 'Team Collaboration'],
      certifications: ['Unity Certified Developer', 'Unreal Engine Certification'],
      languages: ['English', 'Hindi', 'Punjabi']
    },
    projects: [
      {
        title: '3D Adventure Game',
        description: 'Multi-level adventure game with immersive storyline',
        technologies: ['Unity3D', 'C#', 'Blender', 'Photoshop'],
        duration: '6 months',
        role: 'Game Developer'
      }
    ],
    internships: [],
    achievements: [
      {
        title: 'Best Game Design',
        description: 'Winner of national game development contest',
        date: '2023-10-22',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Mumbai', 'Pune'],
      expectedSalary: { min: 700000, max: 1100000 },
      jobTypes: ['Game Developer', '3D Artist', 'Unity Developer'],
      companies: ['Ubisoft', 'EA Games', 'Rockstar', 'Zynga']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-19T13:15:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-10T10:30:00Z'
  },
  {
    id: 'std_csit_008',
    name: 'Anitha Reddy',
    email: 'anitha.reddy@srmap.edu.in',
    rollNumber: 'AP24322130103',
    school: 'School of Computing & Information Technology',
    department: 'Information Technology',
    specialization: 'Software Testing & Quality Assurance',
    year: 4,
    semester: 8,
    cgpa: 8.67,
    phone: '+91 9876543224',
    dateOfBirth: '2002-08-30',
    gender: 'Female',
    address: {
      street: '258 QA Avenue, Nizampet',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500090'
    },
    parentDetails: {
      fatherName: 'Murali Reddy',
      motherName: 'Sujatha Reddy',
      fatherOccupation: 'Government Employee',
      motherOccupation: 'Bank Officer',
      annualIncome: 700000,
      contactNumber: '+91 9876543225'
    },
    academicHistory: {
      tenth: { board: 'State Board', year: 2018, percentage: 92.3 },
      twelfth: { board: 'State Board', year: 2020, percentage: 94.1, stream: 'Science (PCM)' },
      entrance: { exam: 'EAMCET', rank: 2345, score: 158 }
    },
    skills: {
      technical: ['Selenium', 'TestNG', 'Cucumber', 'JMeter', 'Postman', 'Java', 'Python'],
      soft: ['Attention to Detail', 'Documentation', 'Process Improvement'],
      certifications: ['ISTQB Foundation Level', 'Selenium WebDriver Certification'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    projects: [
      {
        title: 'Automated Testing Framework',
        description: 'Comprehensive test automation suite for e-commerce platform',
        technologies: ['Selenium', 'TestNG', 'Maven', 'Jenkins'],
        duration: '4 months',
        role: 'QA Engineer'
      }
    ],
    internships: [
      {
        company: 'Tech Mahindra',
        role: 'QA Testing Intern',
        duration: '3 months (May-Jul 2023)',
        stipend: 30000,
        description: 'Performed manual and automated testing for banking applications'
      }
    ],
    achievements: [
      {
        title: 'Quality Excellence Award',
        description: 'Recognition for outstanding quality assurance practices',
        date: '2023-09-15',
        category: 'Professional'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Hyderabad', 'Bangalore', 'Chennai'],
      expectedSalary: { min: 600000, max: 1000000 },
      jobTypes: ['QA Engineer', 'Test Automation Engineer', 'Software Tester'],
      companies: ['TCS', 'Infosys', 'Wipro', 'Cognizant']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-18T15:40:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-14T12:25:00Z'
  },
  {
    id: 'std_csit_009',
    name: 'Rohit Gupta',
    email: 'rohit.gupta@srmap.edu.in',
    rollNumber: 'AP24322130104',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Internet of Things (IoT)',
    year: 3,
    semester: 5,
    cgpa: 8.34,
    phone: '+91 9876543226',
    dateOfBirth: '2003-06-14',
    gender: 'Male',
    address: {
      street: '369 IoT Plaza, Bachupally',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500090'
    },
    parentDetails: {
      fatherName: 'Sunil Gupta',
      motherName: 'Neeta Gupta',
      fatherOccupation: 'Businessman',
      motherOccupation: 'Homemaker',
      annualIncome: 1100000,
      contactNumber: '+91 9876543227'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2019, percentage: 90.1 },
      twelfth: { board: 'CBSE', year: 2021, percentage: 88.7, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 7890, score: 210 }
    },
    skills: {
      technical: ['Arduino', 'Raspberry Pi', 'Python', 'C++', 'MQTT', 'LoRaWAN', 'Sensors'],
      soft: ['Hardware Integration', 'Prototyping', 'Systems Thinking'],
      certifications: ['Cisco IoT Fundamentals', 'AWS IoT Core Certification'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    projects: [
      {
        title: 'Smart Home Automation System',
        description: 'IoT-based home automation with mobile app control',
        technologies: ['Arduino', 'ESP32', 'Firebase', 'Flutter'],
        duration: '4 months',
        role: 'IoT Developer'
      }
    ],
    internships: [],
    achievements: [
      {
        title: 'Best IoT Innovation',
        description: 'Winner of state-level IoT innovation challenge',
        date: '2023-12-08',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Pune', 'Mumbai'],
      expectedSalary: { min: 700000, max: 1100000 },
      jobTypes: ['IoT Developer', 'Embedded Systems Engineer', 'Hardware Engineer'],
      companies: ['Bosch', 'Siemens', 'GE', 'Honeywell']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-17T12:10:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-09T14:20:00Z'
  },
  {
    id: 'std_csit_010',
    name: 'Divya Menon',
    email: 'divya.menon@srmap.edu.in',
    rollNumber: 'AP24322130105',
    school: 'School of Computing & Information Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Human-Computer Interaction',
    year: 4,
    semester: 7,
    cgpa: 9.23,
    phone: '+91 9876543228',
    dateOfBirth: '2002-12-05',
    gender: 'Female',
    address: {
      street: '741 UX Street, Film Nagar',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    parentDetails: {
      fatherName: 'Rajesh Menon',
      motherName: 'Latha Menon',
      fatherOccupation: 'Design Director',
      motherOccupation: 'Psychologist',
      annualIncome: 2200000,
      contactNumber: '+91 9876543229'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 97.2 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 95.8, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 1234, score: 312 }
    },
    skills: {
      technical: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'JavaScript', 'React'],
      soft: ['Design Thinking', 'User Empathy', 'Visual Communication', 'Psychology'],
      certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
      languages: ['English', 'Malayalam', 'Hindi']
    },
    projects: [
      {
        title: 'Accessibility-First Web Platform',
        description: 'Inclusive web platform design for users with disabilities',
        technologies: ['React', 'ARIA', 'WebAIM', 'Figma'],
        duration: '5 months',
        role: 'UX/UI Designer'
      }
    ],
    internships: [
      {
        company: 'Flipkart Design',
        role: 'UX Design Intern',
        duration: '4 months (Mar-Jun 2023)',
        stipend: 55000,
        description: 'Designed user interfaces for e-commerce mobile application'
      }
    ],
    achievements: [
      {
        title: 'Best UX Design Portfolio',
        description: 'Outstanding portfolio recognition in design competition',
        date: '2023-11-18',
        category: 'Design'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Mumbai', 'Delhi'],
      expectedSalary: { min: 1300000, max: 1800000 },
      jobTypes: ['UX Designer', 'Product Designer', 'Interaction Designer'],
      companies: ['Google', 'Microsoft', 'Adobe', 'Airbnb']
    },
    applicationHistory: [
      {
        jobId: 'job_005',
        companyName: 'Adobe',
        position: 'UX Designer',
        appliedDate: '2024-01-15',
        status: 'Interview Scheduled'
      }
    ],
    profileImage: '/api/placeholder/150/150',
    resumeUrl: '/resumes/divya_menon_resume.pdf',
    isActive: true,
    lastLoginDate: '2024-01-22T07:30:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-20T16:15:00Z'
  }
];

// School of Engineering Students
export const engineeringStudents: Student[] = [
  {
    id: 'std_eng_001',
    name: 'Krishna Rao',
    email: 'krishna.rao@srmap.edu.in',
    rollNumber: 'AP24322140001',
    school: 'School of Engineering',
    department: 'Mechanical Engineering',
    specialization: 'Automotive Engineering',
    year: 4,
    semester: 8,
    cgpa: 8.78,
    phone: '+91 9876543230',
    dateOfBirth: '2002-02-28',
    gender: 'Male',
    address: {
      street: '123 Gear Street, Secunderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500003'
    },
    parentDetails: {
      fatherName: 'Rama Rao',
      motherName: 'Sita Devi',
      fatherOccupation: 'Mechanical Engineer',
      motherOccupation: 'Teacher',
      annualIncome: 900000,
      contactNumber: '+91 9876543231'
    },
    academicHistory: {
      tenth: { board: 'State Board', year: 2018, percentage: 89.6 },
      twelfth: { board: 'State Board', year: 2020, percentage: 92.4, stream: 'Science (PCM)' },
      entrance: { exam: 'EAMCET', rank: 4321, score: 135 }
    },
    skills: {
      technical: ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB', 'CNC Programming', 'CAM'],
      soft: ['Technical Drawing', 'Problem Solving', 'Project Management'],
      certifications: ['SolidWorks Professional', 'AutoCAD Certified User'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    projects: [
      {
        title: 'Electric Vehicle Powertrain Design',
        description: 'Design and simulation of electric vehicle transmission system',
        technologies: ['SolidWorks', 'ANSYS', 'MATLAB Simulink'],
        duration: '6 months',
        role: 'Design Engineer'
      }
    ],
    internships: [
      {
        company: 'Mahindra & Mahindra',
        role: 'Design Engineer Intern',
        duration: '3 months (May-Jul 2023)',
        stipend: 35000,
        description: 'Worked on automotive component design and testing'
      }
    ],
    achievements: [
      {
        title: 'Best Engineering Design',
        description: 'Winner of inter-college design competition',
        date: '2023-10-12',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Chennai', 'Bangalore', 'Mumbai'],
      expectedSalary: { min: 700000, max: 1100000 },
      jobTypes: ['Design Engineer', 'Automotive Engineer', 'CAD Engineer'],
      companies: ['Tata Motors', 'Mahindra', 'Bajaj Auto', 'TVS']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-21T14:25:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-18T11:40:00Z'
  },
  {
    id: 'std_eng_002',
    name: 'Lakshmi Prasad',
    email: 'lakshmi.prasad@srmap.edu.in',
    rollNumber: 'AP24322140002',
    school: 'School of Engineering',
    department: 'Electrical & Electronics Engineering',
    specialization: 'Power Systems',
    year: 3,
    semester: 6,
    cgpa: 8.92,
    phone: '+91 9876543232',
    dateOfBirth: '2003-03-15',
    gender: 'Female',
    address: {
      street: '456 Power Lane, Dilsukhnagar',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500036'
    },
    parentDetails: {
      fatherName: 'Venu Prasad',
      motherName: 'Padma Prasad',
      fatherOccupation: 'Electrical Engineer',
      motherOccupation: 'Government Officer',
      annualIncome: 1300000,
      contactNumber: '+91 9876543233'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2019, percentage: 94.8 },
      twelfth: { board: 'CBSE', year: 2021, percentage: 96.2, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 3456, score: 267 }
    },
    skills: {
      technical: ['MATLAB', 'Simulink', 'ETAP', 'AutoCAD Electrical', 'PLC Programming', 'SCADA'],
      soft: ['Circuit Analysis', 'System Design', 'Technical Documentation'],
      certifications: ['Schneider Electric Certification', 'Siemens PLC Programming'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    projects: [
      {
        title: 'Smart Grid Monitoring System',
        description: 'IoT-based power grid monitoring and fault detection system',
        technologies: ['Arduino', 'IoT Sensors', 'SCADA', 'Python'],
        duration: '4 months',
        role: 'Power Systems Engineer'
      }
    ],
    internships: [],
    achievements: [
      {
        title: 'Best Power Systems Project',
        description: 'Outstanding project in renewable energy integration',
        date: '2023-11-25',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Hyderabad', 'Chennai', 'Bangalore'],
      expectedSalary: { min: 600000, max: 1000000 },
      jobTypes: ['Power Systems Engineer', 'Electrical Engineer', 'Control Systems Engineer'],
      companies: ['NTPC', 'PowerGrid', 'L&T', 'ABB']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-20T10:15:00Z',
    createdAt: '2021-08-15T00:00:00Z',
    updatedAt: '2024-01-15T13:30:00Z'
  },
  // Adding 8 more engineering students for different specializations
  {
    id: 'std_eng_003',
    name: 'Arjun Patel',
    email: 'arjun.patel@srmap.edu.in',
    rollNumber: 'AP24322140003',
    school: 'School of Engineering',
    department: 'Civil Engineering',
    specialization: 'Structural Engineering',
    year: 4,
    semester: 7,
    cgpa: 8.56,
    phone: '+91 9876543234',
    dateOfBirth: '2002-07-10',
    gender: 'Male',
    address: {
      street: '789 Structure Ave, Ameerpet',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500016'
    },
    parentDetails: {
      fatherName: 'Rajesh Patel',
      motherName: 'Nita Patel',
      fatherOccupation: 'Contractor',
      motherOccupation: 'Architect',
      annualIncome: 1100000,
      contactNumber: '+91 9876543235'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2018, percentage: 88.4 },
      twelfth: { board: 'CBSE', year: 2020, percentage: 90.1, stream: 'Science (PCM)' },
      entrance: { exam: 'JEE Main', rank: 5678, score: 235 }
    },
    skills: {
      technical: ['AutoCAD', 'Revit', 'STAAD Pro', 'ETABS', 'Primavera P6', 'MS Project'],
      soft: ['Project Planning', 'Site Management', 'Quality Control'],
      certifications: ['Autodesk Revit Professional', 'STAAD Pro Certification'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    projects: [
      {
        title: 'Earthquake Resistant Building Design',
        description: 'Seismic analysis and design of multi-story building',
        technologies: ['STAAD Pro', 'ETABS', 'AutoCAD'],
        duration: '5 months',
        role: 'Structural Engineer'
      }
    ],
    internships: [
      {
        company: 'L&T Construction',
        role: 'Site Engineer Intern',
        duration: '2 months (Jun-Jul 2023)',
        stipend: 25000,
        description: 'Site supervision and quality control activities'
      }
    ],
    achievements: [
      {
        title: 'Best Civil Engineering Project',
        description: 'Recognition for innovative structural design',
        date: '2023-12-01',
        category: 'Technical'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Mumbai', 'Pune', 'Ahmedabad'],
      expectedSalary: { min: 500000, max: 900000 },
      jobTypes: ['Structural Engineer', 'Site Engineer', 'Project Engineer'],
      companies: ['L&T', 'Shapoorji Pallonji', 'Godrej Properties', 'DLF']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-19T16:45:00Z',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-12T09:20:00Z'
  }
  // Continue with more engineering students...
];

// School of Management Students
export const managementStudents: Student[] = [
  {
    id: 'std_mgmt_001',
    name: 'Sneha Agarwal',
    email: 'sneha.agarwal@srmap.edu.in',
    rollNumber: 'AP24322160001',
    school: 'School of Management',
    department: 'Business Administration',
    specialization: 'Marketing',
    year: 2,
    semester: 4,
    cgpa: 9.15,
    phone: '+91 9876543240',
    dateOfBirth: '2004-01-20',
    gender: 'Female',
    address: {
      street: '123 Business Plaza, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    parentDetails: {
      fatherName: 'Ramesh Agarwal',
      motherName: 'Priya Agarwal',
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Marketing Manager',
      annualIncome: 2500000,
      contactNumber: '+91 9876543241'
    },
    academicHistory: {
      tenth: { board: 'CBSE', year: 2020, percentage: 96.4 },
      twelfth: { board: 'CBSE', year: 2022, percentage: 94.8, stream: 'Commerce' },
      entrance: { exam: 'CAT', rank: 2345, score: 85 }
    },
    skills: {
      technical: ['Digital Marketing', 'Google Analytics', 'Social Media Marketing', 'SEO/SEM', 'Adobe Creative Suite'],
      soft: ['Brand Management', 'Consumer Psychology', 'Market Research', 'Communication'],
      certifications: ['Google Ads Certified', 'HubSpot Content Marketing', 'Facebook Blueprint'],
      languages: ['English', 'Hindi', 'Marathi']
    },
    projects: [
      {
        title: 'Digital Marketing Campaign for Local Business',
        description: 'Comprehensive digital marketing strategy and execution',
        technologies: ['Google Ads', 'Facebook Ads', 'Analytics', 'Canva'],
        duration: '3 months',
        role: 'Marketing Strategist'
      }
    ],
    internships: [],
    achievements: [
      {
        title: 'Best Marketing Campaign',
        description: 'Winner of inter-college marketing competition',
        date: '2023-11-10',
        category: 'Academic'
      }
    ],
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Mumbai', 'Delhi', 'Bangalore'],
      expectedSalary: { min: 600000, max: 1000000 },
      jobTypes: ['Marketing Executive', 'Brand Manager', 'Digital Marketing Specialist'],
      companies: ['Unilever', 'P&G', 'Ogilvy', 'WPP']
    },
    applicationHistory: [],
    profileImage: '/api/placeholder/150/150',
    isActive: true,
    lastLoginDate: '2024-01-22T12:30:00Z',
    createdAt: '2022-08-15T00:00:00Z',
    updatedAt: '2024-01-19T14:15:00Z'
  }
  // More management students...
];

// Combine all students
export const allStudents: Student[] = [
  ...csitStudents,
  ...engineeringStudents,
  ...managementStudents
];

// Export by school for easy filtering
export const studentsBySchool = {
  'School of Computing & Information Technology': csitStudents,
  'School of Engineering': engineeringStudents,
  'School of Management': managementStudents
};

// Export counts
export const studentCounts = {
  total: allStudents.length,
  bySchool: {
    csit: csitStudents.length,
    engineering: engineeringStudents.length,
    management: managementStudents.length
  }
};