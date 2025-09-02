import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  FileText, 
  Award, 
  Target, 
  Star,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Camera,
  Plus,
  Download,
  MessageSquare,
  Settings,
  Activity,
  BarChart3,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { motion, AnimatePresence } from 'motion/react';
import { MetricCard, ProcessCard, AchievementBadge, SkillMeter } from './profile/ProfileComponents';
import { operationsProfileData } from '../data/profileData';
import { operationsAchievements } from '../data/achievementsData';

interface EnhancedOperationsProfilePageProps {
  profile?: any;
}

export const EnhancedOperationsProfilePage: React.FC<EnhancedOperationsProfilePageProps> = ({ profile: initialProfile }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Use mock data with fallbacks from initialProfile
  const profileData = {
    ...operationsProfileData,
    ...initialProfile
  };

  const handleProfileEdit = () => {
    navigateTo('profile-edit', profileData, 'Edit Profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="relative h-48 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='11' y='11' width='38' height='38' rx='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
                Operations Profile
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90"
              >
                Operational excellence and process management
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
                Export Report
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
                    <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-3xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{profileData.name}</h2>
                    <p className="text-lg text-slate-600">{profileData.title}</p>
                    <p className="text-slate-500">{profileData.department} • {profileData.school}</p>
                    <p className="text-sm text-slate-500">Employee ID: {profileData.employeeId}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {profileData.experience} Years Experience
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {profileData.teamSize} Team Members
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      <Activity className="w-3 h-3 mr-1" />
                      {profileData.activeJobs} Active Jobs
                    </Badge>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    {profileData.linkedin && (
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                    <a href={`mailto:${profileData.email}`} 
                       className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-slate-600" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Profile Stats */}
              <div className="text-right space-y-4">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-slate-800 mb-1">{profileData.profileCompletion}%</div>
                  <div className="text-sm text-slate-600 mb-3">Profile Complete</div>
                  <Progress value={profileData.profileCompletion} className="w-32 h-3" />
                </div>
                
                {/* Operations Metrics */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{(profileData.totalApplicationsProcessed / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-slate-600">Processed</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{profileData.companiesManaged}</div>
                    <div className="text-xs text-slate-600">Companies</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{(profileData.studentsCoordinated / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-slate-600">Students</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">99%</div>
                    <div className="text-xs text-slate-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            label="Applications This Month"
            value={profileData.monthlyMetrics.applicationsProcessed}
            subtitle="Processed applications"
            icon={FileText}
            color="from-blue-50 to-cyan-50"
            trend={12.5}
            trendLabel="vs last month"
          />
          <MetricCard
            label="Interviews Scheduled"
            value={profileData.monthlyMetrics.interviewsScheduled}
            subtitle="This month"
            icon={Clock}
            color="from-green-50 to-emerald-50"
            trend={8.3}
            trendLabel="vs last month"
          />
          <MetricCard
            label="Active Processes"
            value={profileData.currentProcesses.length}
            subtitle="Ongoing tasks"
            icon={Activity}
            color="from-purple-50 to-pink-50"
            trend={0}
            trendLabel="steady"
          />
          <MetricCard
            label="Student Queries"
            value={profileData.monthlyMetrics.studentQueries}
            subtitle="Resolved this month"
            icon={MessageSquare}
            color="from-orange-50 to-red-50"
            trend={-5.2}
            trendLabel="vs last month"
          />
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-1 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="processes" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Settings className="w-4 h-4 mr-2" />
              Processes
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <BarChart3 className="w-4 h-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Award className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Star className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Phone className="w-4 h-4 mr-2" />
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
                {/* Responsibilities */}
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Key Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {profileData.responsibilities.map((responsibility, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">{responsibility}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Team & Collaboration */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Users className="w-5 h-5 mr-2 text-purple-600" />
                      Team & Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-white/60 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{profileData.teamSize}</div>
                        <div className="text-sm text-slate-600">Team Members</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 mb-2">Collaborates With</h4>
                        <div className="space-y-2">
                          {profileData.collaboratesWithDepartments.map((dept, index) => (
                            <div key={index} className="text-xs text-slate-600 bg-white/40 px-2 py-1 rounded">
                              {dept}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Systems & Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Systems & Tools
                    </CardTitle>
                    <CardDescription>
                      Technologies and platforms used in daily operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.systemsUsed.map((system, index) => (
                        <Badge key={index} className="bg-indigo-100 text-indigo-800 px-3 py-2">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="processes" className="space-y-6">
              <motion.div
                key="processes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center text-slate-800">
                        <Activity className="w-5 h-5 mr-2 text-primary" />
                        Current Processes ({profileData.currentProcesses.length})
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Process
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileData.currentProcesses.map((process, index) => (
                        <ProcessCard
                          key={index}
                          title={process.title}
                          description={process.description}
                          completion={process.completion}
                          priority={process.priority}
                          assignee={process.assignee}
                          dueDate={process.dueDate}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.technicalSkills.map((skill, index) => (
                      <SkillMeter 
                        key={index} 
                        skill={skill.name} 
                        level={skill.level} 
                      />
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.softSkills.map((skill, index) => (
                      <SkillMeter 
                        key={index} 
                        skill={skill.name} 
                        level={skill.level} 
                      />
                    ))}
                  </CardContent>
                </Card>
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
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Star className="w-5 h-5 mr-2 text-yellow-600" />
                      Achievement Badges
                    </CardTitle>
                    <CardDescription>
                      Recognition for operational excellence and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {operationsAchievements.map((achievement, index) => (
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
                        <div className="font-medium text-slate-800">{profileData.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                        <div className="font-medium text-slate-800">{profileData.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Office</div>
                        <div className="font-medium text-slate-800">{profileData.office}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Clock className="w-5 h-5 mr-2 text-orange-600" />
                      Working Hours
                    </CardTitle>
                    <CardDescription>
                      Best times to reach for operational matters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profileData.workingHours.map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                          <span className="font-medium text-slate-800">{schedule.day}</span>
                          <span className="text-sm text-slate-600">{schedule.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-orange-200/50">
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule Meeting
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

export default EnhancedOperationsProfilePage;