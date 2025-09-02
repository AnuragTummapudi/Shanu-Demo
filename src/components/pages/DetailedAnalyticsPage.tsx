import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  GraduationCap,
  IndianRupee,
  Target,
  Award,
  Calendar,
  Building,
  MapPin,
  Layers,
  Filter,
  Download,
  RefreshCw,
  Eye,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { toast } from 'sonner';

interface DetailedAnalyticsPageProps {
  userRole?: string;
}

// Comprehensive Placement Analytics
const PlacementAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  const [department, setDepartment] = useState('all');

  const placementTrends = [
    { year: '2020', placed: 456, total: 520, rate: 87.7, avgPackage: 5.2 },
    { year: '2021', placed: 489, total: 545, rate: 89.7, avgPackage: 5.8 },
    { year: '2022', placed: 512, total: 578, rate: 88.6, avgPackage: 6.4 },
    { year: '2023', placed: 587, total: 625, rate: 93.9, avgPackage: 7.1 },
    { year: '2024', placed: 634, total: 678, rate: 93.5, avgPackage: 7.8 }
  ];

  const departmentWiseData = [
    { name: 'Computer Science', placed: 156, total: 165, rate: 94.5, avgPackage: 12.5, color: '#4f46e5' },
    { name: 'Electronics', placed: 89, total: 98, rate: 90.8, avgPackage: 8.2, color: '#06b6d4' },
    { name: 'Mechanical', placed: 78, total: 87, rate: 89.7, avgPackage: 6.8, color: '#10b981' },
    { name: 'Civil', placed: 65, total: 75, rate: 86.7, avgPackage: 5.9, color: '#f59e0b' },
    { name: 'Electrical', placed: 71, total: 82, rate: 86.6, avgPackage: 7.1, color: '#8b5cf6' },
    { name: 'Chemical', placed: 45, total: 52, rate: 86.5, avgPackage: 6.4, color: '#ec4899' }
  ];

  const companyTypeDistribution = [
    { type: 'Product Companies', count: 45, placements: 289, avgPackage: 11.2 },
    { type: 'Service Companies', count: 78, placements: 234, avgPackage: 6.8 },
    { type: 'Startups', count: 23, placements: 67, avgPackage: 8.9 },
    { type: 'Government', count: 12, placements: 34, avgPackage: 5.8 },
    { type: 'Banking/Finance', count: 15, placements: 45, avgPackage: 9.2 }
  ];

  const packageDistribution = [
    { range: '3-5 LPA', students: 156, percentage: 24.6 },
    { range: '5-8 LPA', students: 198, percentage: 31.2 },
    { range: '8-12 LPA', students: 145, percentage: 22.9 },
    { range: '12-20 LPA', students: 98, percentage: 15.4 },
    { range: '20+ LPA', students: 37, percentage: 5.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2>Placement Analytics</h2>
          <p className="text-muted-foreground">Comprehensive placement performance analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cse">Computer Science</SelectItem>
              <SelectItem value="ece">Electronics</SelectItem>
              <SelectItem value="mech">Mechanical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">93.5%</div>
            <p className="text-sm text-muted-foreground">Overall Placement Rate</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+4.8% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success">634</div>
            <p className="text-sm text-muted-foreground">Students Placed</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+47 from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-warning">₹7.8L</div>
            <p className="text-sm text-muted-foreground">Average Package</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+9.8% from last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-info">₹25L</div>
            <p className="text-sm text-muted-foreground">Highest Package</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">New record!</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChartIcon className="w-5 h-5 text-primary" />
              <span>5-Year Placement Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="placed" fill="#4f46e5" name="Students Placed" />
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} name="Placement Rate %" />
                <Line yAxisId="right" type="monotone" dataKey="avgPackage" stroke="#f59e0b" strokeWidth={2} name="Avg Package (LPA)" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChartIcon className="w-5 h-5 text-primary" />
              <span>Department-wise Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentWiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#4f46e5" name="Placement Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Package Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <span>Package Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="students"
                  label={({ range, percentage }) => `${range}: ${percentage}%`}
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-primary" />
              <span>Company Type Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyTypeDistribution.map((company, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{company.type}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{company.count} companies</span>
                      <span className="text-sm font-medium">{company.placements} placements</span>
                      <Badge variant="secondary">₹{company.avgPackage}L avg</Badge>
                    </div>
                  </div>
                  <Progress value={(company.placements / 634) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentWiseData.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">{dept.placed}/{dept.total} students placed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{dept.rate}%</div>
                    <div className="text-sm text-muted-foreground">placement rate</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Avg Package:</span>
                    <span className="ml-1 font-medium">₹{dept.avgPackage}L</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Placed:</span>
                    <span className="ml-1 font-medium">{dept.placed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <span className="ml-1 font-medium">{dept.total}</span>
                  </div>
                </div>
                <Progress value={dept.rate} className="mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Student Performance Analytics
const StudentAnalytics: React.FC = () => {
  const performanceData = [
    { semester: 'Sem 1', cgpa: 7.8, attendance: 92, passed: 95 },
    { semester: 'Sem 2', cgpa: 8.1, attendance: 89, passed: 93 },
    { semester: 'Sem 3', cgpa: 8.3, attendance: 91, passed: 96 },
    { semester: 'Sem 4', cgpa: 8.2, attendance: 88, passed: 94 },
    { semester: 'Sem 5', cgpa: 8.4, attendance: 90, passed: 97 },
    { semester: 'Sem 6', cgpa: 8.5, attendance: 89, passed: 95 }
  ];

  const gradeDistribution = [
    { grade: 'A+', students: 125, percentage: 18.4 },
    { grade: 'A', students: 189, percentage: 27.9 },
    { grade: 'B+', students: 156, percentage: 23.0 },
    { grade: 'B', students: 123, percentage: 18.1 },
    { grade: 'C+', students: 65, percentage: 9.6 },
    { grade: 'C', students: 20, percentage: 2.9 }
  ];

  const skillAnalytics = [
    { skill: 'Programming', proficient: 78, improving: 15, beginner: 7 },
    { skill: 'Communication', proficient: 65, improving: 25, beginner: 10 },
    { skill: 'Problem Solving', proficient: 71, improving: 20, beginner: 9 },
    { skill: 'Leadership', proficient: 45, improving: 35, beginner: 20 },
    { skill: 'Teamwork', proficient: 82, improving: 13, beginner: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Student Performance Analytics</h2>
          <p className="text-muted-foreground">Academic performance and skill development insights</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Academic Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">8.35</div>
            <p className="text-sm text-muted-foreground">Average CGPA</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+0.2 from last sem</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success">89.7%</div>
            <p className="text-sm text-muted-foreground">Average Attendance</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingDown className="w-4 h-4 text-warning mr-1" />
              <span className="text-xs text-warning">-1.2% from last sem</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-info">95.2%</div>
            <p className="text-sm text-muted-foreground">Pass Rate</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+1.8% from last sem</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-warning">678</div>
            <p className="text-sm text-muted-foreground">Active Students</p>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-xs text-success">+23 new admissions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cgpa" stroke="#4f46e5" strokeWidth={2} name="Average CGPA" />
                <Line type="monotone" dataKey="attendance" stroke="#06b6d4" strokeWidth={2} name="Attendance %" />
                <Line type="monotone" dataKey="passed" stroke="#10b981" strokeWidth={2} name="Pass Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#4f46e5" name="Number of Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skill Development Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillAnalytics.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.proficient}% proficient
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div 
                      className="bg-success h-2 rounded-l" 
                      style={{ width: `${skill.proficient}%` }}
                    ></div>
                    <div 
                      className="bg-warning h-2" 
                      style={{ width: `${skill.improving}%` }}
                    ></div>
                    <div 
                      className="bg-muted h-2 rounded-r" 
                      style={{ width: `${skill.beginner}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficient: {skill.proficient}%</span>
                    <span>Improving: {skill.improving}%</span>
                    <span>Beginner: {skill.beginner}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Financial Analytics
const FinancialAnalytics: React.FC = () => {
  const revenueData = [
    { month: 'Jan', tuition: 2.5, placements: 0.8, training: 0.3, other: 0.2 },
    { month: 'Feb', tuition: 2.3, placements: 1.2, training: 0.4, other: 0.3 },
    { month: 'Mar', tuition: 2.4, placements: 1.5, training: 0.5, other: 0.2 },
    { month: 'Apr', tuition: 2.6, placements: 1.8, training: 0.6, other: 0.4 },
    { month: 'May', tuition: 2.7, placements: 2.1, training: 0.7, other: 0.3 },
    { month: 'Jun', tuition: 2.5, placements: 1.9, training: 0.8, other: 0.5 }
  ];

  const costAnalysis = [
    { category: 'Faculty Salaries', amount: 15.2, percentage: 45.8 },
    { category: 'Infrastructure', amount: 8.7, percentage: 26.2 },
    { category: 'Technology', amount: 4.3, percentage: 13.0 },
    { category: 'Administration', amount: 3.1, percentage: 9.3 },
    { category: 'Others', amount: 1.9, percentage: 5.7 }
  ];

  const profitabilityMetrics = [
    { metric: 'Total Revenue', value: '₹45.2 Cr', change: '+12.5%' },
    { metric: 'Operating Costs', value: '₹33.2 Cr', change: '+8.3%' },
    { metric: 'Net Profit', value: '₹12.0 Cr', change: '+18.7%' },
    { metric: 'Profit Margin', value: '26.5%', change: '+2.1%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Financial Analytics</h2>
          <p className="text-muted-foreground">Revenue, costs, and profitability analysis</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Financial Report
        </Button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {profitabilityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <p className="text-sm text-muted-foreground">{metric.metric}</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-xs text-success">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue and Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value} Cr`, '']} />
                <Legend />
                <Area type="monotone" dataKey="tuition" stackId="1" stroke="#4f46e5" fill="#4f46e5" name="Tuition" />
                <Area type="monotone" dataKey="placements" stackId="1" stroke="#06b6d4" fill="#06b6d4" name="Placements" />
                <Area type="monotone" dataKey="training" stackId="1" stroke="#10b981" fill="#10b981" name="Training" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown (Annual)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costAnalysis.map((cost, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{cost.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">₹{cost.amount} Cr</span>
                      <Badge variant="secondary">{cost.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={cost.percentage} className="h-2" />
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Annual Cost</span>
                  <span>₹33.2 Cr</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-success">32.4%</div>
              <p className="text-sm text-muted-foreground">Infrastructure ROI</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">28.7%</div>
              <p className="text-sm text-muted-foreground">Technology ROI</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-warning">41.2%</div>
              <p className="text-sm text-muted-foreground">Training Programs ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DetailedAnalyticsPage: React.FC<DetailedAnalyticsPageProps> = ({ userRole }) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive data insights and business intelligence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="placement" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="placement" className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>Placement Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="student" className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Student Performance</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center space-x-2">
            <IndianRupee className="w-4 h-4" />
            <span>Financial Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="placement" className="mt-6">
          <PlacementAnalytics />
        </TabsContent>

        <TabsContent value="student" className="mt-6">
          <StudentAnalytics />
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <FinancialAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedAnalyticsPage;