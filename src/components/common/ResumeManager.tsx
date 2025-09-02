import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';
import { 
  Upload, 
  Download, 
  Eye, 
  FileText, 
  Trash2, 
  Plus,
  Calendar,
  User,
  ExternalLink,
  Share2
} from 'lucide-react';

interface ResumeFile {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  type: 'pdf' | 'doc' | 'docx';
  url: string;
  isDefault: boolean;
  status: 'active' | 'draft' | 'archived';
}

interface ResumeManagerProps {
  userId: string;
  userRole: 'student' | 'faculty' | 'outreach' | 'operations' | 'admin';
  viewMode?: 'full' | 'compact' | 'recruiter';
  allowUpload?: boolean;
  showActions?: boolean;
  onResumeSelect?: (resume: ResumeFile) => void;
}

const mockResumes: ResumeFile[] = [
  {
    id: '1',
    name: 'Priya_Sharma_Resume_2024.pdf',
    uploadDate: '2024-01-15',
    size: '245 KB',
    type: 'pdf',
    url: '/resumes/priya_sharma_resume_2024.pdf',
    isDefault: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya_Sharma_Technical_Resume.pdf',
    uploadDate: '2024-01-10',
    size: '189 KB',
    type: 'pdf',
    url: '/resumes/priya_sharma_technical_resume.pdf',
    isDefault: false,
    status: 'active'
  },
  {
    id: '3',
    name: 'Priya_Sharma_Internship_Resume.pdf',
    uploadDate: '2024-01-05',
    size: '203 KB',
    type: 'pdf',
    url: '/resumes/priya_sharma_internship_resume.pdf',
    isDefault: false,
    status: 'draft'
  }
];

export default function ResumeManager({ 
  userId, 
  userRole, 
  viewMode = 'full',
  allowUpload = true,
  showActions = true,
  onResumeSelect 
}: ResumeManagerProps) {
  const [resumes, setResumes] = useState<ResumeFile[]>(mockResumes);
  const [uploading, setUploading] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeFile | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type.includes('pdf') ? 'pdf' : 'doc',
        url: URL.createObjectURL(file),
        isDefault: resumes.length === 0,
        status: 'active'
      };

      setResumes(prev => [newResume, ...prev]);
      setUploading(false);
      toast.success('Resume uploaded successfully');
    }, 2000);
  }, [resumes.length]);

  const handleSetDefault = (resumeId: string) => {
    setResumes(prev => prev.map(resume => ({
      ...resume,
      isDefault: resume.id === resumeId
    })));
    toast.success('Default resume updated');
  };

  const handleDelete = (resumeId: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== resumeId));
    toast.success('Resume deleted');
  };

  const handleDownload = (resume: ResumeFile) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = resume.url;
    link.download = resume.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Resume downloaded');
  };

  const handleShare = (resume: ResumeFile) => {
    navigator.clipboard.writeText(`${window.location.origin}${resume.url}`);
    toast.success('Resume link copied to clipboard');
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  // Compact view for dashboard widgets
  if (viewMode === 'compact') {
    const defaultResume = resumes.find(r => r.isDefault) || resumes[0];
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Resume
            </span>
            {allowUpload && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Resume</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload-compact"
                        disabled={uploading}
                      />
                      <label htmlFor="resume-upload-compact" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                      </label>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {defaultResume ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(defaultResume.type)}
                  <span className="font-medium truncate">{defaultResume.name}</span>
                </div>
                {defaultResume.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(defaultResume.uploadDate).toLocaleDateString()}
                </span>
                <span>{defaultResume.size}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => window.open(defaultResume.url, '_blank')}>
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload(defaultResume)}>
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">No resume uploaded</p>
              {allowUpload && (
                <Button className="mt-2" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Upload Resume
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Recruiter view for easy candidate resume access
  if (viewMode === 'recruiter') {
    const defaultResume = resumes.find(r => r.isDefault) || resumes[0];
    
    return (
      <div className="space-y-2">
        {defaultResume ? (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getFileIcon(defaultResume.type)}
              <span className="font-medium">{defaultResume.name}</span>
              {getStatusBadge(defaultResume.status)}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => window.open(defaultResume.url, '_blank')}>
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDownload(defaultResume)}>
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg text-center text-gray-500">
            No resume available
          </div>
        )}
      </div>
    );
  }

  // Full view for dedicated resume management page
  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {allowUpload && (
        <Card>
          <CardHeader>
            <CardTitle>Upload New Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
                disabled={uploading}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </h3>
                <p className="text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resume List */}
      <Card>
        <CardHeader>
          <CardTitle>My Resumes ({resumes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(resume.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{resume.name}</span>
                        {resume.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                        {getStatusBadge(resume.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(resume.uploadDate).toLocaleDateString()}
                        </span>
                        <span>{resume.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  {showActions && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(resume.url, '_blank')}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(resume)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(resume)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      {!resume.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetDefault(resume.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(resume.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No resumes uploaded</h3>
              <p className="text-gray-500 mb-4">Upload your first resume to get started</p>
              {allowUpload && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}