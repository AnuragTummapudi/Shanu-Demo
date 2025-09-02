import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Save, 
  X, 
  FileText, 
  Briefcase, 
  Award, 
  Target,
  TrendingUp,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Linkedin,
  ExternalLink,
  Camera,
  Plus,
  Eye,
  Download,
  Share2,
  Settings,
  ChevronRight,
  Activity,
  BarChart3,
  PieChart,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  Handshake,
  Network,
  TrendingDown,
  RefreshCw,
  QrCode,
  Send,
  Copy,
  Twitter,
  Facebook,
  MessageSquare,
  Zap,
  Crown,
  Shield,
  Sparkles,
  Database,
  Monitor,
  Cpu,
  HardDrive,
  Server,
  Gauge,
  LineChart,
  AreaChart,
  GitBranch,
  Lock,
  Key,
  UserCheck
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { motion, AnimatePresence } from 'motion/react';
import { enhancedSuperAdminProfile, generateSafeReportData, generateQuickStats, getKeyMetrics } from '../data/superAdminData';

interface EnhancedSuperAdminProfilePageProps {
  adminUser?: any;
}

// System health monitoring component
const SystemHealthMonitor = ({ isLive }: { isLive: boolean }) => {
  const [systemHealth, setSystemHealth] = useState({
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 32,
    networkLoad: 78,
    activeUsers: 892,
    uptime: 99.8
  });

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(25, Math.min(80, prev.diskUsage + (Math.random() - 0.5) * 5)),
        networkLoad: Math.max(40, Math.min(95, prev.networkLoad + (Math.random() - 0.5) * 15)),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        uptime: Math.max(99.0, Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getHealthColor = (value: number, reverse = false) => {
    if (reverse) {
      return value > 95 ? 'green' : value > 90 ? 'yellow' : 'red';
    }
    return value < 50 ? 'green' : value < 80 ? 'yellow' : 'red';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        { label: 'CPU Usage', value: systemHealth.cpuUsage, unit: '%', icon: Cpu, key: 'cpu' },
        { label: 'Memory', value: systemHealth.memoryUsage, unit: '%', icon: Database, key: 'memory' },
        { label: 'Disk Usage', value: systemHealth.diskUsage, unit: '%', icon: HardDrive, key: 'disk' },
        { label: 'Network Load', value: systemHealth.networkLoad, unit: '%', icon: Network, key: 'network' },
        { label: 'Active Users', value: systemHealth.activeUsers, unit: '', icon: Users, key: 'users' },
        { label: 'Uptime', value: systemHealth.uptime, unit: '%', icon: Server, key: 'uptime', reverse: true }
      ].map((metric, index) => {
        const color = metric.key === 'uptime' || metric.key === 'users' ? 'blue' : getHealthColor(metric.value, metric.reverse);
        const colorClass = color === 'green' ? 'green-500' : color === 'yellow' ? 'yellow-500' : color === 'red' ? 'red-500' : 'blue-500';
        
        return (
          <motion.div
            key={metric.key}
            className="bg-white p-4 rounded-xl border shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <metric.icon className={`w-5 h-5 text-${colorClass}`} />
              {isLive && (
                <div className="flex items-center text-xs text-green-600">
                  <div className={`w-2 h-2 bg-${colorClass} rounded-full animate-pulse mr-1`} />
                  LIVE
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-800">
                {metric.key === 'users' ? metric.value : `${Math.round(metric.value)}${metric.unit}`}
              </div>
              <div className="text-xs text-slate-600">{metric.label}</div>
              {metric.key !== 'users' && (
                <Progress 
                  value={metric.key === 'uptime' ? (metric.value - 99) * 100 : metric.value} 
                  className={`h-2 bg-slate-100`}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// University analytics dashboard
const UniversityAnalytics = ({ isLive }: { isLive: boolean }) => {
  const [analytics, setAnalytics] = useState({
    totalStudents: 2847,
    facultyCount: 182,
    placementRate: 78,
    averageCTC: 8.5,
    internships: 1240,
    researchProjects: 156
  });

  const reportData = generateSafeReportData();

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        placementRate: Math.max(70, Math.min(95, prev.placementRate + (Math.random() - 0.5) * 2)),
        averageCTC: Math.max(6, Math.min(15, prev.averageCTC + (Math.random() - 0.5) * 0.5)),
        internships: prev.internships + Math.floor(Math.random() * 5) - 2
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getKeyMetrics().map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`p-6 rounded-xl bg-gradient-to-br from-${metric.bgColor} to-${metric.borderColor} border border-${metric.color}-200`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 text-${metric.color}-600`} />
              {isLive && (
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                  LIVE
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</div>
            <div className="text-sm text-slate-600 mb-2">{metric.label}</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {metric.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Department Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-primary" />
            Department Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.departmentStats.slice(0, 6).map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary rounded-lg">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{dept.name}</div>
                    <div className="text-sm text-slate-600">{dept.students} students</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{dept.placementRate}%</div>
                    <div className="text-xs text-slate-600">Placement Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">₹{dept.avgPackage}L</div>
                    <div className="text-xs text-slate-600">Avg Package</div>
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
};

// Administrative tools component
const AdministrativeTools = () => {
  const tools = [
    { name: 'User Management', description: 'Manage users and permissions', icon: Users, color: 'blue' },
    { name: 'System Settings', description: 'Configure system parameters', icon: Settings, color: 'green' },
    { name: 'Security Center', description: 'Manage security and access', icon: Shield, color: 'red' },
    { name: 'Report Generator', description: 'Generate detailed reports', icon: FileText, color: 'purple' },
    { name: 'Backup Management', description: 'Manage data backups', icon: Database, color: 'orange' },
    { name: 'API Management', description: 'Configure API endpoints', icon: GitBranch, color: 'indigo' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 bg-gradient-to-br from-${tool.color}-50 to-${tool.color}-100 border border-${tool.color}-200 rounded-xl cursor-pointer hover:shadow-lg transition-shadow`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 bg-${tool.color}-500 rounded-lg`}>
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{tool.name}</h3>
              <p className="text-sm text-slate-600">{tool.description}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Tool
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

// Professional networking for admin
const AdminProfessionalNetworking = ({ profile }: { profile: any }) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'linkedin' | 'word'>('pdf');

  const handleExportProfile = async (format: string) => {
    console.log(`Exporting admin profile as ${format}...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Export completed!');
  };

  const handleShare = (platform: string) => {
    const profileUrl = `https://srmap.edu.in/admin/profiles/${profile.email}`;
    const shareText = `${profile.name} - ${profile.designation} at SRM University AP`;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(shareText)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${profileUrl}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(profileUrl);
        break;
    }
    setShowShareDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card className="bg-gradient-to-r from-primary/5 to-purple-600/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2 text-primary" />
            Export Administrative Profile
          </CardTitle>
          <CardDescription>
            Share your administrative profile with stakeholders and partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { format: 'pdf', label: 'Executive Summary', description: 'Professional PDF format', icon: FileText, color: 'red' },
              { format: 'linkedin', label: 'LinkedIn Profile', description: 'Professional network ready', icon: Linkedin, color: 'blue' },
              { format: 'word', label: 'Detailed Report', description: 'Comprehensive Word document', icon: FileText, color: 'blue' }
            ].map((option) => (
              <motion.div
                key={option.format}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border-2 border-${option.color}-200 rounded-xl cursor-pointer hover:bg-${option.color}-50 transition-colors ${
                  exportFormat === option.format ? `bg-${option.color}-50 border-${option.color}-400` : 'bg-white'
                }`}
                onClick={() => setExportFormat(option.format as any)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <option.icon className={`w-5 h-5 text-${option.color}-600`} />
                  <div className="font-medium text-slate-800">{option.label}</div>
                </div>
                <div className="text-sm text-slate-600">{option.description}</div>
              </motion.div>
            ))}
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={() => handleExportProfile(exportFormat)}
          >
            <Download className="w-4 h-4 mr-2" />
            Export {exportFormat.toUpperCase()}
          </Button>
        </CardContent>
      </Card>

      {/* Administrative Network */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="w-5 h-5 mr-2 text-primary" />
            Administrative Network
          </CardTitle>
          <CardDescription>
            Connect with university leadership and educational partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">University Leadership</h4>
              <div className="space-y-2">
                {[
                  'Vice Chancellor Network',
                  'Academic Council',
                  'Board of Directors',
                  'Department Heads'
                ].map((network, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <Crown className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">{network}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3">External Partners</h4>
              <div className="space-y-2">
                {[
                  'Education Ministry',
                  'Industry Partners',
                  'Research Collaborators',
                  'International Universities'
                ].map((partner, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-700">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Administrative Profile</DialogTitle>
                  <DialogDescription>
                    Share your profile with stakeholders and partners
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { platform: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'blue' },
                    { platform: 'twitter', label: 'Twitter', icon: Twitter, color: 'blue' },
                    { platform: 'email', label: 'Email', icon: Mail, color: 'green' },
                    { platform: 'copy', label: 'Copy Link', icon: Copy, color: 'gray' }
                  ].map((platform) => (
                    <Button
                      key={platform.platform}
                      variant="outline"
                      onClick={() => handleShare(platform.platform)}
                      className="flex items-center space-x-2 justify-start"
                    >
                      <platform.icon className={`w-4 h-4 text-${platform.color}-600`} />
                      <span>{platform.label}</span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>QR Code</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Administrative Profile QR</DialogTitle>
                  <DialogDescription>
                    Quick access to administrative profile
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center p-4">
                  <div className="w-48 h-48 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Admin QR Code</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => handleExportProfile('qr')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span>Directory</span>
            </Button>

            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EnhancedSuperAdminProfilePage: React.FC<EnhancedSuperAdminProfilePageProps> = ({ adminUser }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Use provided data or fallback to defaults
  const profile = adminUser || enhancedSuperAdminProfile;

  const handleSave = () => {
    setIsEditing(false);
    console.log('Admin profile saved:', profile);
  };

  const handleToggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header with Administrative Theme */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-7xl mx-auto p-6 h-full flex items-end">
          <div className="flex items-center space-x-4 w-full">
            <Button 
              variant="secondary" 
              onClick={goBack} 
              className="bg-white/90 hover:bg-white text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white flex items-center"
              >
                <Crown className="w-8 h-8 mr-3 text-yellow-300" />
                Super Administrator Profile
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90"
              >
                University System Administration & Strategic Oversight
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="secondary" 
                onClick={handleToggleLiveMode}
                className={`${isLiveMode ? 'bg-green-500 text-white' : 'bg-white/90 text-slate-800'} hover:bg-opacity-90`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLiveMode ? 'animate-spin' : ''}`} />
                {isLiveMode ? 'Live Monitoring' : 'Static View'}
              </Button>
              <Button variant="secondary" className="bg-white/90 hover:bg-white text-slate-800">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(!isEditing)} 
                className="bg-white/90 hover:bg-white text-slate-800"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 -mt-24 relative z-10">
        {/* Enhanced Administrative Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl border-0 mb-8 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                {/* Enhanced Avatar with Administrative Badge */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-3xl">
                      {profile.name?.split(' ').map((n: string) => n[0]).join('') || 'SA'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 p-2 bg-yellow-500 rounded-full border-2 border-white">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
                    <p className="text-lg text-slate-600">{profile.designation}</p>
                    <p className="text-slate-500">{profile.department} • {profile.email}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1">
                      <Shield className="w-3 h-3 mr-1" />
                      {profile.experience} Experience
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      {profile.qualification}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Super Admin
                    </Badge>
                  </div>
                  
                  {/* Administrative Access Levels */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 rounded">
                      <Lock className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700">Full Access</span>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 rounded">
                      <Key className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-700">System Admin</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* System Status Panel */}
              <div className="text-right space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                  <div className="text-3xl font-bold text-slate-800 mb-1">99.8%</div>
                  <div className="text-sm text-slate-600 mb-3">System Uptime</div>
                  <div className="text-xs text-slate-500">
                    Since: {new Date(profile.joinDate).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Live System Status */}
                {isLiveMode && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-700 font-medium">SYSTEM MONITORING</span>
                    </div>
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    Users
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Database className="w-3 h-3 mr-1" />
                    Data
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Reports
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Config
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Health Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-primary" />
                  System Health Monitor
                </div>
                <div className="flex items-center space-x-2">
                  {isLiveMode && (
                    <div className="flex items-center text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                      Live Monitoring Active
                    </div>
                  )}
                  <Button size="sm" variant="outline" onClick={handleToggleLiveMode}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLiveMode ? 'animate-spin' : ''}`} />
                    {isLiveMode ? 'Pause' : 'Start'} Monitoring
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SystemHealthMonitor isLive={isLiveMode} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-1 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <BarChart3 className="w-4 h-4 mr-2" />
              University Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Server className="w-4 h-4 mr-2" />
              System Management
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Settings className="w-4 h-4 mr-2" />
              Admin Tools
            </TabsTrigger>
            <TabsTrigger value="networking" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Network className="w-4 h-4 mr-2" />
              Professional Network
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Shield className="w-4 h-4 mr-2" />
              Security & Access
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Administrative Information */}
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      Administrative Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                            <div className="font-medium text-slate-800">{profile.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                            <div className="font-medium text-slate-800">{profile.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Joining Date</div>
                            <div className="font-medium text-slate-800">{new Date(profile.joinDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Department</div>
                            <div className="font-medium text-slate-800">{profile.department}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Qualification</div>
                            <div className="font-medium text-slate-800">{profile.qualification}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Experience</div>
                            <div className="font-medium text-slate-800">{profile.experience}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Specialization Summary */}
                <Card className="bg-gradient-to-br from-primary/5 to-purple-600/5 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Specialization Areas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {profile.specialization?.map((spec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-white/60 rounded-lg">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="text-sm text-slate-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">15+</div>
                      <div className="text-sm text-slate-600">Years of Leadership</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UniversityAnalytics isLive={isLiveMode} />
              </motion.div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* System Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="w-5 h-5 mr-2 text-primary" />
                        Database Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Size</span>
                          <span className="font-medium">15.6 GB</span>
                        </div>
                        <Progress value={78} />
                        <div className="text-xs text-slate-500">78% of allocated space</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Server className="w-5 h-5 mr-2 text-primary" />
                        Server Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Response Time</span>
                          <span className="font-medium">2.3s</span>
                        </div>
                        <Progress value={85} />
                        <div className="text-xs text-slate-500">Excellent performance</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-primary" />
                        Active Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Current Users</span>
                          <span className="font-medium">892</span>
                        </div>
                        <Progress value={62} />
                        <div className="text-xs text-slate-500">62% of max capacity</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* System Logs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      Recent System Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: '14:30', action: 'System backup completed successfully', status: 'success' },
                        { time: '13:45', action: 'User authentication service restarted', status: 'info' },
                        { time: '12:15', action: 'Database optimization completed', status: 'success' },
                        { time: '11:30', action: 'Security scan completed - no threats found', status: 'success' },
                        { time: '10:45', action: 'System update deployed to production', status: 'info' }
                      ].map((log, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-500 w-12">{log.time}</div>
                          <div className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-green-500' : 
                            log.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`} />
                          <div className="flex-1 text-sm text-slate-700">{log.action}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Administrative Tools
                    </CardTitle>
                    <CardDescription>
                      Comprehensive tools for university system administration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdministrativeTools />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="networking" className="space-y-6">
              <motion.div
                key="networking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdminProfessionalNetworking profile={profile} />
              </motion.div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Security Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-primary" />
                        Security Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">System Security</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">Data Encryption</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">Backup Systems</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Operational</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Key className="w-5 h-5 mr-2 text-primary" />
                        Access Control
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">5</div>
                          <div className="text-sm text-slate-600">Admin Users</div>
                        </div>
                        
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">847</div>
                          <div className="text-sm text-slate-600">Active Sessions</div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Manage Access Rights
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Security Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                      Security Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: '2 mins ago', event: 'Successful admin login from trusted IP', severity: 'info' },
                        { time: '15 mins ago', event: 'Password policy updated', severity: 'info' },
                        { time: '1 hour ago', event: 'Security scan completed - no threats', severity: 'success' },
                        { time: '3 hours ago', event: 'Failed login attempt blocked', severity: 'warning' },
                        { time: '1 day ago', event: 'System backup verification completed', severity: 'success' }
                      ].map((event, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            event.severity === 'success' ? 'bg-green-500' :
                            event.severity === 'warning' ? 'bg-yellow-500' :
                            event.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm text-slate-800">{event.event}</div>
                            <div className="text-xs text-slate-500">{event.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedSuperAdminProfilePage;