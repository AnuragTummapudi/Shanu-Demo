import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  CheckCircle, 
  Award,
  TrendingUp,
  Filter,
  Download,
  Search,
  Calendar,
  BookOpen
} from 'lucide-react';

// Training data with detailed participant information
const trainingPrograms = [
  {
    id: 'train_001',
    title: 'Full Stack Web Development Bootcamp',
    trainer: 'Dr. Lakshmi Venkatesh',
    duration: '12 weeks',
    startDate: '2024-01-15',
    endDate: '2024-04-05',
    mode: 'Hybrid',
    status: 'Ongoing',
    participants: [
      {
        studentId: 'std_csit_001',
        studentName: 'Rajesh Kumar',
        school: 'School of Computing & Information Technology',
        department: 'Computer Science & Engineering',
        attendancePercentage: 95,
        preEvaluationScore: 72,
        postEvaluationScore: 89,
        currentScore: 89, // Most recent
        certificateIssued: false,
        status: 'Active',
        performanceRating: 'Excellent'
      },
      {
        studentId: 'std_csit_002',
        studentName: 'Priya Sharma',
        school: 'School of Computing & Information Technology',
        department: 'Computer Science & Engineering',
        attendancePercentage: 92,
        preEvaluationScore: 78,
        postEvaluationScore: 91,
        currentScore: 91,
        certificateIssued: false,
        status: 'Active',
        performanceRating: 'Excellent'
      },
      {
        studentId: 'std_csit_003',
        studentName: 'Arun Reddy',
        school: 'School of Computing & Information Technology',
        department: 'Information Technology',
        attendancePercentage: 88,
        preEvaluationScore: 65,
        postEvaluationScore: 82,
        currentScore: 82,
        certificateIssued: false,
        status: 'Active',
        performanceRating: 'Good'
      },
      {
        studentId: 'std_csit_004',
        studentName: 'Meera Nair',
        school: 'School of Computing & Information Technology',
        department: 'Computer Science & Engineering',
        attendancePercentage: 97,
        preEvaluationScore: 85,
        postEvaluationScore: 94,
        currentScore: 94,
        certificateIssued: false,
        status: 'Active',
        performanceRating: 'Excellent'
      },
      {
        studentId: 'std_csit_005',
        studentName: 'Suresh Babu',
        school: 'School of Computing & Information Technology',
        department: 'Computer Science & Engineering',
        attendancePercentage: 75,
        preEvaluationScore: 58,
        postEvaluationScore: 68,
        currentScore: 68,
        certificateIssued: false,
        status: 'Needs Improvement',
        performanceRating: 'Needs Improvement'
      }
    ]
  },
  {
    id: 'train_002',
    title: 'Digital Marketing & Analytics',
    trainer: 'Dr. Meera Krishnan',
    duration: '8 weeks',
    startDate: '2024-02-01',
    endDate: '2024-03-25',
    mode: 'Online',
    status: 'Upcoming',
    participants: [
      {
        studentId: 'std_bus_011',
        studentName: 'Arjun Varma',
        school: 'School of Business & Management',
        department: 'Business Administration',
        attendancePercentage: 0,
        preEvaluationScore: 68,
        postEvaluationScore: 0,
        currentScore: 68,
        certificateIssued: false,
        status: 'Enrolled',
        performanceRating: 'Not Started'
      }
    ]
  }
];

interface TrainingProgressDashboardProps {
  userRole: 'admin' | 'operations' | 'faculty';
}

const TrainingProgressDashboard: React.FC<TrainingProgressDashboardProps> = ({ userRole }) => {
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get performance color coding
  const getPerformanceColor = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-orange-100 text-orange-800';
      case 'Needs Improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get attendance color coding
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  // Calculate overall statistics
  const allParticipants = trainingPrograms.flatMap(program => 
    program.participants.map(p => ({ ...p, programTitle: program.title }))
  );

  const filteredParticipants = allParticipants.filter(participant => {
    const matchesSearch = participant.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.programTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus;
    const matchesProgram = selectedProgram === 'all' || 
                          trainingPrograms.find(p => p.title === participant.programTitle)?.id === selectedProgram;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const stats = {
    totalParticipants: allParticipants.length,
    activeParticipants: allParticipants.filter(p => p.status === 'Active').length,
    averageAttendance: Math.round(allParticipants.reduce((sum, p) => sum + p.attendancePercentage, 0) / allParticipants.length),
    averageImprovement: Math.round(allParticipants.reduce((sum, p) => sum + (p.currentScore - p.preEvaluationScore), 0) / allParticipants.length)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold">Training Progress Dashboard</h2>
          <p className="text-muted-foreground">Monitor student attendance and evaluation scores</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{stats.totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Participants</p>
                <p className="text-2xl font-bold">{stats.activeParticipants}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">{stats.averageAttendance}%</p>
              </div>
              <Clock className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Improvement</p>
                <p className="text-2xl font-bold">+{stats.averageImprovement}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {allParticipants.filter(p => p.performanceRating === 'Excellent').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Excellent</div>
                  <Progress 
                    value={(allParticipants.filter(p => p.performanceRating === 'Excellent').length / allParticipants.length) * 100} 
                    className="mt-2" 
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {allParticipants.filter(p => p.performanceRating === 'Good').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Good</div>
                  <Progress 
                    value={(allParticipants.filter(p => p.performanceRating === 'Good').length / allParticipants.length) * 100} 
                    className="mt-2" 
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {allParticipants.filter(p => p.performanceRating === 'Needs Improvement').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Needs Improvement</div>
                  <Progress 
                    value={(allParticipants.filter(p => p.performanceRating === 'Needs Improvement').length / allParticipants.length) * 100} 
                    className="mt-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Programs Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Training Programs Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingPrograms.map((program) => (
                  <div key={program.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{program.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Trainer: {program.trainer} • {program.duration} • {program.mode}
                        </p>
                      </div>
                      <Badge className={
                        program.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                        program.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {program.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Participants:</span>
                        <p className="text-muted-foreground">{program.participants.length}</p>
                      </div>
                      <div>
                        <span className="font-medium">Avg Attendance:</span>
                        <p className="text-muted-foreground">
                          {Math.round(program.participants.reduce((sum, p) => sum + p.attendancePercentage, 0) / program.participants.length)}%
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Avg Score:</span>
                        <p className="text-muted-foreground">
                          {Math.round(program.participants.reduce((sum, p) => sum + p.currentScore, 0) / program.participants.length)}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Start Date:</span>
                        <p className="text-muted-foreground">{program.startDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {trainingPrograms.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Enrolled">Enrolled</SelectItem>
                    <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Participants Table */}
          <Card>
            <CardHeader>
              <CardTitle>Participant Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredParticipants.map((participant) => (
                  <div key={participant.studentId} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{participant.studentName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {participant.department} • {participant.programTitle}
                        </p>
                      </div>
                      <Badge className={getPerformanceColor(participant.performanceRating)}>
                        {participant.performanceRating}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-sm font-medium">Attendance</div>
                        <div className={`text-lg font-bold ${getAttendanceColor(participant.attendancePercentage)}`}>
                          {participant.attendancePercentage}%
                        </div>
                        <Progress value={participant.attendancePercentage} className="mt-1" />
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Pre-Evaluation</div>
                        <div className="text-lg font-bold">{participant.preEvaluationScore}</div>
                        <div className="text-xs text-muted-foreground">Initial Score</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Current Score</div>
                        <div className="text-lg font-bold">{participant.currentScore}</div>
                        <div className="text-xs text-muted-foreground">Latest Assessment</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Improvement</div>
                        <div className={`text-lg font-bold ${
                          (participant.currentScore - participant.preEvaluationScore) > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {participant.currentScore - participant.preEvaluationScore > 0 ? '+' : ''}
                          {participant.currentScore - participant.preEvaluationScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Points</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Status</div>
                        <Badge variant="outline" className="mt-1">
                          {participant.status}
                        </Badge>
                        {participant.certificateIssued && (
                          <div className="flex items-center mt-1 text-xs text-green-600">
                            <Award className="w-3 h-3 mr-1" />
                            Certificate Issued
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {program.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {program.startDate} - {program.endDate}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Trainer:</span>
                      <p className="text-muted-foreground">{program.trainer}</p>
                    </div>
                    <div>
                      <span className="font-medium">Mode:</span>
                      <p className="text-muted-foreground">{program.mode}</p>
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p className="text-muted-foreground">{program.duration}</p>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge className={
                        program.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                        program.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {program.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium">Participants ({program.participants.length})</h5>
                    <div className="space-y-2">
                      {program.participants.map((participant) => (
                        <div key={participant.studentId} className="flex justify-between items-center text-sm">
                          <span>{participant.studentName}</span>
                          <div className="flex items-center gap-2">
                            <span className={getAttendanceColor(participant.attendancePercentage)}>
                              {participant.attendancePercentage}%
                            </span>
                            <Badge size="sm" className={getPerformanceColor(participant.performanceRating)}>
                              {participant.performanceRating}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingProgressDashboard;