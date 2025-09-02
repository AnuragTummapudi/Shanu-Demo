import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Download, Edit } from 'lucide-react';
import { Student } from '../types';
import { useNavigation } from '../navigation/NavigationProvider';

interface ProfileTabProps {
  student: Student;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ student }) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-900">Profile Management</h2>
        <p className="text-blue-600">Update your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/api/placeholder/64/64" />
                <AvatarFallback className="bg-blue-100 text-blue-700">SR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-blue-900">{student.name}</h3>
                <p className="text-blue-600">{student.department}</p>
                <p className="text-sm text-gray-500">Class of 2025</p>
              </div>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigateTo('profile-edit', student, 'Edit Profile')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Skills & Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm text-blue-900 mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm text-blue-900 mb-2">Projects</h4>
              <div className="space-y-1">
                {student.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {project.title}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => navigateTo('profile-edit', student, 'Edit Profile')}
            >
              Update Skills
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Documents & Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded border border-blue-100">
                <span className="text-sm text-blue-900">Resume.pdf</span>
                <Badge className="bg-green-100 text-green-800">✓</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded border border-blue-100">
                <span className="text-sm text-blue-900">Portfolio Link</span>
                <Badge className="bg-green-100 text-green-800">✓</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded border border-blue-100">
                <span className="text-sm text-blue-900">Transcript</span>
                <Badge className="bg-green-100 text-green-800">✓</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigateTo('resume-builder', student, 'Resume Builder')}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Resume
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Upload Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};