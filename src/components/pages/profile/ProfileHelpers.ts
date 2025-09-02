// Helper function to safely parse name into first and last name
export const parseName = (fullName: string = '') => {
  const nameParts = fullName.trim().split(' ');
  return {
    firstName: nameParts[0] || 'Student',
    lastName: nameParts.slice(1).join(' ') || 'Name'
  };
};

// Helper function to safely get initials
export const getInitials = (fullName: string = '') => {
  const { firstName, lastName } = parseName(fullName);
  return `${firstName[0] || 'S'}${lastName[0] || 'N'}`;
};

// Helper function to format date safely
export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'N/A';
  }
};

// Helper function to calculate percentage safely
export const calculatePercentage = (value: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Helper function to get placement status styling
export const getPlacementStatusStyle = (status: string) => {
  switch (status) {
    case 'Placed':
      return 'bg-green-100 text-green-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-orange-100 text-orange-800';
  }
};

// Helper function to create safe student data with fallbacks
export const createSafeStudentData = (initialStudent?: any) => {
  return {
    // Handle name variations
    name: initialStudent?.name || 'Sumanth Bolisetty',
    firstName: initialStudent?.firstName || parseName(initialStudent?.name || 'Sumanth Bolisetty').firstName,
    lastName: initialStudent?.lastName || parseName(initialStudent?.name || 'Sumanth Bolisetty').lastName,
    rollNumber: initialStudent?.rollNumber || initialStudent?.rollNo || 'AP24322130096',
    email: initialStudent?.email || 'sumanth_bolisetty@srmap.edu.in',
    phone: initialStudent?.phone || '+91 9876543210',
    dateOfBirth: initialStudent?.dateOfBirth || '2002-03-15',
    gender: initialStudent?.gender || 'Male',
    bloodGroup: initialStudent?.bloodGroup || 'B+',
    
    // Academic Information with fallbacks
    course: initialStudent?.course || 'Master of Business Administration',
    department: initialStudent?.department || 'MBA',
    school: initialStudent?.school || 'Paari School of Business',
    batch: initialStudent?.batch || '2024-2026',
    currentSemester: initialStudent?.currentSemester || initialStudent?.semester || 3,
    cgpa: initialStudent?.cgpa || 8.95,
    
    // Skills with levels
    technicalSkills: [
      { name: 'Python', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'SQL', level: 88 },
      { name: 'AWS', level: 70 }
    ],
    softSkills: [
      { name: 'Leadership', level: 92 },
      { name: 'Communication', level: 88 },
      { name: 'Team Work', level: 95 },
      { name: 'Problem Solving', level: 87 },
      { name: 'Time Management', level: 83 }
    ],
    
    projects: initialStudent?.projects || [
      {
        id: 'project-1',
        title: 'E-commerce Platform with AI Recommendations',
        description: 'Built a full-stack e-commerce platform with personalized product recommendations using machine learning algorithms.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'TensorFlow'],
        duration: '6 months',
        status: 'Completed',
        impact: 'Increased user engagement by 40%'
      },
      {
        id: 'project-2',
        title: 'Real-time Chat Application',
        description: 'Developed a scalable real-time messaging platform with video calling capabilities.',
        technologies: ['React', 'Socket.io', 'WebRTC', 'Express.js'],
        duration: '4 months',
        status: 'Completed',
        impact: 'Supports 1000+ concurrent users'
      }
    ],
    
    internships: initialStudent?.internships || initialStudent?.experience || [
      {
        id: 'internship-1',
        company: 'TCS Digital',
        position: 'Software Engineering Intern',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Worked on developing microservices for a large-scale banking application using Spring Boot and Docker.',
        skills: ['Spring Boot', 'Docker', 'Microservices'],
        rating: 4.8
      }
    ],
    
    // Career Information with defaults
    careerObjective: initialStudent?.careerObjective || 'Aspiring to leverage my technical skills and business acumen to drive innovation in technology-driven organizations.',
    preferredRoles: initialStudent?.preferredRoles || ['Software Engineer', 'Product Manager', 'Business Analyst', 'Data Scientist'],
    preferredIndustries: initialStudent?.preferredIndustries || ['Technology', 'E-commerce', 'FinTech', 'Healthcare Tech'],
    expectedSalary: initialStudent?.expectedSalary || { min: 800000, max: 1500000 },
    preferredLocations: initialStudent?.preferredLocations || ['Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Pune'],
    
    // Placement Status with defaults
    placementStatus: initialStudent?.placementStatus || 'Active',
    appliedJobs: initialStudent?.appliedJobs || 15,
    interviewsAttended: initialStudent?.interviewsAttended || 6,
    offersReceived: initialStudent?.offersReceived || 2,
    
    // Recent Placements with proper structure
    recentPlacements: initialStudent?.recentPlacements || [
      { id: 'placement-1', company: 'Google', package: '₹45 LPA', role: 'Software Engineer', status: 'Offered' },
      { id: 'placement-2', company: 'Microsoft', package: '₹38 LPA', role: 'Product Manager', status: 'Interview' },
      { id: 'placement-3', company: 'Amazon', package: '₹42 LPA', role: 'SDE II', status: 'Applied' }
    ],
    
    // Social Links with safe fallbacks
    linkedin: initialStudent?.socialLinks?.linkedin || initialStudent?.linkedin || 'https://linkedin.com/in/sumanth-bolisetty',
    github: initialStudent?.socialLinks?.github || initialStudent?.github || 'https://github.com/sumanth-bolisetty',
    portfolio: initialStudent?.socialLinks?.portfolio || initialStudent?.portfolio || 'https://sumanth-portfolio.com',
    
    // Profile completion
    profileCompletion: initialStudent?.profileCompletion || initialStudent?.profileCompleted || 92,
    lastUpdated: initialStudent?.lastUpdated || '2024-01-15',
    
    // Additional metrics
    rankInClass: 12,
    totalStudents: 180,
    certifications: 8,
    hackathonsWon: 3,
    contributionScore: 87
  };
};