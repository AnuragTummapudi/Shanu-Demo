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
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Play,
  Pause,
  Square,
  Video,
  FileText,
  Download,
  Upload,
  Plus,
  Edit,
  Search,
  Filter,
  Star,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  Award,
  Briefcase,
  User,
  Mail,
  Settings,
  RefreshCw,
  Zap,
  Brain,
  Shield,
  Globe,
  Clipboard,
  Monitor,
  Headphones,
  Camera,
  Mic,
  Share2,
  Eye,
  ExternalLink,
  MapPin,
  Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../navigation/NavigationProvider';

interface TrainingSession {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: 'technical' | 'soft-skills' | 'placement-prep' | 'industry-specific' | 'certification';
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'online' | 'offline' | 'hybrid';
  scheduledDate: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  maxParticipants: number;
  enrolledCount: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
  location?: string;
  materials: Array<{
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'ppt' | 'doc' | 'link';
    url: string;
    size?: string;
  }>;
  agenda: Array<{
    id: string;
    topic: string;
    duration: number;
    completed: boolean;
  }>;
  prerequisites: string[];
  outcomes: string[];
  tags: string[];
  feedback: Array<{
    studentId: string;
    studentName: string;
    rating: number;
    comment: string;
    submittedAt: string;
  }>;
  attendance: Array<{
    studentId: string;
    studentName: string;
    status: 'present' | 'absent' | 'late';
    joinTime?: string;
    leaveTime?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface TrainingAnalytics {
  totalSessions: number;
  completedSessions: number;
  avgRating: number;
  totalParticipants: number;
  completionRate: number;
  sessionsByCategory: Record<string, number>;
  sessionsByStatus: Record<string, number>;
  monthlyStats: Array<{ month: string; sessions: number; participants: number }>;
  topInstructors: Array<{ name: string; sessions: number; rating: number }>;
  popularCategories: Array<{ category: string; enrollment: number; rating: number }>;
}

const TrainingManagementPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<TrainingSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [analytics, setAnalytics] = useState<TrainingAnalytics | null>(null);
  const [currentSession, setCurrentSession] = useState<TrainingSession | null>(null);

  // Mock data initialization
  useEffect(() => {
    const mockSessions: TrainingSession[] = [
      {
        id: '1',
        title: 'React Advanced Patterns',
        description: 'Deep dive into advanced React patterns including hooks, context, and performance optimization.',
        instructorId: 'instructor1',
        instructorName: 'Dr. Lakshmi Venkatesh',
        category: 'technical',
        level: 'advanced',
        type: 'online',
        scheduledDate: '2024-01-25',
        startTime: '10:00',
        endTime: '12:00',
        duration: 120,
        maxParticipants: 50,
        enrolledCount: 35,
        status: 'published',
        meetingLink: 'https://meet.google.com/react-advanced-patterns',
        materials: [
          { id: '1', name: 'React Patterns Guide.pdf', type: 'pdf', url: '/materials/react-patterns.pdf', size: '2.5 MB' },
          { id: '2', name: 'Code Examples', type: 'link', url: 'https://github.com/examples/react-patterns' },
          { id: '3', name: 'Video Tutorial', type: 'video', url: '/videos/react-intro.mp4', size: '150 MB' }
        ],
        agenda: [
          { id: '1', topic: 'Custom Hooks', duration: 30, completed: false },
          { id: '2', topic: 'Context API', duration: 30, completed: false },
          { id: '3', topic: 'Performance Optimization', duration: 40, completed: false },
          { id: '4', topic: 'Q&A Session', duration: 20, completed: false }
        ],
        prerequisites: ['Basic React knowledge', 'JavaScript ES6+', 'Understanding of components'],
        outcomes: ['Master advanced React patterns', 'Optimize React applications', 'Implement custom hooks'],
        tags: ['react', 'javascript', 'frontend', 'advanced'],
        feedback: [
          { studentId: '1', studentName: 'Rajesh Kumar', rating: 5, comment: 'Excellent session!', submittedAt: '2024-01-20' },
          { studentId: '2', studentName: 'Priya Sharma', rating: 4, comment: 'Very informative', submittedAt: '2024-01-20' }
        ],
        attendance: [
          { studentId: '1', studentName: 'Rajesh Kumar', status: 'present', joinTime: '10:00', leaveTime: '12:00' },
          { studentId: '2', studentName: 'Priya Sharma', status: 'present', joinTime: '10:05', leaveTime: '11:55' }
        ],
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        title: 'Interview Preparation Workshop',
        description: 'Comprehensive workshop covering technical and HR interview preparation strategies.',
        instructorId: 'instructor2',
        instructorName: 'Prof. Krishna Murthy',
        category: 'placement-prep',
        level: 'intermediate',
        type: 'hybrid',
        scheduledDate: '2024-01-28',
        startTime: '14:00',
        endTime: '17:00',
        duration: 180,
        maxParticipants: 30,
        enrolledCount: 28,
        status: 'published',
        meetingLink: 'https://zoom.us/j/interview-prep',
        location: 'Training Hall B, Main Campus',
        materials: [
          { id: '4', name: 'Interview Questions Bank.pdf', type: 'pdf', url: '/materials/interview-questions.pdf', size: '1.8 MB' },
          { id: '5', name: 'Resume Templates', type: 'doc', url: '/materials/resume-templates.docx', size: '500 KB' }
        ],
        agenda: [
          { id: '1', topic: 'Technical Interview Prep', duration: 60, completed: false },
          { id: '2', topic: 'HR Interview Skills', duration: 60, completed: false },
          { id: '3', topic: 'Mock Interviews', duration: 45, completed: false },
          { id: '4', topic: 'Feedback Session', duration: 15, completed: false }
        ],
        prerequisites: ['Basic programming knowledge', 'Updated resume'],
        outcomes: ['Ace technical interviews', 'Master behavioral questions', 'Build confidence'],
        tags: ['interview', 'placement', 'career', 'skills'],
        feedback: [],
        attendance: [],
        createdAt: '2024-01-18T11:00:00Z',
        updatedAt: '2024-01-18T11:00:00Z'
      },
      {
        id: '3',
        title: 'Communication Skills Enhancement',
        description: 'Improve verbal and non-verbal communication skills for professional success.',
        instructorId: 'instructor3',
        instructorName: 'Dr. Sangeetha Ravi',
        category: 'soft-skills',
        level: 'beginner',
        type: 'offline',
        scheduledDate: '2024-01-30',
        startTime: '09:00',
        endTime: '12:00',
        duration: 180,
        maxParticipants: 25,
        enrolledCount: 22,
        status: 'published',
        location: 'Seminar Hall A, Academic Block',
        materials: [
          { id: '6', name: 'Communication Handbook.pdf', type: 'pdf', url: '/materials/communication-guide.pdf', size: '3.2 MB' },
          { id: '7', name: 'Practice Exercises', type: 'doc', url: '/materials/practice-exercises.docx', size: '800 KB' }
        ],
        agenda: [
          { id: '1', topic: 'Verbal Communication', duration: 60, completed: false },
          { id: '2', topic: 'Body Language', duration: 45, completed: false },
          { id: '3', topic: 'Presentation Skills', duration: 60, completed: false },
          { id: '4', topic: 'Group Activities', duration: 15, completed: false }
        ],
        prerequisites: ['None'],
        outcomes: ['Improve speaking confidence', 'Master body language', 'Enhance presentation skills'],
        tags: ['communication', 'soft-skills', 'presentation', 'confidence'],
        feedback: [],
        attendance: [],
        createdAt: '2024-01-19T14:00:00Z',
        updatedAt: '2024-01-19T14:00:00Z'
      }
    ];

    const mockAnalytics: TrainingAnalytics = {
      totalSessions: 25,
      completedSessions: 18,
      avgRating: 4.3,
      totalParticipants: 450,
      completionRate: 85,
      sessionsByCategory: {
        technical: 10,
        'soft-skills': 8,
        'placement-prep': 5,
        'industry-specific': 2
      },
      sessionsByStatus: {
        published: 7,
        completed: 18,
        draft: 2,
        ongoing: 1
      },
      monthlyStats: [
        { month: 'Sep', sessions: 4, participants: 80 },
        { month: 'Oct', sessions: 6, participants: 120 },
        { month: 'Nov', sessions: 8, participants: 160 },
        { month: 'Dec', sessions: 5, participants: 90 },
        { month: 'Jan', sessions: 2, participants: 35 }
      ],
      topInstructors: [
        { name: 'Dr. Lakshmi Venkatesh', sessions: 8, rating: 4.5 },
        { name: 'Prof. Krishna Murthy', sessions: 6, rating: 4.2 },
        { name: 'Dr. Sangeetha Ravi', sessions: 5, rating: 4.4 }
      ],
      popularCategories: [
        { category: 'Technical', enrollment: 180, rating: 4.4 },
        { category: 'Soft Skills', enrollment: 150, rating: 4.2 },
        { category: 'Placement Prep', enrollment: 120, rating: 4.3 }
      ]
    };

    setSessions(mockSessions);
    setFilteredSessions(mockSessions);
    setAnalytics(mockAnalytics);
  }, []);

  // Filter sessions
  useEffect(() => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(session => session.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-purple-100 text-purple-800';
      case 'soft-skills':
        return 'bg-green-100 text-green-800';
      case 'placement-prep':
        return 'bg-orange-100 text-orange-800';
      case 'industry-specific':
        return 'bg-blue-100 text-blue-800';
      case 'certification':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const SessionCard = ({ session }: { session: TrainingSession }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedSession(session)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-2">{session.title}</h3>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{session.description}</p>
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={getCategoryColor(session.category)}>
              {session.category.replace('-', ' ')}
            </Badge>
            <Badge variant="outline">{session.level}</Badge>
            <Badge variant="outline" className="capitalize">{session.type}</Badge>
          </div>
        </div>
        <Badge className={getStatusColor(session.status)}>
          {session.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(session.scheduledDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <User className="w-4 h-4" />
          <span>{session.instructorName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Users className="w-4 h-4" />
          <span>{session.enrolledCount}/{session.maxParticipants}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {session.feedback.length > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">
                {(session.feedback.reduce((sum, f) => sum + f.rating, 0) / session.feedback.length).toFixed(1)}
              </span>
            </div>
          )}
          <div className="text-sm text-slate-500">
            {session.materials.length} materials
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {session.type === 'online' && session.meetingLink && (
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
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
                <h1 className="text-2xl font-bold text-slate-800">Training Management</h1>
                <p className="text-slate-600">Create, manage, and track training sessions and workshops</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Session
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
            <TabsTrigger value="sessions">
              <BookOpen className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="materials">
              <FileText className="w-4 h-4 mr-2" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
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
                    title="Total Sessions"
                    value={analytics.totalSessions}
                    change={15}
                    icon={BookOpen}
                    color="bg-blue-500"
                  />
                  <AnalyticsCard
                    title="Completion Rate"
                    value={`${analytics.completionRate}%`}
                    change={8}
                    icon={CheckCircle}
                    color="bg-green-500"
                  />
                  <AnalyticsCard
                    title="Avg Rating"
                    value={analytics.avgRating}
                    change={0.3}
                    icon={Star}
                    color="bg-yellow-500"
                  />
                  <AnalyticsCard
                    title="Total Participants"
                    value={analytics.totalParticipants}
                    change={22}
                    icon={Users}
                    color="bg-purple-500"
                  />
                </div>

                {/* Recent Sessions & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Next training sessions scheduled</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredSessions
                          .filter(session => session.status === 'published')
                          .slice(0, 4)
                          .map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <BookOpen className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800">{session.title}</p>
                                  <p className="text-sm text-slate-600">{session.instructorName}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {new Date(session.scheduledDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {formatTime(session.startTime)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    {/* Category Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.popularCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">{category.category}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{category.enrollment}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs">{category.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Instructors */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Instructors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.topInstructors.map((instructor, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-800">{instructor.name}</p>
                                <p className="text-xs text-slate-500">{instructor.sessions} sessions</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium">{instructor.rating}</span>
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

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search sessions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      <SelectItem value="placement-prep">Placement Prep</SelectItem>
                      <SelectItem value="industry-specific">Industry Specific</SelectItem>
                      <SelectItem value="certification">Certification</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Session List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Materials</CardTitle>
                  <CardDescription>Add training materials and resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-sm text-slate-500">Support for PDF, DOC, PPT, MP4 files</p>
                    <Button className="mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Materials</CardTitle>
                  <CardDescription>Recently uploaded training materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessions.flatMap(session => session.materials).slice(0, 6).map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{material.name}</p>
                            <p className="text-xs text-slate-500">{material.type.toUpperCase()} • {material.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Training Stats</CardTitle>
                    <CardDescription>Sessions and participant trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.monthlyStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{stat.month}</span>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-slate-600">
                              {stat.sessions} sessions
                            </div>
                            <div className="text-sm text-blue-600">
                              {stat.participants} participants
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>Session distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analytics.sessionsByCategory).map(([category, count]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 capitalize">{category.replace('-', ' ')}</span>
                            <span className="text-sm text-slate-600">{count} sessions</span>
                          </div>
                          <Progress 
                            value={(count / analytics.totalSessions) * 100} 
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

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Settings</CardTitle>
                  <CardDescription>Configure training session preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Session Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Max Participants</Label>
                    <Input type="number" placeholder="50" />
                  </div>

                  <div className="space-y-2">
                    <Label>Auto-recording</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Automatically record online sessions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage training notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Email reminders to participants</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">SMS notifications for urgent updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Push notifications for mobile app</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Session Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Training Session</DialogTitle>
            <DialogDescription>
              Set up a new training session with all necessary details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Session Title</Label>
              <Input placeholder="Enter session title" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="placement-prep">Placement Prep</SelectItem>
                  <SelectItem value="industry-specific">Industry Specific</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Session Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
              <Label>Start Time</Label>
              <Input type="time" />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input type="number" placeholder="120" />
            </div>
            <div className="space-y-2">
              <Label>Max Participants</Label>
              <Input type="number" placeholder="50" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter session description and objectives" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>
              Create & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingManagementPage;