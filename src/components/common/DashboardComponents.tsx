import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  Star,
  Activity,
  TrendingUp,
  Users,
  Building,
  Award,
  Clock,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  FileText,
  Settings,
  Zap
} from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change?: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, color }) => (
  <Card className="relative overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className="text-xs text-muted-foreground mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface UserProfileCardProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  profileData: any;
  onViewProfile: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, profileData, onViewProfile }) => {
  // Safely extract placement status
  const getPlacementStatusText = (placementStatus: any) => {
    if (!placementStatus) return 'Not Available';
    
    // If it's already a string, return it
    if (typeof placementStatus === 'string') {
      return placementStatus;
    }
    
    // If it's an object, try to extract the status
    if (typeof placementStatus === 'object') {
      return placementStatus.placementStatus || 
             (placementStatus.isRegistered ? 'Registered' : 'Not Registered') ||
             'Status Unknown';
    }
    
    return 'Not Available';
  };

  // Safely extract numeric values
  const getCGPA = (data: any) => {
    if (data?.cgpa) return data.cgpa.toString();
    return 'N/A';
  };

  const getApplicationCount = (data: any) => {
    if (data?.placementStatus?.currentApplications) {
      return data.placementStatus.currentApplications.toString();
    }
    if (data?.currentApplications) {
      return data.currentApplications.toString();
    }
    return '0';
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-primary" />
          <span>Profile Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profileData?.profileImage} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
            <p className="text-muted-foreground">{user.department}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={user.verified ? 'default' : 'secondary'}>
                {user.verified ? 'Verified' : 'Pending'}
              </Badge>
              <Badge variant="outline">
                {getPlacementStatusText(profileData?.placementStatus)}
              </Badge>
            </div>
          </div>
          <Button onClick={onViewProfile} variant="outline">
            View Full Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <GraduationCap className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">{user.role === 'student' ? 'CGPA' : 'Experience'}</p>
            <p className="text-lg font-bold text-foreground">
              {user.role === 'student' ? getCGPA(profileData) : (profileData?.experience || 'N/A')}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Briefcase className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">
              {user.role === 'student' ? 'Applications' : 'Projects'}
            </p>
            <p className="text-lg font-bold text-foreground">
              {user.role === 'student' ? getApplicationCount(profileData) : (profileData?.projectsHandled || '0')}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Star className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Rating</p>
            <p className="text-lg font-bold text-foreground">
              {profileData?.averageRating || profileData?.performanceGrade || '4.5'}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Activity className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">Status</p>
            <p className="text-lg font-bold text-foreground">
              {profileData?.activeStatus || 'Active'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  activity: {
    id: number;
    action: string;
    time: string;
    icon: React.ElementType;
    color: string;
  };
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const Icon = activity.icon;
  
  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
        <Icon className={`w-4 h-4 ${activity.color}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground">{activity.action}</p>
        <p className="text-xs text-muted-foreground">{activity.time}</p>
      </div>
    </div>
  );
};

// Course Card Component for Faculty Dashboard
interface CourseCardProps {
  course: {
    id: string;
    name: string;
    code: string;
    students: number;
    semester: string;
    schedule: string;
    status: 'Active' | 'Completed' | 'Upcoming';
    progress?: number;
  };
  onViewDetails?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.code}</p>
          <p className="text-xs text-muted-foreground mt-1">{course.schedule}</p>
        </div>
        <Badge variant={
          course.status === 'Active' ? 'default' : 
          course.status === 'Completed' ? 'secondary' : 'outline'
        }>
          {course.status}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Students Enrolled:</span>
          <span className="font-medium">{course.students}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Semester:</span>
          <span className="font-medium">{course.semester}</span>
        </div>
        
        {course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
          </div>
        )}
      </div>
      
      {onViewDetails && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      )}
    </CardContent>
  </Card>
);

// Event Card Component for Faculty and Outreach Dashboards
interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: 'Workshop' | 'Seminar' | 'Meeting' | 'Conference' | 'Training';
    attendees?: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
    description?: string;
  };
  onViewDetails?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Workshop': return BookOpen;
      case 'Seminar': return Users;
      case 'Meeting': return Calendar;
      case 'Conference': return Building;
      case 'Training': return GraduationCap;
      default: return Calendar;
    }
  };

  const EventIcon = getEventIcon(event.type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <EventIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.type}</p>
          </div>
          <Badge variant={
            event.status === 'Upcoming' ? 'default' :
            event.status === 'Ongoing' ? 'secondary' :
            event.status === 'Completed' ? 'outline' : 'destructive'
          }>
            {event.status}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{event.attendees} attendees</span>
            </div>
          )}
        </div>
        
        {event.description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {event.description}
          </p>
        )}
        
        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Process Card Component for Operations Dashboard
interface ProcessCardProps {
  process: {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Pending' | 'Completed' | 'Delayed';
    priority: 'High' | 'Medium' | 'Low';
    assignedTo: string;
    dueDate: string;
    progress: number;
    category: string;
  };
  onViewDetails?: () => void;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ process, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-info text-info-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      case 'Completed': return 'bg-success text-success-foreground';
      case 'Delayed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getProcessIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'placement': return Briefcase;
      case 'training': return GraduationCap;
      case 'assessment': return FileText;
      case 'administration': return Settings;
      default: return Activity;
    }
  };

  const ProcessIcon = getProcessIcon(process.category);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ProcessIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{process.name}</h3>
              <p className="text-sm text-muted-foreground">{process.category}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Badge className={getStatusColor(process.status)}>
              {process.status}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(process.priority)}>
              {process.priority}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {process.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Assigned to:</span>
            <span className="font-medium">{process.assignedTo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Due Date:</span>
            <span className="font-medium">{process.dueDate}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-medium">{process.progress}%</span>
            </div>
            <Progress value={process.progress} />
          </div>
        </div>
        
        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Additional specialized cards for different roles
export const FacultyOverviewCard: React.FC<{ facultyData: any }> = ({ facultyData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <GraduationCap className="w-5 h-5 text-primary" />
        <span>Academic Overview</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Publications</p>
          <p className="text-2xl font-bold text-foreground">{facultyData?.publicationsCount || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Students Guided</p>
          <p className="text-2xl font-bold text-foreground">{facultyData?.studentsGuided || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Projects</p>
          <p className="text-2xl font-bold text-foreground">{facultyData?.projectsHandled || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rating</p>
          <p className="text-2xl font-bold text-foreground">{facultyData?.averageRating || 'N/A'}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const OperationsOverviewCard: React.FC<{ operationsData: any }> = ({ operationsData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Building className="w-5 h-5 text-primary" />
        <span>Operations Overview</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Active Students</p>
          <p className="text-2xl font-bold text-foreground">{operationsData?.activeStudents || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Placement Rate</p>
          <p className="text-2xl font-bold text-foreground">{operationsData?.placementRate || 0}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Companies</p>
          <p className="text-2xl font-bold text-foreground">{operationsData?.companiesManaged || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Efficiency</p>
          <p className="text-2xl font-bold text-foreground">{operationsData?.efficiency || 'N/A'}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const OutreachOverviewCard: React.FC<{ outreachData: any }> = ({ outreachData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-primary" />
        <span>Outreach Overview</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Partnerships</p>
          <p className="text-2xl font-bold text-foreground">{outreachData?.activePartnerships || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold text-foreground">{outreachData?.successRate || 0}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Events</p>
          <p className="text-2xl font-bold text-foreground">{outreachData?.eventsOrganized || 0}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Satisfaction</p>
          <p className="text-2xl font-bold text-foreground">{outreachData?.satisfactionScore || 'N/A'}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Quick stats component for dashboard summaries
export const QuickStatsGrid: React.FC<{ 
  stats: Array<{
    icon: React.ElementType;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }> 
}> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, index) => (
      <StatCard
        key={index}
        icon={stat.icon}
        title={stat.title}
        value={stat.value.toString()}
        change={stat.change}
        color={stat.color}
      />
    ))}
  </div>
);

// Performance indicator component
export const PerformanceIndicator: React.FC<{
  value: number;
  label: string;
  color?: 'success' | 'warning' | 'error' | 'info';
}> = ({ value, label, color = 'info' }) => {
  const colorClasses = {
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    error: 'text-error bg-error/10',
    info: 'text-info bg-info/10'
  };

  return (
    <div className={`p-3 rounded-lg text-center ${colorClasses[color]}`}>
      <div className="text-2xl font-bold">{value}%</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

// Task Card Component for general use
interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: 'Todo' | 'In Progress' | 'Review' | 'Done';
    priority: 'High' | 'Medium' | 'Low';
    dueDate?: string;
    assignee?: string;
  };
  onStatusChange?: (id: string, status: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Todo': return Clock;
      case 'In Progress': return Zap;
      case 'Review': return AlertCircle;
      case 'Done': return CheckCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(task.status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-2">
            <StatusIcon className="w-4 h-4 mt-1 text-primary" />
            <div>
              <h4 className="font-medium text-foreground">{task.title}</h4>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              )}
            </div>
          </div>
          <Badge variant={
            task.priority === 'High' ? 'destructive' :
            task.priority === 'Medium' ? 'default' : 'secondary'
          }>
            {task.priority}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Status: {task.status}</span>
            {task.assignee && <span>Assignee: {task.assignee}</span>}
          </div>
          {task.dueDate && <span>Due: {task.dueDate}</span>}
        </div>
      </CardContent>
    </Card>
  );
};