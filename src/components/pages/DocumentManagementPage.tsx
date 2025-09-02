import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ArrowLeft,
  FileText,
  Upload,
  Download,
  Eye,
  Share2,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Shield,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Archive,
  BarChart3,
  PieChart,
  TrendingUp,
  FolderOpen,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive as ArchiveIcon,
  Settings,
  RefreshCw,
  Zap,
  Brain,
  Globe,
  Mail,
  Link,
  Tag,
  Flag,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../navigation/NavigationProvider';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'certificate' | 'transcript' | 'id-proof' | 'photo' | 'project' | 'other';
  category: 'academic' | 'personal' | 'professional' | 'placement';
  format: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png' | 'txt' | 'zip';
  size: number; // in bytes
  uploadedBy: string;
  uploadedByName: string;
  uploadDate: string;
  lastModified: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  isPublic: boolean;
  isEncrypted: boolean;
  downloadCount: number;
  description?: string;
  tags: string[];
  verifiedBy?: string;
  verificationDate?: string;
  expiryDate?: string;
  version: number;
  checksum: string;
  url: string;
  thumbnailUrl?: string;
  metadata: {
    studentId?: string;
    rollNumber?: string;
    semester?: string;
    academicYear?: string;
    issuer?: string;
    grade?: string;
    score?: number;
  };
}

interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  ownerId: string;
  ownerName: string;
  createdDate: string;
  lastModified: string;
  documentCount: number;
  isShared: boolean;
  permissions: Array<{
    userId: string;
    userName: string;
    permission: 'read' | 'write' | 'admin';
  }>;
  color: string;
}

interface DocumentAnalytics {
  totalDocuments: number;
  totalSize: number; // in bytes
  documentsByType: Record<string, number>;
  documentsByStatus: Record<string, number>;
  verificationRate: number;
  storageUsage: number; // percentage
  recentUploads: number;
  pendingVerifications: number;
  mostDownloaded: Array<{ name: string; downloads: number }>;
  uploadTrends: Array<{ month: string; uploads: number; size: number }>;
}

const DocumentManagementPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [analytics, setAnalytics] = useState<DocumentAnalytics | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');

  // Mock data initialization
  useEffect(() => {
    const mockDocuments: Document[] = [
      {
        id: '1',
        name: 'Resume_Rajesh_Kumar_2024.pdf',
        type: 'resume',
        category: 'professional',
        format: 'pdf',
        size: 245760, // 240 KB
        uploadedBy: 'student1',
        uploadedByName: 'Rajesh Kumar',
        uploadDate: '2024-01-15T10:00:00Z',
        lastModified: '2024-01-20T14:30:00Z',
        status: 'verified',
        isPublic: false,
        isEncrypted: false,
        downloadCount: 12,
        description: 'Updated resume with latest internship experience',
        tags: ['resume', 'latest', 'internship'],
        verifiedBy: 'Placement Officer',
        verificationDate: '2024-01-16T09:00:00Z',
        version: 3,
        checksum: 'abc123def456',
        url: '/documents/resume_rajesh_kumar_2024.pdf',
        thumbnailUrl: '/thumbnails/resume_rajesh_kumar_2024.jpg',
        metadata: {
          studentId: 'student1',
          rollNumber: 'AP24322130096',
          semester: '6',
          academicYear: '2023-24'
        }
      },
      {
        id: '2',
        name: 'BTech_Transcript.pdf',
        type: 'transcript',
        category: 'academic',
        format: 'pdf',
        size: 156720, // 153 KB
        uploadedBy: 'student1',
        uploadedByName: 'Rajesh Kumar',
        uploadDate: '2024-01-10T11:30:00Z',
        lastModified: '2024-01-10T11:30:00Z',
        status: 'verified',
        isPublic: false,
        isEncrypted: true,
        downloadCount: 5,
        description: 'Official BTech transcript with all semester marks',
        tags: ['transcript', 'btech', 'official'],
        verifiedBy: 'Academic Office',
        verificationDate: '2024-01-12T10:00:00Z',
        version: 1,
        checksum: 'def789ghi012',
        url: '/documents/btech_transcript.pdf',
        metadata: {
          studentId: 'student1',
          rollNumber: 'AP24322130096',
          grade: 'A',
          score: 8.95
        }
      },
      {
        id: '3',
        name: 'React_Certification.pdf',
        type: 'certificate',
        category: 'professional',
        format: 'pdf',
        size: 312450, // 305 KB
        uploadedBy: 'student2',
        uploadedByName: 'Priya Sharma',
        uploadDate: '2024-01-18T16:00:00Z',
        lastModified: '2024-01-18T16:00:00Z',
        status: 'pending',
        isPublic: true,
        isEncrypted: false,
        downloadCount: 2,
        description: 'React Developer Certification from Coursera',
        tags: ['certificate', 'react', 'coursera'],
        version: 1,
        checksum: 'ghi345jkl678',
        url: '/documents/react_certification.pdf',
        expiryDate: '2026-01-18T00:00:00Z',
        metadata: {
          studentId: 'student2',
          rollNumber: 'AP24322130097',
          issuer: 'Coursera',
          grade: 'Passed'
        }
      },
      {
        id: '4',
        name: 'Project_Ecommerce_Report.pdf',
        type: 'project',
        category: 'academic',
        format: 'pdf',
        size: 1048576, // 1 MB
        uploadedBy: 'student3',
        uploadedByName: 'Arun Reddy',
        uploadDate: '2024-01-20T09:15:00Z',
        lastModified: '2024-01-20T09:15:00Z',
        status: 'verified',
        isPublic: false,
        isEncrypted: false,
        downloadCount: 8,
        description: 'Final year project report on E-commerce platform development',
        tags: ['project', 'ecommerce', 'final-year'],
        verifiedBy: 'Project Guide',
        verificationDate: '2024-01-21T11:00:00Z',
        version: 1,
        checksum: 'jkl901mno234',
        url: '/documents/project_ecommerce_report.pdf',
        metadata: {
          studentId: 'student3',
          rollNumber: 'AP24322130098',
          semester: '8',
          academicYear: '2023-24',
          grade: 'A+'
        }
      }
    ];

    const mockFolders: Folder[] = [
      {
        id: '1',
        name: 'Academic Documents',
        description: 'All academic-related documents including transcripts and certificates',
        ownerId: 'admin',
        ownerName: 'System Administrator',
        createdDate: '2024-01-01T00:00:00Z',
        lastModified: '2024-01-20T15:00:00Z',
        documentCount: 15,
        isShared: true,
        permissions: [
          { userId: 'faculty1', userName: 'Dr. Lakshmi', permission: 'read' },
          { userId: 'student1', userName: 'Rajesh Kumar', permission: 'write' }
        ],
        color: 'blue'
      },
      {
        id: '2',
        name: 'Professional Portfolio',
        description: 'Resumes, cover letters, and professional documents',
        ownerId: 'student1',
        ownerName: 'Rajesh Kumar',
        createdDate: '2024-01-05T10:00:00Z',
        lastModified: '2024-01-18T12:00:00Z',
        documentCount: 8,
        isShared: false,
        permissions: [],
        color: 'green'
      },
      {
        id: '3',
        name: 'Certifications',
        description: 'Professional certifications and training certificates',
        ownerId: 'student2',
        ownerName: 'Priya Sharma',
        createdDate: '2024-01-10T14:00:00Z',
        lastModified: '2024-01-19T16:30:00Z',
        documentCount: 12,
        isShared: true,
        permissions: [
          { userId: 'placement1', userName: 'Placement Officer', permission: 'read' }
        ],
        color: 'purple'
      }
    ];

    const mockAnalytics: DocumentAnalytics = {
      totalDocuments: 156,
      totalSize: 52428800, // 50 MB
      documentsByType: {
        resume: 45,
        certificate: 38,
        transcript: 25,
        project: 22,
        'id-proof': 15,
        photo: 8,
        other: 3
      },
      documentsByStatus: {
        verified: 120,
        pending: 25,
        rejected: 8,
        expired: 3
      },
      verificationRate: 77,
      storageUsage: 68,
      recentUploads: 18,
      pendingVerifications: 25,
      mostDownloaded: [
        { name: 'Resume_Template_2024.pdf', downloads: 45 },
        { name: 'Interview_Guidelines.pdf', downloads: 38 },
        { name: 'Placement_Handbook.pdf', downloads: 32 }
      ],
      uploadTrends: [
        { month: 'Sep', uploads: 22, size: 8388608 }, // 8 MB
        { month: 'Oct', uploads: 35, size: 14680064 }, // 14 MB
        { month: 'Nov', uploads: 28, size: 11534336 }, // 11 MB
        { month: 'Dec', uploads: 42, size: 16777216 }, // 16 MB
        { month: 'Jan', uploads: 29, size: 12582912 } // 12 MB
      ]
    };

    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
    setFolders(mockFolders);
    setAnalytics(mockAnalytics);
  }, []);

  // Filter documents
  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    // Sort documents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.size - a.size;
        case 'date':
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    setFilteredDocuments(filtered);
  }, [documents, searchTerm, typeFilter, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return User;
      case 'certificate':
        return Award;
      case 'transcript':
        return GraduationCap;
      case 'project':
        return Briefcase;
      case 'id-proof':
        return Shield;
      case 'photo':
        return Image;
      default:
        return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const DocumentCard = ({ document }: { document: Document }) => {
    const TypeIcon = getTypeIcon(document.type);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedDocument(document)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TypeIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800 truncate max-w-[180px]" title={document.name}>
                {document.name}
              </h3>
              <p className="text-sm text-slate-500">{formatFileSize(document.size)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(document.status)}>
              {document.status}
            </Badge>
            {document.isEncrypted && <Lock className="w-4 h-4 text-amber-500" />}
            {document.isPublic && <Globe className="w-4 h-4 text-blue-500" />}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Uploaded by {document.uploadedByName}</span>
            <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
          </div>
          
          {document.description && (
            <p className="text-sm text-slate-600 line-clamp-2">{document.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {document.tags.length > 2 && (
                <span className="text-xs text-slate-500">+{document.tags.length - 2}</span>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm text-slate-500">
              <Download className="w-3 h-3" />
              <span>{document.downloadCount}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const DocumentListItem = ({ document }: { document: Document }) => {
    const TypeIcon = getTypeIcon(document.type);
    
    return (
      <div className="flex items-center justify-between p-4 border-b border-border hover:bg-slate-50 cursor-pointer"
           onClick={() => setSelectedDocument(document)}>
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <TypeIcon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-800 truncate">{document.name}</h3>
            <p className="text-sm text-slate-500">
              {document.uploadedByName} • {new Date(document.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-600">{formatFileSize(document.size)}</span>
          <Badge className={getStatusColor(document.status)}>
            {document.status}
          </Badge>
          <div className="flex items-center space-x-1">
            {document.isEncrypted && <Lock className="w-4 h-4 text-amber-500" />}
            {document.isPublic && <Globe className="w-4 h-4 text-blue-500" />}
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  const FolderCard = ({ folder }: { folder: Folder }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedFolder(folder.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-${folder.color}-100 rounded-lg flex items-center justify-center`}>
            <Folder className={`w-5 h-5 text-${folder.color}-600`} />
          </div>
          <div>
            <h3 className="font-medium text-slate-800">{folder.name}</h3>
            <p className="text-sm text-slate-500">{folder.documentCount} documents</p>
          </div>
        </div>
        {folder.isShared && <Share2 className="w-4 h-4 text-blue-500" />}
      </div>

      {folder.description && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{folder.description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>By {folder.ownerName}</span>
        <span>{new Date(folder.lastModified).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );

  const AnalyticsCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {change && (
              <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                <h1 className="text-2xl font-bold text-slate-800">Document Management</h1>
                <p className="text-slate-600">Secure storage and management of academic and professional documents</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowCreateFolderDialog(true)}>
                <FolderOpen className="w-4 h-4 mr-2" />
                New Folder
              </Button>
              <Button onClick={() => setShowUploadDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="folders">
              <FolderOpen className="w-4 h-4 mr-2" />
              Folders
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {analytics && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnalyticsCard
                    title="Total Documents"
                    value={analytics.totalDocuments}
                    change={12}
                    icon={FileText}
                    color="bg-blue-500"
                  />
                  <AnalyticsCard
                    title="Storage Used"
                    value={`${analytics.storageUsage}%`}
                    change={5}
                    icon={ArchiveIcon}
                    color="bg-purple-500"
                  />
                  <AnalyticsCard
                    title="Verification Rate"
                    value={`${analytics.verificationRate}%`}
                    change={8}
                    icon={CheckCircle}
                    color="bg-green-500"
                  />
                  <AnalyticsCard
                    title="Pending Reviews"
                    value={analytics.pendingVerifications}
                    change={-15}
                    icon={Clock}
                    color="bg-yellow-500"
                  />
                </div>

                {/* Recent Activity & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Uploads</CardTitle>
                      <CardDescription>Latest document uploads and activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredDocuments.slice(0, 5).map((document) => (
                          <div key={document.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                {React.createElement(getTypeIcon(document.type), { className: "w-5 h-5 text-primary" })}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800 truncate max-w-[200px]">{document.name}</p>
                                <p className="text-sm text-slate-600">{document.uploadedByName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(document.status)}>
                                {document.status}
                              </Badge>
                              <p className="text-sm text-slate-500 mt-1">
                                {new Date(document.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    {/* Document Types */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Document Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(analytics.documentsByType).slice(0, 5).map(([type, count]) => (
                            <div key={type} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {React.createElement(getTypeIcon(type), { className: "w-4 h-4 text-slate-500" })}
                                <span className="text-sm capitalize text-slate-600">{type.replace('-', ' ')}</span>
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Storage Usage */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Storage Usage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Used</span>
                            <span className="text-sm font-medium">{formatFileSize(analytics.totalSize)}</span>
                          </div>
                          <Progress value={analytics.storageUsage} className="h-3" />
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{analytics.storageUsage}% used</span>
                            <span>{100 - analytics.storageUsage}% available</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Filters and Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="resume">Resume</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="transcript">Transcript</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="id-proof">ID Proof</SelectItem>
                      <SelectItem value="photo">Photo</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDocuments.map((document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {filteredDocuments.map((document) => (
                      <DocumentListItem key={document.id} document={document} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Folders Tab */}
          <TabsContent value="folders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Trends</CardTitle>
                    <CardDescription>Document uploads and storage trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.uploadTrends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{trend.month}</span>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-slate-600">
                              {trend.uploads} uploads
                            </div>
                            <div className="text-sm text-blue-600">
                              {formatFileSize(trend.size)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Most Downloaded */}
                <Card>
                  <CardHeader>
                    <CardTitle>Most Downloaded</CardTitle>
                    <CardDescription>Popular documents by download count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.mostDownloaded.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-700 truncate max-w-[200px]">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <Download className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium">{item.downloads}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Settings</CardTitle>
                  <CardDescription>Configure document storage preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maximum File Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select max size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 MB</SelectItem>
                        <SelectItem value="10">10 MB</SelectItem>
                        <SelectItem value="25">25 MB</SelectItem>
                        <SelectItem value="50">50 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Auto-verification</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Auto-verify documents from trusted sources</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Require manual verification for certificates</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Document security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enable document encryption</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Require authentication for downloads</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Enable watermarking</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Track document access logs</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a new document to your secure storage
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Drag and drop your file here, or click to browse</p>
              <p className="text-sm text-slate-500 mb-4">Maximum file size: 25 MB</p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume">Resume</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="transcript">Transcript</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="id-proof">ID Proof</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="placement">Placement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Input placeholder="Brief description of the document" />
            </div>

            <div className="space-y-2">
              <Label>Tags (Optional)</Label>
              <Input placeholder="Add tags separated by commas" />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">Make document public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Enable encryption</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUploadDialog(false)}>
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog open={showCreateFolderDialog} onOpenChange={setShowCreateFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Organize your documents with a new folder
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Folder Name</Label>
              <Input placeholder="Enter folder name" />
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Input placeholder="Brief description of the folder" />
            </div>
            <div className="space-y-2">
              <Label>Color Theme</Label>
              <div className="flex space-x-2">
                {['blue', 'green', 'purple', 'red', 'yellow', 'pink'].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Make folder shareable</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateFolderDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateFolderDialog(false)}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentManagementPage;