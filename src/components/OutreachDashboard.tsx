import React, { useState } from 'react';
import { useNavigation } from './navigation/NavigationProvider';
import DashboardLayout from './common/DashboardLayout';
import { StatCard, UserProfileCard, ActivityItem, EventCard } from './common/DashboardComponents';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  Building, 
  Users, 
  Handshake, 
  Calendar,
  TrendingUp,
  Award,
  Target,
  Phone,
  Mail,
  MapPin,
  User,
  Download,
  Plus,
  Search,
  Filter,
  Settings,
  Activity
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDataByRole } from './data/comprehensiveData';
import { exportCompaniesData, exportApplicationsData } from './utils/enhancedCsvExport';
import { toast } from 'sonner';

interface OutreachDashboardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  onLogout: () => void;
}

const OutreachDashboard: React.FC<OutreachDashboardProps> = ({ user, onLogout }) => {
  const { navigateTo } = useNavigation();

  // Outreach team profile
  const outreachProfile = {
    id: 'OUT001',
    name: user.name || 'Ravi Teja Sharma',
    email: user.email,
    department: user.department || 'Corporate Relations',
    designation: 'Senior Outreach Manager',
    experience: 8,
    phone: '+91 9876501001',
    employeeId: 'SRMAP-OUT-001',
    activePartnerships: 45,
    successRate: 78.5,
    eventsOrganized: 23,
    satisfactionScore: 4.6,
    activeStatus: 'Active',
    profileImage: '/api/placeholder/80/80'
  };

  const companiesData = getDataByRole(user.role, 'companies');
  const applicationsData = getDataByRole(user.role, 'applications');
  const studentsData = getDataByRole(user.role, 'students');

  // Partnership data
  const partnershipData = [
    { month: 'Aug 2023', newPartnerships: 3, active: 35, events: 8 },
    { month: 'Sep 2023', newPartnerships: 5, active: 38, events: 12 },
    { month: 'Oct 2023', newPartnerships: 4, active: 41, events: 10 },
    { month: 'Nov 2023', newPartnerships: 6, active: 45, events: 15 },
    { month: 'Dec 2023', newPartnerships: 2, active: 43, events: 6 },
    { month: 'Jan 2024', newPartnerships: 7, active: 48, events: 18 }
  ];

  // Company category distribution
  const companyCategoryData = [
    { category: 'Technology', count: 18, percentage: 40 },
    { category: 'Finance', count: 8, percentage: 18 },
    { category: 'Healthcare', count: 6, percentage: 13 },
    { category: 'Manufacturing', count: 7, percentage: 16 },
    { category: 'Consulting', count: 6, percentage: 13 }
  ];

  // Event types data
  const eventTypes = [
    {
      id: 'evt_001',
      title: 'Technology Partnership Summit',
      date: '2024-02-28',
      time: '10:00 AM',
      location: 'Main Auditorium',
      type: 'Conference' as const,
      attendees: 150,
      status: 'Upcoming' as const,
      description: 'Annual summit with technology partners to discuss collaboration opportunities'
    },
    {
      id: 'evt_002',
      title: 'Industry Connect Meetup',
      date: '2024-03-05',
      time: '2:00 PM',
      location: 'Conference Hall A',
      type: 'Meeting' as const,
      attendees: 50,
      status: 'Upcoming' as const,
      description: 'Quarterly meetup with industry representatives'
    },
    {
      id: 'evt_003',
      title: 'Placement Drive Coordination',
      date: '2024-03-10',
      time: '9:00 AM',
      location: 'Campus Grounds',
      type: 'Workshop' as const,
      attendees: 200,
      status: 'Upcoming' as const,
      description: 'Large scale placement drive with multiple companies'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Signed partnership agreement with Tech Innovations Ltd',
      time: '2 hours ago',
      icon: Handshake,
      color: 'text-primary'
    },
    {
      id: 2,
      action: 'Organized virtual job fair with 25 companies',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-success'
    },
    {
      id: 3,
      action: 'Conducted follow-up meeting with Microsoft India',
      time: '2 days ago',
      icon: Building,
      color: 'text-info'
    },
    {
      id: 4,
      action: 'Updated partnership terms with Amazon',
      time: '1 week ago',
      icon: Award,
      color: 'text-warning'
    }
  ];

  // Export functions
  const handleExportCompanies = async () => {
    try {
      await exportCompaniesData(user.role);
    } catch (error) {
      toast.error('Failed to export companies data');
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
      {/* Outreach Profile Card */}
      <UserProfileCard 
        user={user}
        profileData={outreachProfile}
        onViewProfile={() => navigateTo('outreach-profile', outreachProfile, 'My Profile')}
      />

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Building}
          title="Active Partners"
          value={outreachProfile.activePartnerships.toString()}
          change="+5 this month"
          color="bg-primary"
        />
        <StatCard
          icon={TrendingUp}
          title="Success Rate"
          value={`${outreachProfile.successRate}%`}
          change="Partnership conversion"
          color="bg-success"
        />
        <StatCard
          icon={Calendar}
          title="Events Organized"
          value={outreachProfile.eventsOrganized.toString()}
          change="This academic year"
          color="bg-info"
        />
        <StatCard
          icon={Award}
          title="Satisfaction Score"
          value={outreachProfile.satisfactionScore.toString()}
          change="Partner feedback"
          color="bg-warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Partnership Growth</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportCompanies}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={partnershipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="newPartnerships" stroke="#4f46e5" strokeWidth={2} name="New Partnerships" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Partners" />
                <Line type="monotone" dataKey="events" stroke="#f59e0b" strokeWidth={2} name="Events" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-primary" />
              <span>Company Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={companyCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({category, percentage}) => `${category}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {companyCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigateTo('company-add', null, 'Add Company')}
              >
                <Building className="w-6 h-6" />
                <span>Add Company</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigateTo('partnership-management', null, 'Manage Partnerships')}
              >
                <Handshake className="w-6 h-6" />
                <span>Partnerships</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigateTo('event-management', null, 'Event Management')}
              >
                <Calendar className="w-6 h-6" />
                <span>Events</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => navigateTo('company-analytics', null, 'Analytics')}
              >
                <BarChart3 className="w-6 h-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Companies Tab Content
  const CompaniesContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Partner Companies</h2>
          <p className="text-muted-foreground">Manage corporate partnerships and relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleExportCompanies}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Companies
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button onClick={() => navigateTo('company-add', null, 'Add New Company')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Building}
          title="Total Companies"
          value={companiesData.length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Handshake}
          title="Active Partners"
          value={companiesData.filter(c => c.partnershipStatus === 'Active').length.toString()}
          color="bg-success"
        />
        <StatCard
          icon={Users}
          title="Students Hired"
          value={companiesData.reduce((sum, c) => sum + c.totalHirings, 0).toString()}
          color="bg-info"
        />
        <StatCard
          icon={TrendingUp}
          title="Average Satisfaction"
          value={(companiesData.reduce((sum, c) => sum + c.satisfactionRating, 0) / companiesData.length).toFixed(1)}
          color="bg-warning"
        />
      </div>

      {/* Companies List */}
      <Card>
        <CardHeader>
          <CardTitle>Company Partnership Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {companiesData.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{company.name}</h4>
                    <p className="text-sm text-muted-foreground">{company.industry} • {company.location}</p>
                    <p className="text-xs text-muted-foreground">Contact: {company.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Hirings</p>
                    <p className="text-lg font-bold text-primary">{company.totalHirings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Avg Salary</p>
                    <p className="text-lg font-bold text-success">₹{(company.averageSalary / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-lg font-bold text-warning">{company.satisfactionRating}/5</p>
                  </div>
                  <Badge className={
                    company.partnershipStatus === 'Active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }>
                    {company.partnershipStatus}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateTo('company-detail', company, `${company.name} Details`)}
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
  );

  // Events Tab Content
  const EventsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Events & Activities</h2>
          <p className="text-muted-foreground">Organize and manage corporate engagement events</p>
        </div>
        <Button onClick={() => navigateTo('event-add', null, 'Create Event')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="Upcoming Events"
          value={eventTypes.filter(e => e.status === 'Upcoming').length.toString()}
          color="bg-primary"
        />
        <StatCard
          icon={Users}
          title="Total Attendees"
          value={eventTypes.reduce((sum, e) => sum + e.attendees, 0).toString()}
          color="bg-success"
        />
        <StatCard
          icon={Building}
          title="Partner Companies"
          value="25"
          color="bg-info"
        />
        <StatCard
          icon={Award}
          title="Success Rate"
          value="92%"
          color="bg-warning"
        />
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewDetails={() => navigateTo('event-detail', event, `${event.title} Details`)}
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
          <h2 className="text-2xl font-bold text-foreground">Outreach Analytics</h2>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
        <Button 
          variant="outline"
          onClick={handleExportApplications}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Analytics
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          title="Partnership Goal"
          value="85%"
          change="42/50 achieved"
          color="bg-primary"
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value="78.5%"
          change="+5% from last quarter"
          color="bg-success"
        />
        <StatCard
          icon={Award}
          title="Satisfaction Score"
          value="4.6/5.0"
          change="Partner feedback"
          color="bg-info"
        />
        <StatCard
          icon={Users}
          title="Students Placed"
          value="1,256"
          change="Through partnerships"
          color="bg-warning"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Partnership Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={partnershipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newPartnerships" fill="#4f46e5" name="New Partnerships" />
                <Bar dataKey="events" fill="#10b981" name="Events Organized" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyCategoryData.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">{category.count} companies</span>
                  </div>
                  <Progress value={category.percentage} />
                </div>
              ))}
            </div>
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
          <h2 className="text-2xl font-bold text-foreground">Outreach Profile</h2>
          <p className="text-muted-foreground">Manage your outreach profile and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigateTo('profile-edit', outreachProfile, 'Edit Profile')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={() => navigateTo('outreach-profile', outreachProfile, 'View Full Profile')}>
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
                <p className="text-muted-foreground">{outreachProfile.name}</p>
              </div>
              <div>
                <span className="font-medium">Employee ID:</span>
                <p className="text-muted-foreground">{outreachProfile.employeeId}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{outreachProfile.department}</p>
              </div>
              <div>
                <span className="font-medium">Designation:</span>
                <p className="text-muted-foreground">{outreachProfile.designation}</p>
              </div>
              <div>
                <span className="font-medium">Experience:</span>
                <p className="text-muted-foreground">{outreachProfile.experience} years</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-muted-foreground">{outreachProfile.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{outreachProfile.activePartnerships}</div>
              <p className="text-sm text-muted-foreground">Active Partnerships</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{outreachProfile.successRate}%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{outreachProfile.satisfactionScore}/5.0</div>
              <p className="text-sm text-muted-foreground">Satisfaction Score</p>
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
      value: 'companies',
      label: 'Companies',
      icon: Building,
      content: <CompaniesContent />
    },
    {
      value: 'events',
      label: 'Events',
      icon: Calendar,
      content: <EventsContent />
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      content: <AnalyticsContent />
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
      title="Outreach Dashboard"
      user={user}
      tabs={dashboardTabs}
      onLogout={onLogout}
      defaultTab="overview"
      profileImage={outreachProfile.profileImage}
    />
  );
};

export default OutreachDashboard;