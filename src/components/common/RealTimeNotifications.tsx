import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Bell, 
  BellRing, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Calendar, 
  Briefcase, 
  Users, 
  GraduationCap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NotificationType = 'success' | 'warning' | 'info' | 'application' | 'interview' | 'training' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
  priority: 'low' | 'medium' | 'high';
}

interface RealTimeNotificationsProps {
  userRole: string;
  isOpen: boolean;
  onClose: () => void;
}

const notificationIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
  application: Briefcase,
  interview: Calendar,
  training: GraduationCap,
  system: Bell
};

const notificationColors = {
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  application: 'text-primary',
  interview: 'text-purple-600',
  training: 'text-emerald-600',
  system: 'text-slate-600'
};

const priorityColors = {
  low: 'border-l-slate-300',
  medium: 'border-l-warning',
  high: 'border-l-error'
};

// Mock real-time notifications based on user role
const generateMockNotifications = (userRole: string): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: '1',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2:00-4:00 AM',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      priority: 'medium'
    }
  ];

  const roleSpecificNotifications: Record<string, Notification[]> = {
    student: [
      {
        id: '2',
        type: 'application',
        title: 'Application Status Update',
        message: 'Your application to TCS has been shortlisted for the next round',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        priority: 'high',
        actionUrl: '/applications'
      },
      {
        id: '3',
        type: 'interview',
        title: 'Interview Scheduled',
        message: 'Technical interview with Infosys scheduled for tomorrow at 2:00 PM',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        priority: 'high',
        actionUrl: '/interviews'
      },
      {
        id: '4',
        type: 'training',
        title: 'New Training Session',
        message: 'React.js Advanced Training starts next Monday',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true,
        priority: 'medium',
        actionUrl: '/training'
      }
    ],
    faculty: [
      {
        id: '2',
        type: 'training',
        title: 'Session Attendance',
        message: '45 students attended your Java Fundamentals session',
        timestamp: new Date(Date.now() - 10 * 60000),
        read: false,
        priority: 'low'
      },
      {
        id: '3',
        type: 'system',
        title: 'Grade Submission Reminder',
        message: 'Grades for Spring 2024 due by Friday',
        timestamp: new Date(Date.now() - 45 * 60000),
        read: false,
        priority: 'medium'
      }
    ],
    outreach: [
      {
        id: '2',
        type: 'success',
        title: 'New Partnership',
        message: 'Microsoft has agreed to participate in our placement drive',
        timestamp: new Date(Date.now() - 20 * 60000),
        read: false,
        priority: 'high'
      },
      {
        id: '3',
        type: 'application',
        title: 'Company Response',
        message: 'Amazon is interested in expanding their internship program',
        timestamp: new Date(Date.now() - 35 * 60000),
        read: false,
        priority: 'medium'
      }
    ],
    operations: [
      {
        id: '2',
        type: 'application',
        title: 'Bulk Applications',
        message: '127 new applications received for Google internship',
        timestamp: new Date(Date.now() - 8 * 60000),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'interview',
        title: 'Interview Coordination',
        message: 'Next week: 23 interviews scheduled across 8 companies',
        timestamp: new Date(Date.now() - 25 * 60000),
        read: false,
        priority: 'medium'
      }
    ],
    admin: [
      {
        id: '2',
        type: 'system',
        title: 'System Analytics',
        message: 'Platform usage increased by 23% this month',
        timestamp: new Date(Date.now() - 12 * 60000),
        read: false,
        priority: 'low'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Storage Alert',
        message: 'Database storage at 78% capacity',
        timestamp: new Date(Date.now() - 40 * 60000),
        read: false,
        priority: 'high'
      }
    ]
  };

  return [...baseNotifications, ...(roleSpecificNotifications[userRole] || [])];
};

export default function RealTimeNotifications({ userRole, isOpen, onClose }: RealTimeNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    // Initialize notifications
    setNotifications(generateMockNotifications(userRole));

    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomTypes: NotificationType[] = ['success', 'info', 'application', 'system'];
      const randomMessages = [
        'New update available',
        'Profile view from recruiter',
        'System backup completed',
        'New message received'
      ];

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: randomTypes[Math.floor(Math.random() * randomTypes.length)],
        title: 'Live Update',
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
        read: false,
        priority: Math.random() > 0.7 ? 'high' : 'medium'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [userRole]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || !notif.read
  );

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-4 top-4 bottom-4 w-96 z-50"
        >
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <BellRing className="w-5 h-5 text-primary" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-error">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b bg-muted/30">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'secondary' : 'ghost'}
                size="sm"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="p-3 border-b bg-muted/20">
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All as Read
                </Button>
              </div>
            )}

            {/* Notifications List */}
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                <AnimatePresence>
                  {filteredNotifications.map((notification) => {
                    const Icon = notificationIcons[notification.type];
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.2 }}
                        className={`p-3 rounded-lg border-l-4 ${priorityColors[notification.priority]} ${
                          notification.read ? 'bg-muted/30' : 'bg-white shadow-sm'
                        } cursor-pointer hover:shadow-md transition-all duration-200`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 ${notificationColors[notification.type]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {notification.title}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <p className={`text-xs mt-1 ${notification.read ? 'text-muted-foreground' : 'text-foreground/80'}`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {formatTime(notification.timestamp)}
                              </div>
                              
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t bg-muted/20">
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                Live updates enabled
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}