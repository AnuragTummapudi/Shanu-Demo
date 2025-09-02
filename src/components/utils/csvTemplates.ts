import { DATA_TYPE_HEADERS, FIELD_DISPLAY_NAMES, REQUIRED_FIELDS } from './csvConstants';
import { downloadCSVFile, formatCSVValue } from './csvExport';

// Sample data for templates
const SAMPLE_STUDENT_DATA = {
  id: 'std_001',
  name: 'John Doe',
  email: 'john.doe@srmap.edu.in',
  rollNumber: 'AP24322130001',
  school: 'School of Computing & Information Technology',
  department: 'Computer Science & Engineering',
  specialization: 'Artificial Intelligence & Machine Learning',
  year: 4,
  semester: 8,
  cgpa: 8.5,
  phone: '+91 9876543210',
  dateOfBirth: '2002-01-15',
  gender: 'Male',
  'address.street': '123 Sample Street',
  'address.city': 'Hyderabad',
  'address.state': 'Telangana',
  'address.pincode': '500001',
  'parentDetails.fatherName': 'Father Name',
  'parentDetails.motherName': 'Mother Name',
  'parentDetails.fatherOccupation': 'Engineer',
  'parentDetails.motherOccupation': 'Teacher',
  'parentDetails.annualIncome': 1000000,
  'parentDetails.contactNumber': '+91 9876543211',
  'academicHistory.tenth.board': 'CBSE',
  'academicHistory.tenth.year': 2018,
  'academicHistory.tenth.percentage': 95.5,
  'academicHistory.twelfth.board': 'CBSE',
  'academicHistory.twelfth.year': 2020,
  'academicHistory.twelfth.percentage': 94.2,
  'academicHistory.twelfth.stream': 'Science (PCM)',
  'skills.technical': 'Python; Java; React; Node.js',
  'skills.soft': 'Communication; Leadership; Problem Solving',
  'skills.certifications': 'AWS Certified; Google Cloud Professional',
  'skills.languages': 'English; Hindi; Telugu',
  'placementStatus.isRegistered': true,
  'placementStatus.preferredLocations': 'Bangalore; Hyderabad; Chennai',
  'placementStatus.expectedSalary.min': 1000000,
  'placementStatus.expectedSalary.max': 1500000,
  isActive: true,
  lastLoginDate: '2024-01-20T10:30:00Z',
  createdAt: '2020-08-15T00:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z'
};

const SAMPLE_FACULTY_DATA = {
  id: 'fac_001',
  name: 'Dr. Jane Smith',
  email: 'jane.smith@srmap.edu.in',
  employeeId: 'SRMFAC001',
  designation: 'Professor',
  school: 'School of Computing & Information Technology',
  department: 'Computer Science & Engineering',
  specialization: 'Machine Learning & Artificial Intelligence',
  experience: 15,
  qualification: 'Ph.D. in Computer Science',
  phone: '+91 9876543220',
  dateOfJoining: '2010-07-15',
  dateOfBirth: '1978-05-10',
  gender: 'Female',
  'address.street': '456 Faculty Street',
  'address.city': 'Hyderabad',
  'address.state': 'Telangana',
  'address.pincode': '500032',
  'academicBackground.phd.university': 'Indian Institute of Science',
  'academicBackground.phd.year': 2008,
  'academicBackground.phd.thesis': 'Advanced Machine Learning Techniques',
  'academicBackground.masters.degree': 'M.Tech Computer Science',
  'academicBackground.masters.university': 'IIT Madras',
  'academicBackground.masters.year': 2003,
  'academicBackground.bachelors.degree': 'B.Tech Computer Science',
  'academicBackground.bachelors.university': 'NIT Warangal',
  'academicBackground.bachelors.year': 2001,
  researchInterests: 'Machine Learning; AI; Deep Learning',
  'mentorship.phdStudents': 8,
  'mentorship.mastersStudents': 12,
  'mentorship.undergraduateProjects': 25,
  isActive: true,
  lastLoginDate: '2024-01-20T09:30:00Z',
  createdAt: '2010-07-15T00:00:00Z',
  updatedAt: '2024-01-20T14:15:00Z'
};

const SAMPLE_OPERATIONS_DATA = {
  id: 'ops_001',
  name: 'Operations Manager',
  email: 'ops.manager@srmap.edu.in',
  employeeId: 'SRMOPS001',
  designation: 'Operations Manager',
  department: 'Placement Operations',
  experience: 8,
  phone: '+91 9876543230',
  dateOfJoining: '2016-03-15',
  dateOfBirth: '1985-11-28',
  gender: 'Male',
  'address.street': '789 Operations Street',
  'address.city': 'Hyderabad',
  'address.state': 'Telangana',
  'address.pincode': '500032',
  responsibilities: 'Process Management; Student Coordination; Interview Scheduling',
  skills: 'Project Management; Data Analysis; Communication',
  'performanceMetrics.applicationsProcessed': 2500,
  'performanceMetrics.interviewsCoordinated': 450,
  'performanceMetrics.placementSuccess': 95,
  'performanceMetrics.studentSatisfaction': 4.6,
  isActive: true,
  lastLoginDate: '2024-01-20T09:15:00Z',
  createdAt: '2016-03-15T00:00:00Z',
  updatedAt: '2024-01-20T16:30:00Z'
};

const SAMPLE_OUTREACH_DATA = {
  id: 'out_001',
  name: 'Outreach Manager',
  email: 'outreach.manager@srmap.edu.in',
  employeeId: 'SRMOUT001',
  designation: 'Senior Outreach Manager',
  department: 'Corporate Relations',
  experience: 10,
  phone: '+91 9876543240',
  dateOfJoining: '2014-04-01',
  dateOfBirth: '1983-01-15',
  gender: 'Male',
  'address.street': '321 Outreach Avenue',
  'address.city': 'Hyderabad',
  'address.state': 'Telangana',
  'address.pincode': '500032',
  responsibilities: 'Partnership Development; Relationship Management; Strategic Planning',
  skills: 'Business Development; Negotiation; Communication',
  companiesManaged: 'TCS; Microsoft; Amazon; Google',
  'performanceMetrics.companiesOnboarded': 35,
  'performanceMetrics.jobsPosted': 180,
  'performanceMetrics.placementSuccess': 92,
  'performanceMetrics.relationshipScore': 4.7,
  isActive: true,
  lastLoginDate: '2024-01-20T08:30:00Z',
  createdAt: '2014-04-01T00:00:00Z',
  updatedAt: '2024-01-20T14:20:00Z'
};

const SAMPLE_ADMIN_DATA = {
  id: 'adm_001',
  name: 'System Administrator',
  email: 'system.admin@srmap.edu.in',
  employeeId: 'SRMADM001',
  designation: 'Super Administrator',
  department: 'Information Technology',
  experience: 15,
  phone: '+91 9876543250',
  dateOfJoining: '2010-01-15',
  dateOfBirth: '1975-07-12',
  gender: 'Male',
  'address.street': '654 Admin Block',
  'address.city': 'Hyderabad',
  'address.state': 'Telangana',
  'address.pincode': '500032',
  responsibilities: 'System Administration; User Management; Security Management',
  skills: 'System Administration; Database Management; Network Security',
  systemAccess: 'Full System Access; User Management; Security Settings',
  managementAreas: 'Platform Strategy; Technology Infrastructure; Data Management',
  'performanceMetrics.systemUptime': 99.9,
  'performanceMetrics.userSatisfaction': 4.8,
  'performanceMetrics.dataAccuracy': 99.5,
  'performanceMetrics.processEfficiency': 95,
  isActive: true,
  lastLoginDate: '2024-01-20T07:00:00Z',
  createdAt: '2010-01-15T00:00:00Z',
  updatedAt: '2024-01-20T18:30:00Z'
};

// Sample data mapping
const SAMPLE_DATA = {
  students: SAMPLE_STUDENT_DATA,
  faculty: SAMPLE_FACULTY_DATA,
  operations: SAMPLE_OPERATIONS_DATA,
  outreach: SAMPLE_OUTREACH_DATA,
  admin: SAMPLE_ADMIN_DATA
};

// Generate CSV template with headers and sample data
export const generateCSVTemplate = (
  dataType: keyof typeof DATA_TYPE_HEADERS,
  includeSampleData = true,
  includeInstructions = true
): string => {
  const headers = DATA_TYPE_HEADERS[dataType];
  const sampleData = SAMPLE_DATA[dataType];
  
  // Create display headers
  const displayHeaders = headers.map(header => 
    FIELD_DISPLAY_NAMES[header] || header
  );
  
  const rows: string[] = [];
  
  // Add instructions as comments (if requested)
  if (includeInstructions) {
    rows.push('# CSV Import Template Instructions');
    rows.push(`# This template is for importing ${dataType} data`);
    rows.push('# Required fields are marked with (*) and must not be empty');
    rows.push('# For array fields (like skills), separate multiple values with semicolons (;)');
    rows.push('# For boolean fields, use "true" or "false"');
    rows.push('# Date fields should be in ISO format (YYYY-MM-DDTHH:mm:ssZ)');
    rows.push('# Remove these instruction lines before importing');
    rows.push('');
  }
  
  // Add headers with required field indicators
  const requiredFields = REQUIRED_FIELDS[dataType] || [];
  const headersWithIndicators = displayHeaders.map((header, index) => {
    const fieldName = headers[index];
    const isRequired = requiredFields.includes(fieldName);
    return isRequired ? `${header} (*)` : header;
  });
  
  rows.push(headersWithIndicators.join(','));
  
  // Add sample data row if requested
  if (includeSampleData) {
    const sampleRow = headers.map(header => {
      const value = sampleData[header as keyof typeof sampleData];
      return formatCSVValue(value);
    });
    rows.push(sampleRow.join(','));
  }
  
  return rows.join('\n');
};

// Download CSV template
export const downloadCSVTemplate = (
  dataType: keyof typeof DATA_TYPE_HEADERS,
  includeSampleData = true,
  includeInstructions = true
) => {
  const content = generateCSVTemplate(dataType, includeSampleData, includeInstructions);
  const filename = `${dataType}_import_template`;
  downloadCSVFile(content, filename);
};

// Generate templates for all data types
export const downloadAllTemplates = () => {
  Object.keys(DATA_TYPE_HEADERS).forEach(dataType => {
    downloadCSVTemplate(dataType as keyof typeof DATA_TYPE_HEADERS);
  });
};

// Generate validation rules documentation
export const generateValidationRulesCSV = (): string => {
  const rules = [
    ['Field Type', 'Validation Rule', 'Example'],
    ['Email', 'Must be valid email format', 'user@srmap.edu.in'],
    ['Phone', 'Must be valid phone number', '+91 9876543210'],
    ['CGPA', 'Must be between 0 and 10', '8.5'],
    ['Percentage', 'Must be between 0 and 100', '85.5'],
    ['Academic Year', 'Must be between 1 and 5', '4'],
    ['Semester', 'Must be between 1 and 10', '8'],
    ['Experience', 'Must be between 0 and 50 years', '15'],
    ['Annual Income', 'Must be positive number', '1000000'],
    ['Boolean Fields', 'Must be "true" or "false"', 'true'],
    ['Array Fields', 'Separate with semicolons', 'Python; Java; React'],
    ['Date Fields', 'ISO 8601 format', '2024-01-20T10:30:00Z']
  ];
  
  return rules.map(row => row.join(',')).join('\n');
};

// Download validation rules
export const downloadValidationRules = () => {
  const content = generateValidationRulesCSV();
  downloadCSVFile(content, 'csv_validation_rules');
};

// Generate field mapping reference
export const generateFieldMappingCSV = (dataType: keyof typeof DATA_TYPE_HEADERS): string => {
  const headers = DATA_TYPE_HEADERS[dataType];
  const requiredFields = REQUIRED_FIELDS[dataType] || [];
  
  const mappings = [
    ['Field Name', 'Display Name', 'Required', 'Data Type', 'Description'],
    ...headers.map(field => [
      field,
      FIELD_DISPLAY_NAMES[field] || field,
      requiredFields.includes(field) ? 'Yes' : 'No',
      getFieldDataType(field),
      getFieldDescription(field)
    ])
  ];
  
  return mappings.map(row => row.join(',')).join('\n');
};

// Download field mapping reference
export const downloadFieldMapping = (dataType: keyof typeof DATA_TYPE_HEADERS) => {
  const content = generateFieldMappingCSV(dataType);
  downloadCSVFile(content, `${dataType}_field_mapping`);
};

// Helper functions
const getFieldDataType = (field: string): string => {
  if (field.includes('cgpa') || field.includes('percentage') || field.includes('year') || 
      field.includes('semester') || field.includes('experience') || field.includes('income')) {
    return 'Number';
  }
  if (field.includes('isActive') || field.includes('isRegistered')) {
    return 'Boolean';
  }
  if (field.includes('skills') || field.includes('responsibilities') || field.includes('systemAccess')) {
    return 'Array (semicolon-separated)';
  }
  if (field.includes('Date')) {
    return 'Date (ISO 8601)';
  }
  return 'Text';
};

const getFieldDescription = (field: string): string => {
  const descriptions: Record<string, string> = {
    'id': 'Unique identifier (system generated if empty)',
    'name': 'Full name of the person',
    'email': 'Valid email address (must end with @srmap.edu.in)',
    'rollNumber': 'Student roll number (format: AP24322130XXX)',
    'employeeId': 'Employee ID (format: SRMXXX001)',
    'cgpa': 'Cumulative Grade Point Average (0-10)',
    'phone': 'Phone number with country code',
    'dateOfBirth': 'Date of birth in ISO format',
    'isActive': 'Whether the record is active (true/false)'
  };
  
  return descriptions[field] || 'No description available';
};