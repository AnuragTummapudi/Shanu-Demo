import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  Bell,
  BellRing,
  Mail,
  MailOpen,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  Briefcase,
  Users,
  Settings,
  Search,
  Filter,
  Check as MarkIcon,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Star,
  Pin,
  Archive,
  Send,
  Reply,
  Forward,
  MoreHorizontal,
  Zap,
  Target,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../navigation/NavigationProvider';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'announcement';
  category: 'placement' | 'training' | 'academic' | 'system' | 'interview' | 'application';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sender: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  recipient: {
    id: string;
    name: string;
    role: string;
  };
  isRead: boolean;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
  actionUrl?: string;
  actionText?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  metadata?: {
    jobId?: string;
    companyId?: string;
    sessionId?: string;
    applicationId?: string;
  };
}

const NotificationCenterPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Job Posting: Software Engineer at TCS',
        message: 'A new job opportunity has been posted that matches your profile. The position offers ₹12 LPA and is located in Bangalore.',
        type: 'info',
        category: 'placement',
        priority: 'high',
        sender: {
          id: 'outreach1',
          name: 'Ravi Teja',
          role: 'Outreach Team'
        },
        recipient: {
          id: 'student1',
          name: 'Rajesh Kumar',
          role: 'Student'
        },
        isRead: false,
        isPinned: true,
        isArchived: false,
        createdAt: '2024-01-22T10:30:00Z',
        actionUrl: 'job-detail',
        actionText: 'View Job Details',
        metadata: {
          jobId: 'job123',
          companyId: 'tcs'
        }
      },
      {
        id: '2',
        title: 'Interview Scheduled',
        message: 'Your technical interview with Microsoft has been scheduled for January 25th at 4:00 PM. Please join the meeting 10 minutes early.',
        type: 'success',
        category: 'interview',
        priority: 'urgent',
        sender: {
          id: 'system',
          name: 'System',
          role: 'System'
        },
        recipient: {
          id: 'student1',
          name: 'Rajesh Kumar',
          role: 'Student'
        },
        isRead: false,
        isPinned: false,
        isArchived: false,
        createdAt: '2024-01-21T14:15:00Z',
        actionUrl: 'interview-scheduler',
        actionText: 'View Interview Details',
        attachments: [
          {
            id: '1',
            name: 'Interview Guidelines.pdf',
            url: '/attachments/interview-guidelines.pdf',
            type: 'pdf'
          }
        ]
      },
      {
        id: '3',
        title: 'Training Session Reminder',
        message: 'React Advanced Patterns training session starts in 2 hours. Make sure you have completed the prerequisites.',
        type: 'warning',
        category: 'training',
        priority: 'medium',
        sender: {
          id: 'faculty1',
          name: 'Dr. Lakshmi Venkatesh',
          role: 'Faculty'
        },
        recipient: {
          id: 'student1',
          name: 'Rajesh Kumar',
          role: 'Student'
        },
        isRead: true,
        isPinned: false,
        isArchived: false,
        createdAt: '2024-01-21T08:00:00Z',
        readAt: '2024-01-21T08:30:00Z',
        actionUrl: 'training-session',
        actionText: 'Join Session'
      },
      {
        id: '4',
        title: 'Profile Completion Required',
        message: 'Your profile is 85% complete. Please update your resume and add certification details to improve visibility to recruiters.',
        type: 'warning',
        category: 'system',
        priority: 'medium',
        sender: {
          id: 'system',
          name: 'System',
          role: 'System'
        },
        recipient: {
          id: 'student1',
          name: 'Rajesh Kumar',
          role: 'Student'
        },
        isRead: true,
        isPinned: false,
        isArchived: false,
        createdAt: '2024-01-20T12:00:00Z',
        readAt: '2024-01-20T13:15:00Z',
        actionUrl: 'student-profile',
        actionText: 'Update Profile'
      },
      {
        id: '5',
        title: 'Application Status Update',
        message: 'Your application for Product Manager role at Google has been shortlisted. HR interview has been scheduled.',
        type: 'success',
        category: 'application',
        priority: 'high',
        sender: {
          id: 'hr1',
          name: 'Sarah Johnson',
          role: 'HR Manager'
        },
        recipient: {
          id: 'student1',
          name: 'Rajesh Kumar',
          role: 'Student'
        },
        isRead: false,
        isPinned: true,
        isArchived: false,
        createdAt: '2024-01-19T16:45:00Z',
        actionUrl: 'application-detail',
        actionText: 'View Application'
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  // Filter notifications
  useEffect(() => {
    let filtered = notifications;

    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (activeTab) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'pinned':
        filtered = filtered.filter(n => n.isPinned);
        break;
      case 'archived':
        filtered = filtered.filter(n => n.isArchived);
        break;
      case 'placement':
        filtered = filtered.filter(n => n.category === 'placement');
        break;
      case 'training':
        filtered = filtered.filter(n => n.category === 'training');
        break;
      case 'interviews':
        filtered = filtered.filter(n => n.category === 'interview');
        break;
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, activeTab]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return AlertCircle;
      case 'announcement':
        return BellRing;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return 'border-l-red-500 bg-red-50';
    
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'announcement':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true, readAt: new Date().toISOString() }
          : notification
      )
    );
  };

  const togglePin = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isPinned: !notification.isPinned }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        isRead: true,
        readAt: notification.readAt || new Date().toISOString()
      }))
    );
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const IconComponent = getNotificationIcon(notification.type);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-l-4 ${getNotificationColor(notification.type, notification.priority)} rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
          !notification.isRead ? 'ring-2 ring-primary/20' : ''
        }`}
        onClick={() => {
          setSelectedNotification(notification);
          if (!notification.isRead) {
            markAsRead(notification.id);
          }
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-full ${
              notification.type === 'success' ? 'bg-green-100' :
              notification.type === 'warning' ? 'bg-yellow-100' :
              notification.type === 'error' ? 'bg-red-100' :
              'bg-blue-100'
            }`}>
              <IconComponent className={`w-4 h-4 ${
                notification.type === 'success' ? 'text-green-600' :
                notification.type === 'warning' ? 'text-yellow-600' :
                notification.type === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-medium text-slate-800 ${!notification.isRead ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h3>
                {notification.isPinned && <Pin className="w-4 h-4 text-amber-500" />}
                <Badge className={getPriorityColor(notification.priority)}>
                  {notification.priority}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2 line-clamp-2">{notification.message}</p>
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <span>From: {notification.sender.name}</span>
                <span>•</span>
                <span>{new Date(notification.createdAt).toRelativeTimeString()}</span>
                <span>•</span>
                <span className="capitalize">{notification.category}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                togglePin(notification.id);
              }}
            >
              <Pin className={`w-4 h-4 ${notification.isPinned ? 'text-amber-500' : 'text-slate-400'}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {notification.actionText && (
          <div className="pt-2 border-t border-slate-200">
            <Button size="sm" variant="outline" className="text-xs">
              {notification.actionText}
            </Button>
          </div>
        )}
      </motion.div>
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const pinnedCount = notifications.filter(n => n.isPinned).length;
  const archivedCount = notifications.filter(n => n.isArchived).length;

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
                <h1 className="text-2xl font-bold text-slate-800">Notification Center</h1>
                <p className="text-slate-600">Stay updated with all important announcements and activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Bell className="w-3 h-3 mr-1" />
                {unreadCount} Unread
              </Badge>
              <Button variant="outline" onClick={markAllAsRead}>
                <MarkIcon className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
                    <div className="text-xs text-slate-600">Total</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                    <div className="text-xs text-slate-600">Unread</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Pinned</span>
                    <span className="font-medium">{pinnedCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Archived</span>
                    <span className="font-medium">{archivedCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">This Week</span>
                    <span className="font-medium">
                      {notifications.filter(n => {
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return new Date(n.createdAt) > weekAgo;
                      }).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { key: 'placement', label: 'Placement', icon: Briefcase, count: notifications.filter(n => n.category === 'placement').length },
                  { key: 'training', label: 'Training', icon: Award, count: notifications.filter(n => n.category === 'training').length },
                  { key: 'interview', label: 'Interviews', icon: Users, count: notifications.filter(n => n.category === 'interview').length },
                  { key: 'application', label: 'Applications', icon: FileText, count: notifications.filter(n => n.category === 'application').length },
                  { key: 'academic', label: 'Academic', icon: Calendar, count: notifications.filter(n => n.category === 'academic').length },
                  { key: 'system', label: 'System', icon: Settings, count: notifications.filter(n => n.category === 'system').length }
                ].map((category) => (
                  <div key={category.key} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <category.icon className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{category.label}</span>
                    </div>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">
                    All ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread ({unreadCount})
                  </TabsTrigger>
                  <TabsTrigger value="pinned">
                    Pinned ({pinnedCount})
                  </TabsTrigger>
                  <TabsTrigger value="placement">
                    Placement
                  </TabsTrigger>
                  <TabsTrigger value="training">
                    Training
                  </TabsTrigger>
                  <TabsTrigger value="interviews">
                    Interviews
                  </TabsTrigger>
                </TabsList>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              <TabsContent value={activeTab} className="space-y-4">
                <AnimatePresence>
                  {filteredNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </AnimatePresence>

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-600 mb-2">No notifications found</h3>
                    <p className="text-slate-500">
                      {searchTerm || activeTab !== 'all' 
                        ? 'Try adjusting your search or filters'
                        : 'You\'re all caught up!'
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenterPage;

// Extend Date prototype for relative time (this would typically be in a utils file)
declare global {
  interface Date {
    toRelativeTimeString(): string;
  }
}

Date.prototype.toRelativeTimeString = function() {
  const now = new Date();
  const diffMs = now.getTime() - this.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return this.toLocaleDateString();
};