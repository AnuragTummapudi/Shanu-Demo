import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, User, Edit, Save, X, FileText, GraduationCap, Award, BookOpen, Building } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { FacultyProfile } from '../types/FacultyProfileTypes';
import { mockFacultyProfile } from '../data/mockFacultyProfile';

interface FacultyProfilePageProps {
  profile?: FacultyProfile | any;
}

// Helper function to safely parse name into first and last name
const parseName = (fullName: string = '') => {
  const nameParts = fullName.trim().split(' ');
  return {
    firstName: nameParts[0] || 'Faculty',
    lastName: nameParts.slice(1).join(' ') || 'Member'
  };
};

// Helper function to safely get initials
const getInitials = (firstName: string = '', lastName: string = '') => {
  return `${firstName[0] || 'F'}${lastName[0] || 'M'}`;
};

export const FacultyProfilePage: React.FC<FacultyProfilePageProps> = ({ profile: initialProfile }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  // Safely handle faculty data with comprehensive fallbacks
  const safeFaculty: FacultyProfile = {
    // Personal Information with safe fallbacks
    employeeId: initialProfile?.employeeId || 'FAC001234',
    firstName: initialProfile?.firstName || parseName(initialProfile?.name || 'Dr. Priya Sharma').firstName,
    lastName: initialProfile?.lastName || parseName(initialProfile?.name || 'Dr. Priya Sharma').lastName,
    title: initialProfile?.title || 'Dr.',
    email: initialProfile?.email || 'faculty@srmap.edu.in',
    phone: initialProfile?.phone || '+91 9876543210',
    alternatePhone: initialProfile?.alternatePhone,
    dateOfBirth: initialProfile?.dateOfBirth || '1980-05-15',
    gender: initialProfile?.gender || 'Not Specified',
    nationality: initialProfile?.nationality || 'Indian',
    bloodGroup: initialProfile?.bloodGroup || 'Not Specified',
    
    // Address Information with defaults
    permanentAddress: initialProfile?.permanentAddress || {
      street: 'Faculty Housing, University Campus',
      city: 'Amaravati',
      state: 'Andhra Pradesh',
      pincode: '522502',
      country: 'India'
    },
    currentAddress: initialProfile?.currentAddress || {
      street: 'Faculty Housing, University Campus',
      city: 'Amaravati',
      state: 'Andhra Pradesh',
      pincode: '522502',
      country: 'India'
    },
    
    // Academic Information with safe defaults
    department: initialProfile?.department || 'Computer Science & Engineering',
    school: initialProfile?.school || 'School of Engineering & Technology',
    designation: initialProfile?.designation || 'Associate Professor',
    joiningDate: initialProfile?.joiningDate || '2018-07-15',
    experience: initialProfile?.experience || 12,
    employmentType: initialProfile?.employmentType || 'Full-time',
    
    // Educational Qualifications with safe arrays
    qualifications: initialProfile?.qualifications || [
      {
        degree: 'Ph.D',
        specialization: 'Machine Learning',
        university: 'Indian Institute of Technology, Madras',
        year: 2015,
        grade: 'First Class'
      }
    ],
    
    // Professional Experience with safe arrays
    previousExperience: initialProfile?.previousExperience || [],
    
    // Research & Publications with safe arrays
    researchAreas: initialProfile?.researchAreas || ['Machine Learning', 'Artificial Intelligence'],
    publications: initialProfile?.publications || [],
    researchProjects: initialProfile?.researchProjects || [],
    patents: initialProfile?.patents || [],
    
    // Teaching Information with safe defaults
    coursesTeaching: initialProfile?.coursesTeaching || [
      {
        courseCode: 'CS301',
        courseName: 'Machine Learning',
        level: 'UG',
        credits: 4,
        semester: 'Odd'
      }
    ],
    teachingLoad: initialProfile?.teachingLoad || 12,
    studentsSupervised: initialProfile?.studentsSupervised || {
      phd: 5,
      masters: 8,
      undergraduate: 15
    },
    
    // Skills and Expertise with safe arrays
    technicalSkills: initialProfile?.technicalSkills || ['Python', 'Machine Learning', 'Data Science'],
    softwareTools: initialProfile?.softwareTools || ['Jupyter', 'Git', 'Docker'],
    languages: initialProfile?.languages || [
      { language: 'English', proficiency: 'Native' },
      { language: 'Hindi', proficiency: 'Fluent' }
    ],
    certifications: initialProfile?.certifications || [],
    
    // Achievements & Recognition with safe arrays
    awards: initialProfile?.awards || [
      {
        title: 'Young Faculty Research Excellence Award',
        organization: 'SRM University AP',
        year: 2023,
        description: 'For outstanding research contributions'
      }
    ],
    memberships: initialProfile?.memberships || [],
    editorialRoles: initialProfile?.editorialRoles || [],
    
    // Administrative Roles with safe arrays
    administrativeRoles: initialProfile?.administrativeRoles || [],
    
    // Training & Development with safe arrays
    workshops: initialProfile?.workshops || [],
    conferences: initialProfile?.conferences || [],
    
    // Budget & Resources with safe defaults
    budgetAllocated: initialProfile?.budgetAllocated || 5000000,
    budgetUtilized: initialProfile?.budgetUtilized || 3200000,
    labsManaged: initialProfile?.labsManaged || ['Research Lab'],
    
    // Performance Metrics with safe defaults
    teachingRating: initialProfile?.teachingRating || 4.8,
    researchImpact: initialProfile?.researchImpact || 8.7,
    publicationCount: initialProfile?.publicationCount || 25,
    citationCount: initialProfile?.citationCount || 456,
    
    // Social Links with safe fallbacks
    linkedin: initialProfile?.linkedin,
    googleScholar: initialProfile?.googleScholar,
    researchGate: initialProfile?.researchGate,
    orcid: initialProfile?.orcid,
    
    // Emergency Contact with safe defaults
    emergencyContact: initialProfile?.emergencyContact || {
      name: 'Emergency Contact',
      relationship: 'Family',
      phone: '+91 9876543213'
    },
    
    // Profile completion
    profileCompletion: initialProfile?.profileCompletion || 95,
    lastUpdated: initialProfile?.lastUpdated || '2024-01-15'
  };

  const [faculty, setFaculty] = useState<FacultyProfile>(safeFaculty);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Faculty profile saved:', faculty);
  };

  const handleProfileEdit = () => {
    navigateTo('profile-edit', faculty, 'Edit Faculty Profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Faculty Profile</h1>
              <p className="text-slate-600">Manage your academic and professional information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleProfileEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate CV
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {getInitials(faculty.firstName, faculty.lastName)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{faculty.title} {faculty.firstName} {faculty.lastName}</h2>
                  <p className="text-slate-600">{faculty.designation} • {faculty.employeeId}</p>
                  <p className="text-slate-500">{faculty.department}</p>
                  <p className="text-slate-500">{faculty.school}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {faculty.experience} Years Experience
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {faculty.publicationCount} Publications
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      {faculty.employmentType}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-slate-800">{faculty.profileCompletion}%</div>
                  <div className="text-sm text-slate-600">Profile Complete</div>
                  <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${faculty.profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{faculty.teachingRating}</div>
                    <div className="text-xs text-slate-600">Teaching Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{faculty.researchImpact}</div>
                    <div className="text-xs text-slate-600">Research Impact</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{faculty.citationCount}</div>
                    <div className="text-xs text-slate-600">Citations</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{faculty.studentsSupervised.phd + faculty.studentsSupervised.masters}</div>
                    <div className="text-xs text-slate-600">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-slate-800">{faculty.coursesTeaching.length}</div>
              <div className="text-sm text-slate-600">Courses Teaching</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-slate-800">{Object.values(faculty.studentsSupervised).reduce((a, b) => a + b, 0)}</div>
              <div className="text-sm text-slate-600">Students Supervised</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-slate-800">{faculty.awards.length}</div>
              <div className="text-sm text-slate-600">Awards Received</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-slate-800">{faculty.labsManaged.length}</div>
              <div className="text-sm text-slate-600">Labs Managed</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-white border border-primary/20 mb-6">
            <TabsTrigger value="personal" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Personal</TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Academic</TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Research</TabsTrigger>
            <TabsTrigger value="teaching" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Teaching</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Achievements</TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <User className="w-5 h-5 mr-2" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Name:</strong> {faculty.title} {faculty.firstName} {faculty.lastName}</div>
                    <div><strong>Employee ID:</strong> {faculty.employeeId}</div>
                    <div><strong>Email:</strong> {faculty.email}</div>
                    <div><strong>Phone:</strong> {faculty.phone}</div>
                    <div><strong>Date of Birth:</strong> {faculty.dateOfBirth}</div>
                    <div><strong>Blood Group:</strong> {faculty.bloodGroup}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div><strong>Department:</strong> {faculty.department}</div>
                    <div><strong>School:</strong> {faculty.school}</div>
                    <div><strong>Designation:</strong> {faculty.designation}</div>
                    <div><strong>Joining Date:</strong> {faculty.joiningDate}</div>
                    <div><strong>Experience:</strong> {faculty.experience} years</div>
                    <div><strong>Employment Type:</strong> {faculty.employmentType}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Educational Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faculty.qualifications.map((qual, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div><strong>{qual.degree}</strong></div>
                        <div>{qual.specialization}</div>
                        <div>{qual.university}</div>
                        <div>{qual.year} • {qual.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Research Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {faculty.researchAreas.map((area, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">{area}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Research Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{faculty.publicationCount}</div>
                      <div className="text-sm text-slate-600">Publications</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{faculty.citationCount}</div>
                      <div className="text-sm text-slate-600">Citations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {faculty.publications.length > 0 && (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Recent Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.publications.slice(0, 3).map((pub, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-slate-800">{pub.title}</h4>
                        <p className="text-sm text-slate-600">{pub.journal} • {pub.year}</p>
                        <p className="text-xs text-slate-500">Authors: {pub.authors.join(', ')}</p>
                        {pub.citations && <p className="text-xs text-slate-500">Citations: {pub.citations}</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="teaching" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Teaching Load</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{faculty.teachingLoad}</div>
                  <div className="text-slate-600">Hours per week</div>
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-800">{faculty.teachingRating}/5.0</div>
                    <div className="text-sm text-slate-600">Student Rating</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Students Supervised</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{faculty.studentsSupervised.phd}</div>
                      <div className="text-sm text-slate-600">PhD</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{faculty.studentsSupervised.masters}</div>
                      <div className="text-sm text-slate-600">Masters</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{faculty.studentsSupervised.undergraduate}</div>
                      <div className="text-sm text-slate-600">UG</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Current Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faculty.coursesTeaching.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-slate-800">{course.courseName}</div>
                        <div className="text-sm text-slate-600">{course.courseCode} • {course.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-slate-800">{course.credits} Credits</div>
                        <div className="text-sm text-slate-600">{course.semester} Semester</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Awards & Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faculty.awards.map((award, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="font-medium text-slate-800">{award.title}</div>
                        <div className="text-sm text-slate-600">{award.organization} • {award.year}</div>
                        <div className="text-xs text-slate-500 mt-1">{award.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {faculty.memberships.length > 0 && (
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Professional Memberships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {faculty.memberships.map((membership, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <div className="font-medium text-slate-800">{membership.organization}</div>
                            <div className="text-sm text-slate-600">Since {membership.since}</div>
                          </div>
                          <Badge variant="outline">{membership.membershipType}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Allocated</span>
                      <span className="font-bold">₹{(faculty.budgetAllocated / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Utilized</span>
                      <span className="font-bold">₹{(faculty.budgetUtilized / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                        style={{ width: `${(faculty.budgetUtilized / faculty.budgetAllocated) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {faculty.administrativeRoles.length > 0 && (
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Administrative Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {faculty.administrativeRoles.map((role, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-medium text-slate-800">{role.position}</div>
                          <div className="text-sm text-slate-600">{role.department}</div>
                          <div className="text-xs text-slate-500">{role.duration}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};