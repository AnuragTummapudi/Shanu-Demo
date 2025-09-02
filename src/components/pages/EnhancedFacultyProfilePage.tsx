import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Save, 
  X, 
  FileText, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Target, 
  TrendingUp,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Camera,
  Plus,
  Eye,
  Download,
  Share2,
  Settings,
  ChevronRight,
  Activity,
  BarChart3,
  PieChart,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Presentation,
  UserCheck,
  Coffee,
  Video,
  MessageSquare
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { motion, AnimatePresence } from 'motion/react';

interface EnhancedFacultyProfilePageProps {
  faculty?: any;
}

const MetricCard = ({ label, value, icon: Icon, color, subtitle, trend }: any) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className={`p-6 rounded-xl bg-gradient-to-br ${color} border-0 shadow-lg relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 opacity-10">
      <Icon className="w-16 h-16" />
    </div>
    <div className="relative">
      <Icon className={`w-8 h-8 mb-3 ${color.includes('blue') ? 'text-blue-600' : 
                       color.includes('green') ? 'text-green-600' :
                       color.includes('purple') ? 'text-purple-600' : 
                       color.includes('orange') ? 'text-orange-600' : 'text-indigo-600'}`} />
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-2">{label}</div>
      {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
      {trend && (
        <div className={`text-xs flex items-center mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-3 h-3 mr-1" />
          {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
        </div>
      )}
    </div>
  </motion.div>
);

const CourseCard = ({ course, students, completion, rating }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="font-semibold text-slate-800 text-lg mb-1">{course}</h4>
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {students} students
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {rating}
          </span>
        </div>
      </div>
      <Badge className={`${
        completion >= 90 ? 'bg-green-100 text-green-800' :
        completion >= 70 ? 'bg-blue-100 text-blue-800' :
        'bg-orange-100 text-orange-800'
      }`}>
        {completion}% Complete
      </Badge>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Course Progress</span>
        <span>{completion}%</span>
      </div>
      <Progress value={completion} className="h-2" />
    </div>
  </motion.div>
);

const AchievementBadge = ({ title, icon: Icon, description, earned = true, date }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-4 rounded-xl border-2 ${
      earned 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
        : 'bg-slate-50 border-slate-200 opacity-60'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${earned ? 'bg-yellow-500' : 'bg-slate-400'}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <h4 className={`font-medium ${earned ? 'text-slate-800' : 'text-slate-500'}`}>{title}</h4>
        <p className={`text-xs ${earned ? 'text-slate-600' : 'text-slate-400'}`}>{description}</p>
        {earned && date && (
          <p className="text-xs text-slate-500 mt-1">{date}</p>
        )}
      </div>
    </div>
  </motion.div>
);

export const EnhancedFacultyProfilePage: React.FC<EnhancedFacultyProfilePageProps> = ({ faculty: initialFaculty }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock faculty data with comprehensive information
  const facultyData = {
    // Personal Information
    name: initialFaculty?.name || 'Dr. Lakshmi Venkatesh',
    title: initialFaculty?.title || 'Associate Professor',
    employeeId: initialFaculty?.employeeId || 'FAC2024001',
    email: initialFaculty?.email || 'dr.lakshmi@srmap.edu.in',
    phone: initialFaculty?.phone || '+91 9876543210',
    department: initialFaculty?.department || 'Computer Science & Engineering',
    school:  initialFaculty?.school || 'School of Engineering & Technology',
    office: initialFaculty?.office || 'Block A, Room 301',
    joinDate: initialFaculty?.joinDate || '2018-07-15',
    
    // Academic Qualifications
    qualifications: [
      { degree: 'Ph.D.', field: 'Computer Science', university: 'IIT Bombay', year: '2016' },
      { degree: 'M.Tech.', field: 'Software Engineering', university: 'NIT Warangal', year: '2012' },
      { degree: 'B.Tech.', field: 'Computer Science', university: 'JNTU Hyderabad', year: '2010' }
    ],
    
    // Teaching & Research
    experience: 8,
    coursesTeaching: [
      { name: 'Data Structures & Algorithms', students: 120, completion: 85, rating: 4.8 },
      { name: 'Machine Learning Fundamentals', students: 80, completion: 92, rating: 4.9 },
      { name: 'Software Engineering', students: 95, completion: 78, rating: 4.6 },
      { name: 'Advanced Java Programming', students: 65, completion: 88, rating: 4.7 }
    ],
    
    researchInterests: [
      'Machine Learning',
      'Natural Language Processing',
      'Deep Learning',
      'Computer Vision',
      'Data Mining'
    ],
    
    publications: 42,
    citations: 1250,
    hIndex: 18,
    patents: 3,
    
    // Recent Publications
    recentPublications: [
      {
        title: 'Deep Learning Approaches for Natural Language Understanding',
        journal: 'IEEE Transactions on Neural Networks',
        year: '2024',
        citations: 23,
        type: 'Journal'
      },
      {
        title: 'Automated Code Review using Machine Learning Techniques',
        conference: 'International Conference on Software Engineering',
        year: '2023',
        citations: 45,
        type: 'Conference'
      }
    ],
    
    // Research Projects
    currentProjects: [
      {
        title: 'AI-Powered Educational Assessment System',
        fundingAgency: 'DST-SERB',
        amount: '₹15,00,000',
        duration: '2023-2026',
        status: 'Ongoing',
        progress: 65
      },
      {
        title: 'Smart Campus Infrastructure using IoT',
        fundingAgency: 'AICTE',
        amount: '₹8,50,000',
        duration: '2022-2024',
        status: 'Ongoing',
        progress: 85
      }
    ],
    
    // Teaching Metrics
    totalStudentsTaught: 2500,
    currentSemesterStudents: 360,
    averageRating: 4.7,
    satisfactionRate: 94,
    
    // Achievements & Recognition
    awards: [
      { title: 'Best Faculty Award', year: '2023', organization: 'SRM University AP' },
      { title: 'Excellence in Research', year: '2022', organization: 'IEEE' },
      { title: 'Outstanding Teaching Award', year: '2021', organization: 'AICTE' }
    ],
    
    // Professional Activities
    editorialRoles: [
      'Associate Editor - Journal of Computer Science Education',
      'Reviewer - IEEE Transactions on Learning Technologies'
    ],
    
    conferenceRoles: [
      'Program Committee Member - ICSE 2024',
      'Session Chair - AAAI 2023'
    ],
    
    // Student Supervision
    phdStudents: { current: 8, graduated: 12 },
    mtechStudents: { current: 15, graduated: 28 },
    
    // Office Hours & Availability
    officeHours: [
      { day: 'Monday', time: '2:00 PM - 4:00 PM' },
      { day: 'Wednesday', time: '10:00 AM - 12:00 PM' },
      { day: 'Friday', time: '3:00 PM - 5:00 PM' }
    ],
    
    // Social Links
    linkedin: 'https://linkedin.com/in/dr-lakshmi-venkatesh',
    googleScholar: 'https://scholar.google.com/lakshmi-venkatesh',
    researchGate: 'https://researchgate.net/lakshmi-venkatesh',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    
    profileCompletion: 96,
    lastUpdated: '2024-01-20'
  };

  const achievements = [
    { title: 'Research Excellence', icon: Award, description: '40+ publications', earned: true, date: 'Dec 2023' },
    { title: 'Teaching Champion', icon: GraduationCap, description: '4.7+ rating consistently', earned: true, date: 'Nov 2023' },
    { title: 'Innovation Leader', icon: Target, description: '3 patents filed', earned: true, date: 'Sep 2023' },
    { title: 'Mentor Extraordinaire', icon: Users, description: '50+ students guided', earned: true, date: 'Aug 2023' },
    { title: 'Conference Speaker', icon: Presentation, description: '20+ keynotes delivered', earned: true, date: 'Jul 2023' },
    { title: 'Industry Collaborator', icon: Briefcase, description: 'Active industry partnerships', earned: false }
  ];

  const handleProfileEdit = () => {
    navigateTo('profile-edit', facultyData, 'Edit Profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header with Academic Cover */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30m-10 0a10,10 0 1,1 20,0a10,10 0 1,1 -20,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-7xl mx-auto p-6 h-full flex items-end">
          <div className="flex items-center space-x-4 w-full">
            <Button 
              variant="secondary" 
              onClick={goBack} 
              className="bg-white/90 hover:bg-white text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white"
              >
                Faculty Profile
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90"
              >
                Academic excellence and research leadership
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="secondary" className="bg-white/90 hover:bg-white text-slate-800">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="secondary" onClick={handleProfileEdit} className="bg-white/90 hover:bg-white text-slate-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 -mt-24 relative z-10">
        {/* Enhanced Profile Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl border-0 mb-8 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                {/* Enhanced Avatar */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-3xl">
                      {facultyData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{facultyData.name}</h2>
                    <p className="text-lg text-slate-600">{facultyData.title}</p>
                    <p className="text-slate-500">{facultyData.department} • {facultyData.school}</p>
                    <p className="text-sm text-slate-500">Employee ID: {facultyData.employeeId}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {facultyData.experience} Years Experience
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      {facultyData.averageRating} Rating
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {facultyData.publications} Publications
                    </Badge>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    {facultyData.linkedin && (
                      <a href={facultyData.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                    {facultyData.googleScholar && (
                      <a href={facultyData.googleScholar} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        <GraduationCap className="w-4 h-4 text-red-600" />
                      </a>
                    )}
                    {facultyData.researchGate && (
                      <a href={facultyData.researchGate} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        <Globe className="w-4 h-4 text-green-600" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Profile Completion & Stats */}
              <div className="text-right space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-slate-800 mb-1">{facultyData.profileCompletion}%</div>
                  <div className="text-sm text-slate-600 mb-3">Profile Complete</div>
                  <Progress value={facultyData.profileCompletion} className="w-32 h-3" />
                </div>
                
                {/* Research Impact */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">{facultyData.hIndex}</div>
                    <div className="text-xs text-slate-600">H-Index</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-xl font-bold text-red-600">{facultyData.citations}</div>
                    <div className="text-xs text-slate-600">Citations</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{facultyData.patents}</div>
                    <div className="text-xs text-slate-600">Patents</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{facultyData.satisfactionRate}%</div>
                    <div className="text-xs text-slate-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            label="Students Taught"
            value={facultyData.totalStudentsTaught.toLocaleString()}
            subtitle="Lifetime impact"
            icon={Users}
            color="from-blue-50 to-cyan-50"
            trend={8.5}
          />
          <MetricCard
            label="Research Publications"
            value={facultyData.publications}
            subtitle="Peer-reviewed articles"
            icon={BookOpen}
            color="from-green-50 to-emerald-50"
            trend={12.3}
          />
          <MetricCard
            label="Active Projects"
            value={facultyData.currentProjects.length}
            subtitle="Ongoing research"
            icon={Target}
            color="from-purple-50 to-pink-50"
            trend={5.7}
          />
          <MetricCard
            label="Teaching Rating"
            value={`${facultyData.averageRating}/5.0`}
            subtitle="Student feedback"
            icon={Star}
            color="from-orange-50 to-red-50"
            trend={2.1}
          />
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-1 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="teaching" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <GraduationCap className="w-4 h-4 mr-2" />
              Teaching
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <BookOpen className="w-4 h-4 mr-2" />
              Research
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Award className="w-4 h-4 mr-2" />
              Achievements  
            </TabsTrigger>
            <TabsTrigger value="supervision" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <UserCheck className="w-4 h-4 mr-2" />
              Supervision
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Coffee className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Academic Qualifications */}
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                      Academic Qualifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {facultyData.qualifications.map((qual, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-primary">{qual.degree.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{qual.degree} in {qual.field}</h4>
                          <p className="text-sm text-slate-600">{qual.university}</p>
                          <p className="text-xs text-slate-500">{qual.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Research Interests */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      Research Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {facultyData.researchInterests.map((interest, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 px-3 py-1">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Professional Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Briefcase className="w-5 h-5 mr-2 text-primary" />
                      Professional Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">
                      {facultyData.name} is an accomplished academic with {facultyData.experience} years of experience in research and teaching. 
                      Specializing in {facultyData.researchInterests.slice(0, 3).join(', ')}, she has published {facultyData.publications} research papers 
                      and supervised numerous graduate students. Her work has been cited {facultyData.citations} times, reflecting the significant 
                      impact of her research contributions to the field.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="teaching" className="space-y-6">
              <motion.div
                key="teaching"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Current Courses */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center text-slate-800">
                        <BookOpen className="w-5 h-5 mr-2 text-primary" />
                        Current Courses ({facultyData.coursesTeaching.length})
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {facultyData.currentSemesterStudents} Total Students
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {facultyData.coursesTeaching.map((course, index) => (
                        <CourseCard
                          key={index}
                          course={course.name}
                          students={course.students}
                          completion={course.completion}
                          rating={course.rating}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Teaching Performance */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl">
                    <CardContent className="p-6 text-center">
                      <Star className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                      <div className="text-3xl font-bold text-slate-800 mb-1">{facultyData.averageRating}</div>
                      <div className="text-sm text-slate-600">Average Rating</div>
                      <div className="text-xs text-slate-500 mt-1">Out of 5.0</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
                      <div className="text-3xl font-bold text-slate-800 mb-1">{facultyData.satisfactionRate}%</div>
                      <div className="text-sm text-slate-600">Satisfaction Rate</div>
                      <div className="text-xs text-slate-500 mt-1">Student feedback</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                      <div className="text-3xl font-bold text-slate-800 mb-1">{facultyData.totalStudentsTaught.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Students Taught</div>
                      <div className="text-xs text-slate-500 mt-1">Career total</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>  
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Achievement Badges */}
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Star className="w-5 h-5 mr-2 text-yellow-600" />
                      Achievement Badges
                    </CardTitle>
                    <CardDescription>
                      Recognition for excellence in teaching, research, and service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => (
                        <AchievementBadge
                          key={index}
                          title={achievement.title}
                          icon={achievement.icon}
                          description={achievement.description}
                          earned={achievement.earned}
                          date={achievement.date}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Awards & Recognition */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Awards & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {facultyData.awards.map((award, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg"
                        >
                          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">{award.title}</h4>
                            <p className="text-sm text-slate-600">{award.organization}</p>
                            <p className="text-xs text-slate-500">{award.year}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Contact Information */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Mail className="w-5 h-5 mr-2 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                        <div className="font-medium text-slate-800">{facultyData.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                        <div className="font-medium text-slate-800">{facultyData.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Office</div>
                        <div className="font-medium text-slate-800">{facultyData.office}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Clock className="w-5 h-5 mr-2 text-green-600" />
                      Office Hours
                    </CardTitle>
                    <CardDescription>
                      Drop by for academic discussions and guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {facultyData.officeHours.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                          <span className="font-medium text-slate-800">{slot.day}</span>
                          <span className="text-sm text-slate-600">{slot.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200/50">
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Video className="w-4 h-4 mr-2" />
                          Virtual Meeting
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedFacultyProfilePage;