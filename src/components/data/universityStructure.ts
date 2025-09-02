export interface School {
  id: string;
  name: string;
  shortName: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  schoolId: string;
}

export interface SalarySlab {
  id: string;
  name: string;
  minLPA: number;
  maxLPA: number;
  applicationLimit: number;
}

export interface EligibilityCriteria {
  schoolId?: string;
  departmentId?: string;
  minCGPA: number;
  maxBacklogs: number;
  requiredSkills?: string[];
  additionalRequirements?: string[];
}

export const schools: School[] = [
  {
    id: 'SET',
    name: 'School of Engineering & Technology',
    shortName: 'SET',
    departments: [
      { id: 'CSE', name: 'Computer Science & Engineering', shortName: 'CSE', schoolId: 'SET' },
      { id: 'IT', name: 'Information Technology', shortName: 'IT', schoolId: 'SET' },
      { id: 'ECE', name: 'Electronics & Communication Engineering', shortName: 'ECE', schoolId: 'SET' },
      { id: 'ME', name: 'Mechanical Engineering', shortName: 'ME', schoolId: 'SET' },
      { id: 'CE', name: 'Civil Engineering', shortName: 'CE', schoolId: 'SET' },
      { id: 'EEE', name: 'Electrical & Electronics Engineering', shortName: 'EEE', schoolId: 'SET' }
    ]
  },
  {
    id: 'SMG',
    name: 'School of Management',
    shortName: 'SMG',
    departments: [
      { id: 'MBA', name: 'Master of Business Administration', shortName: 'MBA', schoolId: 'SMG' },
      { id: 'BBA', name: 'Bachelor of Business Administration', shortName: 'BBA', schoolId: 'SMG' },
      { id: 'FIN', name: 'Finance', shortName: 'FIN', schoolId: 'SMG' },
      { id: 'MKT', name: 'Marketing', shortName: 'MKT', schoolId: 'SMG' },
      { id: 'HR', name: 'Human Resources', shortName: 'HR', schoolId: 'SMG' }
    ]
  },
  {
    id: 'SLAS',
    name: 'School of Liberal Arts & Sciences',
    shortName: 'SLAS',
    departments: [
      { id: 'ECO', name: 'Economics', shortName: 'ECO', schoolId: 'SLAS' },
      { id: 'MATH', name: 'Mathematics', shortName: 'MATH', schoolId: 'SLAS' },
      { id: 'PHY', name: 'Physics', shortName: 'PHY', schoolId: 'SLAS' },
      { id: 'CHEM', name: 'Chemistry', shortName: 'CHEM', schoolId: 'SLAS' },
      { id: 'ENG', name: 'English Literature', shortName: 'ENG', schoolId: 'SLAS' }
    ]
  }
];

export const salarySlabs: SalarySlab[] = [
  {
    id: 'slab1',
    name: '₹5-10 LPA',
    minLPA: 5,
    maxLPA: 10,
    applicationLimit: 15
  },
  {
    id: 'slab2',
    name: '₹10-15 LPA',
    minLPA: 10,
    maxLPA: 15,
    applicationLimit: 10
  },
  {
    id: 'slab3',
    name: '₹15-20 LPA',
    minLPA: 15,
    maxLPA: 20,
    applicationLimit: 8
  },
  {
    id: 'slab4',
    name: '₹20-25 LPA',
    minLPA: 20,
    maxLPA: 25,
    applicationLimit: 5
  },
  {
    id: 'slab5',
    name: '₹25+ LPA',
    minLPA: 25,
    maxLPA: 100,
    applicationLimit: 3
  }
];

export const getSchoolById = (schoolId: string): School | undefined => {
  return schools.find(school => school.id === schoolId);
};

export const getDepartmentById = (departmentId: string): Department | undefined => {
  for (const school of schools) {
    const department = school.departments.find(dept => dept.id === departmentId);
    if (department) return department;
  }
  return undefined;
};

export const getDepartmentsBySchool = (schoolId: string): Department[] => {
  const school = getSchoolById(schoolId);
  return school ? school.departments : [];
};

export const getSalarySlabForPackage = (packageLPA: number): SalarySlab | undefined => {
  return salarySlabs.find(slab => packageLPA >= slab.minLPA && packageLPA <= slab.maxLPA);
};

export const getApplicationsUsedInSlab = (studentId: number, slabId: string): number => {
  // Mock data - in real app, this would fetch from database
  const mockApplicationCounts: Record<string, number> = {
    'slab1': 5,
    'slab2': 3,
    'slab3': 2,
    'slab4': 1,
    'slab5': 0
  };
  return mockApplicationCounts[slabId] || 0;
};

export const canApplyToJob = (studentId: number, packageLPA: number): { canApply: boolean; reason?: string } => {
  const slab = getSalarySlabForPackage(packageLPA);
  if (!slab) {
    return { canApply: false, reason: 'Invalid salary range' };
  }

  const applicationsUsed = getApplicationsUsedInSlab(studentId, slab.id);
  if (applicationsUsed >= slab.applicationLimit) {
    return { 
      canApply: false, 
      reason: `Application limit reached for ${slab.name} (${applicationsUsed}/${slab.applicationLimit})` 
    };
  }

  return { canApply: true };
};

// Performance color utilities
export const getPerformanceColor = (performance: 'low' | 'medium' | 'high' | 'good'): string => {
  switch (performance) {
    case 'low': return 'error-light';
    case 'medium': return 'warning-light';
    case 'high':
    case 'good': return 'success-light';
    default: return 'info-light';
  }
};

export const getPerformanceTextColor = (performance: 'low' | 'medium' | 'high' | 'good'): string => {
  switch (performance) {
    case 'low': return 'text-error';
    case 'medium': return 'text-warning';
    case 'high':
    case 'good': return 'text-success';
    default: return 'text-info';
  }
};