import { Users, Briefcase, Award, TrendingUp, FileText, Building, IndianRupee } from 'lucide-react';
import { studentData, getStudentsByDepartment, getStudentsByYear, getPlacementStatistics } from './studentData';

// Enhanced super admin profile with Indian context
export const enhancedSuperAdminProfile = {
  name: 'Dr. Rajesh Venkatesh',
  email: 'rajesh_venkatesh@srmap.edu.in',
  phone: '+91 9876543214',
  designation: 'Vice Chancellor - Student Affairs',
  experience: '15 years',
  specialization: ['Educational Administration', 'Strategic Planning', 'University Management'],
  department: 'Administration',
  qualification: 'Ph.D. in Management Studies',
  joinDate: '2018-07-15'
};

// Mock user data for different categories
export const mockUsersByCategory = {
  students: studentData.slice(0, 20).map(student => ({
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    department: student.department,
    role: 'Student',
    status: 'active',
    lastLogin: '2025-01-14',
    createdAt: '2024-08-15',
    yearOfStudy: student.yearOfStudy,
    section: student.section,
    cgpa: student.cgpa,
    placementStatus: student.placementStatus
  })),
  faculty: [
    {
      id: 1001,
      name: 'Dr. Priya Narasimhan',
      email: 'priya.narasimhan@srmap.edu.in',
      phone: '+91 9876543001',
      department: 'Computer Science Engineering',
      role: 'Professor',
      status: 'active',
      lastLogin: '2025-01-15',
      createdAt: '2020-06-01',
      specialization: 'Machine Learning',
      experience: '12 years'
    },
    {
      id: 1002,
      name: 'Prof. Rajesh Kumar',
      email: 'rajesh.kumar@srmap.edu.in',
      phone: '+91 9876543002',
      department: 'Information Technology',
      role: 'Associate Professor',
      status: 'active',
      lastLogin: '2025-01-15',
      createdAt: '2019-03-15',
      specialization: 'Data Science',
      experience: '8 years'
    }
  ],
  operations: [
    {
      id: 2001,
      name: 'Kavitha Sharma',
      email: 'kavitha.sharma@srmap.edu.in',
      phone: '+91 9876543101',
      department: 'Placement Cell',
      role: 'Operations Manager',
      status: 'active',
      lastLogin: '2025-01-15',
      createdAt: '2021-09-10',
      responsibilities: ['Job Posting', 'Student Coordination']
    },
    {
      id: 2002,
      name: 'Suresh Babu',
      email: 'suresh.babu@srmap.edu.in',
      phone: '+91 9876543102',
      department: 'Placement Cell',
      role: 'Operations Executive',
      status: 'active',
      lastLogin: '2025-01-14',
      createdAt: '2022-01-20',
      responsibilities: ['Drive Management', 'Documentation']
    }
  ],
  outreach: [
    {
      id: 3001,
      name: 'Priya Krishnamurthy',
      email: 'priya.krishnamurthy@srmap.edu.in',
      phone: '+91 9876543201',
      department: 'Corporate Relations',
      role: 'Outreach Manager',
      status: 'active',
      lastLogin: '2025-01-15',
      createdAt: '2021-04-12',
      targets: { monthly: 15, achieved: 12 }
    },
    {
      id: 3002,
      name: 'Rajesh Naidu',
      email: 'rajesh.naidu@srmap.edu.in',
      phone: '+91 9876543202',
      department: 'Corporate Relations',
      role: 'Outreach Executive',
      status: 'active',
      lastLogin: '2025-01-14',
      createdAt: '2022-07-08',
      targets: { monthly: 10, achieved: 8 }
    }
  ]
};

// Generate comprehensive report data with dummy values
export const generateSafeReportData = () => {
  const placementStats = getPlacementStatistics();
  
  return {
    summary: {
      totalUsers: studentData.length,
      activePlacements: 156,
      trainingSessions: 45,
      successRate: placementStats.placementRate,
      totalApplications: 9110,
      placementRate: placementStats.placementRate,
      partnerCompanies: 42,
      averageCTC: 8.5
    },
    placementTrends: [
      { month: 'Aug', placements: 145, applications: 1250, satisfaction: 4.2 },
      { month: 'Sep', placements: 234, applications: 1680, satisfaction: 4.3 },
      { month: 'Oct', placements: 189, applications: 1420, satisfaction: 4.5 },
      { month: 'Nov', placements: 267, applications: 2100, satisfaction: 4.4 },
      { month: 'Dec', placements: 198, applications: 1380, satisfaction: 4.6 },
      { month: 'Jan', placements: 220, applications: 2850, satisfaction: 4.7 }
    ],
    departmentStats: Object.entries(getStudentsByDepartment()).map(([dept, count]) => ({
      name: dept,
      students: count,
      placementRate: Math.floor(Math.random() * 20) + 80,
      avgPackage: Math.floor(Math.random() * 10) + 6
    })),
    universityGrowth: [
      { year: '2020', students: 2100, faculty: 145, companies: 28 },
      { year: '2021', students: 2340, faculty: 158, companies: 32 },
      { year: '2022', students: 2580, faculty: 167, companies: 38 },
      { year: '2023', students: 2750, faculty: 175, companies: 41 },
      { year: '2024', students: 2847, faculty: 182, companies: 45 }
    ]
  };
};

// Quick stats for overview
export const generateQuickStats = () => {
  const safeReportData = generateSafeReportData();
  
  return [
    { 
      label: 'Total Students', 
      value: safeReportData.summary.totalUsers, 
      icon: Users, 
      color: 'blue',
      trend: '+12% this semester'
    },
    { 
      label: 'Active Placements', 
      value: safeReportData.summary.activePlacements, 
      icon: Briefcase, 
      color: 'green',
      trend: '+8% this week'
    },
    { 
      label: 'Training Sessions', 
      value: safeReportData.summary.trainingSessions, 
      icon: Award, 
      color: 'purple',
      trend: '15 this month'
    },
    { 
      label: 'Placement Rate', 
      value: safeReportData.summary.successRate, 
      icon: TrendingUp, 
      color: 'orange',
      suffix: '%',
      trend: '+5% improved'
    }
  ];
};

export const getKeyMetrics = () => {
  const safeReportData = generateSafeReportData();
  
  return [
    {
      label: 'Total Applications',
      value: safeReportData.summary.totalApplications,
      icon: FileText,
      color: 'blue',
      bgColor: 'blue-50',
      borderColor: 'cyan-50',
      trend: '24% increase this quarter'
    },
    {
      label: 'Placement Rate', 
      value: `${safeReportData.summary.placementRate}%`,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'green-50',
      borderColor: 'emerald-50',
      trend: 'Above industry average'
    },
    {
      label: 'Partner Companies',
      value: safeReportData.summary.partnerCompanies,
      icon: Building,
      color: 'purple',
      bgColor: 'purple-50', 
      borderColor: 'pink-50',
      trend: '28 new this year'
    },
    {
      label: 'Average CTC',
      value: `₹${safeReportData.summary.averageCTC}L`,
      icon: IndianRupee,
      color: 'orange',
      bgColor: 'orange-50',
      borderColor: 'red-50', 
      trend: '18% increase YoY'
    }
  ];
};