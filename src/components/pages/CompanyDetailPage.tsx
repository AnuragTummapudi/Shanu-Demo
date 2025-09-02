import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PageHeader } from '../common/PageHeader';
import { RaiseTicketModal } from '../common/RaiseTicketModal';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Phone,
  Mail,
  Globe,
  Users,
  Briefcase,
  TrendingUp,
  FileText,
  MessageSquare,
  Star,
  Edit,
  Plus,
  ExternalLink,
  DollarSign,
  Clock
} from 'lucide-react';
import { 
  EnhancedLineChart, 
  EnhancedBarChart, 
  AnimatedCounter,
  GradientProgressRing
} from '../common/AdvancedCharts';
import { Company } from '../types';

interface CompanyDetailPageProps {
  company: Company;
}

const hiringStagsData = [
  { month: 'Jan', applications: 45, interviews: 12, selected: 3 },
  { month: 'Feb', applications: 52, interviews: 18, selected: 5 },
  { month: 'Mar', applications: 38, interviews: 15, selected: 4 },
  { month: 'Apr', applications: 41, interviews: 20, selected: 6 },
  { month: 'May', applications: 48, interviews: 22, selected: 8 }
];

const departmentHiring = [
  { name: 'Computer Science', hired: 12, color: '#4f46e5' },
  { name: 'Information Technology', hired: 8, color: '#6366f1' },
  { name: 'Electronics', hired: 5, color: '#8b5cf6' },
  { name: 'Mechanical', hired: 3, color: '#06b6d4' },
  { name: 'Civil', hired: 2, color: '#10b981' }
];

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({ company }) => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState(company.notes);

  // Mock additional data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      type: 'Full-time',
      ctc: '₹12-15 LPA',
      applications: 45,
      status: 'active',
      posted: '2025-01-10'
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      type: 'Internship',
      stipend: '₹25,000/month',
      applications: 32,
      status: 'active',
      posted: '2025-01-08'
    },
    {
      id: 3,
      title: 'Data Analyst',
      type: 'Full-time',
      ctc: '₹8-10 LPA',
      applications: 28,
      status: 'completed',
      posted: '2024-12-15'
    }
  ];

  const interactions = [
    {
      date: '2025-01-10',
      type: 'email',
      contact: 'Priya Nair',
      subject: 'Campus Recruitment Schedule',
      status: 'responded'
    },
    {
      date: '2025-01-08',
      type: 'call',
      contact: 'Priya Nair',
      subject: 'Job Description Discussion',
      status: 'completed'
    },
    {
      date: '2025-01-05',
      type: 'meeting',
      contact: 'HR Team',
      subject: 'Partnership Agreement Review',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'onboarded': return 'success-light';
      case 'negotiation': return 'warning-light';
      case 'contacted': return 'info-light';
      case 'closed': return 'error-light';
      default: return 'info-light';
    }
  };

  const handleSaveNotes = () => {
    // Save notes logic
    console.log('Saving notes:', notes);
  };

  const chartDataKeys = [
    { key: 'applications', name: 'Applications', color: '#4f46e5' },
    { key: 'interviews', name: 'Interviews', color: '#6366f1' },
    { key: 'selected', name: 'Selected', color: '#10b981' }
  ];

  const departmentKeys = [
    { key: 'hired', name: 'Hired Students', color: '#4f46e5' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title={company.name}
        description={`${company.sector} • ${company.employees} employees`}
        actions={
          <div className="flex items-center space-x-2">
            <RaiseTicketModal 
              userEmail="current.user@university.edu.in"
              userRole="outreach"
              userName="Current User"
            />
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Company
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
          </div>
        }
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Company Overview Cards */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Positions</p>
                  <p className="text-3xl font-bold text-slate-800">
                    <AnimatedCounter value={company.positions} />
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Students Hired</p>
                  <p className="text-3xl font-bold text-slate-800">
                    <AnimatedCounter value={30} />
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-slate-800">
                    <AnimatedCounter value={87} suffix="%" />
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Partnership Years</p>
                  <p className="text-3xl font-bold text-slate-800">
                    <AnimatedCounter value={5} />
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-primary/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Overview</TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Active Jobs</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Analytics</TabsTrigger>
            <TabsTrigger value="interactions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Interactions</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Company Information */}
              <Card className="lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/api/placeholder/80/80" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {company.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl text-slate-800">{company.name}</CardTitle>
                        <CardDescription className="text-lg">{company.sector}</CardDescription>
                        <Badge className={`mt-2 ${getStatusColor(company.status)}`}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Company Description</h4>
                    <p className="text-slate-600">{company.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-3 text-primary" />
                        {company.address}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Globe className="w-4 h-4 mr-3 text-primary" />
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {company.website}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Users className="w-4 h-4 mr-3 text-primary" />
                        {company.employees} employees
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-3 text-primary" />
                        Founded in {company.founded}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <DollarSign className="w-4 h-4 mr-3 text-primary" />
                        CTC Range: {company.ctcRange}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-3 text-primary" />
                        Last Contact: {company.lastContact}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Primary Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {company.contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-800">{company.contact.name}</div>
                      <div className="text-sm text-slate-600">{company.contact.designation}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-3 text-primary" />
                      <a href={`mailto:${company.contact.email}`} className="text-primary hover:underline">
                        {company.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="w-4 h-4 mr-3 text-primary" />
                      {company.contact.phone}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Action & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Next Action</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div>
                        <div className="font-medium text-slate-800">{company.nextAction}</div>
                        <div className="text-sm text-slate-600 mt-1">Due: Within 2 weeks</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-800">Notes</CardTitle>
                    <Button size="sm" onClick={handleSaveNotes}>
                      Save Notes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-32 p-3 border border-primary/20 rounded-lg resize-none"
                    placeholder="Add your notes about this company..."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Active Job Postings</h3>
                <p className="text-slate-600">Current opportunities from {company.name}</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Job
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockJobs.map((job) => (
                <Card key={job.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-slate-800">{job.title}</h4>
                        <p className="text-slate-600 text-sm">{job.type}</p>
                      </div>
                      <Badge className={job.status === 'active' ? 'success-light' : 'info-light'}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.type === 'Internship' ? job.stipend : job.ctc}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Users className="w-4 h-4 mr-2" />
                        {job.applications} applications
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Posted: {job.posted}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hiring Trends */}
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Hiring Trends</CardTitle>
                  <CardDescription>Monthly application and selection data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedLineChart 
                      data={hiringStagsData}
                      dataKeys={chartDataKeys}
                      height={300}
                      showArea={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Department-wise Hiring */}
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">Department-wise Hiring</CardTitle>
                  <CardDescription>Students hired by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedBarChart 
                      data={departmentHiring}
                      dataKeys={departmentKeys}
                      height={300}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Communication History</h3>
                <p className="text-slate-600">Track all interactions with {company.name}</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Log Interaction
              </Button>
            </div>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {interactions.map((interaction, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                        {interaction.type === 'email' && <Mail className="w-5 h-5 text-white" />}
                        {interaction.type === 'call' && <Phone className="w-5 h-5 text-white" />}
                        {interaction.type === 'meeting' && <Users className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">{interaction.subject}</h4>
                          <Badge className={interaction.status === 'completed' ? 'success-light' : 'warning-light'}>
                            {interaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{interaction.contact} • {interaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Company Documents</h3>
                <p className="text-slate-600">Contracts, agreements, and other files</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.documents.map((doc, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 truncate">{doc.name}</h4>
                        <p className="text-sm text-slate-600">{doc.type} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};