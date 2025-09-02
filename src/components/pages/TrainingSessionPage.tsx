import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageHeader } from '../common/PageHeader';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User,
  BookOpen,
  FileText,
  Video,
  Download,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TrainingSession {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  batch: string;
  description: string;
  objectives: string[];
  materials: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  studentsEnrolled: number;
  attendanceMarked: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  meetingLink?: string;
  recordingUrl?: string;
}

interface TrainingSessionPageProps {
  session: TrainingSession;
}

export const TrainingSessionPage: React.FC<TrainingSessionPageProps> = ({ session }) => {
  const { navigateTo } = useNavigation();
  const [joined, setJoined] = useState(false);

  const mockSession: TrainingSession = {
    id: 1,
    title: 'Advanced React.js Concepts',
    instructor: 'Dr. Lakshmi Narasimhan',
    date: '2025-01-15',
    time: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    venue: 'Lab 301 / Online',
    batch: 'CS-2025-A',
    description: 'Deep dive into advanced React concepts including hooks, context API, performance optimization, and modern patterns. This session will cover real-world applications and best practices.',
    objectives: [
      'Master React hooks and custom hooks',
      'Understand Context API and state management',
      'Learn performance optimization techniques',
      'Implement modern React patterns',
      'Build scalable React applications'
    ],
    materials: [
      { name: 'React Advanced Guide.pdf', type: 'PDF', size: '2.5 MB' },
      { name: 'Code Examples.zip', type: 'ZIP', size: '1.2 MB' },
      { name: 'Practice Exercises.docx', type: 'DOC', size: '850 KB' }
    ],
    studentsEnrolled: 32,
    attendanceMarked: false,
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  };

  const handleJoinSession = () => {
    setJoined(true);
    if (mockSession.meetingLink) {
      window.open(mockSession.meetingLink, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'ongoing': return <Video className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={mockSession.title}
        description={`Training Session by ${mockSession.instructor}`}
        actions={
          <div className="flex items-center space-x-2">
            {mockSession.status === 'upcoming' && (
              <Button onClick={handleJoinSession}>
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </Button>
            )}
            {mockSession.status === 'ongoing' && (
              <Button onClick={handleJoinSession}>
                <Video className="w-4 h-4 mr-2" />
                {joined ? 'Rejoin Session' : 'Join Session'}
              </Button>
            )}
            {mockSession.recordingUrl && (
              <Button variant="outline">
                <Video className="w-4 h-4 mr-2" />
                View Recording
              </Button>
            )}
          </div>
        }
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{mockSession.title}</CardTitle>
                    <CardDescription className="text-lg">
                      Instructor: {mockSession.instructor}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(mockSession.status)}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(mockSession.status)}
                      <span>{mockSession.status.charAt(0).toUpperCase() + mockSession.status.slice(1)}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="font-medium">{mockSession.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div className="font-medium">{mockSession.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Venue</div>
                      <div className="font-medium">{mockSession.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Enrolled</div>
                      <div className="font-medium">{mockSession.studentsEnrolled}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Details */}
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p>{mockSession.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="objectives" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockSession.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="materials" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Materials</CardTitle>
                    <CardDescription>Download resources and materials for this session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockSession.materials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <div>
                              <div className="font-medium">{material.name}</div>
                              <div className="text-sm text-gray-600">
                                {material.type} • {material.size}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Notes</CardTitle>
                    <CardDescription>Take notes during the session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <textarea
                        className="w-full h-64 p-3 border rounded-lg resize-none"
                        placeholder="Take your notes here..."
                      />
                      <Button>
                        <FileText className="w-4 h-4 mr-2" />
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockSession.status !== 'completed' && (
                  <Button className="w-full justify-start" onClick={handleJoinSession}>
                    <Video className="w-4 h-4 mr-2" />
                    {mockSession.status === 'ongoing' ? 'Join Session' : 'Join When Started'}
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discussion Forum
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  View Participants
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigateTo('attendance-marking', { sessionId: mockSession.id })}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Batch:</span>
                  <Badge variant="secondary">{mockSession.batch}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>{mockSession.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students:</span>
                  <span>{mockSession.studentsEnrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Attendance:</span>
                  <span className={mockSession.attendanceMarked ? 'text-green-600' : 'text-red-600'}>
                    {mockSession.attendanceMarked ? 'Marked' : 'Pending'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">{mockSession.instructor}</div>
                    <div className="text-sm text-gray-600">Professor, CSE Department</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Instructor
                </Button>
              </CardContent>
            </Card>

            {/* Related Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Related Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'React Fundamentals', date: 'Jan 12', status: 'completed' },
                  { title: 'State Management', date: 'Jan 18', status: 'upcoming' },
                  { title: 'Testing in React', date: 'Jan 22', status: 'upcoming' }
                ].map((related, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium text-sm">{related.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {related.date} • {related.status}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};