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
  Camera,
  Share2,
  Activity,
  Users,
  Clock,
  Code
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { Student } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import ResumeSection from './profile/ResumeSection';
import { 
  SkillMeter, 
  AchievementBadge, 
  StatCard, 
  PlacementCard, 
  ProjectCard, 
  ExperienceCard 
} from './profile/ProfileComponents';
import { 
  getInitials, 
  createSafeStudentData, 
  getPlacementStatusStyle,
  formatDate,
  calculatePercentage
} from './profile/ProfileHelpers';
import { achievements, defaultTrends, colorSchemes } from './profile/ProfileConstants';

interface EnhancedStudentProfilePageProps {
  student?: Student | any;
}

export const EnhancedStudentProfilePage: React.FC<EnhancedStudentProfilePageProps> = ({ student: initialStudent }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Create safe student data with fallbacks
  const safeStudent = createSafeStudentData(initialStudent);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', safeStudent);
  };

  const handleResumeBuilder = () => {
    navigateTo('resume-builder', safeStudent, 'Resume Builder');
  };

  const handleSkillsManagement = () => {
    navigateTo('skills-management', safeStudent, 'Skills Management');
  };

  const handleProfileEdit = () => {
    navigateTo('profile-edit', safeStudent, 'Edit Profile');
  };

  const handleResumeUpdate = (updatedData: any) => {
    console.log('Resume data updated:', updatedData);
    // Here you would typically update the profile data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header with Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-primary via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
                Student Profile
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90"
              >
                Manage your academic and professional journey
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="secondary" className="bg-white/90 hover:bg-white text-slate-800">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="secondary" onClick={handleProfileEdit} className="bg-white/90 hover:bg-white text-slate-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={handleResumeBuilder} className="bg-white text-primary hover:bg-white/90">
                <FileText className="w-4 h-4 mr-2" />
                Resume Builder
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
                {/* Enhanced Avatar with Upload */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-3xl">
                      {getInitials(safeStudent.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{safeStudent.firstName} {safeStudent.lastName}</h2>
                    <p className="text-lg text-slate-600">{safeStudent.rollNumber} • {safeStudent.course}</p>
                    <p className="text-slate-500">{safeStudent.school}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Semester {safeStudent.currentSemester}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      CGPA: {safeStudent.cgpa}
                    </Badge>
                    <Badge className={`px-3 py-1 ${getPlacementStatusStyle(safeStudent.placementStatus)}`}>
                      <Activity className="w-3 h-3 mr-1" />
                      {safeStudent.placementStatus}
                    </Badge>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    {safeStudent.linkedin && (
                      <a href={safeStudent.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                    {safeStudent.github && (
                      <a href={safeStudent.github} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <Github className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                    {safeStudent.portfolio && (
                      <a href={safeStudent.portfolio} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Profile Completion */}
              <div className="text-right space-y-4">
                <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-slate-800 mb-1">{safeStudent.profileCompletion}%</div>
                  <div className="text-sm text-slate-600 mb-3">Profile Complete</div>
                  <Progress value={safeStudent.profileCompletion} className="w-32 h-3" />
                  <div className="text-xs text-slate-500 mt-2">
                    {safeStudent.profileCompletion < 100 ? `${100 - safeStudent.profileCompletion}% remaining` : 'Perfect!'}
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{safeStudent.appliedJobs}</div>
                    <div className="text-xs text-slate-600">Applied</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{safeStudent.interviewsAttended}</div>
                    <div className="text-xs text-slate-600">Interviews</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{safeStudent.offersReceived}</div>
                    <div className="text-xs text-slate-600">Offers</div>
                  </div>
                </div>
                
                {/* Class Rank */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-sm text-slate-600 mb-1">Class Rank</div>
                  <div className="text-lg font-bold text-slate-800">
                    #{safeStudent.rankInClass} of {safeStudent.totalStudents}
                  </div>
                  <div className="text-xs text-slate-500">
                    Top {calculatePercentage(safeStudent.rankInClass, safeStudent.totalStudents)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Current CGPA"
            value={safeStudent.cgpa}
            icon={GraduationCap}
            color={colorSchemes.stats[0]}
            trend={defaultTrends[0]}
            index={0}
          />
          <StatCard
            label="Projects Completed"
            value={safeStudent.projects.length}
            icon={Briefcase}
            color={colorSchemes.stats[1]}
            trend={defaultTrends[1]}
            index={1}
          />
          <StatCard
            label="Certifications"
            value={safeStudent.certifications}
            icon={Award}
            color={colorSchemes.stats[2]}
            trend={defaultTrends[2]}
            index={2}
          />
          <StatCard
            label="Contribution Score"
            value={`${safeStudent.contributionScore}/100`}
            icon={TrendingUp}
            color={colorSchemes.stats[3]}
            trend={defaultTrends[3]}
            index={3}
          />
        </div>

        {/* Enhanced Tabs with Better Styling */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-1 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <GraduationCap className="w-4 h-4 mr-2" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Award className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Star className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Target className="w-4 h-4 mr-2" />
              Career
            </TabsTrigger>
            <TabsTrigger value="resume" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                key="overview-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Personal Information */}
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-slate-800">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                            <div className="font-medium text-slate-800">{safeStudent.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                            <div className="font-medium text-slate-800">{safeStudent.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Date of Birth</div>
                            <div className="font-medium text-slate-800">{formatDate(safeStudent.dateOfBirth)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Gender</div>
                            <div className="font-medium text-slate-800">{safeStudent.gender}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Activity className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Blood Group</div>
                            <div className="font-medium text-slate-800">{safeStudent.bloodGroup}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Last Updated</div>
                            <div className="font-medium text-slate-800">{formatDate(safeStudent.lastUpdated)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Summary */}
                <Card className="bg-gradient-to-br from-primary/5 to-purple-600/5 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-slate-800">Academic Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Course</div>
                        <div className="font-medium text-slate-800">{safeStudent.course}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Department</div>
                        <div className="font-medium text-slate-800">{safeStudent.department}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">School</div>
                        <div className="font-medium text-slate-800">{safeStudent.school}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Batch</div>
                        <div className="font-medium text-slate-800">{safeStudent.batch}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-center p-4 bg-white/60 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{safeStudent.cgpa}</div>
                      <div className="text-sm text-slate-600">Current CGPA</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Semester {safeStudent.currentSemester}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Placements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Briefcase className="w-5 h-5 mr-2 text-primary" />
                      Recent Placement Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {safeStudent.recentPlacements.map((placement: any, index: number) => (
                        <PlacementCard key={placement.id} placement={placement} index={index} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <motion.div
                key="skills-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Technical Skills */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {safeStudent.technicalSkills.map((skill: any, index: number) => (
                      <SkillMeter 
                        key={`tech-skill-${index}`}
                        skill={skill.name} 
                        level={skill.level} 
                        index={index}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Soft Skills */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {safeStudent.softSkills.map((skill: any, index: number) => (
                      <SkillMeter 
                        key={`soft-skill-${index}`}
                        skill={skill.name} 
                        level={skill.level} 
                        index={index}
                      />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                key="achievements-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Star className="w-5 h-5 mr-2 text-primary" />
                      Achievements & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => (
                        <AchievementBadge 
                          key={achievement.id}
                          title={achievement.title}
                          icon={achievement.icon}
                          description={achievement.description}
                          earned={achievement.earned}
                          index={index}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <motion.div
                key="experience-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Projects */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Code className="w-5 h-5 mr-2 text-primary" />
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {safeStudent.projects.map((project: any, index: number) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </CardContent>
                </Card>

                {/* Internships */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                      Internships
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {safeStudent.internships.map((internship: any, index: number) => (
                      <ExperienceCard key={internship.id} experience={internship} index={index} />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Career Tab */}
            <TabsContent value="career" className="space-y-6">
              <motion.div
                key="career-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Career Objective */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Career Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{safeStudent.careerObjective}</p>
                  </CardContent>
                </Card>

                {/* Career Preferences */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-slate-800">Preferred Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {safeStudent.preferredRoles.map((role: string, index: number) => (
                          <Badge key={`role-${index}`} variant="outline" className="bg-blue-50 text-blue-700">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-slate-800">Expected Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">
                          ₹{(safeStudent.expectedSalary.min / 100000).toFixed(1)}L - ₹{(safeStudent.expectedSalary.max / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm text-slate-600">Annual Package</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Academic Tab */}
            <TabsContent value="academic" className="space-y-6">
              <motion.div
                key="academic-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                      Academic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{safeStudent.cgpa}</div>
                        <div className="text-sm text-slate-600">Current CGPA</div>
                        <div className="text-xs text-slate-500 mt-1">Out of 10.0</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">#{safeStudent.rankInClass}</div>
                        <div className="text-sm text-slate-600">Class Rank</div>
                        <div className="text-xs text-slate-500 mt-1">Out of {safeStudent.totalStudents}</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600">{safeStudent.currentSemester}</div>
                        <div className="text-sm text-slate-600">Current Semester</div>
                        <div className="text-xs text-slate-500 mt-1">{safeStudent.batch}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6">
              <motion.div
                key="resume-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResumeSection userData={safeStudent} onUpdate={handleResumeUpdate} />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedStudentProfilePage;