// Enhanced CSV Export with Real Dummy Data

import { getDataByRole, getAllData } from '../data/comprehensiveData';
import { toast } from 'sonner';

export interface ExportOptions {
  filename: string;
  format: 'csv' | 'xlsx';
  userRole: string;
  dataType: string;
  includeHeaders?: boolean;
  filters?: Record<string, any>;
}

// Convert data to CSV format with proper escaping
export const convertToCSV = (data: any[], customHeaders?: Record<string, string>): string => {
  if (!data || data.length === 0) {
    return 'No data available for export';
  }

  // Get headers from first object or use custom headers
  const firstItem = data[0];
  const headers = customHeaders ? Object.keys(customHeaders) : Object.keys(firstItem);
  const csvHeaders = customHeaders ? Object.values(customHeaders) : headers;
  
  // Create CSV header row
  const headerRow = csvHeaders.map(header => `"${header}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(item => {
    return headers.map(key => {
      let value = item[key];
      
      // Handle null/undefined
      if (value === null || value === undefined) {
        return '""';
      }
      
      // Handle arrays
      if (Array.isArray(value)) {
        return `"${value.join('; ')}"`;
      }
      
      // Handle objects
      if (typeof value === 'object') {
        if (value.toString && typeof value.toString === 'function') {
          return `"${value.toString()}"`;
        }
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Handle dates
      if (value instanceof Date) {
        return `"${value.toISOString().split('T')[0]}"`;
      }
      
      // Handle strings - escape quotes and wrap in quotes
      const stringValue = String(value);
      return `"${stringValue.replace(/"/g, '""')}"`;
    }).join(',');
  });
  
  return [headerRow, ...dataRows].join('\n');
};

// Download CSV file
export const downloadCSV = (csvContent: string, filename: string) => {
  // Add BOM for proper Excel handling of special characters
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { 
    type: 'text/csv;charset=utf-8;' 
  });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

// Main export function
export const exportData = async (options: ExportOptions): Promise<boolean> => {
  try {
    // Get data based on role and type
    const rawData = getDataByRole(options.userRole, options.dataType);
    
    if (!rawData || rawData.length === 0) {
      toast.error(`No ${options.dataType} data available for export`);
      return false;
    }

    // Apply filters if provided
    let filteredData = rawData;
    if (options.filters) {
      filteredData = applyFilters(rawData, options.filters);
    }
    
    if (filteredData.length === 0) {
      toast.error('No data matches the applied filters');
      return false;
    }

    // Get appropriate headers for the data type
    const headers = getHeadersForDataType(options.dataType);
    
    // Convert to CSV
    const csvContent = convertToCSV(filteredData, headers);
    
    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${options.filename}_${timestamp}.csv`;
    
    // Download file
    downloadCSV(csvContent, filename);
    
    toast.success(`${options.dataType} data exported successfully! (${filteredData.length} records)`);
    return true;
    
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Failed to export data. Please try again.');
    return false;
  }
};

// Apply filters to data
const applyFilters = (data: any[], filters: Record<string, any>): any[] => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true;
      
      // Handle different filter types
      const itemValue = item[key];
      
      if (typeof value === 'string') {
        return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
      }
      
      if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
        const numValue = parseFloat(itemValue);
        return numValue >= value.min && numValue <= value.max;
      }
      
      return itemValue === value;
    });
  });
};

// Get appropriate headers for different data types
const getHeadersForDataType = (dataType: string): Record<string, string> => {
  switch (dataType) {
    case 'students':
      return {
        id: 'Student ID',
        name: 'Full Name',
        email: 'Email Address',
        rollNumber: 'Roll Number',
        department: 'Department',
        specialization: 'Specialization',
        year: 'Academic Year',
        semester: 'Current Semester',
        cgpa: 'CGPA',
        phone: 'Phone Number',
        gender: 'Gender',
        'address.city': 'City',
        'address.state': 'State',
        'parentDetails.fatherName': 'Father Name',
        'parentDetails.motherName': 'Mother Name',
        'parentDetails.annualIncome': 'Family Income (₹)',
        'academicHistory.tenth.percentage': '10th Percentage',
        'academicHistory.twelfth.percentage': '12th Percentage',
        'placementStatus.isRegistered': 'Placement Registered',
        'placementStatus.expectedSalary.min': 'Expected Salary Min (₹)',
        'placementStatus.expectedSalary.max': 'Expected Salary Max (₹)',
        'placementStatus.currentApplications': 'Current Applications',
        'placementStatus.offersReceived': 'Offers Received',
        attendanceRate: 'Attendance Rate (%)',
        performanceGrade: 'Performance Grade',
        activeStatus: 'Status'
      };
      
    case 'companies':
      return {
        id: 'Company ID',
        name: 'Company Name',
        contactPerson: 'Contact Person',
        email: 'Email',
        phone: 'Phone Number',
        industry: 'Industry',
        location: 'Location',
        companySize: 'Company Size',
        partnershipStatus: 'Partnership Status',
        totalHirings: 'Total Students Hired',
        averageSalary: 'Average Salary (₹)',
        highestSalary: 'Highest Salary (₹)',
        minimumCGPA: 'Minimum CGPA Required',
        satisfactionRating: 'Satisfaction Rating',
        currentOpenings: 'Current Job Openings',
        companyCategory: 'Company Category',
        lastRecruitmentDate: 'Last Recruitment Date',
        nextRecruitmentDate: 'Next Recruitment Date'
      };
      
    case 'applications':
      return {
        id: 'Application ID',
        studentName: 'Student Name',
        studentEmail: 'Student Email',
        rollNumber: 'Roll Number',
        department: 'Department',
        currentCGPA: 'CGPA',
        companyName: 'Company',
        jobTitle: 'Job Title',
        applicationDate: 'Application Date',
        status: 'Current Status',
        currentRound: 'Current Round',
        interviewDate: 'Interview Date',
        interviewTime: 'Interview Time',
        salaryRange: 'Salary Range',
        jobLocation: 'Job Location',
        workMode: 'Work Mode',
        recruiterContact: 'Recruiter Contact',
        feedback: 'Feedback',
        lastUpdated: 'Last Updated'
      };
      
    case 'training':
      return {
        id: 'Program ID',
        programName: 'Program Name',
        instructor: 'Instructor',
        department: 'Department',
        duration: 'Duration',
        startDate: 'Start Date',
        endDate: 'End Date',
        totalParticipants: 'Total Participants',
        completedParticipants: 'Completed',
        averageScore: 'Average Score',
        satisfactionRating: 'Satisfaction Rating',
        courseFee: 'Course Fee (₹)',
        mode: 'Mode',
        attendanceRate: 'Attendance Rate (%)',
        placementRate: 'Placement Rate (%)',
        industryPartner: 'Industry Partner',
        status: 'Status'
      };
      
    case 'faculty':
      return {
        id: 'Faculty ID',
        name: 'Full Name',
        email: 'Email',
        department: 'Department',
        designation: 'Designation',
        experience: 'Experience (Years)',
        qualification: 'Qualification',
        phone: 'Phone Number',
        employeeId: 'Employee ID',
        dateOfJoining: 'Date of Joining',
        publicationsCount: 'Publications Count',
        projectsHandled: 'Projects Handled',
        studentsGuided: 'Students Guided',
        averageRating: 'Average Rating',
        activeStatus: 'Status'
      };
      
    case 'operations':
      return {
        id: 'Report ID',
        reportType: 'Report Type',
        reportTitle: 'Report Title',
        generatedBy: 'Generated By',
        generatedDate: 'Generated Date',
        department: 'Department',
        totalStudents: 'Total Students',
        placedStudents: 'Students Placed',
        placementPercentage: 'Placement Rate (%)',
        averagePackage: 'Average Package (₹)',
        highestPackage: 'Highest Package (₹)',
        companiesVisited: 'Companies Visited',
        reportStatus: 'Status',
        approvalStatus: 'Approval Status'
      };
      
    case 'budget':
      return {
        id: 'Budget ID',
        category: 'Budget Category',
        department: 'Department',
        fiscalYear: 'Fiscal Year',
        allocated: 'Allocated Amount (₹)',
        spent: 'Spent Amount (₹)',
        available: 'Available Amount (₹)',
        utilization: 'Utilization (%)',
        variance: 'Variance (₹)',
        budgetOwner: 'Budget Owner',
        status: 'Status'
      };
      
    default:
      return {};
  }
};

// Specific export functions for different data types
export const exportStudentsData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'students_data',
    format: 'csv',
    userRole,
    dataType: 'students',
    filters
  });
};

export const exportCompaniesData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'companies_data',
    format: 'csv',
    userRole,
    dataType: 'companies',
    filters
  });
};

export const exportApplicationsData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'job_applications',
    format: 'csv',
    userRole,
    dataType: 'applications',
    filters
  });
};

export const exportTrainingData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'training_programs',
    format: 'csv',
    userRole,
    dataType: 'training',
    filters
  });
};

export const exportFacultyData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'faculty_data',
    format: 'csv',
    userRole,
    dataType: 'faculty',
    filters
  });
};

export const exportOperationsData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'operations_reports',
    format: 'csv',
    userRole,
    dataType: 'operations',
    filters
  });
};

export const exportBudgetData = (userRole: string, filters?: Record<string, any>) => {
  return exportData({
    filename: 'budget_analysis',
    format: 'csv',
    userRole,
    dataType: 'budget',
    filters
  });
};

// CSV Template Generation for Bulk Upload
export const generateCSVTemplate = (templateType: string): string => {
  const templates = {
    students: {
      headers: [
        'name', 'email', 'rollNumber', 'department', 'specialization', 
        'year', 'semester', 'cgpa', 'phone', 'dateOfBirth', 'gender', 
        'city', 'state', 'fatherName', 'motherName', 'annualIncome'
      ],
      sampleRow: [
        'John Doe', 'john.doe@srmap.edu.in', 'AP24CSE130XXX', 
        'Computer Science & Engineering', 'Artificial Intelligence',
        '4', '8', '8.5', '+91 9876543210', '2002-01-15', 'Male',
        'Hyderabad', 'Telangana', 'Father Name', 'Mother Name', '800000'
      ]
    },
    companies: {
      headers: [
        'name', 'contactPerson', 'email', 'phone', 'industry', 
        'location', 'companySize', 'website', 'partnershipStatus', 
        'minimumCGPA', 'jobTypesOffered'
      ],
      sampleRow: [
        'Sample Company', 'HR Manager', 'hr@company.com', '+91 9876543210',
        'Technology', 'Bangalore', '1000+', 'https://company.com',
        'Active', '7.0', 'Full-time, Internship'
      ]
    }
  };
  
  const template = templates[templateType as keyof typeof templates];
  if (!template) return '';
  
  const headerRow = template.headers.map(h => `"${h}"`).join(',');
  const sampleRow = template.sampleRow.map(v => `"${v}"`).join(',');
  
  return `${headerRow}\n${sampleRow}`;
};

// Download CSV template
export const downloadCSVTemplate = (templateType: string) => {
  const csvContent = generateCSVTemplate(templateType);
  if (!csvContent) {
    toast.error('Template not available for this data type');
    return;
  }
  
  const filename = `${templateType}_upload_template.csv`;
  downloadCSV(csvContent, filename);
  toast.success(`${templateType} template downloaded successfully!`);
};

// Comprehensive export function for multiple data types
export const exportComprehensiveReport = async (userRole: string) => {
  try {
    const dataTypes = ['students', 'companies', 'applications', 'training'];
    const exportPromises = dataTypes.map(dataType => 
      exportData({
        filename: `comprehensive_${dataType}`,
        format: 'csv',
        userRole,
        dataType
      })
    );
    
    const results = await Promise.all(exportPromises);
    
    if (results.every(result => result)) {
      toast.success('Comprehensive report exported successfully!');
      return true;
    } else {
      toast.warning('Some exports completed successfully, others may have failed');
      return false;
    }
  } catch (error) {
    console.error('Comprehensive export failed:', error);
    toast.error('Failed to export comprehensive report');
    return false;
  }
};