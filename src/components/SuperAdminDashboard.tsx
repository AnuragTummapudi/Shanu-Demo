import React, { useState, useEffect } from 'react';
import { useNavigation } from './navigation/NavigationProvider';
import DashboardLayout from './common/DashboardLayout';
import { StatCard, UserProfileCard, ActivityItem } from './common/DashboardComponents';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  Users, 
  Settings, 
  User,
  TrendingUp,
  CheckCircle,
  Calendar,
  FileText,
  Download,
  Bell,
  FileSpreadsheet,
  IndianRupee,
  Building,
  Award,
  Briefcase,
  PieChart,
  Target,
  Globe,
  Clock,
  Activity,
  Server,
  Wifi,
  RefreshCw,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { generateSafeReportData, generateQuickStats, getKeyMetrics, enhancedSuperAdminProfile } from './data/superAdminData';
import { exportStudentsData, exportApplicationsData, exportFacultyData, exportOperationsData, exportBudgetData } from './utils/enhancedCsvExport';
import { toast } from 'sonner';

interface SuperAdminDashboardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ user, onLogout }) => {
  const { navigateTo } = useNavigation();

  // Executive profile for director
  const directorProfile = {
    name: user.name || 'Dr. Rajesh Venkatesh',
    title: 'Vice Chancellor - Student Affairs',
    department: user.department || 'Administration',
    email: user.email,
    experience: '15 years',
    lastLogin: '2024-01-15 09:30 AM',
    profileImage: '/api/placeholder/80/80'
  };

  // Get executive data
  const reportData = generateSafeReportData();
  const quickStats = generateQuickStats();
  const keyMetrics = getKeyMetrics();

  // Executive Summary Cards
  const executiveSummary = {
    totalStudents: reportData.summary.totalUsers,
    placementRate: reportData.summary.placementRate,
    partnerCompanies: reportData.summary.partnerCompanies,
    averageCTC: reportData.summary.averageCTC,
    totalApplications: reportData.summary.totalApplications,
    activePlacements: reportData.summary.activePlacements
  };

  // Export functions
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

  const handleExportFaculty = async () => {
    try {
      await exportFacultyData(user.role);
    } catch (error) {
      toast.error('Failed to export faculty data');
    }
  };

  const handleExportOperations = async () => {
    try {
      await exportOperationsData(user.role);
    } catch (error) {
      toast.error('Failed to export operations data');
    }
  };

  const handleExportBudget = async () => {
    try {
      await exportBudgetData(user.role);
    } catch (error) {
      toast.error('Failed to export budget data');
    }
  };

  // Real-time System Health Hook
  const [systemHealth, setSystemHealth] = useState({
    status: 'optimal',
    uptime: '15d 7h 23m',
    activeUsers: 892,
    systemLoad: 3.2,
    responseTime: 145,
    lastUpdate: new Date()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        activeUsers: Math.max(500, Math.min(1200, prev.activeUsers + Math.floor((Math.random() - 0.5) * 20))),
        systemLoad: Math.max(1.0, Math.min(5.0, prev.systemLoad + (Math.random() - 0.5) * 0.5)),
        responseTime: Math.max(80, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 15)),
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Key Performance Indicators for Director
  const performanceIndicators = [
    {
      title: 'University Growth',
      metric: '15%',
      description: 'Year-over-year student enrollment increase',
      trend: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Industry Relations',
      metric: '45',
      description: 'Active corporate partnerships',
      trend: 'positive',
      icon: Building
    },
    {
      title: 'Academic Excellence',
      metric: '4.2/5',
      description: 'Overall student satisfaction rating',
      trend: 'positive',
      icon: Award
    },
    {
      title: 'Career Success',
      metric: '89%',
      description: 'Graduate employability rate',
      trend: 'positive',
      icon: Target
    }
  ];

  // Executive Activities/Updates
  const executiveUpdates = [
    {
      id: 1,
      title: 'New Corporate Partnership Signed',
      description: 'Strategic alliance with TCS for campus recruitment',
      time: '2 hours ago',
      icon: Building,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Quarterly Placement Results',
      description: '156 students placed this quarter - 12% above target',
      time: '1 day ago',
      icon: CheckCircle,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Faculty Development Program',
      description: '25 faculty members completed advanced training',
      time: '2 days ago',
      icon: Award,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Infrastructure Upgrade',
      description: 'New placement center inauguration scheduled',
      time: '3 days ago',
      icon: Calendar,
      priority: 'low'
    }
  ];

  // Overview Tab Content - Executive Dashboard
  const ExecutiveOverviewContent = () => (
    <div className="space-y-6">
      {/* Executive Profile Card */}
      <UserProfileCard 
        user={user}
        profileData={directorProfile}
        onViewProfile={() => navigateTo('super-admin-profile', directorProfile, 'Director Profile')}
      />

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <StatCard
            key={index}
            icon={metric.icon}
            title={metric.label}
            value={typeof metric.value === 'string' ? metric.value : metric.value.toLocaleString()}
            change={metric.trend}
            color="bg-primary"
          />
        ))}
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* University Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>University Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {performanceIndicators.map((indicator, index) => (
                <div key={index} className="text-center p-3 border border-border rounded-lg">
                  <indicator.icon className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-bold text-foreground">{indicator.metric}</div>
                  <div className="text-xs font-medium text-muted-foreground">{indicator.title}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time System Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>System Health</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateTo('system-monitoring', null, 'System Monitoring')}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Monitor
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-success" />
                <span className="text-sm">System Status</span>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">
                {systemHealth.status.toUpperCase()}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Uptime:</span>
                <div className="font-medium">{systemHealth.uptime}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Active Users:</span>
                <div className="font-medium">{systemHealth.activeUsers.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Load:</span>
                <div className="font-medium">{systemHealth.systemLoad.toFixed(1)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Response:</span>
                <div className="font-medium">{systemHealth.responseTime}ms</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t text-xs">
              <span className="text-muted-foreground">Last updated:</span>
              <span>{systemHealth.lastUpdate.toLocaleTimeString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Updates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Recent Updates</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateTo('notification-center', null, 'All Updates')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {executiveUpdates.slice(0, 3).map((update) => (
              <div key={update.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <update.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{update.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{update.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{update.time}</span>
                      <span className={`px-1 py-0.5 rounded text-xs ${
                        update.priority === 'high' ? 'bg-error text-error-foreground' :
                        update.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                        'bg-info text-info-foreground'
                      }`}>
                        {update.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-primary" />
            <span>Department Performance Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.departmentStats.slice(0, 5).map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium">{dept.name}</div>
                  <div className="text-sm text-muted-foreground">({dept.students} students)</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Placement Rate:</span>
                    <span className="ml-1 font-medium">{dept.placementRate}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Avg Package:</span>
                    <span className="ml-1 font-medium">₹{dept.avgPackage}L</span>
                  </div>
                  <Progress value={dept.placementRate} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Strategic Reports Tab Content
  const StrategyReportsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Strategic Reports & Analytics</h2>
          <p className="text-muted-foreground">Executive-level insights and performance analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => navigateTo('detailed-analytics', null, 'Detailed Analytics')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Detailed Analytics
          </Button>
        </div>
      </div>

      {/* Strategic Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Student Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Active Applications</span>
                <span className="font-medium">{executiveSummary.totalApplications.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Placement Success</span>
                <span className="font-medium">{executiveSummary.placementRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Career Readiness</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-primary" />
              <span>Industry Relations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Active Partners</span>
                <span className="font-medium">{executiveSummary.partnerCompanies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Partnerships</span>
                <span className="font-medium">12 this year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Partnership Renewal</span>
                <span className="font-medium">98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              <span>Financial Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Average CTC</span>
                <span className="font-medium">₹{executiveSummary.averageCTC}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Highest Package</span>
                <span className="font-medium">₹25L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Growth Rate</span>
                <span className="font-medium">+18% YoY</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>University Growth Trends (5-Year Overview)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.universityGrowth.map((year, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="text-lg font-medium">{year.year}</div>
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{year.students.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{year.faculty}</div>
                    <div className="text-sm text-muted-foreground">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-info">{year.companies}</div>
                    <div className="text-sm text-muted-foreground">Partners</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Data Management Tab Content
  const DataManagementContent = () => {
    const CSVDataManagementTab = React.lazy(() => import('./admin/CSVDataManagementTab'));
    return (
      <React.Suspense fallback={<div>Loading Data Management...</div>}>
        <CSVDataManagementTab userRole="admin" />
      </React.Suspense>
    );
  };

  // Executive Settings Tab Content
  const ExecutiveSettingsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Executive Settings</h2>
          <p className="text-muted-foreground">Manage university-wide settings and policies</p>
        </div>
        <Button onClick={() => navigateTo('settings', null, 'Advanced Settings')}>
          <Settings className="w-4 h-4 mr-2" />
          Advanced Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Policy Management */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('placement-policies', null, 'Placement Policies')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Placement Policies
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('academic-policies', null, 'Academic Policies')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Academic Policies
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('student-guidelines', null, 'Student Guidelines')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Student Guidelines
            </Button>
          </CardContent>
        </Card>

        {/* System Administration */}
        <Card>
          <CardHeader>
            <CardTitle>System Administration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('user-management', null, 'User Management')}
            >
              <Users className="w-4 h-4 mr-2" />
              User Management
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('system-monitoring', null, 'System Health')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              System Health
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('backup-management', null, 'Data Backup')}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Data Backup
            </Button>
          </CardContent>
        </Card>

        {/* Communication Center */}
        <Card>
          <CardHeader>
            <CardTitle>Communication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('announcements', null, 'University Announcements')}
            >
              <Bell className="w-4 h-4 mr-2" />
              Announcements
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('notification-center', null, 'Notification Center')}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('communication-settings', null, 'Communication Settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Profile Tab Content
  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Director Profile</h2>
          <p className="text-muted-foreground">Manage your executive profile and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigateTo('profile-edit', directorProfile, 'Edit Profile')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={() => navigateTo('super-admin-profile', directorProfile, 'View Full Profile')}>
            <User className="w-4 h-4 mr-2" />
            View Full Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Executive Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <p className="text-muted-foreground">{directorProfile.name}</p>
              </div>
              <div>
                <span className="font-medium">Designation:</span>
                <p className="text-muted-foreground">{directorProfile.title}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{directorProfile.department}</p>
              </div>
              <div>
                <span className="font-medium">Experience:</span>
                <p className="text-muted-foreground">{directorProfile.experience}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-muted-foreground">{directorProfile.email}</p>
              </div>
              <div>
                <span className="font-medium">Last Login:</span>
                <p className="text-muted-foreground">{directorProfile.lastLogin}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>University Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{executiveSummary.totalStudents.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{executiveSummary.partnerCompanies}</div>
              <p className="text-sm text-muted-foreground">Partner Companies</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">₹{executiveSummary.averageCTC}L</div>
              <p className="text-sm text-muted-foreground">Average CTC</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Advanced Analytics Tab Content
  const AdvancedAnalyticsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights and predictive analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigateTo('detailed-analytics', null, 'Detailed Analytics')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Full Analytics
          </Button>
          <Button variant="outline" onClick={() => navigateTo('system-monitoring', null, 'System Monitor')}>
            <Activity className="w-4 h-4 mr-2" />
            System Health
          </Button>
          <Button variant="outline" onClick={handleExportStudents}>
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
          <Button variant="outline" onClick={handleExportApplications}>
            <Download className="w-4 h-4 mr-2" />
            Export Applications
          </Button>
          <Button variant="outline" onClick={handleExportBudget}>
            <Download className="w-4 h-4 mr-2" />
            Export Budget
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Users</p>
                <p className="text-2xl font-bold text-primary">{systemHealth.activeUsers.toLocaleString()}</p>
              </div>
              <Wifi className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Load</p>
                <p className="text-2xl font-bold text-warning">{systemHealth.systemLoad.toFixed(1)}</p>
              </div>
              <Server className="w-8 h-8 text-warning" />
            </div>
            <div className="flex items-center mt-2">
              <CheckCircle className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">Within normal range</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-info">{systemHealth.responseTime}ms</p>
              </div>
              <Clock className="w-8 h-8 text-info" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">Optimal performance</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Status</p>
                <p className="text-2xl font-bold text-success">Secure</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center mt-2">
              <CheckCircle className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">No threats detected</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('system-monitoring', null, 'System Monitoring')}
            >
              <Server className="w-4 h-4 mr-2" />
              System Health Check
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('detailed-analytics', null, 'Analytics Dashboard')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Analytics
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigateTo('backup-management', null, 'Backup Management')}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Data Backup
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Alerts & Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm">All systems operational</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-info/10 rounded-lg">
              <Bell className="w-4 h-4 text-info" />
              <span className="text-sm">2 new placement updates</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm">System update available</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Performance Targets</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Placement Rate</span>
                <span>93.5% / 95%</span>
              </div>
              <Progress value={93.5 / 95 * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Student Satisfaction</span>
                <span>4.2 / 5.0</span>
              </div>
              <Progress value={4.2 / 5.0 * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>System Uptime</span>
                <span>99.9% / 99.5%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const dashboardTabs = [
    {
      value: 'overview',
      label: 'Executive Overview',
      icon: BarChart3,
      content: <ExecutiveOverviewContent />
    },
    {
      value: 'analytics',
      label: 'Live Analytics',
      icon: Activity,
      content: <AdvancedAnalyticsContent />
    },
    {
      value: 'reports',
      label: 'Strategic Reports',
      icon: FileText,
      content: <StrategyReportsContent />
    },
    {
      value: 'data-management',
      label: 'Data Management',
      icon: FileSpreadsheet,
      content: <DataManagementContent />
    },
    {
      value: 'settings',
      label: 'Executive Settings',
      icon: Settings,
      content: <ExecutiveSettingsContent />
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
      title="Director Dashboard"
      user={user}
      tabs={dashboardTabs}
      onLogout={onLogout}
      defaultTab="overview"
      profileImage={directorProfile.profileImage}
    />
  );
};

export default SuperAdminDashboard;