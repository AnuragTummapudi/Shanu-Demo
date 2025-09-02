export interface Company {
  id: number;
  name: string;
  sector: string;
  employees: string;
  locations: string[];
  ctcRange: string;
  positions: number;
  description: string;
  website: string;
  founded: string;
  address: string;
  status: 'onboarded' | 'negotiation' | 'contacted' | 'closed';
  contact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  nextAction: string;
  lastContact: string;
  notes: string;
  documents: Array<{
    name: string;
    type: string;
    uploadDate: string;
  }>;
  hiringRate?: number;
  responseRate?: number;
  performance?: 'low' | 'medium' | 'high';
}

export const companiesData: Company[] = [
  {
    id: 1,
    name: 'TechMahindra Limited',
    sector: 'Information Technology',
    employees: '150,000+',
    locations: ['Hyderabad', 'Chennai', 'Bangalore', 'Pune'],
    ctcRange: '₹4.5L - ₹18L',
    positions: 45,
    description: 'Global technology consulting and digital solutions company with strong presence in India. Focuses on digital transformation, consulting, and business re-engineering solutions.',
    website: 'https://www.techmahindra.com',
    founded: '1986',
    address: 'Hitech City, Hyderabad, Telangana 500081',
    status: 'onboarded',
    contact: {
      name: 'Suresh Venkatesh',
      designation: 'Sr. Manager - Campus Recruitment',
      email: 'suresh.venkatesh@techmahindra.com',
      phone: '+91 9876543001'
    },
    nextAction: 'Schedule final interview rounds',
    lastContact: '2025-01-12',
    notes: 'Excellent partnership. Looking to increase intake for 2025 batch.',
    documents: [
      { name: 'Partnership Agreement 2024.pdf', type: 'PDF', uploadDate: '2024-01-15' },
      { name: 'Job Description - SDE.docx', type: 'DOC', uploadDate: '2024-12-20' }
    ],
    hiringRate: 85,
    responseRate: 92,
    performance: 'high'
  },
  {
    id: 2,
    name: 'Infosys Limited',
    sector: 'Information Technology Services',
    employees: '250,000+',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Mysore'],
    ctcRange: '₹3.6L - ₹25L',
    positions: 60,
    description: 'Global leader in next-generation digital services and consulting. Infosys enables clients in 46+ countries to navigate their digital transformation.',
    website: 'https://www.infosys.com',
    founded: '1981',
    address: 'Electronics City, Bangalore, Karnataka 560100',
    status: 'onboarded',
    contact: {
      name: 'Priya Ramakrishnan',
      designation: 'Associate Director - Talent Acquisition',
      email: 'priya.ramakrishnan@infosys.com',
      phone: '+91 9876543002'
    },
    nextAction: 'Finalize campus drive dates',
    lastContact: '2025-01-10',
    notes: 'Long-term partner. Excellent feedback on our students.',
    documents: [
      { name: 'Infosys MOU 2024.pdf', type: 'PDF', uploadDate: '2024-02-01' },
      { name: 'Mysore Training Details.pdf', type: 'PDF', uploadDate: '2024-11-15' }
    ],
    hiringRate: 78,
    responseRate: 88,
    performance: 'high'
  },
  {
    id: 3,
    name: 'Wipro Technologies',
    sector: 'IT Services & Consulting',
    employees: '200,000+',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Kochi'],
    ctcRange: '₹3.5L - ₹22L',
    positions: 35,
    description: 'Leading global information technology, consulting and business process services company with focus on digital transformation.',
    website: 'https://www.wipro.com',
    founded: '1945',
    address: 'Doddakannelli, Bangalore, Karnataka 560035',
    status: 'negotiation',
    contact: {
      name: 'Murali Krishna',
      designation: 'Manager - University Relations',
      email: 'murali.krishna@wipro.com',
      phone: '+91 9876543003'
    },
    nextAction: 'Negotiate package structure',
    lastContact: '2025-01-08',
    notes: 'Negotiating improved package for top performers.',
    documents: [
      { name: 'Wipro JD - Multiple Roles.pdf', type: 'PDF', uploadDate: '2024-12-10' }
    ],
    hiringRate: 72,
    responseRate: 85,
    performance: 'medium'
  },
  {
    id: 4,
    name: 'Cognizant Technology Solutions',
    sector: 'Digital Business Services',
    employees: '300,000+',
    locations: ['Chennai', 'Bangalore', 'Hyderabad', 'Coimbatore'],
    ctcRange: '₹4L - ₹20L',
    positions: 50,
    description: 'One of the world\'s leading professional services companies, transforming clients\' business, operating and technology models for the digital era.',
    website: 'https://www.cognizant.com',
    founded: '1994',
    address: 'Thoraipakkam, Chennai, Tamil Nadu 600097',
    status: 'onboarded',
    contact: {
      name: 'Lakshmi Narayanan',
      designation: 'Senior Recruiter',
      email: 'lakshmi.narayanan@cognizant.com',
      phone: '+91 9876543004'
    },
    nextAction: 'Coordinate pre-placement talk',
    lastContact: '2025-01-11',
    notes: 'Strong interest in AI/ML students. Good growth opportunities.',
    documents: [
      { name: 'Cognizant Partnership 2024.pdf', type: 'PDF', uploadDate: '2024-03-01' }
    ],
    hiringRate: 81,
    responseRate: 87,
    performance: 'high'
  },
  {
    id: 5,
    name: 'Accenture India',
    sector: 'Management Consulting & Technology',
    employees: '200,000+',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
    ctcRange: '₹4.5L - ₹28L',
    positions: 40,
    description: 'Global professional services company with leading capabilities in digital, cloud and security, helping clients become high-performance businesses.',
    website: 'https://www.accenture.com',
    founded: '1989',
    address: 'Bellandur, Bangalore, Karnataka 560103',
    status: 'contacted',
    contact: {
      name: 'Rajesh Gopinath',
      designation: 'Campus Relations Manager',
      email: 'rajesh.gopinath@accenture.com',
      phone: '+91 9876543005'
    },
    nextAction: 'Schedule campus visit',
    lastContact: '2025-01-05',
    notes: 'New partnership opportunity. Interested in consulting roles.',
    documents: [],
    hiringRate: 65,
    responseRate: 70,
    performance: 'medium'
  },
  {
    id: 6,
    name: 'L&T Infotech (LTI)',
    sector: 'Digital Solutions & Analytics',
    employees: '45,000+',
    locations: ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'],
    ctcRange: '₹3.8L - ₹16L',
    positions: 25,
    description: 'Global technology consulting and digital solutions company providing business transformation through digital innovation.',
    website: 'https://www.lti.com',
    founded: '1997',
    address: 'Powai, Mumbai, Maharashtra 400072',
    status: 'onboarded',
    contact: {
      name: 'Srinivas Rao',
      designation: 'Head - Campus Hiring',
      email: 'srinivas.rao@lti.com',
      phone: '+91 9876543006'
    },
    nextAction: 'Finalize technical assessment',
    lastContact: '2025-01-09',
    notes: 'Focus on digital transformation projects. Good learning curve.',
    documents: [
      { name: 'LTI Engagement Model.pdf', type: 'PDF', uploadDate: '2024-08-15' }
    ],
    hiringRate: 76,
    responseRate: 82,
    performance: 'high'
  },
  {
    id: 7,
    name: 'Capgemini India',
    sector: 'Consulting & Technology Services',
    employees: '125,000+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Mumbai'],
    ctcRange: '₹4.2L - ₹24L',
    positions: 30,
    description: 'Global leader in consulting, technology services and digital transformation with strong engineering and innovation capabilities.',
    website: 'https://www.capgemini.com',
    founded: '1967',
    address: 'Embassy Golf Links, Bangalore, Karnataka 560071',
    status: 'negotiation',
    contact: {
      name: 'Anitha Krishnamurthy',
      designation: 'Senior Manager - Talent Acquisition',
      email: 'anitha.krishnamurthy@capgemini.com',
      phone: '+91 9876543007'
    },
    nextAction: 'Review internship to FTE conversion',
    lastContact: '2025-01-07',
    notes: 'Excellent internship program. Strong focus on emerging technologies.',
    documents: [
      { name: 'Capgemini Internship Program.pdf', type: 'PDF', uploadDate: '2024-06-20' }
    ],
    hiringRate: 68,
    responseRate: 75,
    performance: 'medium'
  },
  {
    id: 8,
    name: 'Zoho Corporation',
    sector: 'Software & SaaS',
    employees: '12,000+',
    locations: ['Chennai', 'Bangalore', 'Hyderabad', 'Kochi'],
    ctcRange: '₹6L - ₹35L',
    positions: 20,
    description: 'Indian multinational technology company that makes computer software and web-based business tools. Known for innovative product development.',
    website: 'https://www.zoho.com',
    founded: '1996',
    address: 'Estancia IT Park, Chennai, Tamil Nadu 600042',
    status: 'onboarded',
    contact: {
      name: 'Vivek Raghavan',
      designation: 'Director - Engineering Recruitment',
      email: 'vivek.raghavan@zoho.com',
      phone: '+91 9876543008'
    },
    nextAction: 'Schedule coding assessment',
    lastContact: '2025-01-13',
    notes: 'Premium packages for exceptional talent. Strong product culture.',
    documents: [
      { name: 'Zoho Career Path.pdf', type: 'PDF', uploadDate: '2024-11-01' },
      { name: 'Technical Assessment Guidelines.pdf', type: 'PDF', uploadDate: '2024-12-05' }
    ],
    hiringRate: 89,
    responseRate: 94,
    performance: 'high'
  },
  {
    id: 9,
    name: 'Flipkart Group',
    sector: 'E-commerce & Technology',
    employees: '50,000+',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Delhi'],
    ctcRange: '₹12L - ₹50L',
    positions: 15,
    description: 'Leading e-commerce marketplace in India with strong technology focus on AI, ML, and large-scale distributed systems.',
    website: 'https://www.flipkart.com',
    founded: '2007',
    address: 'Embassy Tech Village, Bangalore, Karnataka 560103',
    status: 'contacted',
    contact: {
      name: 'Arjun Nataraj',
      designation: 'Senior Engineering Manager',
      email: 'arjun.nataraj@flipkart.com',
      phone: '+91 9876543009'
    },
    nextAction: 'Technical round preparation',
    lastContact: '2025-01-06',
    notes: 'Highly selective. Looking for top-tier programming talent.',
    documents: [],
    hiringRate: 45,
    responseRate: 60,
    performance: 'medium'
  },
  {
    id: 10,
    name: 'HDFC Bank Technology',
    sector: 'Banking & Financial Technology',
    employees: '130,000+',
    locations: ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'],
    ctcRange: '₹5L - ₹22L',
    positions: 25,
    description: 'Technology arm of India\'s largest private sector bank, focusing on digital banking solutions and financial technology innovation.',
    website: 'https://www.hdfcbank.com',
    founded: '1994',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    status: 'closed',
    contact: {
      name: 'Sangeetha Menon',
      designation: 'VP - Technology Recruitment',
      email: 'sangeetha.menon@hdfcbank.com',
      phone: '+91 9876543010'
    },
    nextAction: 'Resume partnership next year',
    lastContact: '2024-12-20',
    notes: 'Partnership closed for this year. Good relationship maintained.',
    documents: [
      { name: 'HDFC Tech Roles 2024.pdf', type: 'PDF', uploadDate: '2024-09-10' }
    ],
    hiringRate: 58,
    responseRate: 65,
    performance: 'low'
  }
];

// Job opportunities with South Indian company context
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  ctc: string;
  stipend?: string;
  description: string;
  requirements: string[];
  eligibility: {
    minCGPA: number;
    departments: string[];
    maxBacklogs: number;
    batch: string;
  };
  applicationDeadline: string;
  postedDate: string;
  applicants: number;
  status: 'active' | 'closed' | 'draft';
  companyLogo?: string;
  skills: string[];
  experience: string;
  benefits: string[];
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  bondPeriod?: string;
}

export const jobsData: Job[] = [
  {
    id: 1,
    title: 'Software Development Engineer',
    company: 'TechMahindra Limited',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    ctc: '₹6.5L - ₹8.5L',
    description: 'Join our dynamic software development team to build scalable applications using modern technologies. Work on cutting-edge projects in cloud computing and AI.',
    requirements: [
      'Strong programming skills in Java/Python/JavaScript',
      'Understanding of data structures and algorithms',
      'Experience with web development frameworks',
      'Knowledge of databases (SQL/NoSQL)',
      'Good problem-solving abilities'
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
    bondPeriod: '2 years'
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'Infosys Limited',
    location: 'Bangalore, Karnataka',
    type: 'Internship',
    ctc: '₹6.5L - ₹8.5L',
    description: 'Work with our data science team on real-world machine learning projects. Gain hands-on experience with large datasets and advanced analytics.',
    requirements: [
      'Strong foundation in statistics and mathematics',
      'Programming skills in Python/R',
      'Knowledge of machine learning algorithms',
      'Experience with data visualization tools',
      'Analytical thinking and problem-solving skills'
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
    workMode: 'On-site'
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Zoho Corporation',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    ctc: '₹8L - ₹12L',
    description: 'Build intuitive and responsive user interfaces for our suite of business applications. Work with cutting-edge frontend technologies.',
    requirements: [
      'Proficiency in HTML, CSS, JavaScript',
      'Experience with React/Angular/Vue.js',
      'Understanding of responsive design principles',
      'Knowledge of version control (Git)',
      'Attention to detail and user experience'
    ],
    eligibility: {
      minCGPA: 7.5,
      departments: ['CSE', 'IT'],
      maxBacklogs: 1,
      batch: '2025'
    },
    applicationDeadline: '2025-02-20',
    postedDate: '2025-01-12',
    applicants: 89,
    status: 'active',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
    experience: 'Freshers',
    benefits: ['Competitive Salary', 'Stock Options', 'Health Insurance', 'Learning Budget'],
    workMode: 'Hybrid',
    bondPeriod: '1 year'
  },
  {
    id: 4,
    title: 'Business Analyst Trainee',
    company: 'Cognizant Technology Solutions',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    ctc: '₹4.5L - ₹6L',
    description: 'Start your career in business analysis with comprehensive training. Work on client projects and develop domain expertise.',
    requirements: [
      'Strong analytical and problem-solving skills',
      'Good communication and presentation abilities',
      'Basic understanding of business processes',
      'Proficiency in MS Office Suite',
      'Eagerness to learn new domains'
    ],
    eligibility: {
      minCGPA: 6.5,
      departments: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
      maxBacklogs: 3,
      batch: '2025'
    },
    applicationDeadline: '2025-02-10',
    postedDate: '2025-01-05',
    applicants: 267,
    status: 'active',
    skills: ['Business Analysis', 'SQL', 'Excel', 'Communication', 'Problem Solving'],
    experience: 'Freshers',
    benefits: ['Training Program', 'Health Insurance', 'Career Growth', 'International Exposure'],
    workMode: 'On-site',
    bondPeriod: '2 years'
  },
  {
    id: 5,
    title: 'Cloud Engineer',
    company: 'Wipro Technologies',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    ctc: '₹7L - ₹10L',
    description: 'Design and implement cloud solutions using AWS/Azure. Be part of our cloud transformation initiatives for enterprise clients.',
    requirements: [
      'Understanding of cloud platforms (AWS/Azure/GCP)',
      'Knowledge of containerization (Docker/Kubernetes)',
      'Programming skills in Python/Java',
      'Familiarity with DevOps practices',
      'Problem-solving and troubleshooting skills'
    ],
    eligibility: {
      minCGPA: 7.5,
      departments: ['CSE', 'IT', 'ECE'],
      maxBacklogs: 1,
      batch: '2025'
    },
    applicationDeadline: '2025-02-25',
    postedDate: '2025-01-14',
    applicants: 134,
    status: 'active',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Linux'],
    experience: 'Freshers',
    benefits: ['Cloud Certifications', 'Health Insurance', 'Performance Bonus', 'Training'],
    workMode: 'Hybrid',
    bondPeriod: '2 years'
  }
];

// Training sessions data
export interface TrainingSession {
  id: number;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  schedule: string;
  venue: string;
  maxParticipants: number;
  currentParticipants: number;
  prerequisites: string[];
  topics: string[];
  certification: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  department: string[];
  registrationDeadline: string;
}

export const trainingSessionsData: TrainingSession[] = [
  {
    id: 1,
    title: 'Full Stack Web Development Bootcamp',
    instructor: 'Dr. Priya Narasimhan',
    description: 'Comprehensive training on modern web development including React, Node.js, and database management.',
    duration: '6 weeks',
    startDate: '2025-02-01',
    endDate: '2025-03-15',
    schedule: 'Mon, Wed, Fri - 2:00 PM to 4:00 PM',
    venue: 'Computer Lab 301',
    maxParticipants: 30,
    currentParticipants: 24,
    prerequisites: ['Basic programming knowledge', 'HTML/CSS basics'],
    topics: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Authentication'],
    certification: true,
    status: 'upcoming',
    difficulty: 'Intermediate',
    department: ['CSE', 'IT'],
    registrationDeadline: '2025-01-25'
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Subramaniam Raju',
    description: 'Introduction to machine learning concepts, algorithms, and practical implementation using Python.',
    duration: '8 weeks',
    startDate: '2025-02-05',
    endDate: '2025-04-01',
    schedule: 'Tue, Thu - 3:00 PM to 5:00 PM',
    venue: 'AI Lab 205',
    maxParticipants: 25,
    currentParticipants: 18,
    prerequisites: ['Python programming', 'Statistics basics', 'Linear algebra'],
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'TensorFlow'],
    certification: true,
    status: 'upcoming',
    difficulty: 'Advanced',
    department: ['CSE', 'IT', 'ECE'],
    registrationDeadline: '2025-01-30'
  },
  {
    id: 3,
    title: 'Digital Marketing & Analytics',
    instructor: 'Kavitha Sharma',
    description: 'Learn digital marketing strategies, social media marketing, and analytics tools for modern businesses.',
    duration: '4 weeks',
    startDate: '2025-01-20',
    endDate: '2025-02-17',
    schedule: 'Sat - 10:00 AM to 1:00 PM',
    venue: 'Seminar Hall B',
    maxParticipants: 40,
    currentParticipants: 35,
    prerequisites: ['Basic computer knowledge'],
    topics: ['SEO/SEM', 'Social Media Marketing', 'Google Analytics', 'Content Marketing', 'Email Marketing'],
    certification: true,
    status: 'ongoing',
    difficulty: 'Beginner',
    department: ['CSE', 'IT', 'MBA', 'BBA'],
    registrationDeadline: '2025-01-15'
  }
];