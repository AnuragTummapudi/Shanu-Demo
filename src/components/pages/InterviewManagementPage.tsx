import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Building,
  Star,
  MessageCircle,
  FileText,
  Video,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Search,
  Filter,
  Download,
  Upload,
  Send,
  Eye,
  MoreHorizontal,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Award,
  Briefcase,
  User,
  Mail,
  LinkIcon,
  Copy,
  Share2,
  Settings,
  RefreshCw,
  Zap,
  Brain,
  Shield,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../navigation/NavigationProvider';

interface Interview {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  companyId: string;
  companyName: string;
  position: string;
  interviewType: 'technical' | 'hr' | 'managerial' | 'final';
  mode: 'online' | 'offline' | 'hybrid';
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  interviewerName: string;
  interviewerEmail: string;
  meetingLink?: string;
  location?: string;
  feedback?: {
    technicalScore: number;
    communicationScore: number;
    overallRating: number;
    comments: string;
    recommendation: 'selected' | 'rejected' | 'hold' | 'next-round';
    submittedBy: string;
    submittedAt: string;
  };
  notes?: string;
  attachments?: string[];
  remindersSent: number;
  createdAt: string;
  updatedAt: string;
}

interface InterviewAnalytics {
  totalInterviews: number;
  completedInterviews: number;
  successRate: number;
  averageRating: number;
  interviewsByType: Record<string, number>;
  interviewsByStatus: Record<string, number>;
  monthlyTrends: Array<{ month: string; interviews: number; success: number }>;
  topPerformingStudents: Array<{ name: string; rating: number; interviews: number }>;
  companyStats: Array<{ company: string; interviews: number; selections: number }>;
}

const InterviewManagementPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [analytics, setAnalytics] = useState<InterviewAnalytics | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data initialization
  useEffect(() => {
    const mockInterviews: Interview[] = [
      {
        id: '1',
        studentId: 'student1',
        studentName: 'Rajesh Kumar',
        studentEmail: 'rajesh.kumar@srmap.edu.in',
        companyId: 'company1',
        companyName: 'TCS Digital',
        position: 'Software Engineer',
        interviewType: 'technical',
        mode: 'online',
        scheduledDate: '2024-01-20',
        scheduledTime: '10:00',
        duration: 60,
        status: 'completed',
        interviewerName: 'Amit Sharma',
        interviewerEmail: 'amit.sharma@tcs.com',
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        feedback: {
          technicalScore: 85,
          communicationScore: 80,
          overallRating: 4.2,
          comments: 'Strong technical knowledge in React and Node.js. Good problem-solving approach.',
          recommendation: 'selected',
          submittedBy: 'Amit Sharma',
          submittedAt: '2024-01-20T11:30:00Z'
        },
        notes: 'Student showed excellent understanding of system design principles.',
        remindersSent: 2,
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-20T11:30:00Z'
      },
      {
        id: '2',
        studentId: 'student2',
        studentName: 'Priya Sharma',
        studentEmail: 'priya.sharma@srmap.edu.in',
        companyId: 'company2',
        companyName: 'Infosys',
        position: 'System Engineer',
        interviewType: 'hr',
        mode: 'offline',
        scheduledDate: '2024-01-22',
        scheduledTime: '14:00',
        duration: 45,
        status: 'scheduled',
        interviewerName: 'Sarah Johnson',
        interviewerEmail: 'sarah.johnson@infosys.com',
        location: 'Infosys Bangalore Campus',
        notes: 'HR round focusing on behavioral questions and cultural fit.',
        remindersSent: 1,
        createdAt: '2024-01-18T10:00:00Z',
        updatedAt: '2024-01-18T10:00:00Z'
      },
      {
        id: '3',
        studentId: 'student3',
        studentName: 'Arun Reddy',
        studentEmail: 'arun.reddy@srmap.edu.in',
        companyId: 'company3',
        companyName: 'Microsoft',
        position: 'Software Development Engineer',
        interviewType: 'technical',
        mode: 'online',
        scheduledDate: '2024-01-25',
        scheduledTime: '16:00',
        duration: 90,
        status: 'scheduled',
        interviewerName: 'David Lee',
        interviewerEmail: 'david.lee@microsoft.com',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123',
        notes: 'Technical interview focusing on algorithms and data structures.',
        remindersSent: 0,
        createdAt: '2024-01-19T11:00:00Z',
        updatedAt: '2024-01-19T11:00:00Z'
      }
    ];

    const mockAnalytics: InterviewAnalytics = {
      totalInterviews: 150,
      completedInterviews: 120,
      successRate: 68,
      averageRating: 3.8,
      interviewsByType: {
        technical: 60,
        hr: 45,
        managerial: 30,
        final: 15
      },
      interviewsByStatus: {
        scheduled: 25,
        completed: 120,
        cancelled: 3,
        rescheduled: 2
      },
      monthlyTrends: [
        { month: 'Sep', interviews: 20, success: 12 },
        { month: 'Oct', interviews: 35, success: 25 },
        { month: 'Nov', interviews: 42, success: 30 },
        { month: 'Dec', interviews: 38, success: 24 },
        { month: 'Jan', interviews: 15, success: 11 }
      ],
      topPerformingStudents: [
        { name: 'Rajesh Kumar', rating: 4.5, interviews: 5 },
        { name: 'Meera Nair', rating: 4.3, interviews: 4 },
        { name: 'Suresh Babu', rating: 4.1, interviews: 6 }
      ],
      companyStats: [
        { company: 'TCS Digital', interviews: 25, selections: 18 },
        { company: 'Infosys', interviews: 20, selections: 12 },
        { company: 'Microsoft', interviews: 15, selections: 12 }
      ]
    };

    setInterviews(mockInterviews);
    setFilteredInterviews(mockInterviews);
    setAnalytics(mockAnalytics);
  }, []);

  // Filter interviews
  useEffect(() => {
    let filtered = interviews;

    if (searchTerm) {
      filtered = filtered.filter(interview =>
        interview.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(interview => interview.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(interview => interview.interviewType === typeFilter);
    }

    setFilteredInterviews(filtered);
  }, [interviews, searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'selected':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'hold':
        return 'text-yellow-600';
      case 'next-round':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const InterviewCard = ({ interview }: { interview: Interview }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedInterview(interview)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800 mb-1">{interview.studentName}</h3>
          <p className="text-sm text-slate-600">{interview.companyName} • {interview.position}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(interview.status)}>
            {interview.status}
          </Badge>
          <Badge variant="outline">
            {interview.interviewType}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <CalendarIcon className="w-4 h-4" />
          <span>{new Date(interview.scheduledDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{formatTime(interview.scheduledTime)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          {interview.mode === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
          <span className="capitalize">{interview.mode}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Users className="w-4 h-4" />
          <span>{interview.interviewerName}</span>
        </div>
      </div>

      {interview.feedback && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{interview.feedback.overallRating}/5</span>
              </div>
              <Badge className={getRecommendationColor(interview.feedback.recommendation)}>
                {interview.feedback.recommendation}
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );

  const AnalyticsCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {change && (
              <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Interview Management</h1>
                <p className="text-slate-600">Comprehensive interview scheduling and management system</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowScheduleDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="interviews">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {analytics && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnalyticsCard
                    title="Total Interviews"
                    value={analytics.totalInterviews}
                    change={12}
                    icon={CalendarIcon}
                    color="bg-blue-500"
                  />
                  <AnalyticsCard
                    title="Success Rate"
                    value={`${analytics.successRate}%`}
                    change={5}
                    icon={TrendingUp}
                    color="bg-green-500"
                  />
                  <AnalyticsCard
                    title="Avg Rating"
                    value={analytics.averageRating}
                    change={0.2}
                    icon={Star}
                    color="bg-yellow-500"
                  />
                  <AnalyticsCard
                    title="Completed"
                    value={analytics.completedInterviews}
                    change={8}
                    icon={CheckCircle}
                    color="bg-purple-500"
                  />
                </div>

                {/* Recent Interviews & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Interviews</CardTitle>
                      <CardDescription>Latest interview activities and status updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredInterviews.slice(0, 5).map((interview) => (
                          <div key={interview.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{interview.studentName}</p>
                                <p className="text-sm text-slate-600">{interview.companyName} • {interview.position}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(interview.status)}>
                                {interview.status}
                              </Badge>
                              <p className="text-sm text-slate-500 mt-1">
                                {new Date(interview.scheduledDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    {/* Interview Types Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Interview Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(analytics.interviewsByType).map(([type, count]) => (
                            <div key={type} className="flex items-center justify-between">
                              <span className="text-sm capitalize text-slate-600">{type}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${(count / analytics.totalInterviews) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Performers */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.topPerformingStudents.map((student, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-slate-800">{student.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {student.interviews} interviews
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium">{student.rating}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search interviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="managerial">Managerial</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Interview List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredInterviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Interview and success rate trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.monthlyTrends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{trend.month}</span>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-slate-600">
                              {trend.interviews} interviews
                            </div>
                            <div className="text-sm text-green-600">
                              {Math.round((trend.success / trend.interviews) * 100)}% success
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Company Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Company Performance</CardTitle>
                    <CardDescription>Interview statistics by company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.companyStats.map((company, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{company.company}</span>
                            <span className="text-sm text-slate-600">
                              {company.selections}/{company.interviews}
                            </span>
                          </div>
                          <Progress 
                            value={(company.selections / company.interviews) * 100} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Interview Calendar</CardTitle>
                  <CardDescription>View and manage interview schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredInterviews
                      .filter(interview => interview.scheduledDate === selectedDate?.toISOString().split('T')[0])
                      .map((interview) => (
                        <div key={interview.id} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-800">{formatTime(interview.scheduledTime)}</span>
                            <Badge className={getStatusColor(interview.status)}>
                              {interview.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{interview.studentName}</p>
                          <p className="text-xs text-slate-500">{interview.companyName} • {interview.position}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Settings</CardTitle>
                  <CardDescription>Configure interview management preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Interview Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Reminder Settings</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Send reminder 24 hours before</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Send reminder 1 hour before</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive interview notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">SMS notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Push notifications</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Schedule Interview Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Interview</DialogTitle>
            <DialogDescription>
              Create a new interview appointment with all necessary details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">Rajesh Kumar</SelectItem>
                  <SelectItem value="student2">Priya Sharma</SelectItem>
                  <SelectItem value="student3">Arun Reddy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcs">TCS Digital</SelectItem>
                  <SelectItem value="infosys">Infosys</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="managerial">Managerial</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowScheduleDialog(false)}>
              Schedule Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewManagementPage;