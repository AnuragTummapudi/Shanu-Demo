import React, { useState, useEffect } from 'react';
import { useNavigation } from './navigation/NavigationProvider';
import DashboardLayout from './common/DashboardLayout';
import { StatCard, UserProfileCard, ActivityItem, CourseCard, EventCard } from './common/DashboardComponents';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Calendar,
  Award,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Settings,
  Download,
  Plus,
  Search,
  Filter,
  User,
  Activity,
  QrCode,
  RefreshCw,
  Camera,
  Scan
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDataByRole } from './data/comprehensiveData';
import { exportFacultyData, exportStudentsData, exportTrainingData } from './utils/enhancedCsvExport';
import { toast } from 'sonner';

interface FacultyDashboardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  onLogout: () => void;
}

// QR Code Component with dynamic updates
const QRAttendanceComponent: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const [sessionActive, setSessionActive] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3);

  // Generate random QR code data
  const generateQRCode = () => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    return `ATTENDANCE_${timestamp}_${randomId}`;
  };

  // Auto-refresh QR code every 3 seconds
  useEffect(() => {
    if (sessionActive) {
      const interval = setInterval(() => {
        setQrCode(generateQRCode());
        setTimeRemaining(3);
        
        // Simulate attendance scanning
        setAttendanceCount(prev => prev + Math.floor(Math.random() * 3));
      }, 3000);

      // Update countdown every second
      const countdown = setInterval(() => {
        setTimeRemaining(prev => prev > 0 ? prev - 1 : 3);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(countdown);
      };
    }
  }, [sessionActive]);

  const startAttendanceSession = () => {
    setSessionActive(true);
    setQrCode(generateQRCode());
    setAttendanceCount(0);
    setTimeRemaining(3);
    toast.success('Attendance session started!');
  };

  const stopAttendanceSession = () => {
    setSessionActive(false);
    setQrCode('');
    toast.success(`Attendance session ended. ${attendanceCount} students marked present.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="w-5 h-5 text-primary" />
          <span>QR Code Attendance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!sessionActive ? (
          <div className="text-center space-y-4">
            <div className="p-8 border-2 border-dashed border-muted rounded-lg">
              <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Click to start attendance session</p>
            </div>
            <Button onClick={startAttendanceSession} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Start Attendance Session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg border-2 border-primary mb-4 inline-block">
                <div className="w-48 h-48 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <div className="text-white font-mono text-xs break-all p-4 text-center">
                    {qrCode}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Updates every 3 seconds • Next update in {timeRemaining}s</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{attendanceCount}</div>
                <p className="text-sm text-muted-foreground">Students Present</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(timeRemaining)}</div>
                <p className="text-sm text-muted-foreground">Seconds Left</p>
              </div>
            </div>
            
            <Button 
              onClick={stopAttendanceSession} 
              variant="outline" 
              className="w-full"
            >
              End Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ user, onLogout }) => {
  const { navigateTo } = useNavigation();

  // Get faculty data
  const facultyProfile = getDataByRole(user.role, 'faculty')[0] || {
    id: 'FAC001',
    name: user.name || 'Dr. Lakshmi Venkatesh',
    email: user.email,
    department: user.department || 'Computer Science & Engineering',
    designation: 'Professor & Head',
    experience: 18,
    qualification: 'Ph.D. in Computer Science',
    phone: '+91 9876505001',
    employeeId: 'SRMAP-FAC-001',
    publicationsCount: 45,
    projectsHandled: 12,
    studentsGuided: 25,
    currentStudentsCount: 8,
    averageRating: 4.7,
    activeStatus: 'Active',
    profileImage: '/api/placeholder/80/80'
  };

  const facultyStudents = getDataByRole(user.role, 'students') || [];
  const facultyTraining = getDataByRole(user.role, 'training') || [];

  // Sample courses data
  const courses = [
    {
      id: 'CSE301',
      name: 'Machine Learning',
      code: 'CSE301',
      students: 45,
      semester: 'Fall 2024',
      schedule: 'Mon-Wed-Fri 9:00 AM',
      status: 'Active' as const,
      progress: 65
    },
    {
      id: 'CSE401',
      name: 'Advanced Algorithms',
      code: 'CSE401',
      students: 38,
      semester: 'Fall 2024',
      schedule: 'Tue-Thu 11:00 AM',
      status: 'Active' as const,
      progress: 45
    },
    {
      id: 'CSE201',
      name: 'Data Structures',
      code: 'CSE201',
      students: 52,
      semester: 'Spring 2024',
      schedule: 'Mon-Wed-Fri 2:00 PM',
      status: 'Completed' as const,
      progress: 100
    }
  ];

  // Sample events data
  const upcomingEvents = [
    {
      id: 'evt_001',
      title: 'AI/ML Workshop',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'CSE Lab 1',
      type: 'Workshop' as const,
      attendees: 30,
      status: 'Upcoming' as const,
      description: 'Hands-on workshop on machine learning algorithms'
    },
    {
      id: 'evt_002',
      title: 'Research Seminar',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Conference Hall',
      type: 'Seminar' as const,
      attendees: 50,
      status: 'Upcoming' as const,
      description: 'Latest research in computer vision'
    },
    {
      id: 'evt_003',
      title: 'Faculty Meeting',
      date: '2024-02-25',
      time: '4:00 PM',
      location: 'Dean Office',
      type: 'Meeting' as const,
      attendees: 15,
      status: 'Upcoming' as const,
      description: 'Monthly department faculty meeting'
    }
  ];

  // Academic performance data
  const studentPerformanceData = [
    { semester: 'Spring 2023', average: 8.2, passed: 92 },
    { semester: 'Fall 2023', average: 8.5, passed: 94 },
    { semester: 'Spring 2024', average: 8.7, passed: 96 },
    { semester: 'Fall 2024', average: 8.4, passed: 93 }
  ];

  // Research data
  const researchData = [
    { year: '2021', publications: 8, citations: 145 },
    { year: '2022', publications: 12, citations: 189 },
    { year: '2023', publications: 15, citations: 234 },
    { year: '2024', publications: 10, citations: 188 }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Graded assignments for Machine Learning course',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-primary'
    },
    {
      id: 2,
      action: 'Scheduled thesis defense for student Rajesh Kumar',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-success'
    },
    {
      id: 3,
      action: 'Published research paper on Deep Learning',
      time: '3 days ago',
      icon: Award,
      color: 'text-info'
    },
    {
      id: 4,
      action: 'Attended faculty development workshop',
      time: '1 week ago',
      icon: GraduationCap,
      color: 'text-warning'
    }
  ];

  // Export functions
  const handleExportStudents = async () => {
    try {
      await exportStudentsData(user.role);
      toast.success('Students data exported successfully!');
    } catch (error) {
      toast.error('Failed to export students data');
    }
  };

  const handleExportTraining = async () => {
    try {
      await exportTrainingData(user.role);
      toast.success('Training data exported successfully!');
    } catch (error) {
      toast.error('Failed to export training data');
    }
  };

  const handleExportFaculty = async () => {
    try {
      await exportFacultyData(user.role);
      toast.success('Faculty data exported successfully!');
    } catch (error) {
      toast.error('Failed to export faculty data');
    }
  };

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Faculty Profile Card */}
      <UserProfileCard 
        user={user}
        profileData={facultyProfile}
        onViewProfile={() => navigateTo('faculty-profile', facultyProfile, 'My Profile')}
      />

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Active Courses"
          value={courses.filter(c => c.status === 'Active').length.toString()}
          change="2 this semester"
          color="bg-primary"
        />
        <StatCard
          icon={Users}
          title="Total Students"
          value={courses.reduce((sum, course) => sum + course.students, 0).toString()}
          change="135 across all courses"
          color="bg-success"
        />
        <StatCard
          icon={Award}
          title="Publications"
          value={facultyProfile.publicationsCount.toString()}
          change="+3 this year"
          color="bg-info"
        />
        <StatCard
          icon={TrendingUp}
          title="Student Rating"
          value={facultyProfile.averageRating.toString()}
          change="Based on feedback"
          color="bg-warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Student Performance Trends</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportStudents}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="#4f46e5" strokeWidth={2} name="Average CGPA" />
                <Line type="monotone" dataKey="passed" stroke="#10b981" strokeWidth={2} name="Pass Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Research Output</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportFaculty}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={researchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="publications" fill="#4f46e5" name="Publications" />
                <Bar dataKey="citations" fill="#6366f1" name="Citations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col space-y-1"
                  onClick={() => navigateTo('course-management', null, 'Course Management')}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Courses</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col space-y-1"
                  onClick={() => navigateTo('operations/student-list', facultyStudents, 'My Students')}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Students</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col space-y-1"
                  onClick={() => navigateTo('attendance-marking', null, 'Mark Attendance')}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xs">Attendance</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col space-y-1"
                  onClick={() => navigateTo('assessment-system', null, 'Assessments')}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Assessments</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Attendance */}
          <QRAttendanceComponent />
        </div>
      </div>
    </div>
  );

  // Students Tab Content with QR Attendance
  const StudentsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>My Students</h2>
          <p className="text-muted-foreground">Monitor student progress and take attendance</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportStudents}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={Users}
              title="Total Students"
              value={facultyStudents.length.toString()}
              color="bg-primary"
            />
            <StatCard
              icon={CheckCircle}
              title="Active Students"
              value={facultyStudents.filter(s => s.activeStatus === 'Active').length.toString()}
              color="bg-success"
            />
            <StatCard
              icon={TrendingUp}
              title="Average CGPA"
              value={facultyStudents.length > 0 ? (facultyStudents.reduce((sum, s) => sum + s.cgpa, 0) / facultyStudents.length).toFixed(2) : '0.00'}
              color="bg-info"
            />
            <StatCard
              icon={Award}
              title="Top Performers"
              value={facultyStudents.filter(s => s.cgpa >= 9.0).length.toString()}
              color="bg-warning"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyStudents.slice(0, 10).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <h4>{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">CGPA</p>
                        <p className="text-lg font-bold text-primary">{student.cgpa}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Attendance</p>
                        <p className="text-lg font-bold text-success">{student.attendanceRate}%</p>
                      </div>
                      <Badge variant={student.performanceGrade === 'A+' ? 'default' : 'secondary'}>
                        {student.performanceGrade}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigateTo('student-detail', student, `${student.name} Profile`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Attendance */}
        <div>
          <QRAttendanceComponent />
        </div>
      </div>
    </div>
  );

  // Continue with other tab contents...
  const CoursesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>My Courses</h2>
          <p className="text-muted-foreground">Manage your teaching assignments and course content</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => navigateTo('course-add', null, 'Add New Course')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value={courses.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Users}
          title="Total Students"
          value={courses.reduce((sum, course) => sum + course.students, 0).toString()}
          color="bg-success"
        />
        <StatCard
          icon={CheckCircle}
          title="Active Courses"
          value={courses.filter(c => c.status === 'Active').length.toString()}
          color="bg-info"
        />
        <StatCard
          icon={Award}
          title="Completed"
          value={courses.filter(c => c.status === 'Completed').length.toString()}
          color="bg-warning"
        />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={() => navigateTo('course-detail', course, `${course.name} Details`)}
          />
        ))}
      </div>
    </div>
  );

  const TrainingContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Training Programs</h2>
          <p className="text-muted-foreground">Manage and conduct training sessions</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportTraining}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Training Data
          </Button>
          <Button onClick={() => navigateTo('training-management', null, 'Training Management')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={GraduationCap}
          title="Programs Conducted"
          value={facultyTraining.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Users}
          title="Total Participants"
          value={facultyTraining.reduce((sum, t) => sum + t.totalParticipants, 0).toString()}
          color="bg-success"
        />
        <StatCard
          icon={CheckCircle}
          title="Completion Rate"
          value={facultyTraining.length > 0 ? `${(facultyTraining.reduce((sum, t) => sum + (t.completedParticipants / t.totalParticipants), 0) / facultyTraining.length * 100).toFixed(1)}%` : '0%'}
          color="bg-info"
        />
        <StatCard
          icon={Award}
          title="Average Rating"
          value={facultyTraining.length > 0 ? (facultyTraining.reduce((sum, t) => sum + t.satisfactionRating, 0) / facultyTraining.length).toFixed(1) : '0.0'}
          color="bg-warning"
        />
      </div>

      {/* Training Programs */}
      <div className="grid grid-cols-1 gap-6">
        {facultyTraining.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3>{program.programName}</h3>
                  <p className="text-muted-foreground">{program.department}</p>
                  <p className="text-sm text-muted-foreground">{program.duration} • {program.startDate} to {program.endDate}</p>
                </div>
                <Badge variant={program.status === 'Completed' ? 'default' : 'secondary'}>
                  {program.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-lg font-bold">{program.totalParticipants}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-lg font-bold text-success">{program.completedParticipants}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-lg font-bold text-primary">{program.averageScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-lg font-bold text-warning">{program.satisfactionRating}/5.0</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Progress</span>
                  <span>{Math.round((program.completedParticipants / program.totalParticipants) * 100)}%</span>
                </div>
                <Progress value={(program.completedParticipants / program.totalParticipants) * 100} />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('training-session', program, `${program.programName} Details`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ScheduleContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Schedule & Events</h2>
          <p className="text-muted-foreground">Manage your teaching schedule and upcoming events</p>
        </div>
        <Button onClick={() => navigateTo('event-add', null, 'Add Event')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Calendar}
          title="Upcoming Events"
          value={upcomingEvents.filter(e => e.status === 'Upcoming').length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Clock}
          title="This Week"
          value="8"
          color="bg-success"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value="5"
          color="bg-info"
        />
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewDetails={() => navigateTo('event-detail', event, `${event.title} Details`)}
          />
        ))}
      </div>
    </div>
  );

  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Faculty Profile</h2>
          <p className="text-muted-foreground">Manage your academic profile and credentials</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigateTo('profile-edit', facultyProfile, 'Edit Profile')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={() => navigateTo('faculty-profile', facultyProfile, 'View Full Profile')}>
            <User className="w-4 h-4 mr-2" />
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
                <p className="text-muted-foreground">{facultyProfile.name}</p>
              </div>
              <div>
                <span className="font-medium">Employee ID:</span>
                <p className="text-muted-foreground">{facultyProfile.employeeId}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{facultyProfile.department}</p>
              </div>
              <div>
                <span className="font-medium">Designation:</span>
                <p className="text-muted-foreground">{facultyProfile.designation}</p>
              </div>
              <div>
                <span className="font-medium">Experience:</span>
                <p className="text-muted-foreground">{facultyProfile.experience} years</p>
              </div>
              <div>
                <span className="font-medium">Rating:</span>
                <p className="text-muted-foreground">{facultyProfile.averageRating}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Research Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{facultyProfile.publicationsCount}</div>
              <p className="text-sm text-muted-foreground">Publications</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{facultyProfile.projectsHandled}</div>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{facultyProfile.studentsGuided}</div>
              <p className="text-sm text-muted-foreground">Students Guided</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const dashboardTabs = [
    {
      value: 'overview',
      label: 'Overview',
      icon: BarChart3,
      content: <OverviewContent />
    },
    {
      value: 'courses',
      label: 'Courses',
      icon: BookOpen,
      content: <CoursesContent />
    },
    {
      value: 'students',
      label: 'Students',
      icon: Users,
      content: <StudentsContent />
    },
    {
      value: 'training',
      label: 'Training',
      icon: GraduationCap,
      content: <TrainingContent />
    },
    {
      value: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      content: <ScheduleContent />
    },
    {
      value: 'profile',
      label: 'Profile',
      icon: User,
      content: <ProfileContent />
    }
  ];

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      title="Faculty Dashboard"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Faculty', href: '/faculty' }
      ]}
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {dashboardTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2">
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {dashboardTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default FacultyDashboard;