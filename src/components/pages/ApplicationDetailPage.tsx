import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, User, Building, Calendar, Clock, Phone, Mail, 
  MapPin, Star, Download, Edit, CheckCircle, AlertCircle,
  FileText, MessageSquare, History, Settings, Eye
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import ResumeManager from '../common/ResumeManager';
import BreadcrumbNavigation from '../common/BreadcrumbNavigation';

interface ApplicationDetailPageProps {
  application?: any;
}

export const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = ({ application }) => {
  const { goBack, navigateTo } = useNavigation();
  
  // Mock application data if not provided
  const appData = application || {
    id: 1,
    studentName: 'Arjun Raghavan',
    rollNo: 'AP24322130125',
    email: 'arjun_raghavan@srmap.edu.in',
    phone: '+91 9876543125',
    company: 'Microsoft India',
    jobTitle: 'Software Engineer',
    department: 'Computer Science Engineering',
    cgpa: 8.95,
    status: 'shortlisted',
    appliedDate: '2025-01-10',
    interviewDate: '2025-01-20',
    ctc: '₹18.5 LPA',
    type: 'Full-time',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    skills: ['Java', 'Spring Boot', 'React', 'SQL', 'AWS'],
    nextRound: 'Technical Interview Round 2',
    applicationScore: 85,
    notes: 'Strong technical background, excellent academic record',
    timeline: [
      { date: '2025-01-10', event: 'Application Submitted', status: 'completed' },
      { date: '2025-01-12', event: 'Application Reviewed', status: 'completed' },
      { date: '2025-01-15', event: 'Initial Screening', status: 'completed' },
      { date: '2025-01-18', event: 'Technical Assessment', status: 'completed' },
      { date: '2025-01-20', event: 'Technical Interview Round 1', status: 'upcoming' },
      { date: '2025-01-22', event: 'Technical Interview Round 2', status: 'pending' },
      { date: '2025-01-25', event: 'HR Interview', status: 'pending' },
      { date: '2025-01-28', event: 'Final Decision', status: 'pending' }
    ]
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'selected': return 'success-light';
      case 'shortlisted': return 'info-light';
      case 'in-review': return 'warning-light';
      case 'rejected': return 'error-light';
      default: return 'warning-light';
    }
  };

  const getTimelineStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Application Details</h1>
              <p className="text-slate-600">{appData.company} - {appData.jobTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigateTo('application-edit', appData, 'Edit Application')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button onClick={() => navigateTo('interview-scheduler', appData, 'Schedule Interview')}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Information */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-6">
              <CardHeader>
                <CardTitle className="text-slate-800">Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {appData.studentName.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{appData.studentName}</h4>
                    <p className="text-sm text-slate-600">{appData.rollNo}</p>
                    <p className="text-sm text-slate-600">{appData.department}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-3" />
                    {appData.email}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-3" />
                    {appData.phone}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Star className="w-4 h-4 mr-3" />
                    CGPA: {appData.cgpa}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h5 className="font-medium text-slate-800 mb-3">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {appData.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-800">{appData.applicationScore}</div>
                    <div className="text-sm text-slate-600">Application Score</div>
                  </div>
                </div>

                {/* Resume Quick Access */}
                <div className="pt-4 border-t border-slate-200">
                  <h5 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Student Resume
                  </h5>
                  <ResumeManager
                    userId={appData.rollNo}
                    userRole="faculty"
                    viewMode="recruiter"
                    allowUpload={false}
                    showActions={false}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20 rounded-xl p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Timeline</TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Documents</TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Application Status */}
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Application Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-600">Current Status</label>
                          <div className="mt-1">
                            <Badge className={getStatusBadgeClass(appData.status)} size="lg">
                              {appData.status.charAt(0).toUpperCase() + appData.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-600">Applied Date</label>
                          <div className="text-slate-800 font-medium">{appData.appliedDate}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-600">Next Round</label>
                          <div className="text-slate-800 font-medium">{appData.nextRound}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-600">Interview Date</label>
                          <div className="text-slate-800 font-medium">{appData.interviewDate}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-600">Package Offered</label>
                          <div className="text-slate-800 font-medium">{appData.ctc}</div>
                        </div>
                        <div>
                          <label className="text-sm text-slate-600">Work Mode</label>
                          <div className="text-slate-800 font-medium">{appData.workMode}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Details */}
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-lg">{appData.jobTitle}</h4>
                        <p className="text-slate-600 font-medium">{appData.company}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appData.location}
                          </div>
                          <Badge variant="outline">{appData.type}</Badge>
                          <Badge variant="outline">{appData.workMode}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-800">{appData.ctc}</div>
                        <div className="text-sm text-slate-600">Package</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Application Timeline</CardTitle>
                    <CardDescription>Track the progress of this application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appData.timeline.map((item: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${getTimelineStatusClass(item.status)}`}></div>
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-slate-800">{item.event}</h4>
                              <p className="text-sm text-slate-600">{item.date}</p>
                            </div>
                            <Badge variant="outline" className={
                              item.status === 'completed' ? 'success-light' :
                              item.status === 'upcoming' ? 'info-light' : 'warning-light'
                            }>
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Application Documents</CardTitle>
                    <CardDescription>Student's submitted documents and files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Resume.pdf', size: '245 KB', uploaded: '2025-01-10' },
                        { name: 'Cover Letter.pdf', size: '89 KB', uploaded: '2025-01-10' },
                        { name: 'Academic Transcript.pdf', size: '156 KB', uploaded: '2025-01-10' },
                        { name: 'Certificates.zip', size: '2.1 MB', uploaded: '2025-01-12' }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-8 h-8 text-slate-600" />
                            <div>
                              <h4 className="font-medium text-slate-800">{doc.name}</h4>
                              <p className="text-sm text-slate-600">{doc.size} • Uploaded {doc.uploaded}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Application Notes</CardTitle>
                    <CardDescription>Internal notes and comments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-800">Initial Assessment</h5>
                          <span className="text-sm text-slate-600">2025-01-12</span>
                        </div>
                        <p className="text-slate-600">{appData.notes}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-blue-800">Technical Screening</h5>
                          <span className="text-sm text-blue-600">2025-01-15</span>
                        </div>
                        <p className="text-blue-700">Performed well in coding assessment. Strong problem-solving skills demonstrated.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};