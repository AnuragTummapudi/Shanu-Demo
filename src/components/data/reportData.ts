import { studentData } from './studentData';
import { companiesData, jobsData } from './indianData';
import { schools, salarySlabs, Department } from './universityStructure';

export interface ReportFilter {
  school?: string;
  department?: string;
  batch?: string;
  cgpaRange?: { min: number; max: number };
  salarySlabs?: string[];
  companies?: string[];
  jobTypes?: string[];
  applicationStatus?: string[];
  dateRange?: { start: string; end: string };
  performanceLevel?: string[];
}

export interface ReportData {
  summary: {
    totalStudents: number;
    totalCompanies: number;
    totalJobs: number;
    totalApplications: number;
    placementRate: number;
    averageCTC: number;
    highestCTC: number;
    lowestCTC: number;
  };
  schoolWise: Array<{
    school: string;
    students: number;
    placed: number;
    placementRate: number;
    averageCTC: number;
    topCompanies: string[];
  }>;
  departmentWise: Array<{
    department: string;
    school: string;
    students: number;
    placed: number;
    placementRate: number;
    averageCTC: number;
    cgpaAverage: number;
  }>;
  salarySlabWise: Array<{
    slab: string;
    range: string;
    students: number;
    companies: number;
    applications: number;
    successRate: number;
  }>;
  companyWise: Array<{
    company: string;
    sector: string;
    studentsHired: number;
    averageCTC: string;
    hiringRate: number;
    departments: string[];
  }>;
  performanceAnalysis: {
    topPerformers: Array<{
      name: string;
      department: string;
      cgpa: number;
      placementStatus: string;
      ctc?: string;
    }>;
    cgpaDistribution: Array<{
      range: string;
      count: number;
      placementRate: number;
    }>;
    skillsInDemand: Array<{
      skill: string;
      demand: number;
      averageCTC: number;
    }>;
  };
  trendsAnalysis: {
    monthlyPlacements: Array<{
      month: string;
      placements: number;
      companies: number;
      averageCTC: number;
    }>;
    departmentTrends: Array<{
      department: string;
      growth: number;
      trend: 'up' | 'down' | 'stable';
    }>;
  };
}

// Mock comprehensive report data generator
export const generateReportData = (filters: ReportFilter = {}): ReportData => {
  // Filter students based on criteria
  let filteredStudents = studentData;
  
  if (filters.department) {
    filteredStudents = filteredStudents.filter(s => s.department === filters.department);
  }
  
  if (filters.cgpaRange) {
    filteredStudents = filteredStudents.filter(s => 
      s.cgpa >= filters.cgpaRange!.min && s.cgpa <= filters.cgpaRange!.max
    );
  }

  // Mock data generation with realistic South Indian context
  const totalStudents = filteredStudents.length || 2847;
  const placedStudents = Math.floor(totalStudents * 0.94); // 94% placement rate
  
  return {
    summary: {
      totalStudents,
      totalCompanies: companiesData.length,
      totalJobs: jobsData.length,
      totalApplications: totalStudents * 3.2, // Average 3.2 applications per student
      placementRate: Math.round((placedStudents / totalStudents) * 100),
      averageCTC: 8.5,
      highestCTC: 58,
      lowestCTC: 3.5
    },
    
    schoolWise: [
      {
        school: 'School of Engineering & Technology',
        students: 1856,
        placed: 1764,
        placementRate: 95,
        averageCTC: 9.2,
        topCompanies: ['TechMahindra', 'Infosys', 'Wipro', 'Zoho', 'TCS']
      },
      {
        school: 'School of Management',
        students: 567,
        placed: 524,
        placementRate: 92,
        averageCTC: 7.8,
        topCompanies: ['HDFC Bank', 'ICICI Bank', 'Deloitte', 'PwC', 'EY']
      },
      {
        school: 'School of Liberal Arts & Sciences',
        students: 424,
        placed: 389,
        placementRate: 92,
        averageCTC: 6.5,
        topCompanies: ['Infosys', 'Accenture', 'Cognizant', 'IBM', 'HCL']
      }
    ],
    
    departmentWise: [
      {
        department: 'Computer Science',
        school: 'SET',
        students: 567,
        placed: 534,
        placementRate: 94,
        averageCTC: 10.2,
        cgpaAverage: 8.3
      },
      {
        department: 'Information Technology',
        school: 'SET',
        students: 423,
        placed: 380,
        placementRate: 90,
        averageCTC: 9.1,
        cgpaAverage: 8.1
      },
      {
        department: 'Electronics & Communication',
        school: 'SET',
        students: 234,
        placed: 196,
        placementRate: 84,
        averageCTC: 7.8,
        cgpaAverage: 7.9
      },
      {
        department: 'Mechanical Engineering',
        school: 'SET',
        students: 189,
        placed: 142,
        placementRate: 75,
        averageCTC: 6.5,
        cgpaAverage: 7.5
      },
      {
        department: 'MBA',
        school: 'Management',
        students: 345,
        placed: 318,
        placementRate: 92,
        averageCTC: 8.2,
        cgpaAverage: 8.0
      }
    ],

    salarySlabWise: salarySlabs.map((slab, index) => ({
      slab: slab.name,
      range: `₹${slab.minLPA}L - ₹${slab.maxLPA === 100 ? '25+' : slab.maxLPA}L`,
      students: [234, 445, 567, 423, 189][index] || 100,
      companies: [15, 25, 35, 28, 12][index] || 10,
      applications: [1234, 2156, 2890, 1876, 567][index] || 500,
      successRate: [78, 82, 85, 88, 92][index] || 80
    })),

    companyWise: companiesData.slice(0, 10).map((company, index) => ({
      company: company.name,
      sector: company.sector,
      studentsHired: [45, 60, 35, 50, 40, 25, 30, 20, 15, 25][index] || 20,
      averageCTC: company.ctcRange,
      hiringRate: company.hiringRate || Math.floor(Math.random() * 40) + 60,
      departments: ['CSE', 'IT', 'ECE', 'MBA'].slice(0, Math.floor(Math.random() * 4) + 1)
    })),

    performanceAnalysis: {
      topPerformers: [
        { name: 'Ananya Nair', department: 'CSE', cgpa: 9.2, placementStatus: 'Placed', ctc: '₹25L' },
        { name: 'Meera Krishnan', department: 'IT', cgpa: 9.1, placementStatus: 'Placed', ctc: '₹22L' },
        { name: 'Arjun Reddy', department: 'CSE', cgpa: 8.7, placementStatus: 'Placed', ctc: '₹18L' },
        { name: 'Srinidhi Bhat', department: 'CSE', cgpa: 8.9, placementStatus: 'Placed', ctc: '₹20L' },
        { name: 'Deepika Pillai', department: 'IT', cgpa: 8.5, placementStatus: 'Placed', ctc: '₹15L' }
      ],
      
      cgpaDistribution: [
        { range: '9.0 - 10.0', count: 234, placementRate: 98 },
        { range: '8.0 - 8.9', count: 567, placementRate: 96 },
        { range: '7.0 - 7.9', count: 890, placementRate: 92 },
        { range: '6.0 - 6.9', count: 456, placementRate: 85 },
        { range: '5.0 - 5.9', count: 123, placementRate: 70 }
      ],
      
      skillsInDemand: [
        { skill: 'React.js', demand: 145, averageCTC: 9.5 },
        { skill: 'Node.js', demand: 123, averageCTC: 10.2 },
        { skill: 'Python', demand: 167, averageCTC: 8.8 },
        { skill: 'Java', demand: 189, averageCTC: 8.5 },
        { skill: 'Machine Learning', demand: 98, averageCTC: 12.5 },
        { skill: 'AWS', demand: 87, averageCTC: 11.2 },
        { skill: 'Docker', demand: 76, averageCTC: 10.8 }
      ]
    },

    trendsAnalysis: {
      monthlyPlacements: [
        { month: 'Aug 2024', placements: 145, companies: 12, averageCTC: 7.8 },
        { month: 'Sep 2024', placements: 234, companies: 18, averageCTC: 8.2 },
        { month: 'Oct 2024', placements: 189, companies: 15, averageCTC: 8.5 },
        { month: 'Nov 2024', placements: 267, companies: 22, averageCTC: 9.1 },
        { month: 'Dec 2024', placements: 198, companies: 16, averageCTC: 8.8 },
        { month: 'Jan 2025', placements: 156, companies: 14, averageCTC: 9.5 }
      ],
      
      departmentTrends: [
        { department: 'Computer Science', growth: 15, trend: 'up' },
        { department: 'Information Technology', growth: 8, trend: 'up' },
        { department: 'MBA', growth: 5, trend: 'stable' },
        { department: 'Electronics', growth: -2, trend: 'down' },
        { department: 'Mechanical', growth: 3, trend: 'stable' }
      ]
    }
  };
};

// Create flat departments array from schools
const allDepartments = schools.reduce((acc, school) => {
  return acc.concat(school.departments);
}, [] as Department[]);

// Export filtering options
export const reportFilterOptions = {
  schools: schools.map(school => ({ value: school.id, label: school.name })),
  departments: allDepartments.map(dept => ({ value: dept.id, label: dept.name })),
  salarySlabs: salarySlabs.map(slab => ({ value: slab.id, label: slab.name })),
  companies: companiesData.map(company => ({ value: company.id.toString(), label: company.name })),
  batches: [
    { value: '2021-2025', label: '2021-2025' },
    { value: '2022-2026', label: '2022-2026' },
    { value: '2023-2027', label: '2023-2027' },
    { value: '2024-2028', label: '2024-2028' }
  ],
  jobTypes: [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Part-time', label: 'Part-time' }
  ],
  applicationStatus: [
    { value: 'applied', label: 'Applied' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'selected', label: 'Selected' },
    { value: 'rejected', label: 'Rejected' }
  ],
  performanceLevels: [
    { value: 'high', label: 'High (80%+)' },
    { value: 'medium', label: 'Medium (60-79%)' },
    { value: 'low', label: 'Low (<60%)' }
  ]
};

// Mock report templates
export const reportTemplates = [
  {
    id: 'placement_summary',
    name: 'Placement Summary Report',
    description: 'Overall placement statistics and key metrics',
    defaultFilters: {},
    sections: ['summary', 'schoolWise', 'departmentWise']
  },
  {
    id: 'department_analysis',
    name: 'Department-wise Analysis',
    description: 'Detailed analysis by academic departments',
    defaultFilters: {},
    sections: ['departmentWise', 'performanceAnalysis', 'trendsAnalysis']
  },
  {
    id: 'salary_analysis',
    name: 'Salary Slab Analysis',
    description: 'Analysis of placement packages across different salary ranges',
    defaultFilters: {},
    sections: ['salarySlabWise', 'companyWise', 'performanceAnalysis']
  },
  {
    id: 'company_partnership',
    name: 'Company Partnership Report',
    description: 'Analysis of company relationships and hiring patterns',
    defaultFilters: {},
    sections: ['companyWise', 'trendsAnalysis']
  },
  {
    id: 'performance_insights',
    name: 'Student Performance Insights',
    description: 'Detailed analysis of student performance and outcomes',
    defaultFilters: {},
    sections: ['performanceAnalysis', 'trendsAnalysis']
  }
];