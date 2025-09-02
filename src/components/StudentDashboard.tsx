import React, { useState } from 'react';
import { useNavigation } from './navigation/NavigationProvider';
import DashboardLayout from './common/DashboardLayout';
import { StatCard, UserProfileCard, ActivityItem } from './common/DashboardComponents';
import ResumeProfiling from './student/ResumeProfiling';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  Briefcase, 
  User, 
  GraduationCap, 
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Building,
  TrendingUp,
  Target,
  Award,
  Download,
  Plus,
  Search,
  Filter,
  Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDataByRole } from './data/comprehensiveData';
import { exportStudentsData, exportApplicationsData, exportTrainingData } from './utils/enhancedCsvExport';
import { toast } from 'sonner';

interface StudentDashboardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const { navigateTo } = useNavigation();

  // Get real data from comprehensive data service
  const currentStudentData = getDataByRole(user.role, 'profile')[0] || {
    id: 'STU001',
    name: user.name || 'Rajesh Kumar',
    rollNumber: 'AP24CSE130096',
    department: user.department || 'Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    year: 4,
    semester: 8,
    cgpa: 8.95,
    email: user.email,
    phone: '+91 9876543210',
    profileImage: '/api/placeholder/80/80',
    placementStatus: {
      isRegistered: true,
      currentApplications: 5,
      interviewsScheduled: 2,
      offersReceived: 1,
      placementStatus: 'In Progress' // This is the actual status string
    },
    attendanceRate: 95.2,
    performanceGrade: 'A+'
  };

  const studentApplications = getDataByRole(user.role, 'applications');
  const trainingPrograms = getDataByRole(user.role, 'training');

  // Academic performance data
  const academicData = [
    { semester: 'Sem 1', cgpa: 8.2, credits: 24 },
    { semester: 'Sem 2', cgpa: 8.5, credits: 26 },
    { semester: 'Sem 3', cgpa: 8.7, credits: 25 },
    { semester: 'Sem 4', cgpa: 8.9, credits: 24 },
    { semester: 'Sem 5', cgpa: 9.1, credits: 26 },
    { semester: 'Sem 6', cgpa: 9.0, credits: 25 },
    { semester: 'Sem 7', cgpa: 8.8, credits: 24 },
    { semester: 'Sem 8', cgpa: currentStudentData.cgpa, credits: 20 }
  ];

  // Available job postings (sample data)
  const availableJobs = [
    {
      id: 'JOB001',
      company: 'Google India',
      position: 'Software Engineer - New Grad',
      salary: '₹25-35 LPA',
      location: 'Hyderabad, Bangalore',
      deadline: '2024-02-15',
      requirements: ['B.Tech/M.Tech in CS/IT', 'Strong programming skills', 'CGPA > 8.0'],
      skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
      jobType: 'Full-time',
      experience: 'Fresher',
      postedDate: '2024-01-20'
    },
    {
      id: 'JOB002',
      company: 'Meta',
      position: 'Frontend Engineer',
      salary: '₹22-30 LPA',
      location: 'Mumbai',
      deadline: '2024-02-10',
      requirements: ['B.Tech in CS/IT', 'React/Angular experience', 'CGPA > 7.5'],
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript'],
      jobType: 'Full-time',
      experience: 'Fresher to 1 year',
      postedDate: '2024-01-18'
    },
    {
      id: 'JOB003',
      company: 'Stripe',
      position: 'Backend Developer',
      salary: '₹20-28 LPA',
      location: 'Remote',
      deadline: '2024-02-20',
      requirements: ['Strong backend development skills', 'Database knowledge', 'CGPA > 7.0'],
      skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Redis'],
      jobType: 'Full-time',
      experience: 'Fresher',
      postedDate: '2024-01-16'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: `Applied to ${studentApplications[0]?.companyName || 'Microsoft India'} - ${studentApplications[0]?.jobTitle || 'Software Engineer'} position`,
      time: '2 hours ago',
      icon: Briefcase,
      color: 'text-primary'
    },
    {
      id: 2,
      action: 'Completed Module 10 - React Advanced Concepts',
      time: '1 day ago',
      icon: GraduationCap,
      color: 'text-success'
    },
    {
      id: 3,
      action: `Interview scheduled with ${studentApplications[1]?.companyName || 'Amazon'} for Jan 25`,
      time: '2 days ago',
      icon: Calendar,
      color: 'text-info'
    },
    {
      id: 4,
      action: 'Updated resume with new project details',
      time: '3 days ago',
      icon: FileText,
      color: 'text-warning'
    }
  ];

  // Export functions with real data
  const handleExportMyData = async () => {
    try {
      await exportStudentsData(user.role);
    } catch (error) {
      toast.error('Failed to export student data');
    }
  };

  const handleExportApplications = async () => {
    try {
      await exportApplicationsData(user.role);
    } catch (error) {
      toast.error('Failed to export applications data');
    }
  };

  const handleExportTraining = async () => {
    try {
      await exportTrainingData(user.role);
    } catch (error) {
      toast.error('Failed to export training data');
    }
  };

  // Get status color for applications
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'placed':
      case 'selected': 
        return 'bg-success text-success-foreground';
      case 'interview scheduled': 
        return 'bg-info text-info-foreground';
      case 'shortlisted': 
        return 'bg-warning text-warning-foreground';
      case 'under review': 
        return 'bg-secondary text-secondary-foreground';
      case 'rejected': 
        return 'bg-destructive text-destructive-foreground';
      default: 
        return 'bg-muted text-muted-foreground';
    }
  };

  // Overview Tab Content with Real Data
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* User Profile Card */}
      <UserProfileCard 
        user={user}
        profileData={currentStudentData}
        onViewProfile={() => navigateTo('student-profile', currentStudentData, 'My Profile')}
      />

      {/* Key Statistics with Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Briefcase}
          title="Applications Sent"
          value={studentApplications.length.toString()}
          change="+2 this week"
          color="bg-primary"
        />
        <StatCard
          icon={CheckCircle}
          title="Interviews Scheduled"
          value={studentApplications.filter(app => app.status === 'Interview Scheduled').length.toString()}
          change="Next: Tomorrow"
          color="bg-success"
        />
        <StatCard
          icon={GraduationCap}
          title="Current CGPA"
          value={currentStudentData.cgpa.toString()}
          change="Rank: 15/456"
          color="bg-info"
        />
        <StatCard
          icon={Award}
          title="Training Programs"
          value={trainingPrograms.length.toString()}
          change="+1 this month"
          color="bg-warning"
        />
      </div>

      {/* Academic Performance Chart and Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Academic Performance</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportMyData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={academicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[7, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="cgpa" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>My Applications</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateTo('applications-list', null, 'All Applications')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentApplications.slice(0, 4).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{application.companyName}</h4>
                  <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">{application.applicationDate}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{application.salaryRange}</p>
                </div>
              </div>
            ))}
            {studentApplications.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No applications yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Training Progress and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span>Training Progress</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportTraining}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainingPrograms.slice(0, 3).map((program) => (
              <div key={program.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-foreground">{program.programName}</h4>
                  <Badge variant={program.status === 'Completed' ? 'default' : 'secondary'}>
                    {program.status}
                  </Badge>
                </div>
                <Progress value={program.completedParticipants / program.totalParticipants * 100} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round(program.completedParticipants / program.totalParticipants * 100)}% Complete</span>
                  <span>Rating: {program.satisfactionRating}/5.0</span>
                </div>
              </div>
            ))}
            {trainingPrograms.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No training programs enrolled</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Jobs Tab Content
  const JobsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Available Jobs</h2>
          <p className="text-muted-foreground">Find and apply to job opportunities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Briefcase}
          title="Total Jobs"
          value={availableJobs.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Building}
          title="Companies"
          value="45"
          color="bg-success"
        />
        <StatCard
          icon={Target}
          title="Matching Profile"
          value="28"
          color="bg-info"
        />
        <StatCard
          icon={Clock}
          title="Applications Due"
          value="12"
          color="bg-warning"
        />
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6">
        {availableJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{job.position}</h3>
                  <p className="text-primary font-medium">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.location} • {job.experience} • {job.jobType}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-success">{job.salary}</p>
                  <p className="text-sm text-muted-foreground">Deadline: {job.deadline}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Posted: {job.postedDate}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => navigateTo('job-application-flow', job, 'Apply for Job')}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Applications Tab Content with Real Data
  const ApplicationsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Applications</h2>
          <p className="text-muted-foreground">Track your job application status</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleExportApplications}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Applications
          </Button>
          <Button onClick={() => navigateTo('jobs', null, 'Browse Jobs')}>
            <Plus className="w-4 h-4 mr-2" />
            Apply to More Jobs
          </Button>
        </div>
      </div>

      {/* Application Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: 'Total', count: studentApplications.length, color: '#4f46e5' },
              { status: 'Under Review', count: studentApplications.filter(app => app.status === 'Under Review').length, color: '#6366f1' },
              { status: 'Shortlisted', count: studentApplications.filter(app => app.status === 'Shortlisted').length, color: '#f59e0b' },
              { status: 'Interview Scheduled', count: studentApplications.filter(app => app.status === 'Interview Scheduled').length, color: '#06b6d4' },
              { status: 'Selected', count: studentApplications.filter(app => app.status === 'Selected').length, color: '#10b981' }
            ].map((item) => (
              <div key={item.status} className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.count}
                </div>
                <div className="text-sm text-muted-foreground">{item.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentApplications.map((application) => (
              <div key={application.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{application.companyName}</h3>
                    <p className="text-muted-foreground">{application.jobTitle}</p>
                    <p className="text-sm text-muted-foreground">{application.jobLocation} • {application.salaryRange}</p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Applied Date:</span>
                    <p className="text-muted-foreground">{application.applicationDate}</p>
                  </div>
                  <div>
                    <span className="font-medium">Current Round:</span>
                    <p className="text-muted-foreground">{application.currentRound}</p>
                  </div>
                  <div>
                    <span className="font-medium">Interview Date:</span>
                    <p className="text-muted-foreground">{application.interviewDate || 'TBD'}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {studentApplications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No applications submitted yet</p>
                <Button onClick={() => navigateTo('jobs', null, 'Browse Jobs')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Apply to Jobs
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Training Tab Content with Real Data
  const TrainingContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Training Programs</h2>
          <p className="text-muted-foreground">Your learning journey and skill development</p>
        </div>
        <Button 
          variant="outline"
          onClick={handleExportTraining}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={GraduationCap}
          title="Programs Enrolled"
          value={trainingPrograms.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={CheckCircle}
          title="Programs Completed"
          value={trainingPrograms.filter(p => p.status === 'Completed').length.toString()}
          color="bg-success"
        />
        <StatCard
          icon={Award}
          title="Average Rating"
          value={trainingPrograms.length > 0 ? (trainingPrograms.reduce((acc, p) => acc + p.satisfactionRating, 0) / trainingPrograms.length).toFixed(1) : '0'}
          color="bg-warning"
        />
      </div>

      {/* Detailed Training Programs */}
      <div className="grid grid-cols-1 gap-6">
        {trainingPrograms.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{program.programName}</h3>
                  <p className="text-muted-foreground">Instructor: {program.instructor}</p>
                  <p className="text-sm text-muted-foreground">{program.duration} • {program.startDate} to {program.endDate}</p>
                </div>
                <Badge variant={program.status === 'Completed' ? 'default' : 'secondary'}>
                  {program.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((program.completedParticipants / program.totalParticipants) * 100)}%
                    </span>
                  </div>
                  <Progress value={(program.completedParticipants / program.totalParticipants) * 100} />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Participants:</span>
                    <p className="text-muted-foreground">{program.totalParticipants}</p>
                  </div>
                  <div>
                    <span className="font-medium">Average Score:</span>
                    <p className="text-muted-foreground">{program.averageScore}/100</p>
                  </div>
                  <div>
                    <span className="font-medium">Satisfaction:</span>
                    <p className="text-muted-foreground">{program.satisfactionRating}/5.0</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {trainingPrograms.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">No training programs enrolled</p>
              <Button onClick={() => navigateTo('training', null, 'Browse Training Programs')}>
                <Plus className="w-4 h-4 mr-2" />
                Enroll in Programs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  // Profile Tab Content
  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
          <p className="text-muted-foreground">Manage your academic and professional profile</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportMyData}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigateTo('profile-edit', currentStudentData, 'Edit Profile')}
          >
            Edit Profile
          </Button>
          <Button onClick={() => navigateTo('student-profile', currentStudentData, 'View Full Profile')}>
            View Full Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <p className="text-muted-foreground">{currentStudentData.name}</p>
              </div>
              <div>
                <span className="font-medium">Roll Number:</span>
                <p className="text-muted-foreground">{currentStudentData.rollNumber}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{currentStudentData.department}</p>
              </div>
              <div>
                <span className="font-medium">Specialization:</span>
                <p className="text-muted-foreground">{currentStudentData.specialization}</p>
              </div>
              <div>
                <span className="font-medium">Current Year:</span>
                <p className="text-muted-foreground">Year {currentStudentData.year}</p>
              </div>
              <div>
                <span className="font-medium">Current Semester:</span>
                <p className="text-muted-foreground">Semester {currentStudentData.semester}</p>
              </div>
              <div>
                <span className="font-medium">CGPA:</span>
                <p className="text-muted-foreground">{currentStudentData.cgpa}</p>
              </div>
              <div>
                <span className="font-medium">Performance Grade:</span>
                <p className="text-muted-foreground">{currentStudentData.performanceGrade}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <span className="font-medium">Email:</span>
              <p className="text-muted-foreground">{currentStudentData.email}</p>
            </div>
            <div className="text-sm">
              <span className="font-medium">Phone:</span>
              <p className="text-muted-foreground">{currentStudentData.phone}</p>
            </div>
            <div className="text-sm">
              <span className="font-medium">Attendance Rate:</span>
              <p className="text-muted-foreground">{currentStudentData.attendanceRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placement Status */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Registration Status:</span>
              <p className="text-muted-foreground">
                {currentStudentData.placementStatus.isRegistered ? 'Registered' : 'Not Registered'}
              </p>
            </div>
            <div>
              <span className="font-medium">Current Applications:</span>
              <p className="text-muted-foreground">{currentStudentData.placementStatus.currentApplications}</p>
            </div>
            <div>
              <span className="font-medium">Interviews Scheduled:</span>
              <p className="text-muted-foreground">{currentStudentData.placementStatus.interviewsScheduled}</p>
            </div>
            <div>
              <span className="font-medium">Offers Received:</span>
              <p className="text-muted-foreground">{currentStudentData.placementStatus.offersReceived}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Resume Profiling Tab Content
  const ResumeProfilingContent = () => (
    <ResumeProfiling user={user} />
  );

  const tabs = [
    { value: 'overview', label: 'Overview', icon: BarChart3, content: <OverviewContent /> },
    { value: 'jobs', label: 'Jobs', icon: Briefcase, content: <JobsContent /> },
    { value: 'applications', label: 'Applications', icon: FileText, content: <ApplicationsContent /> },
    { value: 'training', label: 'Training', icon: GraduationCap, content: <TrainingContent /> },
    { value: 'profile', label: 'Profile', icon: User, content: <ProfileContent /> },
    { value: 'resume-profiling', label: 'Resume Profiling', icon: Zap, content: <ResumeProfilingContent /> }
  ];

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      tabs={tabs}
      defaultTab="overview"
    />
  );
};

export default StudentDashboard;