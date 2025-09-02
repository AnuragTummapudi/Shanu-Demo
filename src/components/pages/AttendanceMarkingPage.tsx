import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  QrCode, 
  RefreshCw, 
  Camera, 
  Users, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Scan,
  UserCheck,
  UserX
} from 'lucide-react';
import { getDataByRole } from '../data/comprehensiveData';
import { toast } from 'sonner';

interface AttendanceMarkingPageProps {
  userRole: string;
}

// Enhanced QR Code Component with more features
const AdvancedQRAttendance: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const [sessionActive, setSessionActive] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [sessionId, setSessionId] = useState<string>('');
  const [sessionStartTime, setSessionStartTime] = useState<string>('');
  const [attendedStudents, setAttendedStudents] = useState<string[]>([]);

  // Generate random QR code data with session info
  const generateQRCode = () => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    return `ATTENDANCE_${sessionId}_${timestamp}_${randomId}`;
  };

  // Auto-refresh QR code every 3 seconds
  useEffect(() => {
    if (sessionActive) {
      const interval = setInterval(() => {
        setQrCode(generateQRCode());
        setTimeRemaining(3);
        
        // Simulate attendance scanning with realistic names
        const studentNames = ['Rajesh Kumar', 'Priya Sharma', 'Arjun Reddy', 'Kavya Nair', 'Vikram Singh'];
        const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)];
        
        if (Math.random() > 0.5 && !attendedStudents.includes(randomStudent)) {
          setAttendedStudents(prev => [...prev, randomStudent]);
          setAttendanceCount(prev => prev + 1);
          toast.success(`${randomStudent} marked present`, {
            position: "top-right",
            duration: 2000,
          });
        }
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
  }, [sessionActive, sessionId, attendedStudents]);

  const startAttendanceSession = () => {
    const newSessionId = `SESSION_${Date.now()}`;
    setSessionId(newSessionId);
    setSessionActive(true);
    setQrCode(generateQRCode());
    setAttendanceCount(0);
    setAttendedStudents([]);
    setTimeRemaining(3);
    setSessionStartTime(new Date().toLocaleTimeString());
    toast.success('Attendance session started! Students can now scan the QR code.');
  };

  const stopAttendanceSession = () => {
    setSessionActive(false);
    setQrCode('');
    const endTime = new Date().toLocaleTimeString();
    toast.success(
      `Attendance session ended. ${attendanceCount} students marked present. Session: ${sessionStartTime} - ${endTime}`,
      { duration: 5000 }
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-primary" />
            <span>Live QR Code Attendance</span>
            {sessionActive && (
              <Badge variant="default" className="ml-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live Session
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!sessionActive ? (
            <div className="text-center space-y-6">
              <div className="p-12 border-2 border-dashed border-muted rounded-lg">
                <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Start Attendance</h3>
                <p className="text-muted-foreground mb-4">
                  Students will use their mobile devices to scan the QR code and mark attendance
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="w-4 h-4" />
                    <span>Auto-refreshes every 3 seconds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Scan className="w-4 h-4" />
                    <span>Real-time scanning</span>
                  </div>
                </div>
              </div>
              <Button onClick={startAttendanceSession} size="lg" className="px-8">
                <QrCode className="w-4 h-4 mr-2" />
                Start Attendance Session
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* QR Code Display */}
                <div className="text-center">
                  <div className="bg-white p-8 rounded-lg border-2 border-primary mb-4 inline-block shadow-lg">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                      <div className="text-white font-mono text-xs break-all p-4 text-center z-10">
                        {qrCode}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>QR code updates every 3 seconds</span>
                  </div>
                  <div className="mt-2 text-primary font-medium">
                    Next update in {timeRemaining} seconds
                  </div>
                </div>

                {/* Session Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">{attendanceCount}</div>
                      <p className="text-sm text-muted-foreground">Students Present</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{timeRemaining}</div>
                      <p className="text-sm text-muted-foreground">Seconds Left</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Session Details</span>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>Session ID: {sessionId}</div>
                      <div>Started: {sessionStartTime}</div>
                      <div>Status: Active</div>
                    </div>
                  </div>

                  {/* Recently Attended */}
                  {attendedStudents.length > 0 && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <UserCheck className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Recently Marked Present</span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {attendedStudents.slice(-5).reverse().map((student, index) => (
                          <div key={index} className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                            {student}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={stopAttendanceSession} 
                  variant="outline" 
                  size="lg"
                  className="px-8"
                >
                  End Session
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Manual Attendance Component
const ManualAttendance: React.FC<{ students: any[] }> = ({ students }) => {
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | null>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAttendance = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    const presentCount = Object.values(attendance).filter(status => status === 'present').length;
    const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
    
    toast.success(`Attendance saved! ${presentCount} present, ${absentCount} absent`);
  };

  const markAllPresent = () => {
    const allPresent: Record<string, 'present'> = {};
    filteredStudents.forEach(student => {
      allPresent[student.id] = 'present';
    });
    setAttendance(allPresent);
    toast.success('All students marked present');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Manual Attendance</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={markAllPresent}>
              <UserCheck className="w-4 h-4 mr-2" />
              Mark All Present
            </Button>
            <Button onClick={saveAttendance}>
              Save Attendance
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{filteredStudents.length}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">
              {Object.values(attendance).filter(status => status === 'present').length}
            </div>
            <p className="text-sm text-muted-foreground">Present</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-destructive">
              {Object.values(attendance).filter(status => status === 'absent').length}
            </div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium text-xs">
                    {student.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                  onClick={() => markAttendance(student.id, 'present')}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Present
                </Button>
                <Button
                  size="sm"
                  variant={attendance[student.id] === 'absent' ? 'destructive' : 'outline'}
                  onClick={() => markAttendance(student.id, 'absent')}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Absent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Attendance Reports Component
const AttendanceReports: React.FC = () => {
  const attendanceData = [
    { date: '2024-02-01', present: 45, absent: 3, total: 48 },
    { date: '2024-02-02', present: 46, absent: 2, total: 48 },
    { date: '2024-02-03', present: 44, absent: 4, total: 48 },
    { date: '2024-02-04', present: 47, absent: 1, total: 48 },
    { date: '2024-02-05', present: 43, absent: 5, total: 48 },
  ];

  const exportAttendanceReport = () => {
    toast.success('Attendance report exported successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Attendance Reports</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportAttendanceReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">94.2%</div>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">225</div>
                <p className="text-sm text-muted-foreground">Total Present</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">15</div>
                <p className="text-sm text-muted-foreground">Total Absent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-info">5</div>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted">
              <h4 className="font-medium">Recent Attendance Sessions</h4>
            </div>
            <div className="divide-y">
              {attendanceData.map((session, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{new Date(session.date).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Total: {session.total} students
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-success">{session.present}</div>
                      <div className="text-xs text-muted-foreground">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-destructive">{session.absent}</div>
                      <div className="text-xs text-muted-foreground">Absent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {((session.present / session.total) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AttendanceMarkingPage: React.FC<AttendanceMarkingPageProps> = ({ userRole }) => {
  const students = getDataByRole(userRole, 'students') || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">
            Mark attendance using QR codes or manual entry
          </p>
        </div>
      </div>

      <Tabs defaultValue="qr-attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="qr-attendance" className="flex items-center space-x-2">
            <QrCode className="w-4 h-4" />
            <span>QR Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="manual-attendance" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Manual Entry</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="qr-attendance" className="mt-6">
          <AdvancedQRAttendance />
        </TabsContent>

        <TabsContent value="manual-attendance" className="mt-6">
          <ManualAttendance students={students} />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <AttendanceReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceMarkingPage;