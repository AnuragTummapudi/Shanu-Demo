import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageHeader } from '../common/PageHeader';
import { useNavigation } from '../navigation/NavigationProvider';
import { 
  Download, Filter, Calendar, Users, TrendingUp, Building, BarChart3, FileText,
  Search, Eye, RefreshCw, Settings, Share2, Mail, Phone, MapPin, Award,
  BookOpen, Briefcase, CheckCircle, AlertCircle, Clock, Star, Target
} from 'lucide-react';
import { EnhancedLineChart, EnhancedBarChart, EnhancedPieChart, AnimatedCounter } from '../common/AdvancedCharts';
import { studentData } from '../data/studentData';
import { companiesData, jobsData } from '../data/indianData';
import { generateReportData } from '../data/reportData';

interface ReportGenerationPageProps {
  userRole?: string;
  reportType?: string;
}

export const ReportGenerationPage: React.FC<ReportGenerationPageProps> = ({ 
  userRole = 'admin', 
  reportType = 'comprehensive' 
}) => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('6months');
  const [department, setDepartment] = useState('all');
  const [batch, setBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate comprehensive report data
  const reportData = generateReportData({
    dateRange: { start: '2024-01-01', end: '2025-01-31' },
    department: department !== 'all' ? department : undefined,
    batch: batch !== 'all' ? batch : undefined
  });

  // Enhanced data for GUI reports
  const placementStats = {
    totalStudents: studentData.length,
    placedStudents: studentData.filter(s => s.applicationStatus === 'shortlisted').length,
    averageCTC: 8.5,
    highestCTC: 32.0,
    topCompanies: companiesData.slice(0, 5),
    departmentWise: [
      { dept: 'CSE', students: 156, placed: 148, rate: 95 },
      { dept: 'IT', students: 134, placed: 121, rate: 90 },
      { dept: 'ECE', students: 98, placed: 82, rate: 84 },
      { dept: 'ME', students: 87, placed: 65, rate: 75 },
      { dept: 'CE', students: 45, placed: 38, rate: 84 }
    ]
  };

  const handleDownloadReport = (reportType: string, format: string = 'csv') => {
    let csvContent = '';
    let filename = '';

    switch (reportType) {
      case 'placement-summary':
        csvContent = `data:text/csv;charset=utf-8,Department,Total Students,Placed Students,Placement Rate,Average CTC\n`;
        placementStats.departmentWise.forEach(dept => {
          csvContent += `${dept.dept},${dept.students},${dept.placed},${dept.rate}%,₹${(Math.random() * 5 + 6).toFixed(1)}L\n`;
        });
        filename = 'placement_summary_report.csv';
        break;
        
      case 'student-details':
        csvContent = `data:text/csv;charset=utf-8,Name,Roll No,Department,CGPA,Batch,Skills,Status\n`;
        studentData.slice(0, 100).forEach(student => {
          csvContent += `"${student.name}",${student.rollNo},${student.department},${student.cgpa},${student.batch},"${student.skills.join(', ')}",${student.applicationStatus || 'active'}\n`;
        });
        filename = 'student_details_report.csv';
        break;
        
      case 'company-analysis':
        csvContent = `data:text/csv;charset=utf-8,Company,Sector,CTC Range,Positions,Status,Performance\n`;
        companiesData.forEach(company => {
          csvContent += `"${company.name}",${company.sector},"${company.ctcRange}",${company.positions},${company.status},${company.performance || 'good'}\n`;
        });
        filename = 'company_analysis_report.csv';
        break;
        
      case 'job-opportunities':
        csvContent = `data:text/csv;charset=utf-8,Job Title,Company,Location,Type,CTC,Deadline,Skills Required\n`;
        jobsData.forEach(job => {
          csvContent += `"${job.title}","${job.company}",${job.location},${job.type},"${job.ctc}",${job.applicationDeadline},"${job.skills.join(', ')}"\n`;
        });
        filename = 'job_opportunities_report.csv';
        break;
        
      case 'performance-metrics':
        csvContent = `data:text/csv;charset=utf-8,Metric,Value,Change,Target\n`;
        csvContent += `Total Applications,${Math.floor(Math.random() * 1000) + 2000},+12%,2500\n`;
        csvContent += `Placement Rate,${placementStats.placedStudents / placementStats.totalStudents * 100}%,+5%,95%\n`;
        csvContent += `Average CTC,₹${placementStats.averageCTC}L,+8%,₹9L\n`;
        csvContent += `Company Partnerships,${companiesData.length},+15%,50\n`;
        filename = 'performance_metrics_report.csv';
        break;
        
      default:
        csvContent = `data:text/csv;charset=utf-8,Report Type,Generated Date,Total Records\n`;
        csvContent += `${reportType},${new Date().toLocaleDateString()},${studentData.length}\n`;
        filename = 'comprehensive_report.csv';
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`${filename} downloaded successfully!`);
  };

  const handleShareReport = (reportType: string) => {
    const reportUrl = `${window.location.origin}/reports/${reportType}`;
    if (navigator.share) {
      navigator.share({
        title: `${reportType.replace('-', ' ').toUpperCase()} Report`,
        text: `Check out this comprehensive ${reportType} report from SRM University AP`,
        url: reportUrl,
      });
    } else {
      navigator.clipboard.writeText(reportUrl);
      alert('Report link copied to clipboard!');
    }
  };

  const handleEmailReport = (reportType: string) => {
    const subject = `${reportType.replace('-', ' ').toUpperCase()} Report - SRM University AP`;
    const body = `Please find the ${reportType} report generated from our placement management system.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title="Advanced Reports & Analytics"
        description="Comprehensive GUI-based reports with data visualization and export capabilities"
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.print()}>
              <FileText className="w-4 h-4 mr-2" />
              Print Report
            </Button>
            <Button onClick={() => handleShareReport('comprehensive')}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Report
            </Button>
          </div>
        }
      />

      <div className="p-6">
        {/* Enhanced Filters */}
        <Card className="bg-white border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="CSE">Computer Science</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="ECE">Electronics & Communication</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                  <SelectItem value="CE">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="2021-2025">2021-2025</SelectItem>
                  <SelectItem value="2022-2026">2022-2026</SelectItem>
                  <SelectItem value="2023-2027">2023-2027</SelectItem>
                  <SelectItem value="2024-2028">2024-2028</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-primary to-purple-600">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-primary/20 rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="placement" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Placement Analytics</TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Student Reports</TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Company Analysis</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Performance Metrics</TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Students', value: placementStats.totalStudents, icon: Users, color: 'blue', change: '+8%' },
                { label: 'Placed Students', value: placementStats.placedStudents, icon: CheckCircle, color: 'green', change: '+12%' },
                { label: 'Average CTC', value: `₹${placementStats.averageCTC}L`, icon: TrendingUp, color: 'purple', change: '+15%' },
                { label: 'Partner Companies', value: companiesData.length, icon: Building, color: 'orange', change: '+6%' }
              ].map((kpi, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br from-${kpi.color}-500 to-${kpi.color}-600 shadow-lg`}>
                        <kpi.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">
                          {typeof kpi.value === 'number' ? <AnimatedCounter value={kpi.value} /> : kpi.value}
                        </div>
                        <div className="text-sm text-slate-600">{kpi.label}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        {kpi.change} from last period
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => handleDownloadReport(`${kpi.label.toLowerCase().replace(' ', '-')}-report`)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Report Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Placement Summary Report',
                  description: 'Comprehensive placement statistics and trends',
                  icon: BarChart3,
                  type: 'placement-summary',
                  color: 'blue'
                },
                { 
                  title: 'Student Performance Report',
                  description: 'Individual student records and achievements',
                  icon: Users,
                  type: 'student-details',
                  color: 'green'
                },
                { 
                  title: 'Company Partnership Report',
                  description: 'Partner company analysis and engagement',
                  icon: Building,
                  type: 'company-analysis',
                  color: 'purple'
                }
              ].map((report, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r from-${report.color}-500 to-${report.color}-600 shadow-lg mb-4`}>
                        <report.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">{report.title}</h4>
                      <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => handleDownloadReport(report.type)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download CSV
                        </Button>
                        <Button variant="outline" onClick={() => handleShareReport(report.type)}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={() => handleEmailReport(report.type)}>
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Placement Trends (Last 6 Months)</CardTitle>
                  <CardDescription>Monthly placement and application statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedLineChart 
                      data={[
                        { month: 'Aug', placements: 145, applications: 1250 },
                        { month: 'Sep', placements: 234, applications: 1680 },
                        { month: 'Oct', placements: 189, applications: 1420 },
                        { month: 'Nov', placements: 267, applications: 2100 },
                        { month: 'Dec', placements: 198, applications: 1380 },
                        { month: 'Jan', placements: 220, applications: 2850 }
                      ]}
                      dataKeys={[
                        { key: 'placements', name: 'Placements', color: '#4f46e5' },
                        { key: 'applications', name: 'Applications', color: '#10b981' }
                      ]}
                      height={300}
                      showArea={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Department-wise Performance</CardTitle>
                  <CardDescription>Placement rates across academic departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedBarChart 
                      data={placementStats.departmentWise.map(dept => ({ name: dept.dept, placementRate: dept.rate }))}
                      dataKeys={[
                        { key: 'placementRate', name: 'Placement Rate (%)', color: '#6366f1' }
                      ]}
                      height={300}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="placement" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Placement Analytics Dashboard</h3>
                <p className="text-slate-600">Comprehensive placement performance metrics and insights</p>
              </div>
              <Button onClick={() => handleDownloadReport('placement-comprehensive')}>
                <Download className="w-4 h-4 mr-2" />
                Export All Placement Data
              </Button>
            </div>

            {/* Salary Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Salary Package Distribution</CardTitle>
                  <CardDescription>Distribution of offers across salary slabs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedPieChart 
                      data={[
                        { name: '₹5-10L', value: 35, color: '#4f46e5' },
                        { name: '₹10-15L', value: 28, color: '#6366f1' },
                        { name: '₹15-20L', value: 20, color: '#8b5cf6' },
                        { name: '₹20-25L', value: 12, color: '#06b6d4' },
                        { name: '₹25L+', value: 5, color: '#10b981' }
                      ]}
                      height={300}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Top Recruiting Companies</CardTitle>
                  <CardDescription>Companies with highest recruitment numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {companiesData.slice(0, 8).map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{company.name}</div>
                            <div className="text-sm text-slate-600">{company.sector}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800">{company.positions}</div>
                          <div className="text-sm text-slate-600">positions</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Performance Table */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">Department-wise Detailed Performance</CardTitle>
                    <CardDescription>Comprehensive placement statistics by department</CardDescription>
                  </div>
                  <Button onClick={() => handleDownloadReport('department-performance')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Department Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Department</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Total Students</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Placed</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Placement Rate</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Avg CTC</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Highest CTC</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placementStats.departmentWise.map((dept, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                {dept.dept}
                              </div>
                              <span className="font-medium text-slate-800">
                                {dept.dept === 'CSE' ? 'Computer Science Engineering' :
                                 dept.dept === 'IT' ? 'Information Technology' :
                                 dept.dept === 'ECE' ? 'Electronics & Communication' :
                                 dept.dept === 'ME' ? 'Mechanical Engineering' :
                                 'Civil Engineering'}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-slate-800">{dept.students}</td>
                          <td className="text-center py-3 px-4 text-slate-800">{dept.placed}</td>
                          <td className="text-center py-3 px-4">
                            <Badge className={dept.rate >= 90 ? 'success-light' : dept.rate >= 80 ? 'warning-light' : 'error-light'}>
                              {dept.rate}%
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-4 text-slate-800">₹{(Math.random() * 3 + 6).toFixed(1)}L</td>
                          <td className="text-center py-3 px-4 text-slate-800">₹{(Math.random() * 15 + 15).toFixed(1)}L</td>
                          <td className="text-center py-3 px-4">
                            <div className="flex items-center justify-center">
                              {dept.rate >= 90 ? (
                                <div className="flex items-center text-green-600">
                                  <TrendingUp className="w-4 h-4 mr-1" />
                                  Excellent
                                </div>
                              ) : dept.rate >= 80 ? (
                                <div className="flex items-center text-orange-600">
                                  <Target className="w-4 h-4 mr-1" />
                                  Good
                                </div>
                              ) : (
                                <div className="flex items-center text-red-600">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  Needs Focus
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Student Reports & Analytics</h3>
                <p className="text-slate-600">Individual student performance and comprehensive records</p>
              </div>
              <Button onClick={() => handleDownloadReport('student-details')}>
                <Download className="w-4 h-4 mr-2" />
                Export Student Database
              </Button>
            </div>

            {/* Student Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Students', value: studentData.length, color: 'blue' },
                { label: 'Active Applicants', value: studentData.filter(s => s.isShortlisted).length, color: 'green' },
                { label: 'Profile Completion Avg', value: `${Math.round(studentData.reduce((acc, s) => acc + s.profileCompleted, 0) / studentData.length)}%`, color: 'purple' }
              ].map((stat, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 shadow-lg mb-4`}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">
                      {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} /> : stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Performing Students */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">Top Performing Students</CardTitle>
                    <CardDescription>Students with highest CGPA and achievements</CardDescription>
                  </div>
                  <Button onClick={() => handleDownloadReport('top-performers')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Top Performers
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {studentData
                    .sort((a, b) => b.cgpa - a.cgpa)
                    .slice(0, 10)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{student.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <span>{student.rollNo}</span>
                              <span>•</span>
                              <span>{student.department}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{student.cgpa}</div>
                            <div className="text-xs text-slate-600">CGPA</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{student.skills.length}</div>
                            <div className="text-xs text-slate-600">Skills</div>
                          </div>
                          <Badge className={student.isShortlisted ? 'success-light' : 'warning-light'}>
                            {student.isShortlisted ? 'Shortlisted' : 'Active'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Company Partnership Analysis</h3>
                <p className="text-slate-600">Comprehensive analysis of company relationships and performance</p>
              </div>
              <Button onClick={() => handleDownloadReport('company-analysis')}>
                <Download className="w-4 h-4 mr-2" />
                Export Company Data
              </Button>
            </div>

            {/* Company Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Partners', value: companiesData.length, icon: Building, color: 'blue' },
                { label: 'Active Partnerships', value: companiesData.filter(c => c.status === 'onboarded').length, icon: CheckCircle, color: 'green' },
                { label: 'Total Positions', value: companiesData.reduce((acc, c) => acc + c.positions, 0), icon: Briefcase, color: 'purple' },
                { label: 'Avg Response Rate', value: '85%', icon: TrendingUp, color: 'orange' }
              ].map((stat, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">
                          {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} /> : stat.value}
                        </div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Company Performance Analysis */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">Company Partnership Performance</CardTitle>
                    <CardDescription>Detailed analysis of company engagement and hiring metrics</CardDescription>
                  </div>
                  <Button onClick={() => handleDownloadReport('company-performance')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Performance Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Company</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Sector</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Positions</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">CTC Range</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Status</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Performance</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companiesData.slice(0, 10).map((company, index) => (
                        <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                                <Building className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800">{company.name}</div>
                                <div className="text-sm text-slate-600">{company.contact.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-slate-800">{company.sector}</td>
                          <td className="text-center py-3 px-4 text-slate-800">{company.positions}</td>
                          <td className="text-center py-3 px-4 text-slate-800">{company.ctcRange}</td>
                          <td className="text-center py-3 px-4">
                            <Badge className={
                              company.status === 'onboarded' ? 'success-light' :
                              company.status === 'negotiation' ? 'warning-light' :
                              company.status === 'contacted' ? 'info-light' : 'error-light'
                            }>
                              {company.status}
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-4">
                            <Badge className={
                              company.performance === 'high' ? 'success-light' :
                              company.performance === 'medium' ? 'warning-light' : 'error-light'
                            }>
                              {company.performance || 'good'}
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-4">
                            <div className="flex items-center justify-center space-x-1">
                              <Button size="sm" variant="ghost">
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Performance Metrics Dashboard</h3>
                <p className="text-slate-600">Key performance indicators and trend analysis</p>
              </div>
              <Button onClick={() => handleDownloadReport('performance-metrics')}>
                <Download className="w-4 h-4 mr-2" />
                Export Performance Data
              </Button>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Monthly Performance Trends</CardTitle>
                  <CardDescription>Key metrics progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedLineChart 
                      data={[
                        { month: 'Aug', applications: 1250, placements: 145, interviews: 89 },
                        { month: 'Sep', applications: 1680, placements: 234, interviews: 156 },
                        { month: 'Oct', applications: 1420, placements: 189, interviews: 134 },
                        { month: 'Nov', applications: 2100, placements: 267, interviews: 198 },
                        { month: 'Dec', applications: 1380, placements: 198, interviews: 145 },
                        { month: 'Jan', applications: 2850, placements: 220, interviews: 267 }
                      ]}
                      dataKeys={[
                        { key: 'applications', name: 'Applications', color: '#4f46e5' },
                        { key: 'placements', name: 'Placements', color: '#10b981' },
                        { key: 'interviews', name: 'Interviews', color: '#f59e0b' }
                      ]}
                      height={300}
                      showArea={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Success Rate Analysis</CardTitle>
                  <CardDescription>Application to placement conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Application Success Rate', current: 18.5, target: 20, trend: '+2.3%' },
                      { metric: 'Interview Conversion', current: 67.8, target: 70, trend: '+5.1%' },
                      { metric: 'Offer Acceptance Rate', current: 89.2, target: 85, trend: '+4.2%' },
                      { metric: 'Average Time to Hire', current: 45, target: 40, trend: '-3 days', unit: 'days' }
                    ].map((metric, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-800">{metric.metric}</span>
                          <Badge className="success-light">{metric.trend}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-slate-800">
                            {metric.current}{metric.unit || '%'}
                          </div>
                          <div className="text-sm text-slate-600">
                            Target: {metric.target}{metric.unit || '%'}
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div 
                            className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                            style={{ width: `${(metric.current / (metric.target * 1.2)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-800">Custom Report Builder</h3>
                <p className="text-slate-600">Create personalized reports with specific data sets</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-purple-600">
                <Settings className="w-4 h-4 mr-2" />
                Create Custom Report
              </Button>
            </div>

            {/* Custom Report Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Academic Performance Analysis',
                  description: 'CGPA trends, course performance, and academic achievements',
                  fields: ['Student Records', 'CGPA Data', 'Course Completion', 'Academic Awards']
                },
                {
                  title: 'Industry Partnership Report',
                  description: 'Company engagement, hiring patterns, and partnership ROI',
                  fields: ['Company Profiles', 'Hiring Data', 'Engagement Metrics', 'Contract Details']
                },
                {
                  title: 'Skills Gap Analysis',
                  description: 'Market demand vs student skills, training effectiveness',
                  fields: ['Student Skills', 'Market Demand', 'Training Data', 'Certification Rates']
                },
                {
                  title: 'Regional Performance Report',
                  description: 'Geographic distribution of placements and company preferences',
                  fields: ['Location Data', 'Placement Geography', 'Company Locations', 'Student Origins']
                },
                {
                  title: 'Training Effectiveness Study',
                  description: 'Training program outcomes and skill development metrics',
                  fields: ['Training Sessions', 'Attendance Data', 'Skill Assessments', 'Certification Outcomes']
                },
                {
                  title: 'Diversity & Inclusion Report',
                  description: 'Gender representation, demographic analysis, and inclusion metrics',
                  fields: ['Demographics', 'Gender Distribution', 'Inclusion Metrics', 'Equal Opportunity Data']
                }
              ].map((template, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">{template.title}</h4>
                    <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-slate-700">Included Data Fields:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field, fieldIndex) => (
                          <Badge key={fieldIndex} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm" onClick={() => handleDownloadReport(`custom-${template.title.toLowerCase().replace(/\s+/g, '-')}`)}>
                        <Download className="w-3 h-3 mr-1" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Report Builder Interface */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Custom Report Builder</CardTitle>
                <CardDescription>Build your own reports with specific data points and visualizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data Source</label>
                    <Select defaultValue="students">
                      <SelectTrigger>
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Student Records</SelectItem>
                        <SelectItem value="companies">Company Data</SelectItem>
                        <SelectItem value="placements">Placement Records</SelectItem>
                        <SelectItem value="training">Training Data</SelectItem>
                        <SelectItem value="applications">Application Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Visualization Type</label>
                    <Select defaultValue="table">
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Data Table</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="scatter">Scatter Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Export Format</label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="excel">Excel Workbook</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Report
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-purple-600" onClick={() => handleDownloadReport('custom-builder')}>
                    <Download className="w-4 h-4 mr-2" />
                    Generate & Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};