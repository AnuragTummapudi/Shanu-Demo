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
  Sparkles
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { motion, AnimatePresence } from 'motion/react';
import { defaultOutreachProfile, defaultCompanyContacts, defaultPartnerships, defaultAchievements } from '../data/outreachProfileData';

interface EnhancedOutreachProfilePageProps {
  outreachMember?: any;
}

// Real-time metrics component
const RealTimeMetrics = ({ isLive }: { isLive: boolean }) => {
  const [metrics, setMetrics] = useState({
    activeConnections: 45,
    monthlyTargetProgress: 68,
    responseRate: 87,
    pipelineValue: 125,
    newLeads: 8
  });

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 3) - 1,
        monthlyTargetProgress: Math.min(100, prev.monthlyTargetProgress + Math.random() * 2),
        responseRate: Math.max(75, Math.min(95, prev.responseRate + (Math.random() - 0.5) * 2)),
        pipelineValue: prev.pipelineValue + Math.floor(Math.random() * 10) - 5,
        newLeads: prev.newLeads + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {[
        { label: 'Active Connections', value: metrics.activeConnections, color: 'blue', trend: '+2.3%' },
        { label: 'Monthly Progress', value: `${Math.round(metrics.monthlyTargetProgress)}%`, color: 'green', trend: '+5.1%' },
        { label: 'Response Rate', value: `${Math.round(metrics.responseRate)}%`, color: 'purple', trend: '+1.2%' },
        { label: 'Pipeline Value', value: `₹${metrics.pipelineValue}L`, color: 'orange', trend: '+8.5%' },
        { label: 'New Leads', value: metrics.newLeads, color: 'indigo', trend: '+12%' }
      ].map((metric, index) => (
        <motion.div
          key={metric.label}
          className={`p-4 rounded-xl bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 border border-${metric.color}-200`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-${metric.color}-500`}>
              {isLive && <Zap className="w-3 h-3 text-white animate-pulse" />}
            </div>
            {isLive && (
              <div className="flex items-center text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                LIVE
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-slate-800">{metric.value}</div>
          <div className="text-xs text-slate-600 mb-1">{metric.label}</div>
          <div className="text-xs text-green-600 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {metric.trend}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Professional networking component
const ProfessionalNetworking = ({ profile }: { profile: any }) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'linkedin' | 'word'>('pdf');

  const handleExportProfile = async (format: string) => {
    console.log(`Exporting profile as ${format}...`);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Export completed!');
  };

  const handleShare = (platform: string) => {
    const profileUrl = `https://srmap.edu.in/profiles/outreach/${profile.employeeId}`;
    const shareText = `Check out ${profile.firstName} ${profile.lastName}'s professional profile at SRM University AP`;
    
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

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code
    const qrCodeSvg = `
      <svg width="200" height="200" viewBox="0 0 200 200" className="border">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="100" y="20" width="20" height="20" fill="black"/>
        <rect x="140" y="20" width="20" height="20" fill="black"/>
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="100" y="60" width="20" height="20" fill="black"/>
        <rect x="20" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="100" width="20" height="20" fill="black"/>
        <rect x="140" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="140" width="20" height="20" fill="black"/>
        <rect x="100" y="140" width="20" height="20" fill="black"/>
        <rect x="140" y="140" width="20" height="20" fill="black"/>
        <text x="100" y="190" text-anchor="middle" fontSize="12" fill="black">Profile QR</text>
      </svg>
    `;
    return qrCodeSvg;
  };

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card className="bg-gradient-to-r from-primary/5 to-purple-600/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2 text-primary" />
            Export Profile
          </CardTitle>
          <CardDescription>
            Share your professional profile with potential partners and connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { format: 'pdf', label: 'PDF Resume', description: 'Professional PDF format', icon: FileText, color: 'red' },
              { format: 'linkedin', label: 'LinkedIn Export', description: 'LinkedIn-ready format', icon: Linkedin, color: 'blue' },
              { format: 'word', label: 'Word Document', description: 'Editable Word format', icon: FileText, color: 'blue' }
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
            Export as {exportFormat.toUpperCase()}
          </Button>
        </CardContent>
      </Card>

      {/* Sharing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="w-5 h-5 mr-2 text-primary" />
            Professional Networking
          </CardTitle>
          <CardDescription>
            Share your profile across professional networks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <DialogTitle>Share Professional Profile</DialogTitle>
                  <DialogDescription>
                    Share your profile with professional connections
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
                  <DialogTitle>Profile QR Code</DialogTitle>
                  <DialogDescription>
                    Scan to view professional profile
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center p-4">
                  <div className="w-48 h-48 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">QR Code</p>
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
              <Network className="w-4 h-4" />
              <span>Network</span>
            </Button>

            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </Button>
          </div>

          {/* Professional Networks */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Professional Networks</h4>
            <div className="flex flex-wrap gap-2">
              {profile.professionalBodies?.map((network: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Building className="w-3 h-3 mr-1" />
                  {network}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Achievement gallery component
const AchievementGallery = ({ achievements }: { achievements: any[] }) => {
  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{achievement.title}</h3>
                <p className="text-slate-600 mb-3">{achievement.description}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {achievement.impact}
                  </div>
                </div>
              </div>
            </div>
            <Badge className={`${
              achievement.category === 'placement' ? 'bg-green-100 text-green-800' :
              achievement.category === 'partnership' ? 'bg-blue-100 text-blue-800' :
              achievement.category === 'revenue' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {achievement.category}
            </Badge>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const EnhancedOutreachProfilePage: React.FC<EnhancedOutreachProfilePageProps> = ({ outreachMember }) => {
  const { goBack, navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Use provided data or fallback to defaults
  const profile = outreachMember || defaultOutreachProfile;

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profile);
  };

  const handleToggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header with Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-primary via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
                className="text-3xl font-bold text-white"
              >
                Outreach Professional Profile
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90"
              >
                Corporate Relations & Partnership Management
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="secondary" 
                onClick={handleToggleLiveMode}
                className={`${isLiveMode ? 'bg-green-500 text-white' : 'bg-white/90 text-slate-800'} hover:bg-opacity-90`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLiveMode ? 'animate-spin' : ''}`} />
                {isLiveMode ? 'Live Mode ON' : 'Live Mode OFF'}
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
        {/* Enhanced Profile Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl border-0 mb-8 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                {/* Enhanced Avatar with Upload */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-3xl">
                      {profile.firstName?.[0]}{profile.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{profile.firstName} {profile.lastName}</h2>
                    <p className="text-lg text-slate-600">{profile.designation}</p>
                    <p className="text-slate-500">{profile.department} • {profile.employeeId}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      <Building className="w-3 h-3 mr-1" />
                      {profile.totalExperience}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      <Target className="w-3 h-3 mr-1" />
                      {profile.companiesConnected} Companies
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      {profile.placementTargetsAchieved} Target
                    </Badge>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    {profile.socialMediaProfiles?.linkedin && (
                      <a href={profile.socialMediaProfiles.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                    {profile.socialMediaProfiles?.twitter && (
                      <a href={profile.socialMediaProfiles.twitter} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Twitter className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="text-right space-y-4">
                <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-slate-800 mb-1">{profile.activePartnerships}</div>
                  <div className="text-sm text-slate-600 mb-3">Active Partnerships</div>
                  <div className="text-xs text-slate-500">
                    {profile.averagePlacementPackage} Avg Package
                  </div>
                </div>
                
                {/* Live Status Indicator */}
                {isLiveMode && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-700 font-medium">LIVE METRICS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <RealTimeMetrics isLive={isLiveMode} />
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-1 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Handshake className="w-4 h-4 mr-2" />
              Partnerships
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="networking" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <Network className="w-4 h-4 mr-2" />
              Networking
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
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
                {/* Personal Information */}
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      Professional Information
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
                            <div className="font-medium text-slate-800">{new Date(profile.dateOfJoining).toLocaleDateString()}</div>
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
                          <User className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Reporting Manager</div>
                            <div className="font-medium text-slate-800">{profile.reportingManager}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Experience</div>
                            <div className="font-medium text-slate-800">{profile.totalExperience}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expertise Summary */}
                <Card className="bg-gradient-to-br from-primary/5 to-purple-600/5 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Expertise Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Industry Expertise</div>
                        <div className="flex flex-wrap gap-1">
                          {profile.industryExpertise?.map((industry: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Regions</div>
                        <div className="flex flex-wrap gap-1">
                          {profile.regionsHandled?.map((region: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                              <MapPin className="w-3 h-3 mr-1" />
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Monthly Targets */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Monthly Targets & Achievement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(profile.monthlyTargets || {}).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{value as string}</div>
                          <div className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <Progress value={Math.random() * 40 + 60} className="mt-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievement Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Placement Targets</span>
                        <span className="font-bold text-green-600">{profile.placementTargetsAchieved}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Package</span>
                        <span className="font-bold">{profile.averagePlacementPackage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Companies Connected</span>
                        <span className="font-bold text-blue-600">{profile.companiesConnected}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Certifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Technical Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {profile.technicalSkills?.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Certifications</div>
                        <div className="space-y-1">
                          {profile.certifications?.map((cert: string, index: number) => (
                            <div key={index} className="text-xs text-slate-600 flex items-center">
                              <Award className="w-3 h-3 mr-1 text-yellow-500" />
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="partnerships" className="space-y-6">
              <motion.div
                key="partnerships"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Handshake className="w-5 h-5 mr-2 text-primary" />
                      Active Partnerships
                    </CardTitle>
                    <CardDescription>
                      Current corporate partnerships and collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {defaultPartnerships.map((partnership) => (
                        <div key={partnership.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-slate-800">{partnership.companyName}</h3>
                            <Badge className={`${
                              partnership.status === 'active' ? 'bg-green-100 text-green-800' :
                              partnership.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {partnership.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{partnership.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(partnership.startDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {partnership.partnershipType}
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              {partnership.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Company Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Company Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {defaultCompanyContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{contact.contactPerson.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-slate-800">{contact.contactPerson}</h4>
                              <p className="text-sm text-slate-600">{contact.designation} • {contact.companyName}</p>
                              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`${
                              contact.relationship === 'primary' ? 'bg-green-50 text-green-700' :
                              contact.relationship === 'secondary' ? 'bg-blue-50 text-blue-700' :
                              'bg-orange-50 text-orange-700'
                            }`}>
                              {contact.relationship}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Professional Achievements
                    </CardTitle>
                    <CardDescription>
                      Key milestones and accomplishments in corporate outreach
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AchievementGallery achievements={defaultAchievements} />
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
                <ProfessionalNetworking profile={profile} />
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Performance Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                        Performance Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Performance Chart</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-primary" />
                        Partnership Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Partnership Breakdown</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Real-time Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-primary" />
                        Real-time Analytics
                      </div>
                      <Button size="sm" variant="outline" onClick={handleToggleLiveMode}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLiveMode ? 'animate-spin' : ''}`} />
                        {isLiveMode ? 'Live' : 'Static'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">89%</div>
                        <div className="text-sm text-slate-600">Response Rate</div>
                        <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +12% this month
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₹15.2L</div>
                        <div className="text-sm text-slate-600">Pipeline Value</div>
                        <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +8% this week
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">23</div>
                        <div className="text-sm text-slate-600">Active Leads</div>
                        <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +5 new leads
                        </div>
                      </div>
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

export default EnhancedOutreachProfilePage;