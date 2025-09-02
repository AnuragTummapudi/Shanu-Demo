export interface Student {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  yearOfStudy: number;
  section: string;
  cgpa: number;
  semester: number;
  isSubscribed: boolean;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    percentage: number;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  achievements: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  profileCompleted: number;
  dateOfBirth: string;
  address: string;
  fatherName: string;
  motherName: string;
  course?: string;
  applicationStatus?: string;
  isShortlisted?: boolean;
  academicRecords: {
    year1?: { semester1: number; semester2: number; aggregate: number };
    year2?: { semester1: number; semester2: number; aggregate: number };
    year3?: { semester1: number; semester2: number; aggregate: number };
    year4?: { semester1: number; semester2: number; aggregate: number };
  };
  placementStatus: 'placed' | 'in-process' | 'not-applied' | 'rejected';
  offersReceived: Array<{
    company: string;
    package: string;
    role: string;
    status: 'accepted' | 'pending' | 'rejected';
  }>;
}

// Helper arrays for generating diverse student data
const indianFirstNames = [
  'Aadhya', 'Aarav', 'Abhinav', 'Aditi', 'Aditya', 'Akshay', 'Ananya', 'Anjali', 'Ankit', 'Anushka',
  'Arjun', 'Arya', 'Ashwin', 'Avni', 'Bhavya', 'Chetan', 'Darshan', 'Deepak', 'Deepika', 'Divya',
  'Drishti', 'Gagan', 'Gauri', 'Harsha', 'Ishaan', 'Isha', 'Jaidev', 'Janvi', 'Karthik', 'Kavya',
  'Kishan', 'Kriti', 'Lakshmi', 'Manish', 'Meera', 'Mithun', 'Nandini', 'Nikhil', 'Nitya', 'Pooja',
  'Pranav', 'Priya', 'Rahul', 'Rakesh', 'Rhea', 'Rohan', 'Sahil', 'Samhita', 'Sanjay', 'Shreya',
  'Siddharth', 'Sneha', 'Srinidhi', 'Sumanth', 'Tanvi', 'Tarun', 'Usha', 'Varun', 'Vidya', 'Vikram',
  'Vinay', 'Vishnu', 'Yash', 'Zara', 'Aarushi', 'Abhishek', 'Adithya', 'Amrita', 'Anuj', 'Archana',
  'Arun', 'Asmita', 'Bhaskar', 'Bharti', 'Chaitanya', 'Chandni', 'Dhanush', 'Dhruv', 'Gaurav', 'Girish',
  'Hari', 'Hemant', 'Indira', 'Jatin', 'Jyoti', 'Kiran', 'Krishna', 'Lavanya', 'Madhav', 'Manoj',
  'Neeraj', 'Pawan', 'Rajesh', 'Ravi', 'Sagar', 'Sandeep', 'Shanti', 'Shivam', 'Swati', 'Tejasvi',
  'Aarya', 'Advaith', 'Aishwarya', 'Akash', 'Amaan', 'Ananya', 'Arathi', 'Arnav', 'Bhargav', 'Chitra',
  'Devika', 'Esha', 'Gautam', 'Harini', 'Ishan', 'Jahnavi', 'Kamal', 'Latha', 'Mahima', 'Navin'
];

const indianLastNames = [
  'Agarwal', 'Bhat', 'Chandra', 'Desai', 'Gowda', 'Gupta', 'Iyer', 'Joshi', 'Kumar', 'Menon',
  'Nair', 'Patel', 'Reddy', 'Sharma', 'Singh', 'Tiwari', 'Varma', 'Yadav', 'Pillai', 'Krishnan',
  'Naidu', 'Rao', 'Shetty', 'Murthy', 'Prasad', 'Sastry', 'Raman', 'Subramanian', 'Venkatesh', 'Mahesh',
  'Babu', 'Chand', 'Das', 'Dutta', 'Ghosh', 'Kulkarni', 'Mishra', 'Pandey', 'Roy', 'Sen',
  'Banerjee', 'Chopra', 'Kapoor', 'Malhotra', 'Mehta', 'Saxena', 'Verma', 'Bhardwaj', 'Jindal', 'Khurana',
  'Anand', 'Bhatt', 'Chauhan', 'Devi', 'Garg', 'Handa', 'Jain', 'Kaul', 'Lal', 'Mitra'
];

const departments = [
  'Computer Science Engineering', 'Information Technology', 'Electronics & Communication Engineering',
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Chemical Engineering',
  'Aerospace Engineering', 'Biotechnology', 'Data Science', 'Artificial Intelligence & Machine Learning',
  'Business Administration', 'Finance', 'Marketing', 'Human Resources', 'Economics'
];

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

const skills = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'Angular', 'Vue.js', 'Express.js',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas',
  'NumPy', 'Scikit-learn', 'C++', 'C#', '.NET', 'Spring Boot', 'Django', 'Flask',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'HTML', 'CSS', 'Bootstrap', 'Tailwind',
  'Git', 'GitHub', 'GitLab', 'Jenkins', 'CI/CD', 'Linux', 'Bash', 'PowerShell',
  'AutoCAD', 'SolidWorks', 'MATLAB', 'Simulink', 'ANSYS', 'Verilog', 'VHDL', 'FPGA',
  'Embedded Systems', 'IoT', 'Arduino', 'Raspberry Pi', 'PCB Design', 'Signal Processing'
];

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Cognizant', 'Accenture',
  'IBM', 'Microsoft', 'Google', 'Amazon', 'Oracle', 'SAP', 'Adobe', 'Salesforce',
  'Zoho', 'Flipkart', 'Paytm', 'Ola', 'Uber', 'Zomato', 'Swiggy', 'BYJU\'S',
  'Freshworks', 'Chargebee', 'Razorpay', 'PhonePe', 'PayU', 'MindTree', 'Mphasis'
];

const cities = [
  'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Kochi', 'Coimbatore',
  'Mysore', 'Mangalore', 'Trivandrum', 'Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati',
  'Warangal', 'Karimnagar', 'Nizamabad', 'Madurai', 'Salem', 'Erode', 'Tirunelveli'
];

// Function to generate academic records based on year of study
const generateAcademicRecords = (yearOfStudy: number, cgpa: number) => {
  const records: any = {};
  const basePercentage = cgpa * 10;
  
  for (let year = 1; year <= yearOfStudy; year++) {
    const variation = (Math.random() - 0.5) * 10; // ±5% variation
    const sem1 = Math.max(60, Math.min(100, basePercentage + variation));
    const sem2 = Math.max(60, Math.min(100, basePercentage + (Math.random() - 0.5) * 10));
    const aggregate = (sem1 + sem2) / 2;
    
    records[`year${year}`] = {
      semester1: Math.round(sem1 * 100) / 100,
      semester2: Math.round(sem2 * 100) / 100,
      aggregate: Math.round(aggregate * 100) / 100
    };
  }
  
  return records;
};

// Function to generate random student data
const generateStudent = (id: number): Student => {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const department = departments[Math.floor(Math.random() * departments.length)];
  const yearOfStudy = Math.floor(Math.random() * 4) + 1; // 1-4 years
  const section = sections[Math.floor(Math.random() * sections.length)];
  
  const rollNo = `AP${20 + (4 - yearOfStudy)}${department.includes('Computer') ? 'CSE' : 
                       department.includes('Information') ? 'IT' : 
                       department.includes('Electronics') ? 'ECE' :
                       department.includes('Mechanical') ? 'ME' :
                       department.includes('Civil') ? 'CE' :
                       department.includes('Electrical') ? 'EE' :
                       department.includes('Chemical') ? 'CH' :
                       department.includes('Aerospace') ? 'AE' :
                       department.includes('Biotechnology') ? 'BT' :
                       department.includes('Data Science') ? 'DS' :
                       department.includes('AI') ? 'AI' :
                       department.includes('Business') ? 'MBA' : 'GEN'}${String(id).padStart(3, '0')}`;
  
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@srmap.edu.in`;
  const phone = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  
  const cgpa = Math.round((Math.random() * 3 + 6.5) * 100) / 100; // 6.5 to 9.5
  const semester = yearOfStudy * 2 - (Math.random() > 0.5 ? 1 : 0);
  const batch = `${2025 - yearOfStudy}-${2029 - yearOfStudy}`;
  
  const isSubscribed = Math.random() > 0.3; // 70% subscription rate
  
  // Generate relevant skills based on department
  const relevantSkills = department.includes('Computer') || department.includes('Information') || department.includes('Data') || department.includes('AI')
    ? skills.filter(skill => ['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'MySQL', 'AWS', 'Machine Learning', 'Docker'].includes(skill))
    : department.includes('Electronics') || department.includes('Electrical')
    ? skills.filter(skill => ['C++', 'Python', 'MATLAB', 'Verilog', 'VHDL', 'FPGA', 'Embedded Systems', 'IoT', 'Arduino'].includes(skill))
    : department.includes('Mechanical') || department.includes('Civil') || department.includes('Aerospace')
    ? skills.filter(skill => ['AutoCAD', 'SolidWorks', 'MATLAB', 'ANSYS', 'Python'].includes(skill))
    : skills.slice(0, 20);
  
  const studentSkills = relevantSkills.slice(0, Math.floor(Math.random() * 5) + 3);
  
  // Generate academic records
  const academicRecords = generateAcademicRecords(yearOfStudy, cgpa);
  
  // Generate placement status and offers
  const placementStatuses: Student['placementStatus'][] = ['placed', 'in-process', 'not-applied', 'rejected'];
  const placementStatus = placementStatuses[Math.floor(Math.random() * placementStatuses.length)];
  
  const offersReceived = placementStatus === 'placed' || Math.random() > 0.7 ? [
    {
      company: companies[Math.floor(Math.random() * companies.length)],
      package: `₹${(Math.random() * 20 + 5).toFixed(1)}L`,
      role: 'Software Engineer',
      status: (placementStatus === 'placed' ? 'accepted' : Math.random() > 0.5 ? 'pending' : 'rejected') as 'accepted' | 'pending' | 'rejected'
    }
  ] : [];
  
  // Generate birth date
  const birthYear = 2005 - yearOfStudy + Math.floor(Math.random() * 2);
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
  
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = city.includes('Bangalore') || city.includes('Mysore') || city.includes('Mangalore') ? 'Karnataka' :
              city.includes('Chennai') || city.includes('Madurai') || city.includes('Salem') ? 'Tamil Nadu' :
              city.includes('Hyderabad') || city.includes('Vijayawada') || city.includes('Warangal') ? 'Telangana' :
              city.includes('Kochi') || city.includes('Trivandrum') ? 'Kerala' : 'Andhra Pradesh';
  
  const regionalLanguage = state === 'Karnataka' ? 'Kannada' :
                          state === 'Tamil Nadu' ? 'Tamil' :
                          state === 'Telangana' || state === 'Andhra Pradesh' ? 'Telugu' :
                          state === 'Kerala' ? 'Malayalam' : 'Hindi';
  
  const fatherFirstNames = ['Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Venkatesh', 'Naresh', 'Mukesh', 'Dinesh', 'Ganesh', 'Umesh'];
  const motherFirstNames = ['Sunitha', 'Priya', 'Kavitha', 'Lakshmi', 'Sujatha', 'Padma', 'Geetha', 'Radha', 'Shanti', 'Usha'];
  
  const fatherName = `${fatherFirstNames[Math.floor(Math.random() * fatherFirstNames.length)]} ${lastName}`;
  const motherName = `${motherFirstNames[Math.floor(Math.random() * motherFirstNames.length)]} ${lastName}`;

  return {
    id,
    name,
    rollNo,
    email,
    phone,
    department,
    batch,
    yearOfStudy,
    section,
    cgpa,
    semester,
    isSubscribed,
    course: 'B.Tech',
    applicationStatus: Math.random() > 0.6 ? 'shortlisted' : 'not_shortlisted',
    isShortlisted: Math.random() > 0.6,
    skills: studentSkills,
    projects: [
      {
        title: `${department.includes('Computer') ? 'Web Application' : department.includes('Mechanical') ? 'Design Project' : 'Engineering Project'}`,
        description: `Comprehensive ${department.toLowerCase()} project demonstrating technical skills`,
        technologies: studentSkills.slice(0, 3),
        link: Math.random() > 0.7 ? `https://github.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}/project` : undefined
      }
    ],
    education: [{
      degree: `B.Tech ${department}`,
      institution: 'SRM University AP',
      year: batch,
      percentage: Math.round(cgpa * 10)
    }],
    experience: Math.random() > 0.8 ? [{
      position: 'Intern',
      company: companies[Math.floor(Math.random() * companies.length)],
      duration: '2 months',
      description: 'Gained valuable industry experience'
    }] : [],
    certifications: Math.random() > 0.6 ? [{
      name: 'Technology Certification',
      issuer: companies[Math.floor(Math.random() * 5)],
      date: '2024-06-15'
    }] : [],
    achievements: Math.random() > 0.5 ? ['Academic Excellence Award', 'Project Competition Winner'] : [],
    languages: [
      { language: regionalLanguage, proficiency: 'Native' },
      { language: 'English', proficiency: Math.random() > 0.3 ? 'Fluent' : 'Good' },
      { language: 'Hindi', proficiency: 'Basic' }
    ],
    socialLinks: {
      linkedin: Math.random() > 0.4 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : undefined,
      github: Math.random() > 0.6 ? `https://github.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : undefined
    },
    profileCompleted: Math.floor(Math.random() * 30) + 70,
    dateOfBirth,
    address: `${Math.floor(Math.random() * 999) + 1}, ${city}, ${state}`,
    fatherName,
    motherName,
    academicRecords,
    placementStatus,
    offersReceived
  };
};

// Generate 620+ students (existing + new 100)
export const studentData: Student[] = Array.from({ length: 620 }, (_, index) => generateStudent(index + 1));

// Enhanced filtering functions
export const filterStudentsByDepartment = (department: string) => {
  if (department === 'all') return studentData;
  return studentData.filter(student => student.department === department);
};

export const filterStudentsByYear = (year: number) => {
  return studentData.filter(student => student.yearOfStudy === year);
};

export const filterStudentsBySection = (section: string) => {
  if (section === 'all') return studentData;
  return studentData.filter(student => student.section === section);
};

export const filterStudentsBySubscription = (subscribed: boolean) => {
  return studentData.filter(student => student.isSubscribed === subscribed);
};

export const filterStudentsByPlacementStatus = (status: string) => {
  if (status === 'all') return studentData;
  return studentData.filter(student => student.placementStatus === status);
};

export const searchStudents = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return studentData.filter(student => 
    student.name.toLowerCase().includes(term) ||
    student.rollNo.toLowerCase().includes(term) ||
    student.email.toLowerCase().includes(term) ||
    student.department.toLowerCase().includes(term)
  );
};

// Utility functions
export const getStudentsByDepartment = () => {
  const departmentCounts: { [key: string]: number } = {};
  studentData.forEach(student => {
    const shortDept = student.department.includes('Computer') ? 'CSE' :
                     student.department.includes('Information') ? 'IT' :
                     student.department.includes('Electronics') ? 'ECE' :
                     student.department.includes('Mechanical') ? 'ME' :
                     student.department.includes('Civil') ? 'CE' :
                     student.department.includes('Electrical') ? 'EE' : 'Other';
    departmentCounts[shortDept] = (departmentCounts[shortDept] || 0) + 1;
  });
  return departmentCounts;
};

export const getStudentsByYear = () => {
  const yearCounts: { [key: number]: number } = {};
  studentData.forEach(student => {
    yearCounts[student.yearOfStudy] = (yearCounts[student.yearOfStudy] || 0) + 1;
  });
  return yearCounts;
};

export const getPlacementStatistics = () => {
  const stats = {
    total: studentData.length,
    placed: studentData.filter(s => s.placementStatus === 'placed').length,
    inProcess: studentData.filter(s => s.placementStatus === 'in-process').length,
    notApplied: studentData.filter(s => s.placementStatus === 'not-applied').length,
    rejected: studentData.filter(s => s.placementStatus === 'rejected').length
  };
  
  return {
    ...stats,
    placementRate: Math.round((stats.placed / stats.total) * 100)
  };
};

// Salary slab application tracking
export const studentApplicationLimits = studentData.reduce((acc, student) => {
  acc[student.id] = {
    'slab1': { used: Math.floor(Math.random() * 10), limit: 15 },
    'slab2': { used: Math.floor(Math.random() * 8), limit: 10 },
    'slab3': { used: Math.floor(Math.random() * 6), limit: 8 },
    'slab4': { used: Math.floor(Math.random() * 3), limit: 5 },
    'slab5': { used: Math.floor(Math.random() * 2), limit: 3 }
  };
  return acc;
}, {} as Record<number, Record<string, { used: number; limit: number }>>);

export const getStudentApplicationStatus = (studentId: number, slabId: string) => {
  const student = studentApplicationLimits[studentId];
  if (!student || !student[slabId]) {
    return { used: 0, limit: 15, canApply: true };
  }
  const slabData = student[slabId];
  return {
    used: slabData.used,
    limit: slabData.limit,
    canApply: slabData.used < slabData.limit
  };
};