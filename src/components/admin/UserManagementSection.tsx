import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, Phone, Mail, Eye, GraduationCap, Settings, Target, UserCog, BarChart3, Download, Upload
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { mockUsersByCategory } from '../data/superAdminData';
import { studentData, searchStudents } from '../data/studentData';
import { handleDownloadCSV, handleUploadCSV } from '../utils/csvUtils';

interface UserManagementSectionProps {
  onUserClick: (user: any, category: string) => void;
}

export const UserManagementSection: React.FC<UserManagementSectionProps> = ({ onUserClick }) => {
  const [userManagementTab, setUserManagementTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const { navigateTo } = useNavigation();

  // Filter students based on current filters
  const getFilteredStudents = () => {
    let filtered = studentData;
    
    if (searchTerm) {
      filtered = searchStudents(searchTerm);
    }
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(s => s.department.includes(selectedDepartment));
    }
    if (selectedYear !== 'all') {
      filtered = filtered.filter(s => s.yearOfStudy === parseInt(selectedYear));
    }
    if (selectedSection !== 'all') {
      filtered = filtered.filter(s => s.section === selectedSection);
    }
    
    return filtered;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-800">User Management</h3>
          <p className="text-slate-600">Manage users across all categories with role-based actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadCSV}>
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button onClick={() => navigateTo('user-management', null, 'User Management')}>
            <UserCog className="w-4 h-4 mr-2" />
            Advanced Management
          </Button>
        </div>
      </div>

      {/* User Category Tabs */}
      <Tabs value={userManagementTab} onValueChange={setUserManagementTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20 rounded-xl p-1">
          <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
            Students ({studentData.length})
          </TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
            Faculty ({mockUsersByCategory.faculty.length})
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
            Operations ({mockUsersByCategory.operations.length})
          </TabsTrigger>
          <TabsTrigger value="outreach" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
            Outreach ({mockUsersByCategory.outreach.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          {/* Student Filters */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer">Computer Science</SelectItem>
                    <SelectItem value="Information">Information Technology</SelectItem>
                    <SelectItem value="Electronics">Electronics & Communication</SelectItem>
                    <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year of Study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleDownloadCSV('students', getFilteredStudents())}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <div className="grid gap-4">
            {getFilteredStudents().slice(0, 10).map((student) => (
              <Card key={student.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => onUserClick(student, 'student')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{student.name}</h4>
                        <p className="text-slate-600">{student.rollNo} • {student.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{student.department.split(' ')[0]}</Badge>
                          <Badge variant="outline">Year {student.yearOfStudy}</Badge>
                          <Badge variant="outline">Section {student.section}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">CGPA: {student.cgpa}</div>
                      <Badge className={
                        student.placementStatus === 'placed' ? 'success-light' :
                        student.placementStatus === 'in-process' ? 'info-light' :
                        student.placementStatus === 'not-applied' ? 'warning-light' : 'error-light'
                      }>
                        {student.placementStatus}
                      </Badge>
                      <div className="flex mt-2 space-x-1">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-slate-800">Faculty Members</h4>
            <Button onClick={() => handleDownloadCSV('faculty')}>
              <Download className="w-4 h-4 mr-2" />
              Export Faculty Data
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockUsersByCategory.faculty.map((faculty) => (
              <Card key={faculty.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{faculty.name}</h4>
                        <p className="text-slate-600">{faculty.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{faculty.role}</Badge>
                          <Badge variant="outline">{faculty.specialization}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">{faculty.experience}</div>
                      <Badge className="success-light">Active</Badge>
                      <div className="flex mt-2 space-x-1">
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-slate-800">Operations Team</h4>
            <Button onClick={() => handleDownloadCSV('operations')}>
              <Download className="w-4 h-4 mr-2" />
              Export Operations Data
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockUsersByCategory.operations.map((ops) => (
              <Card key={ops.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{ops.name}</h4>
                        <p className="text-slate-600">{ops.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{ops.role}</Badge>
                          <Badge variant="outline">{ops.department}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-2">Responsibilities:</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {ops.responsibilities.map((resp, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{resp}</Badge>
                        ))}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <UserCog className="w-3 h-3 mr-1" />
                          Manage
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-slate-800">Outreach Team</h4>
            <Button onClick={() => handleDownloadCSV('outreach')}>
              <Download className="w-4 h-4 mr-2" />
              Export Outreach Data
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockUsersByCategory.outreach.map((outreach) => (
              <Card key={outreach.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{outreach.name}</h4>
                        <p className="text-slate-600">{outreach.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{outreach.role}</Badge>
                          <Badge variant="outline">{outreach.department}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-2">Target Performance:</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600">Monthly Target:</span>
                        <span className="text-sm font-bold text-slate-800">{outreach.targets.achieved}/{outreach.targets.monthly}</span>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                          style={{ width: `${(outreach.targets.achieved / outreach.targets.monthly) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Target className="w-3 h-3 mr-1" />
                          Set Targets
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};