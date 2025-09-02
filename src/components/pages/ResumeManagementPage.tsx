import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import ResumeManager from '../common/ResumeManager';
import { ArrowLeft, FileText, BarChart3, Users, Eye } from 'lucide-react';

interface ResumeManagementPageProps {
  userId: string;
  userName: string;
  userRole: 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';
  onNavigateBack: () => void;
}

const mockResumeAnalytics = {
  totalViews: 47,
  downloadsThisMonth: 12,
  lastViewed: '2024-01-20',
  viewsByCompany: [
    { company: 'TCS', views: 8, date: '2024-01-18' },
    { company: 'Infosys', views: 6, date: '2024-01-17' },
    { company: 'Wipro', views: 4, date: '2024-01-15' },
    { company: 'Cognizant', views: 3, date: '2024-01-14' },
  ],
  applicationStatus: {
    applied: 15,
    shortlisted: 8,
    interviewed: 3,
    offered: 1
  }
};

export default function ResumeManagementPage({ 
  userId, 
  userName, 
  userRole, 
  onNavigateBack 
}: ResumeManagementPageProps) {
  const [activeTab, setActiveTab] = useState('manage');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onNavigateBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Resume Management</h1>
          <p className="text-muted-foreground">Manage your resumes and track their performance</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Total Views</p>
                <p className="text-2xl font-bold">{mockResumeAnalytics.totalViews}</p>
              </div>
              <Eye className="h-4 w-4 ml-auto text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Downloads</p>
                <p className="text-2xl font-bold">{mockResumeAnalytics.downloadsThisMonth}</p>
              </div>
              <FileText className="h-4 w-4 ml-auto text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Applications</p>
                <p className="text-2xl font-bold">{mockResumeAnalytics.applicationStatus.applied}</p>
              </div>
              <BarChart3 className="h-4 w-4 ml-auto text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Shortlisted</p>
                <p className="text-2xl font-bold">{mockResumeAnalytics.applicationStatus.shortlisted}</p>
              </div>
              <Users className="h-4 w-4 ml-auto text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage">Manage Resumes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <ResumeManager
            userId={userId}
            userRole={userRole}
            viewMode="full"
            allowUpload={true}
            showActions={true}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views by Company */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Views by Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResumeAnalytics.viewsByCompany.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.company}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge variant="secondary">{item.views} views</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Applied</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-blue-200 rounded-full">
                        <div className="w-full h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{mockResumeAnalytics.applicationStatus.applied}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Shortlisted</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-green-200 rounded-full">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ 
                            width: `${(mockResumeAnalytics.applicationStatus.shortlisted / mockResumeAnalytics.applicationStatus.applied) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{mockResumeAnalytics.applicationStatus.shortlisted}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Interviewed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-yellow-200 rounded-full">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ 
                            width: `${(mockResumeAnalytics.applicationStatus.interviewed / mockResumeAnalytics.applicationStatus.applied) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{mockResumeAnalytics.applicationStatus.interviewed}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Offered</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-purple-200 rounded-full">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ 
                            width: `${(mockResumeAnalytics.applicationStatus.offered / mockResumeAnalytics.applicationStatus.applied) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{mockResumeAnalytics.applicationStatus.offered}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <p className="text-muted-foreground">
                Create professional resumes using our built-in template system
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Template Options */}
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                      <h3 className="font-medium mb-2">Professional Template</h3>
                      <p className="text-sm text-muted-foreground">Clean and modern design perfect for corporate roles</p>
                      <Button className="mt-4 w-full" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-green-500" />
                      <h3 className="font-medium mb-2">Technical Template</h3>
                      <p className="text-sm text-muted-foreground">Designed for software engineering and IT roles</p>
                      <Button className="mt-4 w-full" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                      <h3 className="font-medium mb-2">Creative Template</h3>
                      <p className="text-sm text-muted-foreground">Vibrant design for creative and design roles</p>
                      <Button className="mt-4 w-full" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}