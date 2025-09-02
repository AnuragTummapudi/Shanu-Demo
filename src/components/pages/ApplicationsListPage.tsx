import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, Search, Filter, Download, Eye, Edit, Trash2, CheckCircle, 
  Clock, AlertCircle, Phone, Mail, Calendar, Building, User, Briefcase
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { studentApplications } from '../data/enhancedIndianData';

interface ApplicationsListPageProps {
  userRole?: string;
}

export const ApplicationsListPage: React.FC<ApplicationsListPageProps> = ({ userRole = 'operations' }) => {
  const { goBack, navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  const filteredApplications = studentApplications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'selected': return 'success-light';
      case 'shortlisted': return 'info-light';
      case 'in-review': return 'warning-light';
      case 'rejected': return 'error-light';
      default: return 'warning-light';
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedApplications.length === 0) {
      alert('Please select applications first.');
      return;
    }
    
    switch (action) {
      case 'export':
        downloadSelectedApplications();
        break;
      case 'schedule-interview':
        alert(`Scheduling interviews for ${selectedApplications.length} applications...`);
        break;
      case 'update-status':
        alert(`Updating status for ${selectedApplications.length} applications...`);
        break;
    }
    setSelectedApplications([]);
  };

  const downloadSelectedApplications = () => {
    const selectedData = studentApplications.filter(app => selectedApplications.includes(app.id));
    let csvContent = 'data:text/csv;charset=utf-8,Student Name,Company,Position,Type,Status,Applied Date,Interview Date,CTC\\n';
    
    selectedData.forEach(app => {
      csvContent += `"${app.studentName || 'N/A'}","${app.company}","${app.jobTitle}","${app.type || 'Full-time'}","${app.status}","${app.appliedDate}","${app.interviewDate || 'N/A'}","${app.ctc || 'N/A'}"\\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'selected_applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplicationClick = (application: any) => {
    navigateTo('application-detail', application, `${application.company} - ${application.jobTitle}`);
  };

  const handleScheduleInterview = (application: any) => {
    navigateTo('interview-scheduler', application, 'Schedule Interview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Applications Management</h1>
              <p className="text-slate-600">Track and manage student job applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Applications', value: studentApplications.length, color: 'blue', icon: Briefcase },
            { label: 'Shortlisted', value: studentApplications.filter(a => a.status === 'shortlisted').length, color: 'green', icon: CheckCircle },
            { label: 'In Review', value: studentApplications.filter(a => a.status === 'in-review').length, color: 'yellow', icon: Clock },
            { label: 'Selected', value: studentApplications.filter(a => a.status === 'selected').length, color: 'purple', icon: User }
          ].map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                {selectedApplications.length > 0 && (
                  <>
                    <Button variant="outline" onClick={() => handleBulkAction('export')}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Selected
                    </Button>
                    <Button variant="outline" onClick={() => handleBulkAction('schedule-interview')}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interviews
                    </Button>
                  </>
                )}
                <Button onClick={() => downloadSelectedApplications()}>
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                      checked={selectedApplications.includes(application.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedApplications([...selectedApplications, application.id]);
                        } else {
                          setSelectedApplications(selectedApplications.filter(id => id !== application.id));
                        }
                      }}
                    />
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{application.jobTitle}</h4>
                      <p className="text-slate-600">{application.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {application.studentName && (
                          <span className="text-sm text-slate-500">Student: {application.studentName}</span>
                        )}
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">Applied: {application.appliedDate}</span>
                        {application.type && (
                          <>
                            <span className="text-sm text-slate-500">•</span>
                            <Badge variant="outline" className="text-xs">{application.type}</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <Badge className={getStatusBadgeClass(application.status)}>
                        {application.status}
                      </Badge>
                      {application.interviewDate && (
                        <div className="text-sm text-slate-600 mt-1">
                          Interview: {application.interviewDate}
                        </div>
                      )}
                      {application.ctc && (
                        <div className="text-sm font-semibold text-slate-800 mt-1">
                          CTC: {application.ctc}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleApplicationClick(application)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleScheduleInterview(application)}>
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => navigateTo('application-edit', application, 'Edit Application')}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Applications Found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};