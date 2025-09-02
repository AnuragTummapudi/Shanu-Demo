import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { 
  FileText, 
  Download, 
  Share2, 
  Edit, 
  Eye, 
  Settings,
  Plus,
  Trash2,
  Copy,
  Save,
  RefreshCw,
  Palette,
  Layout,
  Zap,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeSectionProps {
  userData: any;
  onUpdate?: (data: any) => void;
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'ats-friendly';
  color: string;
}

const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business roles',
    preview: '/api/placeholder/300/400',
    category: 'modern',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    description: 'Traditional format ideal for senior positions and formal industries',
    preview: '/api/placeholder/300/400',
    category: 'classic',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Visually appealing layout for creative and design professionals',
    preview: '/api/placeholder/300/400',
    category: 'creative',
    color: 'from-pink-500 to-orange-500'
  },
  {
    id: 'ats-optimized',
    name: 'ATS Optimized',
    description: 'Simple, parser-friendly format for applicant tracking systems',
    preview: '/api/placeholder/300/400',
    category: 'ats-friendly',
    color: 'from-green-500 to-emerald-600'
  }
];

const ResumePreview = ({ userData, template, isFullSize = false }: { userData: any; template: string; isFullSize?: boolean }) => {
  const containerClass = isFullSize ? "w-full h-full" : "w-full h-96";
  
  return (
    <div className={`${containerClass} bg-white border border-border rounded-lg overflow-hidden shadow-lg`}>
      <div className="p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="text-slate-600 mb-3">{userData.course} | {userData.department}</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {userData.email}
            </span>
            <span className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {userData.phone}
            </span>
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {userData.preferredLocations?.[0] || 'India'}
            </span>
          </div>
        </div>

        {/* Objective */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2 border-b pb-1">Career Objective</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {userData.careerObjective || 'Seeking a challenging position where I can utilize my skills and contribute to organizational growth.'}
          </p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-1">Education</h2>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-slate-800">{userData.course}</h3>
                  <p className="text-sm text-slate-600">{userData.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-800">CGPA: {userData.cgpa}</p>
                  <p className="text-xs text-slate-500">{userData.batch}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-1">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-3">
            {userData.technicalSkills?.slice(0, 6).map((skill: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-slate-700">{skill.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(skill.level / 20) ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-1">Experience</h2>
          <div className="space-y-4">
            {userData.internships?.map((intern: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-slate-800">{intern.position}</h3>
                  <span className="text-xs text-slate-500">{intern.duration}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{intern.company}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{intern.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-1">Projects</h2>
          <div className="space-y-3">
            {userData.projects?.slice(0, 2).map((project: any, index: number) => (
              <div key={index}>
                <h3 className="font-medium text-slate-800 mb-1">{project.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect 
}: { 
  templates: ResumeTemplate[]; 
  selectedTemplate: string; 
  onTemplateSelect: (templateId: string) => void; 
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTemplates = templates.filter(template => 
    filterCategory === 'all' || template.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('all')}
        >
          All Templates
        </Button>
        <Button
          variant={filterCategory === 'modern' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('modern')}
        >
          Modern
        </Button>
        <Button
          variant={filterCategory === 'classic' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('classic')}
        >
          Classic
        </Button>
        <Button
          variant={filterCategory === 'creative' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('creative')}
        >
          Creative
        </Button>
        <Button
          variant={filterCategory === 'ats-friendly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('ats-friendly')}
        >
          ATS-Friendly
        </Button>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${
              selectedTemplate === template.id 
                ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className={`h-48 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <FileText className="w-16 h-16 text-white" />
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 p-1 bg-primary rounded-full">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-1">{template.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {template.category.replace('-', ' ')}
                </Badge>
                <Button size="sm" variant="ghost">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ResumeSection: React.FC<ResumeSectionProps> = ({ userData, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState('modern-professional');
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [resumeData, setResumeData] = useState(userData);
  const [exportLoading, setExportLoading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: 'pdf' | 'word' | 'image') => {
    setExportLoading(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Exporting resume as ${format}...`);
    setExportLoading(false);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowTemplateDialog(false);
  };

  const resumeCompletionScore = () => {
    let score = 0;
    if (resumeData.careerObjective) score += 15;
    if (resumeData.technicalSkills?.length > 0) score += 20;
    if (resumeData.projects?.length > 0) score += 20;
    if (resumeData.internships?.length > 0) score += 25;
    if (resumeData.email && resumeData.phone) score += 10;
    if (resumeData.linkedin || resumeData.github) score += 10;
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      {/* Resume Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resume Builder</h2>
          <p className="text-slate-600">Create and manage your professional resume</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Star className="w-3 h-3 mr-1" />
            {resumeCompletionScore()}% Complete
          </Badge>
          <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
            <Palette className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Resume Completion Progress */}
      <Card className="bg-gradient-to-r from-primary/5 to-purple-600/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Resume Completion</h3>
              <p className="text-sm text-slate-600">Complete all sections for the best results</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{resumeCompletionScore()}%</div>
              <div className="text-xs text-slate-500">ATS Score: 85/100</div>
            </div>
          </div>
          <Progress value={resumeCompletionScore()} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Contact Info', complete: !!(resumeData.email && resumeData.phone), icon: Phone },
              { label: 'Objective', complete: !!resumeData.careerObjective, icon: Target },
              { label: 'Education', complete: !!resumeData.course, icon: GraduationCap },
              { label: 'Skills', complete: resumeData.technicalSkills?.length > 0, icon: Award },
              { label: 'Experience', complete: resumeData.internships?.length > 0, icon: Briefcase },
              { label: 'Projects', complete: resumeData.projects?.length > 0, icon: FileText }
            ].map((section, index) => (
              <div key={index} className={`flex items-center space-x-2 p-2 rounded-lg ${
                section.complete ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'
              }`}>
                <section.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
                {section.complete && <CheckCircle className="w-3 h-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">
            <Edit className="w-4 h-4 mr-2" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Layout className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Form */}
            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input 
                        value={resumeData.firstName || ''} 
                        onChange={(e) => setResumeData({...resumeData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input 
                        value={resumeData.lastName || ''} 
                        onChange={(e) => setResumeData({...resumeData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      value={resumeData.email || ''} 
                      onChange={(e) => setResumeData({...resumeData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input 
                      value={resumeData.phone || ''} 
                      onChange={(e) => setResumeData({...resumeData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>LinkedIn Profile</Label>
                    <Input 
                      value={resumeData.linkedin || ''} 
                      onChange={(e) => setResumeData({...resumeData, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Career Objective */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Career Objective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={resumeData.careerObjective || ''}
                    onChange={(e) => setResumeData({...resumeData, careerObjective: e.target.value})}
                    placeholder="Write a compelling career objective that highlights your goals and aspirations..."
                    rows={4}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Tip: Keep it concise (2-3 lines) and focus on what you can offer to employers.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button onClick={() => onUpdate?.(resumeData)} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setResumeData(userData)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-primary" />
                      Live Preview
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {selectedTemplate.replace('-', ' ')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-lg overflow-hidden">
                    <ResumePreview userData={resumeData} template={selectedTemplate} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Full Resume Preview</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowTemplateDialog(true)}>
                    <Palette className="w-4 h-4 mr-1" />
                    Change Template
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download PDF
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={resumeRef} className="bg-white rounded-lg border">
                <ResumePreview userData={resumeData} template={selectedTemplate} isFullSize />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <TemplateSelector 
            templates={resumeTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateChange}
          />
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                format: 'pdf' as const,
                title: 'PDF Document',
                description: 'High-quality PDF perfect for email and online applications',
                icon: FileText,
                color: 'red'
              },
              {
                format: 'word' as const,
                title: 'Word Document',
                description: 'Editable DOCX format for further customization',
                icon: FileText,
                color: 'blue'
              },
              {
                format: 'image' as const,
                title: 'Image (PNG)',
                description: 'High-resolution image for social media and portfolios',
                icon: FileText,
                color: 'green'
              }
            ].map((option) => (
              <Card key={option.format} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <option.icon className={`w-5 h-5 mr-2 text-${option.color}-600`} />
                    {option.title}
                  </CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleExport(option.format)}
                    disabled={exportLoading}
                    className="w-full"
                  >
                    {exportLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Export {option.title}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Export Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Zap className="w-5 h-5 mr-2" />
                Export Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  PDF format is recommended for most job applications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Use Word format when employers specifically request editable documents
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Always review your resume before submitting
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Keep file names professional (e.g., "John_Doe_Resume.pdf")
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Template Selection Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose Resume Template</DialogTitle>
            <DialogDescription>
              Select a professional template that best represents your style and industry
            </DialogDescription>
          </DialogHeader>
          <TemplateSelector 
            templates={resumeTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeSection;