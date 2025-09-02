// Enhanced CSV Constants with comprehensive field mappings

export const CSV_CONFIG = {
  bom: true, // Add BOM for Excel compatibility
  delimiter: ',',
  quote: '"',
  escape: '"',
  lineTerminator: '\n'
};

// Comprehensive field display names for better CSV headers
export const FIELD_DISPLAY_NAMES: Record<string, string> = {
  // Student Fields
  'id': 'Student ID',
  'name': 'Full Name',
  'email': 'Email Address',
  'rollNumber': 'Roll Number',
  'school': 'School',
  'department': 'Department',
  'specialization': 'Specialization',
  'year': 'Academic Year',
  'semester': 'Current Semester',
  'cgpa': 'CGPA',
  'phone': 'Phone Number',
  'dateOfBirth': 'Date of Birth',
  'gender': 'Gender',
  'address.street': 'Street Address',
  'address.city': 'City',
  'address.state': 'State',
  'address.pincode': 'PIN Code',
  'parentDetails.fatherName': 'Father Name',
  'parentDetails.motherName': 'Mother Name',
  'parentDetails.fatherOccupation': 'Father Occupation',
  'parentDetails.motherOccupation': 'Mother Occupation',
  'parentDetails.annualIncome': 'Annual Family Income',
  'parentDetails.contactNumber': 'Parent Contact',
  'academicHistory.tenth.percentage': '10th Percentage',
  'academicHistory.twelfth.percentage': '12th Percentage',
  'academicHistory.entrance.exam': 'Entrance Exam',
  'academicHistory.entrance.rank': 'Entrance Rank',
  'skills.technical': 'Technical Skills',
  'skills.soft': 'Soft Skills',
  'skills.certifications': 'Certifications',
  'skills.languages': 'Languages Known',
  'placementStatus.isRegistered': 'Placement Registered',
  'placementStatus.expectedSalary.min': 'Expected Salary Min',
  'placementStatus.expectedSalary.max': 'Expected Salary Max',
  'placementStatus.preferredLocations': 'Preferred Locations',
  'resumeUrl': 'Resume URL',
  'isActive': 'Active Status',
  'lastLoginDate': 'Last Login',
  
  // Faculty Fields
  'employeeId': 'Employee ID',
  'designation': 'Designation',
  'experience': 'Years of Experience',
  'qualification': 'Highest Qualification',
  'dateOfJoining': 'Date of Joining',
  'personalDetails.maritalStatus': 'Marital Status',
  'personalDetails.bloodGroup': 'Blood Group',
  'personalDetails.emergencyContact': 'Emergency Contact',
  'academicBackground.phd.university': 'PhD University',
  'academicBackground.phd.year': 'PhD Year',
  'academicBackground.phd.thesis': 'PhD Thesis',
  'academicBackground.masters.degree': 'Masters Degree',
  'academicBackground.masters.university': 'Masters University',
  'academicBackground.masters.year': 'Masters Year',
  'academicBackground.bachelors.degree': 'Bachelors Degree',
  'academicBackground.bachelors.university': 'Bachelors University',
  'academicBackground.bachelors.year': 'Bachelors Year',
  'researchInterests': 'Research Interests',
  'publications': 'Number of Publications',
  'mentorship.phdStudents': 'PhD Students Mentored',
  'mentorship.mastersStudents': 'Masters Students Mentored',
  'mentorship.undergraduateProjects': 'UG Projects Guided',
  
  // Operations Staff Fields
  'responsibilities': 'Key Responsibilities',
  'performanceMetrics.applicationsProcessed': 'Applications Processed',
  'performanceMetrics.interviewsCoordinated': 'Interviews Coordinated',
  'performanceMetrics.placementSuccess': 'Placement Success Rate',
  'performanceMetrics.studentSatisfaction': 'Student Satisfaction Score',
  
  // Outreach Staff Fields
  'companiesManaged': 'Companies Managed',
  'partnerships': 'Active Partnerships',
  'performanceMetrics.companiesOnboarded': 'Companies Onboarded',
  'performanceMetrics.jobsPosted': 'Jobs Posted',
  'performanceMetrics.relationshipScore': 'Relationship Score',
  
  // Admin Staff Fields
  'systemAccess': 'System Access Levels',
  'managementAreas': 'Management Areas',
  'performanceMetrics.systemUptime': 'System Uptime %',
  'performanceMetrics.userSatisfaction': 'User Satisfaction',
  'performanceMetrics.dataAccuracy': 'Data Accuracy %',
  'performanceMetrics.processEfficiency': 'Process Efficiency %',
  
  // Recruiter Fields
  'companyName': 'Company Name',
  'hrName': 'HR Contact Name',
  'companySize': 'Company Size',
  'industry': 'Industry',
  'headquarters': 'Headquarters',
  'website': 'Company Website',
  'companyType': 'Company Type',
  'establishedYear': 'Established Year',
  'employeeCount': 'Employee Count',
  'revenue': 'Annual Revenue',
  'partnershipLevel': 'Partnership Level',
  'relationshipManager': 'Relationship Manager',
  'lastInteraction': 'Last Interaction Date',
  
  // Training Fields
  'title': 'Program Title',
  'trainer': 'Trainer Name',
  'trainerId': 'Trainer ID',
  'duration': 'Duration',
  'startDate': 'Start Date',
  'endDate': 'End Date',
  'mode': 'Training Mode',
  'category': 'Category',
  'maxParticipants': 'Max Participants',
  'budget': 'Budget Allocated',
  'status': 'Status',
  
  // Training Participant Fields
  'attendancePercentage': 'Attendance %',
  'preEvaluationScore': 'Pre-Evaluation Score',
  'postEvaluationScore': 'Post-Evaluation Score',
  'certificateIssued': 'Certificate Issued',
  'feedback': 'Trainer Feedback',
  
  // Common Fields
  'createdAt': 'Created Date',
  'updatedAt': 'Last Updated',
  'profileImage': 'Profile Image URL'
};

// Data type specific headers for exports
export const DATA_TYPE_HEADERS = {
  students: [
    'id', 'name', 'email', 'rollNumber', 'school', 'department', 'specialization',
    'year', 'semester', 'cgpa', 'phone', 'dateOfBirth', 'gender',
    'address.street', 'address.city', 'address.state', 'address.pincode',
    'parentDetails.fatherName', 'parentDetails.motherName', 'parentDetails.annualIncome',
    'academicHistory.tenth.percentage', 'academicHistory.twelfth.percentage',
    'skills.technical', 'skills.soft', 'skills.certifications',
    'placementStatus.isRegistered', 'placementStatus.expectedSalary.min', 'placementStatus.expectedSalary.max',
    'resumeUrl', 'isActive', 'lastLoginDate'
  ],
  faculty: [
    'id', 'name', 'email', 'employeeId', 'designation', 'school', 'department',
    'specialization', 'experience', 'qualification', 'phone', 'dateOfJoining',
    'dateOfBirth', 'gender', 'personalDetails.maritalStatus', 'personalDetails.bloodGroup',
    'academicBackground.phd.university', 'academicBackground.phd.year',
    'academicBackground.masters.degree', 'academicBackground.masters.university',
    'academicBackground.bachelors.degree', 'academicBackground.bachelors.university',
    'researchInterests', 'mentorship.phdStudents', 'mentorship.mastersStudents',
    'isActive', 'lastLoginDate'
  ],
  operations: [
    'id', 'name', 'email', 'employeeId', 'designation', 'department',
    'experience', 'phone', 'dateOfJoining', 'dateOfBirth', 'gender',
    'responsibilities', 'skills', 'performanceMetrics.applicationsProcessed',
    'performanceMetrics.interviewsCoordinated', 'performanceMetrics.placementSuccess',
    'performanceMetrics.studentSatisfaction', 'isActive', 'lastLoginDate'
  ],
  outreach: [
    'id', 'name', 'email', 'employeeId', 'designation', 'department',
    'experience', 'phone', 'dateOfJoining', 'companiesManaged',
    'performanceMetrics.companiesOnboarded', 'performanceMetrics.jobsPosted',
    'performanceMetrics.placementSuccess', 'performanceMetrics.relationshipScore',
    'isActive', 'lastLoginDate'
  ],
  admin: [
    'id', 'name', 'email', 'employeeId', 'designation', 'department',
    'experience', 'phone', 'dateOfJoining', 'systemAccess', 'managementAreas',
    'performanceMetrics.systemUptime', 'performanceMetrics.userSatisfaction',
    'performanceMetrics.dataAccuracy', 'performanceMetrics.processEfficiency',
    'isActive', 'lastLoginDate'
  ],
  recruiters: [
    'id', 'companyName', 'hrName', 'email', 'phone', 'designation',
    'companySize', 'industry', 'headquarters', 'website', 'companyType',
    'establishedYear', 'employeeCount', 'revenue', 'partnershipLevel',
    'relationshipManager', 'lastInteraction', 'isActive'
  ],
  training: [
    'id', 'title', 'trainer', 'trainerId', 'duration', 'startDate', 'endDate',
    'mode', 'category', 'skills', 'maxParticipants', 'budget', 'status'
  ],
  trainingParticipants: [
    'studentId', 'studentName', 'enrollmentDate', 'attendancePercentage',
    'preEvaluationScore', 'postEvaluationScore', 'certificateIssued',
    'feedback', 'status'
  ],
  jobApplications: [
    'studentId', 'studentName', 'companyName', 'position', 'appliedDate',
    'status', 'salaryOffered', 'location', 'interviewDate'
  ],
  placementReports: [
    'year', 'department', 'totalStudents', 'placedStudents', 'placementRate',
    'averageSalary', 'highestSalary', 'medianSalary', 'topRecruiters'
  ]
};

// Salary slab configurations for filtering
export const SALARY_SLABS = {
  ranges: [
    { min: 500000, max: 1000000, label: '₹5-10 LPA' },
    { min: 1000000, max: 1500000, label: '₹10-15 LPA' },
    { min: 1500000, max: 2000000, label: '₹15-20 LPA' },
    { min: 2000000, max: 2500000, label: '₹20-25 LPA' },
    { min: 2500000, max: Infinity, label: '₹25L+ LPA' }
  ],
  applicationLimits: {
    '₹5-10L': { maxApplications: 10, eligibleBranches: ['all'] },
    '₹10-15L': { maxApplications: 8, eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE'] },
    '₹15-20L': { maxApplications: 6, eligibleBranches: ['CSE', 'IT'] },
    '₹20-25L': { maxApplications: 4, eligibleBranches: ['CSE', 'IT'], minCGPA: 8.0 },
    '₹25L+': { maxApplications: 2, eligibleBranches: ['CSE', 'IT'], minCGPA: 8.5 }
  }
};

// Performance color coding
export const PERFORMANCE_COLORS = {
  excellent: { min: 8.5, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  good: { min: 7.0, max: 8.49, color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
  needsImprovement: { max: 6.99, color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
};

// School and department filters
export const UNIVERSITY_STRUCTURE = {
  schools: [
    {
      name: 'School of Computing & Information Technology',
      departments: [
        { name: 'Computer Science & Engineering', specializations: ['AI & ML', 'Cybersecurity', 'Data Science', 'Full Stack Development', 'Cloud Computing'] },
        { name: 'Information Technology', specializations: ['Mobile App Development', 'Software Testing', 'Network Administration'] }
      ]
    },
    {
      name: 'School of Engineering',
      departments: [
        { name: 'Mechanical Engineering', specializations: ['Thermal Engineering', 'Manufacturing', 'Automotive'] },
        { name: 'Electrical & Electronics Engineering', specializations: ['Power Electronics', 'Embedded Systems', 'Renewable Energy'] },
        { name: 'Civil Engineering', specializations: ['Structural Engineering', 'Environmental Engineering', 'Transportation'] }
      ]
    },
    {
      name: 'School of Business & Management',
      departments: [
        { name: 'Business Administration', specializations: ['Marketing', 'Finance', 'Operations', 'HR Management'] },
        { name: 'International Business', specializations: ['Global Trade', 'International Finance'] }
      ]
    }
  ]
};

// Export validation rules
export const VALIDATION_RULES = {
  students: {
    required: ['name', 'email', 'rollNumber', 'school', 'department', 'year', 'cgpa'],
    formats: {
      email: /^[^\s@]+@srmap\.edu\.in$/,
      phone: /^\+91\s?\d{10}$/,
      cgpa: { min: 0, max: 10 },
      year: { min: 1, max: 4 }
    }
  },
  faculty: {
    required: ['name', 'email', 'employeeId', 'designation', 'department'],
    formats: {
      email: /^[^\s@]+@srmap\.edu\.in$/,
      employeeId: /^SRMFAC\d{3}$/,
      experience: { min: 0, max: 50 }
    }
  },
  recruiters: {
    required: ['companyName', 'hrName', 'email', 'industry'],
    formats: {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      establishedYear: { min: 1800, max: new Date().getFullYear() }
    }
  }
};

// CSV import/export templates
export const CSV_TEMPLATES = {
  students: {
    filename: 'students_template',
    headers: DATA_TYPE_HEADERS.students,
    sampleData: {
      'id': 'std_sample_001',
      'name': 'Sample Student',
      'email': 'sample.student@srmap.edu.in',
      'rollNumber': 'AP24322130001',
      'school': 'School of Computing & Information Technology',
      'department': 'Computer Science & Engineering',
      'specialization': 'Artificial Intelligence & Machine Learning',
      'year': '4',
      'semester': '8',
      'cgpa': '8.5',
      'phone': '+91 9876543210',
      'dateOfBirth': '2002-01-15',
      'gender': 'Male'
    }
  }
};