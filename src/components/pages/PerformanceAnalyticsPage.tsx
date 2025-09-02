import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, TrendingUp, TrendingDown, Users, Target, Award, 
  Download, Filter, BarChart3, PieChart, LineChart, Calendar
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { EnhancedLineChart, EnhancedBarChart, EnhancedPieChart, AnimatedCounter } from '../common/AdvancedCharts';

export const PerformanceAnalyticsPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('placement-rate');
  const [timeRange, setTimeRange] = useState('academic-year');

  // Mock performance data
  const performanceMetrics = [
    {
      title: 'Overall Placement Rate',
      value: 94,
      suffix: '%',
      trend: '+8%',
      trendDirection: 'up',
      color: 'green',
      icon: Target,
      description: 'Students successfully placed'
    },
    {
      title: 'Average Package',
      value: 12.5,
      suffix: ' LPA',
      trend: '+15%',
      trendDirection: 'up',
      color: 'blue',
      icon: TrendingUp,
      description: 'Mean salary package offered'
    },
    {
      title: 'Company Partnerships',
      value: 89,
      suffix: '',
      trend: '+12',
      trendDirection: 'up',
      color: 'purple',
      icon: Users,
      description: 'Active recruiting partners'
    },
    {
      title: 'Training Completion',
      value: 87,
      suffix: '%',
      trend: '+5%',
      trendDirection: 'up',
      color: 'orange',
      icon: Award,
      description: 'Training programs completed'
    }
  ];

  // Placement trends data
  const placementTrendsData = [
    { month: 'Aug 2024', cse: 85, ece: 78, mech: 72, total: 79 },
    { month: 'Sep 2024', cse: 88, ece: 82, mech: 75, total: 82 },
    { month: 'Oct 2024', cse: 91, ece: 85, mech: 78, total: 85 },
    { month: 'Nov 2024', cse: 93, ece: 87, mech: 80, total: 87 },
    { month: 'Dec 2024', cse: 95, ece: 89, mech: 82, total: 89 },
    { month: 'Jan 2025', cse: 97, ece: 91, mech: 85, total: 91 }
  ];

  // Department performance data
  const departmentData = [
    { name: 'Computer Science', placed: 145, total: 150, rate: 96.7, avgPackage: 15.2, color: '#4f46e5' },
    { name: 'Information Technology', placed: 138, total: 145, rate: 95.2, avgPackage: 14.8, color: '#6366f1' },
    { name: 'Electronics & Communication', placed: 128, total: 140, rate: 91.4, avgPackage: 12.5, color: '#8b5cf6' },
    { name: 'Mechanical Engineering', placed: 95, total: 120, rate: 79.2, avgPackage: 10.8, color: '#06b6d4' },
    { name: 'Civil Engineering', placed: 82, total: 110, rate: 74.5, avgPackage: 9.5, color: '#10b981' }
  ];

  // Salary distribution data
  const salaryDistribution = [
    { range: '₹5-10 LPA', count: 145, percentage: 32 },
    { range: '₹10-15 LPA', count: 178, percentage: 39 },
    { range: '₹15-20 LPA', count: 89, percentage: 20 },
    { range: '₹20-25 LPA', count: 28, percentage: 6 },
    { range: '₹25+ LPA', count: 14, percentage: 3 }
  ];

  const downloadAnalyticsData = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Department,Total Students,Placed,Placement Rate,Average Package\\n';
    
    departmentData.forEach(dept => {
      csvContent += `"${dept.name}",${dept.total},${dept.placed},${dept.rate}%,₹${dept.avgPackage} LPA\\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'performance_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <h1 className="text-2xl font-bold text-slate-800">Performance Analytics</h1>
              <p className="text-slate-600">Comprehensive insights into placement and training performance</p>
            </div>
          </div>
          <Button onClick={downloadAnalyticsData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-primary/20 rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Trends</TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Departments</TabsTrigger>
            <TabsTrigger value="salary" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Salary Analysis</TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 shadow-lg`}>
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center text-sm">
                        {metric.trendDirection === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={metric.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-slate-800">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                      </div>
                      <h3 className="font-semibold text-slate-800">{metric.title}</h3>
                      <p className="text-sm text-slate-600">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="mech">Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2023-24">2023-24</SelectItem>
                      <SelectItem value="2022-23">2022-23</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger>
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement-rate">Placement Rate</SelectItem>
                      <SelectItem value="avg-package">Average Package</SelectItem>
                      <SelectItem value="training-completion">Training Completion</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic-year">Academic Year</SelectItem>
                      <SelectItem value="semester">Current Semester</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Department Rankings</CardTitle>
                  <CardDescription>Top performing departments by placement rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.slice(0, 3).map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{dept.name}</h4>
                            <p className="text-sm text-slate-600">{dept.placed}/{dept.total} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800">{dept.rate}%</div>
                          <div className="text-sm text-slate-600">₹{dept.avgPackage}L avg</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Performance Highlights</CardTitle>
                  <CardDescription>Key achievements and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">Placement Target Achieved</h4>
                        <p className="text-sm text-green-600">94% placement rate exceeds 90% target</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800">Package Improvement</h4>
                        <p className="text-sm text-blue-600">15% increase in average package YoY</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800">New Partnerships</h4>
                        <p className="text-sm text-purple-600">12 new companies recruited this year</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Placement Trends Analysis</CardTitle>
                <CardDescription>Month-over-month placement performance across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <EnhancedLineChart 
                    data={placementTrendsData}
                    dataKeys={[
                      { key: 'cse', name: 'Computer Science (%)', color: '#4f46e5' },
                      { key: 'ece', name: 'Electronics & Communication (%)', color: '#8b5cf6' },
                      { key: 'mech', name: 'Mechanical Engineering (%)', color: '#06b6d4' },
                      { key: 'total', name: 'Overall Average (%)', color: '#10b981' }
                    ]}
                    height={380}
                    showArea={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Department Performance Comparison</CardTitle>
                <CardDescription>Comparative analysis of placement performance by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <EnhancedBarChart 
                    data={departmentData.map(dept => ({
                      department: dept.name.split(' ')[0],
                      'Placement Rate': dept.rate,
                      'Average Package': dept.avgPackage
                    }))}
                    dataKeys={[
                      { key: 'Placement Rate', name: 'Placement Rate (%)', color: '#4f46e5' },
                      { key: 'Average Package', name: 'Average Package (LPA)', color: '#10b981' }
                    ]}
                    height={380}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {departmentData.map((dept, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dept.color }}></div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{dept.name}</h4>
                          <p className="text-sm text-slate-600">{dept.placed} of {dept.total} students placed</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">{dept.rate}%</div>
                          <div className="text-xs text-slate-600">Placement Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">₹{dept.avgPackage}L</div>
                          <div className="text-xs text-slate-600">Avg Package</div>
                        </div>
                        <Badge className={dept.rate >= 90 ? 'success-light' : dept.rate >= 80 ? 'warning-light' : 'error-light'}>
                          {dept.rate >= 90 ? 'Excellent' : dept.rate >= 80 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Salary Distribution</CardTitle>
                  <CardDescription>Distribution of salary packages offered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <EnhancedPieChart 
                      data={salaryDistribution.map((item, index) => ({
                        name: item.range,
                        value: item.count,
                        color: ['#4f46e5', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][index]
                      }))}
                      height={300}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-800">Salary Breakdown</CardTitle>
                  <CardDescription>Detailed salary range analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salaryDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-purple-600"></div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{item.range}</h4>
                            <p className="text-sm text-slate-600">{item.count} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800">{item.percentage}%</div>
                          <div className="text-sm text-slate-600">of total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Performance Predictions</CardTitle>
                <CardDescription>AI-powered predictions and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Predictive Analytics</h3>
                  <p className="text-slate-600 mb-4">Advanced ML models for placement predictions and trend analysis.</p>
                  <Button>
                    View Predictions
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