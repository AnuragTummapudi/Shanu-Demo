import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, User, Edit, Save, X, FileText, GraduationCap, Award, Briefcase, Target, TrendingUp } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { Student } from '../types';

interface StudentProfilePageProps {
  student?: Student | any;
}

// Helper function to safely parse name into first and last name
const parseName = (fullName: string = '') => {
  const nameParts = fullName.trim().split(' ');
  return {
    firstName: nameParts[0] || 'Student',
    lastName: nameParts.slice(1).join(' ') || 'Name'
  };
};

// Helper function to safely get initials
const getInitials = (fullName: string = '') => {
  const { firstName, lastName } = parseName(fullName);
  return `${firstName[0] || 'S'}${lastName[0] || 'N'}`;
};

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ student: initialStudent }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Safely handle student data with fallbacks
  const safeStudent = {
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
    
    // Skills and Experience with safe arrays
    technicalSkills: initialStudent?.technicalSkills || initialStudent?.skills || ['Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB', 'AWS'],
    softSkills: initialStudent?.softSkills || ['Leadership', 'Communication', 'Team Work', 'Problem Solving', 'Time Management'],
    projects: initialStudent?.projects || [
      {
        title: 'E-commerce Platform with AI Recommendations',
        description: 'Built a full-stack e-commerce platform with personalized product recommendations using machine learning algorithms.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'TensorFlow'],
        duration: '6 months'
      }
    ],
    internships: initialStudent?.internships || initialStudent?.experience || [
      {
        company: 'TCS Digital',
        position: 'Software Engineering Intern',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Worked on developing microservices for a large-scale banking application using Spring Boot and Docker.'
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
    
    // Social Links with safe fallbacks
    linkedin: initialStudent?.socialLinks?.linkedin || initialStudent?.linkedin || 'https://linkedin.com/in/sumanth-bolisetty',
    github: initialStudent?.socialLinks?.github || initialStudent?.github || 'https://github.com/sumanth-bolisetty',
    portfolio: initialStudent?.socialLinks?.portfolio || initialStudent?.portfolio || 'https://sumanth-portfolio.com',
    
    // Profile completion
    profileCompletion: initialStudent?.profileCompletion || initialStudent?.profileCompleted || 92,
    lastUpdated: initialStudent?.lastUpdated || '2024-01-15'
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', safeStudent);
  };

  const handleResumeBuilder = () => {
    navigateTo('resume-builder', safeStudent, 'Resume Builder');
  };

  const handleProfileEdit = () => {
    navigateTo('profile-edit', safeStudent, 'Edit Profile');
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
              <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>
              <p className="text-slate-600">Manage your academic and personal information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleProfileEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button onClick={handleResumeBuilder}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Resume
            </Button>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {getInitials(safeStudent.name)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{safeStudent.firstName} {safeStudent.lastName}</h2>
                  <p className="text-slate-600">{safeStudent.rollNumber} • {safeStudent.course}</p>
                  <p className="text-slate-500">{safeStudent.school}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Semester {safeStudent.currentSemester}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      CGPA: {safeStudent.cgpa}
                    </Badge>
                    <Badge className={`${
                      safeStudent.placementStatus === 'Placed' ? 'bg-green-100 text-green-800' :
                      safeStudent.placementStatus === 'Active' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {safeStudent.placementStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-slate-800">{safeStudent.profileCompletion}%</div>
                  <div className="text-sm text-slate-600">Profile Complete</div>
                  <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${safeStudent.profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{safeStudent.appliedJobs}</div>
                    <div className="text-xs text-slate-600">Applied</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{safeStudent.interviewsAttended}</div>
                    <div className="text-xs text-slate-600">Interviews</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{safeStudent.offersReceived}</div>
                    <div className="text-xs text-slate-600">Offers</div>
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
              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-slate-800">{safeStudent.cgpa}</div>
              <div className="text-sm text-slate-600">Current CGPA</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-slate-800">{safeStudent.projects.length}</div>
              <div className="text-sm text-slate-600">Projects Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-slate-800">{safeStudent.technicalSkills.length}</div>
              <div className="text-sm text-slate-600">Technical Skills</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-slate-800">{safeStudent.internships.length}</div>
              <div className="text-sm text-slate-600">Internships Done</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white border border-primary/20 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Overview</TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Academic</TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Experience</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Skills</TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Career</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Name:</strong> {safeStudent.firstName} {safeStudent.lastName}</div>
                    <div><strong>Roll Number:</strong> {safeStudent.rollNumber}</div>
                    <div><strong>Email:</strong> {safeStudent.email}</div>
                    <div><strong>Phone:</strong> {safeStudent.phone}</div>
                    <div><strong>Date of Birth:</strong> {safeStudent.dateOfBirth}</div>
                    <div><strong>Blood Group:</strong> {safeStudent.bloodGroup}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Academic Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div><strong>Course:</strong> {safeStudent.course}</div>
                    <div><strong>Department:</strong> {safeStudent.department}</div>
                    <div><strong>School:</strong> {safeStudent.school}</div>
                    <div><strong>Batch:</strong> {safeStudent.batch}</div>
                    <div><strong>Current Semester:</strong> {safeStudent.currentSemester}</div>
                    <div><strong>CGPA:</strong> {safeStudent.cgpa}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Career Objective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{safeStudent.careerObjective}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Current Academic Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{safeStudent.cgpa}</div>
                    <div className="text-slate-600">Current CGPA</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{safeStudent.currentSemester}</div>
                    <div className="text-slate-600">Current Semester</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{safeStudent.batch}</div>
                    <div className="text-slate-600">Batch</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {safeStudent.projects.map((project, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-2">{project.title}</h4>
                      <p className="text-slate-700 mb-3">{project.description}</p>
                      <div className="mb-3">
                        <div className="text-sm font-medium text-slate-700 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies?.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">Duration: {project.duration}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Internships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeStudent.internships.map((internship, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">{internship.position}</h4>
                          <p className="text-slate-600">{internship.company}</p>
                          <p className="text-sm text-slate-500">{internship.duration}</p>
                        </div>
                      </div>
                      <p className="text-slate-700">{internship.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {safeStudent.technicalSkills.map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {safeStudent.softSkills.map((skill, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Preferred Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {safeStudent.preferredRoles.map((role, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Preferred Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {safeStudent.preferredIndustries.map((industry, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Salary Expectations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ₹{(safeStudent.expectedSalary.min / 100000).toFixed(1)}L - ₹{(safeStudent.expectedSalary.max / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-slate-600">Per Annum</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Preferred Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {safeStudent.preferredLocations.map((location, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Social Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {safeStudent.linkedin && (
                    <a href={safeStudent.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="font-medium text-slate-800">LinkedIn</div>
                      <div className="text-sm text-slate-600 truncate">{safeStudent.linkedin}</div>
                    </a>
                  )}
                  {safeStudent.github && (
                    <a href={safeStudent.github} target="_blank" rel="noopener noreferrer"
                       className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="font-medium text-slate-800">GitHub</div>
                      <div className="text-sm text-slate-600 truncate">{safeStudent.github}</div>
                    </a>
                  )}
                  {safeStudent.portfolio && (
                    <a href={safeStudent.portfolio} target="_blank" rel="noopener noreferrer"
                       className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="font-medium text-slate-800">Portfolio</div>
                      <div className="text-sm text-slate-600 truncate">{safeStudent.portfolio}</div>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};