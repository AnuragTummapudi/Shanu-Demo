// Comprehensive Dummy Data for All Roles and Export Functions

// Student Data
export const studentsData = [
  {
    id: 'STU001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@srmap.edu.in',
    rollNumber: 'AP24CSE130096',
    school: 'School of Engineering & Technology',
    department: 'Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    year: 4,
    semester: 8,
    cgpa: 8.95,
    phone: '+91 9876543210',
    dateOfBirth: '2002-03-15',
    gender: 'Male',
    address: {
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032',
      fullAddress: '123, Banjara Hills, Hyderabad, Telangana - 500032'
    },
    parentDetails: {
      fatherName: 'Suresh Kumar',
      motherName: 'Lakshmi Devi',
      occupation: 'Software Engineer',
      annualIncome: 850000,
      contactNumber: '+91 9876543211'
    },
    academicHistory: {
      tenth: { percentage: 92.5, board: 'CBSE', year: 2018 },
      twelfth: { percentage: 89.2, board: 'CBSE', year: 2020 },
      entrance: { rank: 2456, exam: 'JEE Main', year: 2020 }
    },
    skills: {
      technical: ['Python', 'Java', 'React', 'Node.js', 'MongoDB', 'TensorFlow', 'Docker', 'AWS'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Work'],
      certifications: ['AWS Certified Developer', 'Google Cloud Professional', 'Microsoft Azure Fundamentals']
    },
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Hyderabad', 'Chennai'],
      expectedSalary: { min: 1200000, max: 1800000 },
      currentApplications: 5,
      interviewsScheduled: 2,
      offersReceived: 1,
      placementStatus: 'In Progress'
    },
    resumeUrl: '/resumes/rajesh_kumar_resume.pdf',
    activeStatus: 'Active',
    lastLogin: '2024-01-22T09:30:00Z',
    trainingPrograms: ['Full Stack Development', 'Data Structures & Algorithms', 'Cloud Computing'],
    attendanceRate: 95.2,
    performanceGrade: 'A+',
    achievements: ['Dean\'s List 2023', 'Best Project Award', 'Hackathon Winner'],
    projects: [
      { name: 'E-commerce Platform', technology: 'MERN Stack', duration: '6 months' },
      { name: 'AI Chatbot', technology: 'Python, TensorFlow', duration: '4 months' }
    ]
  },
  {
    id: 'STU002',
    name: 'Priya Sharma',
    email: 'priya.sharma@srmap.edu.in',
    rollNumber: 'AP24IT130097',
    school: 'School of Engineering & Technology',
    department: 'Information Technology',
    specialization: 'Cybersecurity',
    year: 4,
    semester: 8,
    cgpa: 9.12,
    phone: '+91 9876543212',
    dateOfBirth: '2002-05-22',
    gender: 'Female',
    address: {
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      fullAddress: '456, MG Road, Bangalore, Karnataka - 560001'
    },
    parentDetails: {
      fatherName: 'Ravi Sharma',
      motherName: 'Sunita Sharma',
      occupation: 'Bank Manager',
      annualIncome: 1200000,
      contactNumber: '+91 9876543213'
    },
    academicHistory: {
      tenth: { percentage: 95.8, board: 'ICSE', year: 2018 },
      twelfth: { percentage: 91.5, board: 'ISC', year: 2020 },
      entrance: { rank: 1876, exam: 'JEE Main', year: 2020 }
    },
    skills: {
      technical: ['Python', 'Java', 'Ethical Hacking', 'Network Security', 'Linux', 'Blockchain'],
      soft: ['Critical Thinking', 'Attention to Detail', 'Communication', 'Leadership'],
      certifications: ['CEH', 'CISSP', 'CompTIA Security+']
    },
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Bangalore', 'Mumbai', 'Pune'],
      expectedSalary: { min: 1400000, max: 2000000 },
      currentApplications: 7,
      interviewsScheduled: 3,
      offersReceived: 2,
      placementStatus: 'Placed'
    },
    resumeUrl: '/resumes/priya_sharma_resume.pdf',
    activeStatus: 'Active',
    lastLogin: '2024-01-22T08:45:00Z',
    trainingPrograms: ['Cybersecurity Fundamentals', 'Ethical Hacking', 'Network Security'],
    attendanceRate: 98.1,
    performanceGrade: 'A+',
    achievements: ['Gold Medalist', 'Best Student Award', 'Research Paper Published'],
    projects: [
      { name: 'Network Security Scanner', technology: 'Python, Nmap', duration: '5 months' },
      { name: 'Blockchain Voting System', technology: 'Solidity, Web3', duration: '6 months' }
    ]
  },
  {
    id: 'STU003',
    name: 'Arjun Reddy',
    email: 'arjun.reddy@srmap.edu.in',
    rollNumber: 'AP24ECE130098',
    school: 'School of Engineering & Technology',
    department: 'Electronics & Communication',
    specialization: 'VLSI Design',
    year: 4,
    semester: 8,
    cgpa: 8.67,
    phone: '+91 9876543214',
    dateOfBirth: '2002-08-10',
    gender: 'Male',
    address: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      fullAddress: '789, Anna Nagar, Chennai, Tamil Nadu - 600001'
    },
    parentDetails: {
      fatherName: 'Venkat Reddy',
      motherName: 'Kavitha Reddy',
      occupation: 'Electrical Engineer',
      annualIncome: 950000,
      contactNumber: '+91 9876543215'
    },
    academicHistory: {
      tenth: { percentage: 88.9, board: 'State Board', year: 2018 },
      twelfth: { percentage: 86.7, board: 'State Board', year: 2020 },
      entrance: { rank: 3456, exam: 'EAMCET', year: 2020 }
    },
    skills: {
      technical: ['Verilog', 'MATLAB', 'Cadence', 'FPGA', 'Embedded C', 'Arduino'],
      soft: ['Problem Solving', 'Analytical Thinking', 'Team Collaboration'],
      certifications: ['Cadence Certified', 'ARM Certified Engineer']
    },
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Chennai', 'Bangalore', 'Hyderabad'],
      expectedSalary: { min: 1000000, max: 1500000 },
      currentApplications: 4,
      interviewsScheduled: 1,
      offersReceived: 0,
      placementStatus: 'In Progress'
    },
    resumeUrl: '/resumes/arjun_reddy_resume.pdf',
    activeStatus: 'Active',
    lastLogin: '2024-01-21T19:20:00Z',
    trainingPrograms: ['VLSI Design', 'Embedded Systems'],
    attendanceRate: 87.5,
    performanceGrade: 'A',
    achievements: ['Technical Symposium Winner', 'Project Exhibition Award'],
    projects: [
      { name: 'Smart Home Automation', technology: 'Arduino, IoT', duration: '4 months' },
      { name: 'Digital Signal Processor', technology: 'Verilog, FPGA', duration: '5 months' }
    ]
  },
  {
    id: 'STU004',
    name: 'Meera Patel',
    email: 'meera.patel@srmap.edu.in',
    rollNumber: 'AP24MBA130099',
    school: 'School of Management',
    department: 'Business Administration',
    specialization: 'Human Resources',
    year: 2,
    semester: 4,
    cgpa: 8.45,
    phone: '+91 9876543216',
    dateOfBirth: '2002-11-05',
    gender: 'Female',
    address: {
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      fullAddress: '321, Nariman Point, Mumbai, Maharashtra - 400001'
    },
    parentDetails: {
      fatherName: 'Amit Patel',
      motherName: 'Nisha Patel',
      occupation: 'Business Owner',
      annualIncome: 1100000,
      contactNumber: '+91 9876543217'
    },
    academicHistory: {
      tenth: { percentage: 90.3, board: 'CBSE', year: 2018 },
      twelfth: { percentage: 88.1, board: 'CBSE', year: 2020 },
      entrance: { rank: 456, exam: 'CAT', year: 2022 }
    },
    skills: {
      technical: ['Excel', 'SAP HR', 'Workday', 'Power BI', 'SQL'],
      soft: ['Leadership', 'Communication', 'Negotiation', 'Strategic Thinking'],
      certifications: ['SHRM-CP', 'PHR', 'Google Analytics']
    },
    placementStatus: {
      isRegistered: true,
      preferredLocations: ['Mumbai', 'Delhi', 'Pune'],
      expectedSalary: { min: 800000, max: 1200000 },
      currentApplications: 6,
      interviewsScheduled: 2,
      offersReceived: 1,
      placementStatus: 'In Progress'
    },
    resumeUrl: '/resumes/meera_patel_resume.pdf',
    activeStatus: 'Active',
    lastLogin: '2024-01-22T10:15:00Z',
    trainingPrograms: ['HR Analytics', 'Leadership Development', 'Digital Marketing'],
    attendanceRate: 92.8,
    performanceGrade: 'A',
    achievements: ['Best HR Project', 'Leadership Award', 'Case Study Competition Winner'],
    projects: [
      { name: 'Employee Engagement System', technology: 'Survey Analysis', duration: '3 months' },
      { name: 'Recruitment Analytics', technology: 'Power BI, Excel', duration: '4 months' }
    ]
  },
  {
    id: 'STU005',
    name: 'Kiran Singh',
    email: 'kiran.singh@srmap.edu.in',
    rollNumber: 'AP23MECH130100',
    school: 'School of Engineering & Technology',
    department: 'Mechanical Engineering',
    specialization: 'Automotive Engineering',
    year: 3,
    semester: 6,
    cgpa: 7.89,
    phone: '+91 9876543218',
    dateOfBirth: '2003-01-18',
    gender: 'Male',
    address: {
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      fullAddress: '654, CP, New Delhi, Delhi - 110001'
    },
    parentDetails: {
      fatherName: 'Rajinder Singh',
      motherName: 'Gurpreet Kaur',
      occupation: 'Government Officer',
      annualIncome: 750000,
      contactNumber: '+91 9876543219'
    },
    academicHistory: {
      tenth: { percentage: 85.4, board: 'CBSE', year: 2019 },
      twelfth: { percentage: 82.6, board: 'CBSE', year: 2021 },
      entrance: { rank: 4567, exam: 'JEE Main', year: 2021 }
    },
    skills: {
      technical: ['AutoCAD', 'SolidWorks', 'ANSYS', 'CATIA', 'MATLAB'],
      soft: ['Problem Solving', 'Team Work', 'Design Thinking'],
      certifications: ['SolidWorks Professional', 'AutoCAD Certified User']
    },
    placementStatus: {
      isRegistered: false,
      preferredLocations: ['Delhi', 'Gurgaon', 'Noida'],
      expectedSalary: { min: 700000, max: 1000000 },
      currentApplications: 2,
      interviewsScheduled: 0,
      offersReceived: 0,
      placementStatus: 'Not Registered'
    },
    resumeUrl: '/resumes/kiran_singh_resume.pdf',
    activeStatus: 'Active',
    lastLogin: '2024-01-21T18:30:00Z',
    trainingPrograms: ['CAD Design', 'Automotive Systems'],
    attendanceRate: 79.2,
    performanceGrade: 'B+',
    achievements: ['Design Competition Finalist', 'Workshop Certificate'],
    projects: [
      { name: 'Electric Vehicle Design', technology: 'CAD, Simulation', duration: '6 months' },
      { name: 'Engine Analysis', technology: 'ANSYS, MATLAB', duration: '4 months' }
    ]
  }
];

// Company/Recruiter Data
export const companiesData = [
  {
    id: 'COMP001',
    name: 'Microsoft India',
    contactPerson: 'Rahul Krishnan',
    email: 'rahul.krishnan@microsoft.com',
    phone: '+91 9876501234',
    alternatePhone: '+91 9876501235',
    industry: 'Technology',
    location: 'Hyderabad',
    officeAddress: 'Microsoft India Development Center, Survey No: 31 & 32, Hyderabad',
    companySize: '10000+',
    website: 'https://www.microsoft.com/en-in',
    establishedYear: 1998,
    partnershipStartDate: '2019-08-15',
    partnershipStatus: 'Active',
    totalHirings: 89,
    averageSalary: 1850000,
    highestSalary: 4500000,
    lowestSalary: 1200000,
    jobTypesOffered: ['Full-time', 'Internship'],
    preferredDepartments: ['CSE', 'IT', 'ECE'],
    minimumCGPA: 8.0,
    lastRecruitmentDate: '2024-01-15',
    nextRecruitmentDate: '2024-04-15',
    satisfactionRating: 4.8,
    companyDescription: 'Global technology leader in productivity and cloud computing',
    benefits: ['Health Insurance', 'Stock Options', 'Flexible Work', 'Training Programs'],
    workCulture: 'Collaborative and Innovation-focused',
    notes: 'Premium technology partner with excellent growth opportunities',
    hrContact: 'Sneha Menon',
    hrEmail: 'sneha.menon@microsoft.com',
    campusVisits: 5,
    currentOpenings: 12,
    companyCategory: 'Tier 1',
    recruitmentProcess: ['Online Test', 'Technical Interview', 'HR Interview'],
    documentsRequired: ['Resume', 'Academic Transcripts', 'ID Proof']
  },
  {
    id: 'COMP002',
    name: 'TCS Digital',
    contactPerson: 'Suresh Babu',
    email: 'suresh.babu@tcs.com',
    phone: '+91 9876501236',
    alternatePhone: '+91 9876501237',
    industry: 'IT Services',
    location: 'Chennai',
    officeAddress: 'Tata Consultancy Services, Sholinganallur, Chennai',
    companySize: '500000+',
    website: 'https://www.tcs.com',
    establishedYear: 1968,
    partnershipStartDate: '2015-03-20',
    partnershipStatus: 'Active',
    totalHirings: 156,
    averageSalary: 650000,
    highestSalary: 1200000,
    lowestSalary: 400000,
    jobTypesOffered: ['Full-time'],
    preferredDepartments: ['CSE', 'IT', 'ECE', 'EEE'],
    minimumCGPA: 6.5,
    lastRecruitmentDate: '2024-01-20',
    nextRecruitmentDate: '2024-03-20',
    satisfactionRating: 4.5,
    companyDescription: 'Leading global IT services and consulting company',
    benefits: ['Health Insurance', 'Training Programs', 'Career Growth', 'Global Exposure'],
    workCulture: 'Professional and Learning-oriented',
    notes: 'Largest recruiter with diverse opportunities across domains',
    hrContact: 'Priya Subramanian',
    hrEmail: 'priya.subramanian@tcs.com',
    campusVisits: 8,
    currentOpenings: 25,
    companyCategory: 'Tier 1',
    recruitmentProcess: ['Aptitude Test', 'Technical Interview', 'HR Interview'],
    documentsRequired: ['Resume', 'Academic Certificates', 'Photo ID']
  },
  {
    id: 'COMP003',
    name: 'Amazon',
    contactPerson: 'Vikram Shah',
    email: 'vikram.shah@amazon.com',
    phone: '+91 9876501238',
    alternatePhone: '+91 9876501239',
    industry: 'E-commerce & Cloud',
    location: 'Bangalore',
    officeAddress: 'Amazon Development Center, Bagmane Constellation Business Park, Bangalore',
    companySize: '100000+',
    website: 'https://www.amazon.in',
    establishedYear: 1994,
    partnershipStartDate: '2020-06-10',
    partnershipStatus: 'Active',
    totalHirings: 72,
    averageSalary: 1650000,
    highestSalary: 3800000,
    lowestSalary: 1000000,
    jobTypesOffered: ['Full-time', 'Internship'],
    preferredDepartments: ['CSE', 'IT'],
    minimumCGPA: 7.5,
    lastRecruitmentDate: '2024-01-18',
    nextRecruitmentDate: '2024-05-18',
    satisfactionRating: 4.7,
    companyDescription: 'Global e-commerce and cloud computing leader',
    benefits: ['Competitive Salary', 'Stock Units', 'Health Benefits', 'Learning Opportunities'],
    workCulture: 'Customer-obsessed and Innovation-driven',
    notes: 'Global technology leader with excellent compensation',
    hrContact: 'Anisha Gupta',
    hrEmail: 'anisha.gupta@amazon.com',
    campusVisits: 4,
    currentOpenings: 8,
    companyCategory: 'Tier 1',
    recruitmentProcess: ['Online Assessment', 'Technical Rounds', 'Bar Raiser Interview'],
    documentsRequired: ['Resume', 'Transcripts', 'Portfolio']
  }
];

// Faculty/Trainer Data
export const facultyData = [
  {
    id: 'FAC001',
    name: 'Dr. Lakshmi Venkatesh',
    email: 'lakshmi.venkatesh@srmap.edu.in',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Head',
    specialization: ['Machine Learning', 'Data Science', 'Artificial Intelligence'],
    experience: 18,
    qualification: 'Ph.D. in Computer Science from IIT Madras',
    phone: '+91 9876505001',
    alternatePhone: '+91 9876505002',
    dateOfJoining: '2015-07-01',
    employeeId: 'SRMAP-FAC-001',
    officeLocation: 'CSE Block, Room 301',
    researchArea: ['Artificial Intelligence', 'Deep Learning', 'Computer Vision'],
    publicationsCount: 45,
    hIndex: 12,
    citationsCount: 756,
    projectsHandled: 12,
    currentProjects: 3,
    fundingReceived: 2500000,
    currentCourses: ['Machine Learning', 'Advanced Algorithms', 'Data Structures'],
    previousCourses: ['Programming Fundamentals', 'Database Systems', 'Software Engineering'],
    trainingProgramsConducted: 8,
    industryExperience: 5,
    previousIndustry: 'IBM Research',
    certifications: ['Google AI Certified', 'Microsoft AI Engineer', 'AWS Machine Learning'],
    awards: ['Best Faculty Award 2023', 'Excellence in Research 2022', 'Outstanding Teacher 2021'],
    studentsGuided: 25,
    currentStudentsCount: 8,
    averageRating: 4.7,
    teachingLoad: 16,
    adminRoles: ['Department Head', 'Academic Committee Member'],
    activeStatus: 'Active',
    lastLogin: '2024-01-22T09:00:00Z',
    officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
    personalWebsite: 'https://faculty.srmap.edu.in/lakshmi-venkatesh',
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/lakshmi-venkatesh',
      googleScholar: 'https://scholar.google.com/citations?user=abc123',
      researchGate: 'https://researchgate.net/profile/lakshmi-venkatesh'
    }
  },
  {
    id: 'FAC002',
    name: 'Prof. Krishna Murthy',
    email: 'krishna.murthy@srmap.edu.in',
    department: 'Information Technology',
    designation: 'Associate Professor',
    specialization: ['Cybersecurity', 'Network Security', 'Blockchain'],
    experience: 12,
    qualification: 'Ph.D. in Information Technology from IIIT Hyderabad',
    phone: '+91 9876505003',
    alternatePhone: '+91 9876505004',
    dateOfJoining: '2018-08-15',
    employeeId: 'SRMAP-FAC-002',
    officeLocation: 'IT Block, Room 205',
    researchArea: ['Blockchain Technology', 'IoT Security', 'Cryptography'],
    publicationsCount: 28,
    hIndex: 8,
    citationsCount: 423,
    projectsHandled: 7,
    currentProjects: 2,
    fundingReceived: 1800000,
    currentCourses: ['Network Security', 'Ethical Hacking', 'Blockchain Technology'],
    previousCourses: ['Computer Networks', 'Operating Systems', 'Web Technologies'],
    trainingProgramsConducted: 5,
    industryExperience: 3,
    previousIndustry: 'Infosys Technologies',
    certifications: ['CISSP', 'CEH', 'CISA', 'CISM'],
    awards: ['Innovation in Teaching 2023', 'Research Excellence Award 2022'],
    studentsGuided: 18,
    currentStudentsCount: 6,
    averageRating: 4.5,
    teachingLoad: 14,
    adminRoles: ['Security Committee Head', 'IT Infrastructure Committee'],
    activeStatus: 'Active',
    lastLogin: '2024-01-22T08:30:00Z',
    officeHours: 'Tue-Thu: 3:00 PM - 5:00 PM',
    personalWebsite: 'https://faculty.srmap.edu.in/krishna-murthy',
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/krishna-murthy-security',
      googleScholar: 'https://scholar.google.com/citations?user=def456',
      researchGate: 'https://researchgate.net/profile/krishna-murthy'
    }
  }
];

// Training Programs Data
export const trainingProgramsData = [
  {
    id: 'TRAIN001',
    programName: 'Full Stack Web Development',
    instructor: 'Dr. Lakshmi Venkatesh',
    coInstructors: ['Prof. Ravi Kumar', 'Ms. Anita Sharma'],
    department: 'Computer Science & Engineering',
    duration: '12 weeks',
    totalHours: 120,
    startDate: '2024-01-08',
    endDate: '2024-04-05',
    schedule: 'Mon-Wed-Fri: 2:00 PM - 4:00 PM',
    venue: 'CSE Lab 1, Block A',
    totalParticipants: 156,
    enrolledParticipants: 156,
    completedParticipants: 142,
    droppedOut: 14,
    averageScore: 87.5,
    passingScore: 60,
    highestScore: 98,
    lowestScore: 45,
    satisfactionRating: 4.6,
    courseFee: 25000,
    scholarshipAvailable: true,
    mode: 'Hybrid',
    onlineComponent: 40,
    practicalComponent: 60,
    certificationType: 'Industry Recognized',
    certifyingBody: 'Microsoft',
    prerequisites: ['Basic Programming Knowledge', 'HTML/CSS Basics'],
    learningOutcomes: [
      'Full Stack Development with MERN',
      'React.js and Node.js Proficiency',
      'Database Design and Management',
      'RESTful API Development',
      'Deployment and DevOps Basics'
    ],
    curriculum: [
      { module: 'HTML/CSS/JavaScript', duration: '2 weeks' },
      { module: 'React.js Fundamentals', duration: '3 weeks' },
      { module: 'Node.js and Express', duration: '3 weeks' },
      { module: 'Database Integration', duration: '2 weeks' },
      { module: 'Project Development', duration: '2 weeks' }
    ],
    assessmentMethod: 'Projects (60%) + Assignments (25%) + Final Exam (15%)',
    attendanceRequirement: 80,
    attendanceRate: 92.3,
    placementRate: 78.4,
    averageSalaryIncrease: 180000,
    industryPartner: 'Microsoft',
    partnerInvolvement: 'Guest Lectures and Final Assessment',
    status: 'Ongoing',
    resources: [
      { type: 'Textbook', name: 'Modern Web Development', author: 'John Doe' },
      { type: 'Online Platform', name: 'Coding Platform Access', url: 'https://platform.example.com' }
    ],
    feedback: {
      positive: ['Excellent hands-on approach', 'Industry-relevant curriculum', 'Great instructor support'],
      improvements: ['More practical examples needed', 'Faster pace requested', 'Additional resources']
    }
  },
  {
    id: 'TRAIN002',
    programName: 'Data Science & Analytics',
    instructor: 'Dr. Sangeetha Ravi',
    coInstructors: ['Dr. Manoj Kumar', 'Ms. Divya Raj'],
    department: 'Computer Science & Engineering',
    duration: '10 weeks',
    totalHours: 100,
    startDate: '2023-11-15',
    endDate: '2024-02-15',
    schedule: 'Tue-Thu: 10:00 AM - 12:00 PM',
    venue: 'Data Science Lab, Block B',
    totalParticipants: 134,
    enrolledParticipants: 134,
    completedParticipants: 128,
    droppedOut: 6,
    averageScore: 89.2,
    passingScore: 65,
    highestScore: 96,
    lowestScore: 52,
    satisfactionRating: 4.7,
    courseFee: 30000,
    scholarshipAvailable: true,
    mode: 'Online',
    onlineComponent: 70,
    practicalComponent: 30,
    certificationType: 'University + Industry Certified',
    certifyingBody: 'IBM',
    prerequisites: ['Mathematics', 'Statistics', 'Basic Python'],
    learningOutcomes: [
      'Data Analysis and Visualization',
      'Machine Learning Algorithms',
      'Python for Data Science',
      'R Programming',
      'Tableau Dashboard Creation'
    ],
    curriculum: [
      { module: 'Python for Data Science', duration: '2 weeks' },
      { module: 'Statistics and Probability', duration: '2 weeks' },
      { module: 'Machine Learning', duration: '3 weeks' },
      { module: 'Data Visualization', duration: '2 weeks' },
      { module: 'Capstone Project', duration: '1 week' }
    ],
    assessmentMethod: 'Capstone Project (50%) + Weekly Assignments (30%) + Quizzes (20%)',
    attendanceRequirement: 85,
    attendanceRate: 95.6,
    placementRate: 82.1,
    averageSalaryIncrease: 220000,
    industryPartner: 'IBM',
    partnerInvolvement: 'Mentorship and Project Guidance',
    status: 'Completed',
    resources: [
      { type: 'Software', name: 'Anaconda Python Distribution', version: '3.9' },
      { type: 'Tool', name: 'Tableau Desktop', license: 'Student License' }
    ],
    feedback: {
      positive: ['Comprehensive curriculum', 'Real-world datasets', 'Expert mentorship'],
      improvements: ['More advanced topics', 'Extended duration', 'More industry cases']
    }
  }
];

// Job Applications Data
export const jobApplicationsData = [
  {
    id: 'APP001',
    studentId: 'STU001',
    studentName: 'Rajesh Kumar',
    studentEmail: 'rajesh.kumar@srmap.edu.in',
    studentPhone: '+91 9876543210',
    rollNumber: 'AP24CSE130096',
    department: 'Computer Science & Engineering',
    currentCGPA: 8.95,
    companyId: 'COMP001',
    companyName: 'Microsoft India',
    jobId: 'JOB001',
    jobTitle: 'Software Engineer',
    jobCategory: 'Technical',
    applicationDate: '2024-01-15',
    applicationDeadline: '2024-01-30',
    status: 'Interview Scheduled',
    applicationStage: 'Technical Round 2',
    currentRound: 'Technical Interview',
    totalRounds: 4,
    roundsCompleted: 2,
    interviewDate: '2024-01-28',
    interviewTime: '10:00 AM',
    interviewMode: 'Virtual',
    interviewLink: 'https://teams.microsoft.com/meet/abc123',
    interviewPanel: ['Rahul Krishnan', 'Sneha Menon'],
    salaryRange: '₹18-25 LPA',
    salaryOffered: null,
    jobLocation: 'Hyderabad',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    jobDescription: 'Develop and maintain software applications using modern technologies',
    requiredSkills: ['Python', 'Java', 'React', 'Node.js'],
    preferredSkills: ['AWS', 'Docker', 'Kubernetes'],
    minimumCGPA: 8.0,
    experienceRequired: '0-1 years',
    bondPeriod: '2 years',
    noticePeriod: '2 months',
    recruiterContact: 'Rahul Krishnan',
    recruiterEmail: 'rahul.krishnan@microsoft.com',
    recruiterPhone: '+91 9876501234',
    applicationSource: 'Campus Placement',
    referenceCode: 'MS-CSE-2024-001',
    documentsSubmitted: ['Resume', 'Transcripts', 'Cover Letter'],
    documentsVerified: true,
    backgroundCheckStatus: 'Pending',
    medicalCheckStatus: 'Not Started',
    offerLetterReceived: false,
    offerAcceptanceDeadline: null,
    joiningDate: null,
    rejectionReason: null,
    feedback: 'Strong technical skills, good problem-solving approach',
    notes: 'Candidate showed excellent coding abilities in first round',
    lastUpdated: '2024-01-22T14:30:00Z',
    timeline: [
      { stage: 'Application Submitted', date: '2024-01-15', status: 'Completed' },
      { stage: 'Resume Screening', date: '2024-01-18', status: 'Completed' },
      { stage: 'Technical Round 1', date: '2024-01-22', status: 'Completed' },
      { stage: 'Technical Round 2', date: '2024-01-28', status: 'Scheduled' }
    ]
  },
  {
    id: 'APP002',
    studentId: 'STU002',
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma@srmap.edu.in',
    studentPhone: '+91 9876543212',
    rollNumber: 'AP24IT130097',
    department: 'Information Technology',
    currentCGPA: 9.12,
    companyId: 'COMP003',
    companyName: 'Amazon',
    jobId: 'JOB002',
    jobTitle: 'SDE Intern',
    jobCategory: 'Technical',
    applicationDate: '2024-01-12',
    applicationDeadline: '2024-01-25',
    status: 'Shortlisted',
    applicationStage: 'Technical Round 1',
    currentRound: 'Technical Assessment',
    totalRounds: 3,
    roundsCompleted: 1,
    interviewDate: '2024-01-25',
    interviewTime: '2:00 PM',
    interviewMode: 'Virtual',
    interviewLink: 'https://amazon-interviews.com/session/xyz789',
    interviewPanel: ['Vikram Shah', 'Anisha Gupta'],
    salaryRange: '₹15-22 LPA',
    salaryOffered: null,
    jobLocation: 'Bangalore',
    workMode: 'On-site',
    jobType: 'Full-time',
    jobDescription: 'Develop scalable software solutions for e-commerce platform',
    requiredSkills: ['Java', 'Python', 'System Design', 'Data Structures'],
    preferredSkills: ['AWS', 'Microservices', 'Distributed Systems'],
    minimumCGPA: 7.5,
    experienceRequired: 'Fresher',
    bondPeriod: '1 year',
    noticePeriod: '1 month',
    recruiterContact: 'Vikram Shah',
    recruiterEmail: 'vikram.shah@amazon.com',
    recruiterPhone: '+91 9876501238',
    applicationSource: 'Campus Placement',
    referenceCode: 'AMZ-IT-2024-002',
    documentsSubmitted: ['Resume', 'Academic Records', 'Portfolio'],
    documentsVerified: true,
    backgroundCheckStatus: 'Not Started',
    medicalCheckStatus: 'Not Started',
    offerLetterReceived: false,
    offerAcceptanceDeadline: null,
    joiningDate: null,
    rejectionReason: null,
    feedback: 'Exceptional academic performance, strong cybersecurity background',
    notes: 'Top performer in online assessment, well-suited for security roles',
    lastUpdated: '2024-01-22T16:45:00Z',
    timeline: [
      { stage: 'Application Submitted', date: '2024-01-12', status: 'Completed' },
      { stage: 'Online Assessment', date: '2024-01-16', status: 'Completed' },
      { stage: 'Technical Round 1', date: '2024-01-25', status: 'Scheduled' }
    ]
  }
];

// Operations Reports Data
export const operationsReportsData = [
  {
    id: 'OPS001',
    reportType: 'Placement Statistics',
    reportTitle: 'Department-wise Placement Analysis Q4 2023-24',
    generatedBy: 'Suresh Babu',
    generatedByRole: 'Operations Manager',
    generatedDate: '2024-01-22',
    reportPeriod: 'Q4 2023-24',
    academicYear: '2023-24',
    department: 'Computer Science & Engineering',
    scope: 'Department Level',
    totalStudents: 456,
    eligibleStudents: 423,
    registeredStudents: 398,
    placedStudents: 346,
    unplacedStudents: 52,
    placementPercentage: 87.3,
    averagePackage: 1250000,
    medianPackage: 1100000,
    highestPackage: 4500000,
    lowestPackage: 650000,
    companiesVisited: 45,
    companiesSelected: 32,
    offersReceived: 423,
    offersAccepted: 346,
    multipleOffers: 67,
    studentsWithMultipleOffers: 67,
    femaleParticipation: 42.5,
    femalePlacementRate: 89.2,
    maleParticipationRate: 57.5,
    malePlacementRate: 85.8,
    categoryWiseData: {
      'Product Companies': { count: 89, percentage: 25.7 },
      'Service Companies': { count: 156, percentage: 45.1 },
      'Startups': { count: 67, percentage: 19.4 },
      'Government': { count: 34, percentage: 9.8 }
    },
    salaryDistribution: {
      '5-10 LPA': 145,
      '10-15 LPA': 123,
      '15-20 LPA': 45,
      '20+ LPA': 33
    },
    topRecruiters: [
      { company: 'Microsoft', hired: 23, avgSalary: 2200000 },
      { company: 'Amazon', hired: 18, avgSalary: 1950000 },
      { company: 'TCS', hired: 45, avgSalary: 750000 }
    ],
    trends: {
      yearOnYearGrowth: 12.3,
      packageGrowth: 15.7,
      participationGrowth: 8.9
    },
    reportStatus: 'Final',
    approvalStatus: 'Approved',
    approvedBy: 'Dr. Rajesh Kumar',
    approvalDate: '2024-01-23',
    distributionList: ['Department Head', 'Dean', 'Principal', 'Management'],
    confidentialityLevel: 'Internal',
    nextReportDue: '2024-04-22',
    recommendations: [
      'Increase focus on product companies',
      'Enhance coding preparation programs',
      'Expand industry partnerships'
    ],
    dataAccuracy: 98.5,
    verificationStatus: 'Verified',
    lastModified: '2024-01-22T18:30:00Z'
  },
  {
    id: 'OPS002',
    reportType: 'Training Effectiveness',
    reportTitle: 'Impact Analysis of Skill Development Programs',
    generatedBy: 'Deepika Sharma',
    generatedByRole: 'Training Coordinator',
    generatedDate: '2024-01-20',
    reportPeriod: 'Jan 2024',
    academicYear: '2023-24',
    trainingProgram: 'Full Stack Development',
    programId: 'TRAIN001',
    instructor: 'Dr. Lakshmi Venkatesh',
    duration: '12 weeks',
    totalParticipants: 156,
    activeParticipants: 142,
    completedParticipants: 128,
    droppedOut: 14,
    completionRate: 91.0,
    averageScore: 87.5,
    passingRate: 95.3,
    excellenceRate: 23.4,
    satisfactionScore: 4.6,
    knowledgeGainScore: 4.7,
    instructorRating: 4.8,
    contentRating: 4.5,
    platformRating: 4.3,
    certificationsIssued: 128,
    industryRecognition: 'Microsoft Certified',
    placementImpact: {
      placementRate: 78.4,
      averageSalaryIncrease: 180000,
      industryPreference: 'Technology'
    },
    skillsAcquired: [
      { skill: 'React.js', proficiency: 85.2 },
      { skill: 'Node.js', proficiency: 82.7 },
      { skill: 'Database Management', proficiency: 79.3 }
    ],
    industryFeedback: {
      relevance: 4.6,
      practicalApproach: 4.7,
      jobReadiness: 4.5
    },
    costAnalysis: {
      totalCost: 3900000,
      costPerParticipant: 25000,
      costPerCertification: 30469,
      roi: 280.5,
      paybackPeriod: '8 months'
    },
    resourceUtilization: {
      labUsage: 89.5,
      equipmentEfficiency: 92.3,
      instructorLoad: 16.2
    },
    outcomes: {
      jobPlacements: 100,
      salaryImprovement: 'Average 18% increase',
      careerAdvancement: '67% received promotions/offers'
    },
    challenges: [
      'High initial dropout rate in first 2 weeks',
      'Need for more advanced topics',
      'Limited lab capacity during peak hours'
    ],
    improvements: [
      'Introduction of pre-course preparation module',
      'Advanced track for high performers',
      'Expanded lab timings'
    ],
    reportStatus: 'Final',
    approvalStatus: 'Approved',
    approvedBy: 'Prof. Krishna Murthy',
    approvalDate: '2024-01-21',
    benchmarking: {
      industryAverage: 75.2,
      universityAverage: 82.1,
      performanceRanking: 'Above Average'
    },
    futureRecommendations: [
      'Expand program to other departments',
      'Introduce advanced modules',
      'Partner with more industry players'
    ]
  }
];

// Budget Data
export const budgetData = [
  {
    id: 'BUD001',
    fiscalYear: '2024-25',
    category: 'Training Programs',
    subCategory: 'Skill Development',
    department: 'All Departments',
    budgetHead: 'Academic Development',
    allocated: 15000000,
    revised: 15500000,
    spent: 12500000,
    committed: 1800000,
    available: 1200000,
    utilization: 80.6,
    variance: -500000,
    variancePercentage: -3.2,
    quarterlyBreakdown: {
      Q1: { allocated: 3750000, spent: 3200000 },
      Q2: { allocated: 3750000, spent: 3800000 },
      Q3: { allocated: 3750000, spent: 3100000 },
      Q4: { allocated: 3750000, spent: 2400000 }
    },
    majorExpenses: [
      { item: 'Full Stack Development Program', amount: 3900000 },
      { item: 'Data Science Training', amount: 4020000 },
      { item: 'Cloud Computing Course', amount: 2940000 },
      { item: 'Cybersecurity Workshop', amount: 1640000 }
    ],
    approvedBy: 'Finance Committee',
    budgetOwner: 'Dr. Lakshmi Venkatesh',
    lastModified: '2024-01-22',
    status: 'Active',
    notes: 'Additional allocation approved for industry partnership programs'
  },
  {
    id: 'BUD002',
    fiscalYear: '2024-25',
    category: 'Placement Activities',
    subCategory: 'Campus Recruitment',
    department: 'Placement Cell',
    budgetHead: 'Student Services',
    allocated: 8000000,
    revised: 8200000,
    spent: 6800000,
    committed: 900000,
    available: 500000,
    utilization: 82.9,
    variance: 200000,
    variancePercentage: 2.4,
    quarterlyBreakdown: {
      Q1: { allocated: 2000000, spent: 1850000 },
      Q2: { allocated: 2000000, spent: 2100000 },
      Q3: { allocated: 2000000, spent: 1950000 },
      Q4: { allocated: 2000000, spent: 900000 }
    },
    majorExpenses: [
      { item: 'Company Visit Coordination', amount: 2400000 },
      { item: 'Assessment Center Setup', amount: 1800000 },
      { item: 'Student Preparation Programs', amount: 1600000 },
      { item: 'Industry Interface Events', amount: 1000000 }
    ],
    approvedBy: 'Academic Council',
    budgetOwner: 'Suresh Babu',
    lastModified: '2024-01-20',
    status: 'Active',
    notes: 'Higher expenses in Q2 due to increased campus visits'
  }
];

// Export all data
export const getAllData = () => ({
  students: studentsData,
  companies: companiesData,
  faculty: facultyData,
  training: trainingProgramsData,
  applications: jobApplicationsData,
  operations: operationsReportsData,
  budget: budgetData
});

// Helper functions to get filtered data by role
export const getDataByRole = (role: string, dataType: string) => {
  const allData = getAllData();
  
  switch (role) {
    case 'student':
      // Students can only see their own data
      switch (dataType) {
        case 'applications': 
          return allData.applications.filter(app => app.studentId === 'STU001'); // Current user
        case 'training': 
          return allData.training;
        case 'profile':
          return allData.students.filter(student => student.id === 'STU001'); // Current user
        default: 
          return [];
      }
    
    case 'faculty':
      switch (dataType) {
        case 'students': 
          return allData.students.filter(s => s.department === 'Computer Science & Engineering');
        case 'training': 
          return allData.training.filter(t => t.instructor === 'Dr. Lakshmi Venkatesh');
        case 'applications':
          return allData.applications.filter(app => app.department === 'Computer Science & Engineering');
        default: 
          return allData[dataType as keyof typeof allData] || [];
      }
    
    case 'outreach':
      switch (dataType) {
        case 'companies': 
          return allData.companies;
        case 'applications': 
          return allData.applications;
        case 'students': 
          return allData.students.filter(s => s.placementStatus.isRegistered);
        default: 
          return allData[dataType as keyof typeof allData] || [];
      }
    
    case 'operations':
      // Operations can see most data
      return allData[dataType as keyof typeof allData] || [];
    
    case 'admin':
      // Admin can see all data
      return allData[dataType as keyof typeof allData] || [];
    
    default:
      return [];
  }
};