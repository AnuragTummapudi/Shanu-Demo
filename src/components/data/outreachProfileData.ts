export interface CompanyContact {
  id: string;
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  relationship: 'primary' | 'secondary' | 'potential';
  lastContact: string;
  notes: string;
}

export interface Partnership {
  id: string;
  companyName: string;
  partnershipType: 'placement' | 'internship' | 'training' | 'research' | 'consulting';
  startDate: string;
  status: 'active' | 'inactive' | 'pending';
  value: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: string;
  category: 'partnership' | 'placement' | 'revenue' | 'recognition';
}

export const defaultOutreachProfile = {
  // Personal Information
  firstName: 'Rajesh',
  lastName: 'Venkatesh',
  email: 'rajesh.venkatesh@srmap.edu.in',
  phone: '+91 98765 43210',
  dateOfBirth: '1985-03-12',
  gender: 'Male',
  address: 'Flat 15B, Green Valley Apartments, Vijayawada - 520010',
  
  // Professional Information
  employeeId: 'OUT2020001',
  designation: 'Senior Outreach Manager',
  department: 'Placement & Training Cell',
  school: 'University Wide',
  dateOfJoining: '2020-01-15',
  reportingManager: 'Dr. Priya Sharma',
  
  // Experience & Expertise
  totalExperience: '12 years',
  corporateExperience: '8 years',
  educationExperience: '4 years',
  industryExpertise: ['Information Technology', 'Financial Services', 'Manufacturing', 'Healthcare', 'Consulting'],
  
  // Current Responsibilities
  regionsHandled: ['South India', 'Mumbai', 'NCR'],
  sectorsResponsible: ['IT Services', 'Product Companies', 'Fintech', 'Healthcare Tech'],
  companyTierFocus: ['Tier 1', 'Tier 2', 'Startups'],
  
  // Performance Metrics
  companiesConnected: '150+',
  activePartnerships: '45',
  placementTargetsAchieved: '110%',
  averagePlacementPackage: '₹12.5 LPA',
  
  // Skills & Competencies
  technicalSkills: ['CRM Management', 'Data Analytics', 'Market Research', 'Proposal Writing'],
  softSkills: ['Relationship Building', 'Negotiation', 'Communication', 'Strategic Planning'],
  languages: ['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada'],
  certifications: ['Certified Business Development Professional', 'LinkedIn Sales Navigator', 'Google Analytics'],
  
  // Tools & Platforms
  crmTools: ['Salesforce', 'HubSpot', 'Zoho CRM'],
  communicationTools: ['LinkedIn Sales Navigator', 'Microsoft Teams', 'Zoom'],
  analyticsTools: ['Google Analytics', 'Tableau', 'Power BI'],
  
  // Targets & Goals
  monthlyTargets: {
    newCompanyConnections: '8',
    partnershipConversions: '3',
    placementNumbers: '25',
    internshipPlacements: '15'
  },
  
  // Additional Information
  socialMediaProfiles: {
    linkedin: 'https://linkedin.com/in/rajesh-venkatesh',
    twitter: 'https://twitter.com/rajeshvenkatesh',
    facebook: 'https://facebook.com/rajesh.venkatesh'
  },
  
  // Professional Networks
  professionalBodies: ['NASSCOM', 'CII', 'FICCI', 'Indian Chamber of Commerce'],
  alumniNetworks: ['IIM Alumni', 'University Alumni Association'],
  
  // System Information
  lastUpdated: '2024-01-15',
  profileVersion: '1.2'
};

export const defaultCompanyContacts: CompanyContact[] = [
  {
    id: '1',
    companyName: 'TCS',
    contactPerson: 'Suresh Kumar',
    designation: 'Senior Manager - Talent Acquisition',
    email: 'suresh.kumar@tcs.com',
    phone: '+91 99876 54321',
    relationship: 'primary',
    lastContact: '2024-01-10',
    notes: 'Regular hiring partner. Next campus drive scheduled for March 2024.'
  },
  {
    id: '2',
    companyName: 'Infosys',
    contactPerson: 'Priya Reddy',
    designation: 'Campus Recruitment Lead',
    email: 'priya.reddy@infosys.com',
    phone: '+91 98765 43210',
    relationship: 'primary',
    lastContact: '2024-01-08',
    notes: 'Looking to increase hiring numbers for 2024. Interested in specialized training programs.'
  }
];

export const defaultPartnerships: Partnership[] = [
  {
    id: '1',
    companyName: 'Microsoft',
    partnershipType: 'training',
    startDate: '2023-06-01',
    status: 'active',
    value: '₹25 Lakhs',
    description: 'Azure certification training program for students and faculty.'
  },
  {
    id: '2',
    companyName: 'Amazon',
    partnershipType: 'placement',
    startDate: '2023-01-15',
    status: 'active',
    value: '₹50 Lakhs',
    description: 'Annual campus recruitment for software engineering roles.'
  }
];

export const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Highest Placement Record',
    description: 'Achieved 95% placement rate for CSE department, highest in university history',
    date: '2023-12-31',
    impact: '450 students placed',
    category: 'placement'
  },
  {
    id: '2',
    title: 'Strategic Partnership Award',
    description: 'Successfully negotiated multi-year partnership with top tech companies',
    date: '2023-10-15',
    impact: '₹2 Crores annual value',
    category: 'partnership'
  }
];