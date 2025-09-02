import React, { useState } from 'react';
import { useNavigation } from './navigation/NavigationProvider';
import DashboardLayout from './common/DashboardLayout';
import { StatCard, UserProfileCard, ActivityItem, ProcessCard } from './common/DashboardComponents';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  Settings, 
  Users, 
  CheckCircle, 
  TrendingUp,
  FileText,
  AlertTriangle,
  Clock,
  Target,
  Activity,
  Database,
  User,
  Download,
  Plus,
  Search,
  Filter,
  Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDataByRole } from './data/comprehensiveData';
import { exportOperationsData, exportStudentsData, exportApplicationsData } from './utils/enhancedCsvExport';
import { toast } from 'sonner';

interface OperationsDashboardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  onLogout: () => void;
}

const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ user, onLogout }) => {
  const { navigateTo } = useNavigation();

  // Operations team profile
  const operationsProfile = {
    id: 'OPS001',
    name: user.name || 'Suresh Babu',
    email: user.email,
    department: user.department || 'Operations Management',
    designation: 'Operations Manager',
    experience: 12,
    phone: '+91 9876502001',
    employeeId: 'SRMAP-OPS-001',
    activeStudents: 2658,
    placementRate: 87.3,
    companiesManaged: 156,
    efficiency: 94.5,
    activeStatus: 'Active',
    profileImage: '/api/placeholder/80/80'
  };

  const operationsReports = getDataByRole(user.role, 'operations');
  const studentsData = getDataByRole(user.role, 'students');
  const applicationsData = getDataByRole(user.role, 'applications');

  // Process data
  const activeProcesses = [
    {
      id: 'proc_001',
      name: 'Student Registration Process',
      description: 'Streamline student enrollment and document verification',
      status: 'Active' as const,
      priority: 'High' as const,
      assignedTo: 'Deepika Sharma',
      dueDate: '2024-02-28',
      progress: 75,
      category: 'Administration'
    },
    {
      id: 'proc_002',
      name: 'Company Onboarding Workflow',
      description: 'Automate partner company registration and verification',
      status: 'Pending' as const,
      priority: 'Medium' as const,
      assignedTo: 'Ravi Kumar',
      dueDate: '2024-03-15',
      progress: 45,
      category: 'Placement'
    },
    {
      id: 'proc_003',
      name: 'Training Assessment System',
      description: 'Digital assessment platform for training programs',
      status: 'Active' as const,
      priority: 'High' as const,
      assignedTo: 'Anita Menon',
      dueDate: '2024-02-20',
      progress: 90,
      category: 'Training'
    },
    {
      id: 'proc_004',
      name: 'Interview Scheduling Automation',
      description: 'Automated system for interview slot management',
      status: 'Completed' as const,
      priority: 'Medium' as const,
      assignedTo: 'Vikram Patel',
      dueDate: '2024-01-31',
      progress: 100,
      category: 'Placement'
    }
  ];

  // Operations metrics
  const operationsMetrics = [
    { metric: 'Student Processing', target: 2500, achieved: 2658, percentage: 106.3 },
    { metric: 'Document Verification', target: 2000, achieved: 1945, percentage: 97.3 },
    { metric: 'Company Partnerships', target: 150, achieved: 156, percentage: 104.0 },
    { metric: 'System Uptime', target: 99.5, achieved: 99.8, percentage: 100.3 }
  ];

  // Performance trends
  const performanceTrends = [
    { month: 'Aug 2023', efficiency: 89.5, processed: 2145, issues: 15 },
    { month: 'Sep 2023', efficiency: 91.2, processed: 2298, issues: 12 },
    { month: 'Oct 2023', efficiency: 92.8, processed: 2456, issues: 8 },
    { month: 'Nov 2023', efficiency: 94.1, processed: 2634, issues: 6 },
    { month: 'Dec 2023', efficiency: 93.7, processed: 2589, issues: 9 },
    { month: 'Jan 2024', efficiency: 94.5, processed: 2658, issues: 5 }
  ];

  // System health data
  const systemHealthData = [
    { system: 'Student Portal', uptime: 99.8, issues: 2, status: 'Excellent' },
    { system: 'Company Portal', uptime: 99.5, issues: 3, status: 'Good' },
    { system: 'Assessment System', uptime: 98.9, issues: 5, status: 'Good' },
    { system: 'Document Management', uptime: 99.9, issues: 1, status: 'Excellent' },
    { system: 'Communication Platform', uptime: 99.2, issues: 4, status: 'Good' }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Completed monthly placement statistics report',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-primary'
    },
    {
      id: 2,
      action: 'Resolved 5 critical system issues',
      time: '4 hours ago',
      icon: Settings,
      color: 'text-success'
    },
    {
      id: 3,
      action: 'Updated student verification process',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-info'
    },
    {
      id: 4,
      action: 'Conducted system maintenance',
      time: '2 days ago',
      icon: Database,
      color: 'text-warning'
    }
  ];

  // Export functions
  const handleExportOperations = async () => {
    try {
      await exportOperationsData(user.role);
    } catch (error) {
      toast.error('Failed to export operations data');
    }
  };

  const handleExportStudents = async () => {
    try {
      await exportStudentsData(user.role);
    } catch (error) {
      toast.error('Failed to export students data');
    }
  };

  const handleExportApplications = async () => {
    try {
      await exportApplicationsData(user.role);
    } catch (error) {
      toast.error('Failed to export applications data');
    }
  };

  // Chart colors
  const chartColors = ['#4f46e5', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Operations Profile Card */}
      <UserProfileCard 
        user={user}
        profileData={operationsProfile}
        onViewProfile={() => navigateTo('operations-profile', operationsProfile, 'My Profile')}
      />

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Active Students"
          value={operationsProfile.activeStudents.toLocaleString()}
          change="+156 this month"
          color="bg-primary"
        />
        <StatCard
          icon={Target}
          title="Placement Rate"
          value={`${operationsProfile.placementRate}%`}
          change="+2.3% from last year"
          color="bg-success"
        />
        <StatCard
          icon={CheckCircle}
          title="System Efficiency"
          value={`${operationsProfile.efficiency}%`}
          change="Above target"
          color="bg-info"
        />
        <StatCard
          icon={TrendingUp}
          title="Process Automation"
          value="85%"
          change="15 processes automated"
          color="bg-warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Operational Efficiency</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportOperations}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#4f46e5" strokeWidth={2} name="Efficiency %" />
                <Line type="monotone" dataKey="processed" stroke="#10b981" strokeWidth={2} name="Processed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationsMetrics.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-muted-foreground">
                      {metric.achieved} / {metric.target}
                    </span>
                  </div>
                  <Progress value={metric.percentage > 100 ? 100 : metric.percentage} />
                  <div className="text-xs text-muted-foreground text-right">
                    {metric.percentage.toFixed(1)}% of target
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealthData.map((system) => (
              <div key={system.system} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{system.system}</h4>
                  <p className="text-sm text-muted-foreground">{system.uptime}% uptime • {system.issues} issues</p>
                </div>
                <Badge className={
                  system.status === 'Excellent' ? 'bg-success text-success-foreground' :
                  system.status === 'Good' ? 'bg-info text-info-foreground' :
                  'bg-warning text-warning-foreground'
                }>
                  {system.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
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
      </div>
    </div>
  );

  // Processes Tab Content
  const ProcessesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Active Processes</h2>
          <p className="text-muted-foreground">Monitor and manage operational workflows</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => navigateTo('process-add', null, 'Create Process')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Process
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Zap}
          title="Active Processes"
          value={activeProcesses.filter(p => p.status === 'Active').length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Clock}
          title="Pending"
          value={activeProcesses.filter(p => p.status === 'Pending').length.toString()}
          color="bg-warning"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={activeProcesses.filter(p => p.status === 'Completed').length.toString()}
          color="bg-success"
        />
        <StatCard
          icon={AlertTriangle}
          title="High Priority"
          value={activeProcesses.filter(p => p.priority === 'High').length.toString()}
          color="bg-destructive"
        />
      </div>

      {/* Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProcesses.map((process) => (
          <ProcessCard
            key={process.id}
            process={process}
            onViewDetails={() => navigateTo('process-detail', process, `${process.name} Details`)}
          />
        ))}
      </div>
    </div>
  );

  // Analytics Tab Content
  const AnalyticsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Operations Analytics</h2>
          <p className="text-muted-foreground">Performance insights and operational metrics</p>
        </div>
        <Button 
          variant="outline"
          onClick={handleExportOperations}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Analytics
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          title="Goal Achievement"
          value="94.5%"
          change="Above target by 4.5%"
          color="bg-primary"
        />
        <StatCard
          icon={TrendingUp}
          title="Process Efficiency"
          value="87.3%"
          change="+5.2% from last quarter"
          color="bg-success"
        />
        <StatCard
          icon={Users}
          title="User Satisfaction"
          value="4.6/5.0"
          change="Based on feedback"
          color="bg-info"
        />
        <StatCard
          icon={Clock}
          title="Response Time"
          value="2.4h"
          change="Average resolution time"
          color="bg-warning"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="processed" fill="#4f46e5" name="Items Processed" />
                <Bar dataKey="issues" fill="#ef4444" name="Issues Reported" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={systemHealthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({system, uptime}) => `${system}: ${uptime}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="uptime"
                >
                  {systemHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Reports Tab Content
  const ReportsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Operations Reports</h2>
          <p className="text-muted-foreground">Generate and manage operational reports</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportStudents}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
          <Button 
            variant="outline"
            onClick={handleExportApplications}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Applications
          </Button>
          <Button onClick={() => navigateTo('report-generation', null, 'Generate Report')}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Total Reports"
          value={operationsReports.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={operationsReports.filter(r => r.reportStatus === 'Final').length.toString()}
          color="bg-success"
        />
        <StatCard
          icon={Clock}
          title="In Progress"
          value="3"
          color="bg-warning"
        />
        <StatCard
          icon={Users}
          title="Stakeholders"
          value="25"
          color="bg-info"
        />
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {operationsReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.reportTitle}</h4>
                    <p className="text-sm text-muted-foreground">{report.reportType} • {report.department}</p>
                    <p className="text-xs text-muted-foreground">Generated by: {report.generatedBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-lg font-bold text-primary">{report.totalStudents}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Placed</p>
                    <p className="text-lg font-bold text-success">{report.placedStudents}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Rate</p>
                    <p className="text-lg font-bold text-warning">{report.placementPercentage}%</p>
                  </div>
                  <Badge className={
                    report.reportStatus === 'Final' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
                  }>
                    {report.reportStatus}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateTo('report-detail', report, `${report.reportTitle} Details`)}
                  >
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Profile Tab Content
  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Operations Profile</h2>
          <p className="text-muted-foreground">Manage your operations profile and settings</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigateTo('profile-edit', operationsProfile, 'Edit Profile')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={() => navigateTo('operations-profile', operationsProfile, 'View Full Profile')}>
            <User className="w-4 h-4 mr-2" />
            View Full Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <p className="text-muted-foreground">{operationsProfile.name}</p>
              </div>
              <div>
                <span className="font-medium">Employee ID:</span>
                <p className="text-muted-foreground">{operationsProfile.employeeId}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{operationsProfile.department}</p>
              </div>
              <div>
                <span className="font-medium">Designation:</span>
                <p className="text-muted-foreground">{operationsProfile.designation}</p>
              </div>
              <div>
                <span className="font-medium">Experience:</span>
                <p className="text-muted-foreground">{operationsProfile.experience} years</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-muted-foreground">{operationsProfile.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{operationsProfile.activeStudents.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{operationsProfile.placementRate}%</div>
              <p className="text-sm text-muted-foreground">Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{operationsProfile.efficiency}%</div>
              <p className="text-sm text-muted-foreground">System Efficiency</p>
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
      value: 'processes',
      label: 'Processes',
      icon: Settings,
      content: <ProcessesContent />
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      content: <AnalyticsContent />
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: FileText,
      content: <ReportsContent />
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
      title="Operations Dashboard"
      user={user}
      tabs={dashboardTabs}
      onLogout={onLogout}
      defaultTab="overview"
      profileImage={operationsProfile.profileImage}
    />
  );
};

export default OperationsDashboard;