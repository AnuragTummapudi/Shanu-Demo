import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { 
  BookOpen, 
  Users, 
  Calendar,
  Clock,
  FileText,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: string;
  academicYear: string;
  students: number;
  maxCapacity: number;
  schedule: string;
  venue: string;
  status: 'Active' | 'Completed' | 'Upcoming' | 'Cancelled';
  progress: number;
  syllabus: string;
  instructor: string;
  description: string;
}

const CourseManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  // Sample courses data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'CSE301',
      name: 'Machine Learning',
      code: 'CSE301',
      credits: 4,
      semester: 'Fall 2024',
      academicYear: '2024-25',
      students: 45,
      maxCapacity: 50,
      schedule: 'Mon-Wed-Fri 9:00 AM - 10:00 AM',
      venue: 'CSE Lab 1',
      status: 'Active',
      progress: 65,
      syllabus: 'Introduction to ML, Supervised Learning, Unsupervised Learning, Deep Learning',
      instructor: 'Dr. Lakshmi Venkatesh',
      description: 'Comprehensive course covering machine learning algorithms and applications'
    },
    {
      id: 'CSE401',
      name: 'Advanced Algorithms',
      code: 'CSE401',
      credits: 3,
      semester: 'Fall 2024',
      academicYear: '2024-25',
      students: 38,
      maxCapacity: 40,
      schedule: 'Tue-Thu 11:00 AM - 12:30 PM',
      venue: 'Room 201',
      status: 'Active',
      progress: 45,
      syllabus: 'Graph Algorithms, Dynamic Programming, Greedy Algorithms, NP-Complete Problems',
      instructor: 'Dr. Lakshmi Venkatesh',
      description: 'Advanced study of algorithm design and analysis techniques'
    },
    {
      id: 'CSE201',
      name: 'Data Structures',
      code: 'CSE201',
      credits: 4,
      semester: 'Spring 2024',
      academicYear: '2023-24',
      students: 52,
      maxCapacity: 55,
      schedule: 'Mon-Wed-Fri 2:00 PM - 3:00 PM',
      venue: 'Room 105',
      status: 'Completed',
      progress: 100,
      syllabus: 'Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hashing',
      instructor: 'Dr. Lakshmi Venkatesh',
      description: 'Fundamental data structures and their applications'
    },
    {
      id: 'CSE501',
      name: 'Artificial Intelligence',
      code: 'CSE501',
      credits: 4,
      semester: 'Spring 2025',
      academicYear: '2024-25',
      students: 0,
      maxCapacity: 45,
      schedule: 'Mon-Wed-Fri 10:00 AM - 11:00 AM',
      venue: 'CSE Lab 2',
      status: 'Upcoming',
      progress: 0,
      syllabus: 'Search Algorithms, Knowledge Representation, Expert Systems, Neural Networks',
      instructor: 'Dr. Lakshmi Venkatesh',
      description: 'Introduction to artificial intelligence concepts and techniques'
    }
  ]);

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSemester = semesterFilter === 'all' || course.semester === semesterFilter;
    
    return matchesSearch && matchesStatus && matchesSemester;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Completed': return 'bg-info text-info-foreground';
      case 'Upcoming': return 'bg-warning text-warning-foreground';
      case 'Cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Get progress color
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 50) return 'text-warning';
    return 'text-info';
  };

  // Handle course actions
  const handleEditCourse = (courseId: string) => {
    toast.info(`Editing course ${courseId}`);
    // Navigation to edit page would happen here
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast.success('Course deleted successfully');
  };

  const handleExportCourses = () => {
    // Export courses data as CSV
    const csvData = filteredCourses.map(course => ({
      'Course Code': course.code,
      'Course Name': course.name,
      'Credits': course.credits,
      'Semester': course.semester,
      'Students Enrolled': course.students,
      'Max Capacity': course.maxCapacity,
      'Schedule': course.schedule,
      'Venue': course.venue,
      'Status': course.status,
      'Progress': `${course.progress}%`,
      'Instructor': course.instructor
    }));
    
    // Convert to CSV string
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Courses data exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground">Manage your teaching assignments and course content</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCourses}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold text-foreground">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold text-foreground">
                  {courses.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                </p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search courses by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                <SelectItem value="Spring 2025">Spring 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.code} • {course.credits} Credits</p>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Semester:</span>
                  <span className="font-medium">{course.semester}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{course.students}/{course.maxCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-medium text-xs">{course.schedule.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Venue:</span>
                  <span className="font-medium">{course.venue}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className={`font-medium ${getProgressColor(course.progress)}`}>
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} />
              </div>

              {/* Course Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditCourse(course.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || semesterFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'You haven\'t created any courses yet.'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Course
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseManagementPage;