export interface FacultyProfile {
  // Personal Information
  employeeId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  bloodGroup: string;
  
  // Address Information
  permanentAddress: Address;
  currentAddress: Address;
  
  // Academic Information
  department: string;
  school: string;
  designation: string;
  joiningDate: string;
  experience: number;
  employmentType: string;
  
  // Educational Qualifications
  qualifications: Qualification[];
  
  // Professional Experience
  previousExperience: Experience[];
  
  // Research & Publications
  researchAreas: string[];
  publications: Publication[];
  researchProjects: ResearchProject[];
  patents: Patent[];
  
  // Teaching Information
  coursesTeaching: Course[];
  teachingLoad: number;
  studentsSupervised: StudentSupervision;
  
  // Skills and Expertise
  technicalSkills: string[];
  softwareTools: string[];
  languages: Language[];
  certifications: Certification[];
  
  // Achievements & Recognition
  awards: Award[];
  memberships: Membership[];
  editorialRoles: EditorialRole[];
  
  // Administrative Roles
  administrativeRoles: AdministrativeRole[];
  
  // Training & Development
  workshops: Workshop[];
  conferences: Conference[];
  
  // Budget & Resources
  budgetAllocated: number;
  budgetUtilized: number;
  labsManaged: string[];
  
  // Performance Metrics
  teachingRating: number;
  researchImpact: number;
  publicationCount: number;
  citationCount: number;
  
  // Social Links
  linkedin?: string;
  googleScholar?: string;
  researchGate?: string;
  orcid?: string;
  
  // Emergency Contact
  emergencyContact: EmergencyContact;
  
  profileCompletion: number;
  lastUpdated: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Qualification {
  degree: string;
  specialization: string;
  university: string;
  year: number;
  grade: string;
}

interface Experience {
  organization: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface Publication {
  title: string;
  journal: string;
  year: number;
  authors: string[];
  citations?: number;
  doi?: string;
  type: string;
}

interface ResearchProject {
  title: string;
  fundingAgency: string;
  amount: number;
  duration: string;
  role: string;
  status: string;
}

interface Patent {
  title: string;
  applicationNumber: string;
  status: string;
  year: number;
}

interface Course {
  courseCode: string;
  courseName: string;
  level: string;
  credits: number;
  semester: string;
}

interface StudentSupervision {
  phd: number;
  masters: number;
  undergraduate: number;
}

interface Language {
  language: string;
  proficiency: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  validUntil?: string;
  credentialId?: string;
}

interface Award {
  title: string;
  organization: string;
  year: number;
  description: string;
}

interface Membership {
  organization: string;
  membershipType: string;
  since: number;
}

interface EditorialRole {
  journal: string;
  role: string;
  since: number;
}

interface AdministrativeRole {
  position: string;
  department: string;
  duration: string;
  responsibilities: string[];
}

interface Workshop {
  title: string;
  organizer: string;
  date: string;
  type: string;
}

interface Conference {
  name: string;
  location: string;
  year: number;
  role: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}