import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigation } from '../navigation/NavigationProvider';
import { ArrowLeft, User, FileText, Award } from 'lucide-react';

export const TestNavigationPage: React.FC = () => {
  const { goBack, navigateTo } = useNavigation();

  const testStudent = {
    id: 1,
    name: 'Sumanth Bolisetty',
    rollNo: 'AP24322130096',
    email: 'sumanth_bolisetty@srmap.edu.in',
    phone: '+91 9876543210',
    department: 'MBA',
    batch: '2024-2026',
    cgpa: 8.95,
    semester: 3,
    dateOfBirth: '2002-03-15',
    address: 'Amaravati, Andhra Pradesh',
    fatherName: 'Rajesh Bolisetty',
    motherName: 'Radhika Bolisetty',
    skills: ['Python', 'Java', 'React', 'Node.js'],
    projects: [{
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce application',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/example/project'
    }],
    experience: [],
    education: [{
      degree: 'Master of Business Administration',
      institution: 'SRM University AP',
      year: '2024-2026',
      percentage: 89.5
    }],
    certifications: [],
    achievements: ['Dean\'s List 2024'],
    languages: [
      { language: 'English', proficiency: 'Native' as const },
      { language: 'Telugu', proficiency: 'Native' as const }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sumanth-bolisetty',
      github: 'https://github.com/sumanth-bolisetty'
    },
    profileCompleted: 92,
    course: 'MBA',
    isShortlisted: false,
    applicationStatus: 'not_shortlisted' as const
  };

  const testFaculty = {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya_sharma@srmap.edu.in',
    phone: '+91 9876543210',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    experience: 12,
    qualifications: 'Ph.D in Machine Learning',
    researchAreas: ['AI', 'ML', 'Data Science'],
    coursesHandled: ['Machine Learning', 'AI Fundamentals'],
    publicationsCount: 25,
    projectsSupervised: 15,
    budgetAllocated: 5000000,
    budgetUtilized: 3250000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Navigation Test</h1>
              <p className="text-slate-600">Test all navigation routes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Student Profile Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('student-profile', testStudent, 'Student Profile')}
              >
                <User className="w-4 h-4 mr-2" />
                View Student Profile
              </Button>
              
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('profile-edit', testStudent, 'Edit Profile')}
              >
                <User className="w-4 h-4 mr-2" />
                Edit Student Profile
              </Button>
              
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('resume-builder', testStudent, 'Resume Builder')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume Builder
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Faculty Profile Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('faculty-profile', testFaculty, 'Faculty Profile')}
              >
                <User className="w-4 h-4 mr-2" />
                View Faculty Profile
              </Button>
              
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('profile-edit', testFaculty, 'Edit Faculty Profile')}
              >
                <User className="w-4 h-4 mr-2" />
                Edit Faculty Profile
              </Button>
              
              <Button 
                className="w-full justify-start"
                onClick={() => navigateTo('training-session', null, 'Training Session')}
              >
                <Award className="w-4 h-4 mr-2" />
                Training Session
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-slate-800">Other Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('user-management', null, 'User Management')}
                >
                  User Management
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('report-generation', null, 'Reports')}
                >
                  Reports
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('attendance-marking', null, 'Attendance')}
                >
                  Attendance
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('operations-profile', null, 'Operations Profile')}
                >
                  Operations Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};