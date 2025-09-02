import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Shield,
  Zap,
  RefreshCw,
  Download,
  Settings,
  Clock,
  MapPin
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

interface SystemMonitoringPageProps {
  userRole?: string;
}

// Real-time system metrics
const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 65,
    memory: 72,
    storage: 45,
    network: 89,
    activeUsers: 1247,
    onlineUsers: 892,
    systemLoad: 3.4,
    uptime: '15 days, 7 hours',
    responseTime: 145
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        storage: Math.max(20, Math.min(80, prev.storage + (Math.random() - 0.5) * 5)),
        network: Math.max(70, Math.min(100, prev.network + (Math.random() - 0.5) * 6)),
        activeUsers: Math.max(800, Math.min(1500, prev.activeUsers + Math.floor((Math.random() - 0.5) * 50))),
        onlineUsers: Math.max(500, Math.min(1200, prev.onlineUsers + Math.floor((Math.random() - 0.5) * 30))),
        responseTime: Math.max(80, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// System Health Dashboard
const SystemHealthDashboard: React.FC = () => {
  const metrics = useSystemMetrics();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-success';
    if (value <= thresholds.warning) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <Badge variant="default" className="bg-success">Optimal</Badge>;
    if (value <= thresholds.warning) return <Badge variant="secondary" className="bg-warning">Warning</Badge>;
    return <Badge variant="destructive">Critical</Badge>;
  };

  const systemServices = [
    { name: 'Web Server', status: 'running', uptime: '15d 7h', lastRestart: '2024-01-01' },
    { name: 'Database', status: 'running', uptime: '15d 7h', lastRestart: '2024-01-01' },
    { name: 'Authentication', status: 'running', uptime: '15d 7h', lastRestart: '2024-01-01' },
    { name: 'Email Service', status: 'running', uptime: '15d 7h', lastRestart: '2024-01-01' },
    { name: 'File Storage', status: 'running', uptime: '15d 7h', lastRestart: '2024-01-01' },
    { name: 'Background Jobs', status: 'warning', uptime: '2d 3h', lastRestart: '2024-02-13' },
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Status Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2>System Health Monitor</h2>
          <p className="text-muted-foreground">Real-time system performance and health monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Monitoring</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cpu className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">CPU Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metrics.cpu, { good: 70, warning: 85 })}`}>
                    {metrics.cpu.toFixed(1)}%
                  </p>
                </div>
              </div>
              {getStatusBadge(metrics.cpu, { good: 70, warning: 85 })}
            </div>
            <Progress value={metrics.cpu} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MemoryStick className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Memory Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metrics.memory, { good: 75, warning: 85 })}`}>
                    {metrics.memory.toFixed(1)}%
                  </p>
                </div>
              </div>
              {getStatusBadge(metrics.memory, { good: 75, warning: 85 })}
            </div>
            <Progress value={metrics.memory} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Storage Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metrics.storage, { good: 70, warning: 80 })}`}>
                    {metrics.storage.toFixed(1)}%
                  </p>
                </div>
              </div>
              {getStatusBadge(metrics.storage, { good: 70, warning: 80 })}
            </div>
            <Progress value={metrics.storage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wifi className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Network Status</p>
                  <p className={`text-2xl font-bold ${getStatusColor(100 - metrics.network, { good: 20, warning: 30 })}`}>
                    {metrics.network.toFixed(1)}%
                  </p>
                </div>
              </div>
              {getStatusBadge(100 - metrics.network, { good: 20, warning: 30 })}
            </div>
            <Progress value={metrics.network} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* User Activity & Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>User Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{metrics.activeUsers.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{metrics.onlineUsers.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Online Now</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Online Rate</span>
                <span>{((metrics.onlineUsers / metrics.activeUsers) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(metrics.onlineUsers / metrics.activeUsers) * 100} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Response Time:</span>
                <span className={`ml-1 font-medium ${metrics.responseTime > 200 ? 'text-warning' : 'text-success'}`}>
                  {metrics.responseTime.toFixed(0)}ms
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">System Uptime:</span>
                <span className="ml-1 font-medium text-success">{metrics.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-primary" />
              <span>System Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'running' ? 'bg-success' : 
                      service.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                    }`}></div>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">Uptime: {service.uptime}</div>
                    </div>
                  </div>
                  <Badge variant={
                    service.status === 'running' ? 'default' : 
                    service.status === 'warning' ? 'secondary' : 'destructive'
                  }>
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Performance Analytics
const PerformanceAnalytics: React.FC = () => {
  const performanceData = [
    { time: '00:00', cpu: 45, memory: 60, users: 120 },
    { time: '04:00', cpu: 35, memory: 55, users: 80 },
    { time: '08:00', cpu: 65, memory: 70, users: 450 },
    { time: '12:00', cpu: 75, memory: 75, users: 890 },
    { time: '16:00', cpu: 80, memory: 78, users: 1200 },
    { time: '20:00', cpu: 70, memory: 72, users: 980 },
  ];

  const resourceUsage = [
    { name: 'CPU', value: 65, color: '#4f46e5' },
    { name: 'Memory', value: 72, color: '#06b6d4' },
    { name: 'Storage', value: 45, color: '#10b981' },
    { name: 'Network', value: 89, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Performance Analytics</h2>
          <p className="text-muted-foreground">Historical performance data and trends</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Performance (24 Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#4f46e5" name="CPU %" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="#06b6d4" name="Memory %" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#10b981" name="Active Users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Current Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resourceUsage}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {resourceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span>Peak Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Max CPU Usage</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Peak Memory</span>
              <span className="font-medium">91%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Max Users</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Best Response Time</span>
              <span className="font-medium">78ms</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Average Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Avg CPU Usage</span>
              <span className="font-medium">62%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Memory</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Users</span>
              <span className="font-medium">756</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Response Time</span>
              <span className="font-medium">145ms</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-info" />
              <span>System Reliability</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Uptime</span>
              <span className="font-medium text-success">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Error Rate</span>
              <span className="font-medium text-success">0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Failed Requests</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Last Incident</span>
              <span className="font-medium">7 days ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Security Monitoring
const SecurityMonitoring: React.FC = () => {
  const securityEvents = [
    {
      id: 1,
      type: 'login_success',
      user: 'admin@srmap.edu.in',
      timestamp: '2024-02-15 14:30:22',
      ip: '192.168.1.100',
      location: 'Chennai, India',
      severity: 'info'
    },
    {
      id: 2,
      type: 'failed_login',
      user: 'unknown@example.com',
      timestamp: '2024-02-15 14:25:15',
      ip: '203.194.1.50',
      location: 'Unknown',
      severity: 'warning'
    },
    {
      id: 3,
      type: 'suspicious_activity',
      user: 'student@srmap.edu.in',
      timestamp: '2024-02-15 14:20:08',
      ip: '10.0.0.25',
      location: 'Amaravati, India',
      severity: 'critical'
    }
  ];

  const securityStats = [
    { label: 'Active Sessions', value: 892, trend: '+5%' },
    { label: 'Failed Logins (24h)', value: 12, trend: '-15%' },
    { label: 'Blocked IPs', value: 3, trend: 'No change' },
    { label: 'Security Alerts', value: 1, trend: '-50%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Security Monitoring</h2>
          <p className="text-muted-foreground">Real-time security events and threat monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="bg-success">
            <Shield className="w-3 h-3 mr-1" />
            Secure
          </Badge>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{stat.value.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-success mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Recent Security Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.severity === 'critical' ? 'bg-destructive' :
                    event.severity === 'warning' ? 'bg-warning' : 'bg-success'
                  }`}></div>
                  <div>
                    <div className="font-medium">
                      {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.user} from {event.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{event.timestamp}</div>
                  <div className="text-xs text-muted-foreground">{event.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Security Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-info/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-info mt-0.5" />
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Enable 2FA for all administrative accounts to enhance security
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <div className="font-medium">Update System Dependencies</div>
                <div className="text-sm text-muted-foreground">
                  3 security updates are available for critical system components
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <div className="font-medium">Firewall Configuration</div>
                <div className="text-sm text-muted-foreground">
                  All security rules are properly configured and active
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SystemMonitoringPage: React.FC<SystemMonitoringPageProps> = ({ userRole }) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-muted-foreground">
            Comprehensive system health, performance, and security monitoring
          </p>
        </div>
      </div>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="health" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>System Health</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="mt-6">
          <SystemHealthDashboard />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceAnalytics />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoringPage;