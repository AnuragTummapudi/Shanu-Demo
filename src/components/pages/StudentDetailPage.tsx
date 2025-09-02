import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PageHeader } from '../common/PageHeader';
import { RaiseTicketModal } from '../common/RaiseTicketModal';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  GraduationCap,
  Award,
  Briefcase,
  Code,
  TrendingUp,
  BookOpen,
  Star,
  Edit,
  Download,
  MessageSquare,
  ExternalLink,
  Target,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  EnhancedLineChart, 
  EnhancedBarChart,
  EnhancedPieChart,
  AnimatedCounter,
  GradientProgressRing
} from '../common/AdvancedCharts';
import { Student } from '../types';

interface StudentDetailPageProps {
  student: Student;
}

const performanceData = [
  { semester: 'Sem 1', cgpa: 7.2, percentage: 72 },
  { semester: 'Sem 2', cgpa: 7.8, percentage: 78 },
  { semester: 'Sem 3', cgpa: 8.1, percentage: 81 },
  { semester: 'Sem 4', cgpa: 8.3, percentage: 83 },
  { semester: 'Sem 5', cgpa: 8.5, percentage: 85 },
  { semester: 'Sem 6', cgpa: 8.6, percentage: 86 },
  { semester: 'Sem 7', cgpa: 8.5, percentage: 85 }
];

const skillsData = [
  { name: 'Technical Skills', value: 8.5, color: '#4f46e5' },
  { name: 'Communication', value: 7.8, color: '#6366f1' },
  { name: 'Problem Solving', value: 9.0, color: '#8b5cf6' },
  { name: 'Teamwork', value: 8.2, color: '#06b6d4' }
];

const applicationHistory = [
  {
    id: 1,
    company: 'TechMahindra Solutions',
    position: 'Frontend Developer',
    appliedDate: '2025-01-10',
    status: 'shortlisted',
    stage: 'Technical Interview',
    progress: 60
  },
  {
    id: 2,
    company: 'Infosys Limited',
    position: 'Software Engineering Intern',
    appliedDate: '2025-01-08',
    status: 'applied',
    stage: 'Application Review',
    progress: 25
  },
  {
    id: 3,
    company: 'Wipro Technologies',
    position: 'Full Stack Developer',
    appliedDate: '2025-01-05',
    status: 'selected',
    stage: 'Offer Received',
    progress: 100
  }
];

export const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ student }) => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('');

  // Ensure student object has default values for required properties
  const safeStudent = {
    ...student,
    socialLinks: student.socialLinks || {},
    projects: student.projects || [],
    skills: student.skills || [],
    education: student.education || [],
    certifications: student.certifications || [],
    achievements: student.achievements || [],
    languages: student.languages || [],
    experience: student.experience || [],
    profileCompleted: student.profileCompleted || 0
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'info-light';
      case 'shortlisted': return 'warning-light';
      case 'selected': return 'success-light';
      case 'rejected': return 'error-light';
      default: return 'info-light';
    }
  };

  const performanceKeys = [
    { key: 'cgpa', name: 'CGPA', color: '#4f46e5' },
    { key: 'percentage', name: 'Percentage', color: '#10b981' }
  ];

  const skillKeys = [
    { key: 'value', name: 'Rating', color: '#4f46e5' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title={safeStudent.name}
        description={`${safeStudent.department} • ${safeStudent.batch} • CGPA: ${safeStudent.cgpa}`}
        actions={
          <div className="flex items-center space-x-2">
            <RaiseTicketModal 
              userEmail="current.user@university.edu.in"
              userRole="faculty"
              userName="Current User"
            />
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        }
      />

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={safeStudent.cgpa} suffix="" />
                </div>
                <div className="text-sm text-slate-600">Current CGPA</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={safeStudent.semester} />
                </div>
                <div className="text-sm text-slate-600">Current Semester</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={safeStudent.projects.length} />
                </div>
                <div className="text-sm text-slate-600">Projects</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={safeStudent.skills.length} />
                </div>
                <div className="text-sm text-slate-600">Skills</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={student.profileCompleted} suffix="%" />
                </div>
                <div className="text-sm text-slate-600">Profile Complete</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-primary/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Overview</TabsTrigger>
            <TabsTrigger value="academics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Academics</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Skills</TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Applications</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Documents</TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/api/placeholder/80/80" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {safeStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-slate-800">{safeStudent.name}</CardTitle>
                      <CardDescription className="text-lg">{safeStudent.department}</CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{safeStudent.rollNo}</Badge>
                        <Badge variant="outline">{safeStudent.batch}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-3 text-primary" />
                        <a href={`mailto:${safeStudent.email}`} className="text-primary hover:underline">
                          {safeStudent.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Phone className="w-4 h-4 mr-3 text-primary" />
                        {safeStudent.phone}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-3 text-primary" />
                        Born: {safeStudent.dateOfBirth}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-3 text-primary mt-0.5" />
                        <span>{student.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800">Family Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Father: </span>
                        <span className="text-slate-800">{student.fatherName}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Mother: </span>
                        <span className="text-slate-800">{student.motherName}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Completion & Quick Actions */}
              <div className="space-y-6">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Profile Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-4">
                      <GradientProgressRing 
                        progress={safeStudent.profileCompleted} 
                        size={120}
                        strokeWidth={10}
                      >
                        <div className="text-center">
                          <div className="text-xl font-bold text-slate-800">
                            <AnimatedCounter value={safeStudent.profileCompleted} suffix="%" />
                          </div>
                          <div className="text-xs text-slate-600">Complete</div>
                        </div>
                      </GradientProgressRing>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      onClick={() => navigateTo('profile-edit', safeStudent, 'Edit Profile')}
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Resume
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                      <Target className="w-4 h-4 mr-2" />
                      Set Goals
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Social Links & Languages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {student.socialLinks?.linkedin && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">LinkedIn</span>
                      <a 
                        href={student.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        View Profile <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {student.socialLinks?.github && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">GitHub</span>
                      <a 
                        href={student.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        View Profile <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {student.socialLinks?.portfolio && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Portfolio</span>
                      <a 
                        href={student.socialLinks.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        View Portfolio <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {!student.socialLinks || (!student.socialLinks.linkedin && !student.socialLinks.github && !student.socialLinks.portfolio) && (
                    <div className="text-center text-slate-500 py-4">
                      <p className="text-sm">No social links available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {student.languages && student.languages.length > 0 ? (
                    student.languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-slate-800">{lang.language}</span>
                        <Badge variant="outline" className="text-xs">
                          {lang.proficiency}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-4">
                      <p className="text-sm">No languages specified</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            {/* Academic Performance Chart */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-800">Academic Performance</CardTitle>
                <CardDescription>Semester-wise CGPA and percentage trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <EnhancedLineChart 
                    data={performanceData}
                    dataKeys={performanceKeys}
                    height={300}
                    showArea={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Education History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.education && student.education.length > 0 ? (
                    student.education.map((edu, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-purple-600/5 border border-primary/10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-slate-800">{edu.degree}</h4>
                            <p className="text-slate-600 text-sm">{edu.institution}</p>
                            <p className="text-slate-500 text-sm">{edu.year}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-slate-800">{edu.percentage}%</div>
                            <div className="text-sm text-slate-600">Score</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-4">
                      <p className="text-sm">No education history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Certifications & Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.certifications && student.certifications.length > 0 ? (
                    student.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{cert.name}</h4>
                          <p className="text-slate-600 text-sm">{cert.issuer}</p>
                          <p className="text-slate-500 text-sm">{cert.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-4">
                      <p className="text-sm">No certifications available</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-slate-800 mb-3">Achievements</h4>
                    <div className="space-y-2">
                      {student.achievements && student.achievements.length > 0 ? (
                        student.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{achievement}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-slate-500 py-2">
                          <p className="text-xs">No achievements listed</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.skills && student.skills.length > 0 ? (
                      student.skills.map((skill, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-primary/20">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <div className="text-center text-slate-500 py-4 w-full">
                        <p className="text-sm">No technical skills listed</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Assessment */}
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Skill Assessment</CardTitle>
                  <CardDescription>Based on projects and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <EnhancedBarChart 
                      data={skillsData}
                      dataKeys={skillKeys}
                      height={240}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-800">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {student.projects && student.projects.length > 0 ? (
                    student.projects.map((project, index) => (
                      <div key={index} className="p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-slate-800">{project.title}</h4>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies && project.technologies.length > 0 && (
                            project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-8 col-span-2">
                      <p className="text-sm">No projects available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Work Experience */}
            {student.experience && student.experience.length > 0 && (
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.experience.map((exp, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-purple-600/5 border border-primary/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-slate-800">{exp.position}</h4>
                          <p className="text-primary">{exp.company}</p>
                        </div>
                        <div className="text-sm text-slate-600">{exp.duration}</div>
                      </div>
                      <p className="text-slate-600 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {applicationHistory.map((app) => (
                <Card key={app.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-slate-800">{app.position}</h4>
                        <p className="text-slate-600 text-sm">{app.company}</p>
                        <p className="text-slate-500 text-xs">Applied: {app.appliedDate}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-slate-800">{app.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        {app.status === 'shortlisted' ? (
                          <Clock className="w-4 h-4 text-warning" />
                        ) : app.status === 'selected' ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <Clock className="w-4 h-4 text-info" />
                        )}
                        <span className="text-slate-600">{app.stage}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Resume.pdf', type: 'PDF', size: '245 KB', status: 'uploaded' },
                { name: 'Academic Transcript', type: 'PDF', size: '1.2 MB', status: 'uploaded' },
                { name: 'Portfolio Link', type: 'Link', size: '-', status: 'active' },
                { name: 'Cover Letter.docx', type: 'DOC', size: '89 KB', status: 'uploaded' }
              ].map((doc, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 truncate">{doc.name}</h4>
                        <p className="text-sm text-slate-600">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3 border-primary/20 text-primary hover:bg-primary/5">
                      <Download className="w-3 h-3 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-800">Faculty Notes</CardTitle>
                  <Button onClick={() => console.log('Saving notes:', notes)}>
                    Save Notes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-64 p-4 border border-primary/20 rounded-lg resize-none"
                  placeholder="Add your observations, feedback, or notes about this student..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};