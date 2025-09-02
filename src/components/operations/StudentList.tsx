import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Search, Filter, Upload, Download } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  department: string;
  cgpa: number;
  skills: string[];
  experience: string;
  eligible: boolean;
  applied: boolean;
  shortlisted: boolean;
  selected: boolean;
}

interface StudentListProps {
  students: Student[];
  selectedStudents: number[];
  onStudentSelect: (studentId: number, checked: boolean) => void;
}

export default function StudentList({ students, selectedStudents, onStudentSelect }: StudentListProps) {
  const getStatusBadge = (student: Student) => {
    if (student.selected) return <Badge className="bg-green-100 text-green-800">Selected</Badge>;
    if (student.shortlisted) return <Badge className="bg-yellow-100 text-yellow-800">Shortlisted</Badge>;
    if (student.applied) return <Badge className="bg-blue-100 text-blue-800">Applied</Badge>;
    return <Badge variant="secondary">Eligible</Badge>;
  };

  return (
    <Card className="bg-white border-purple-100">
      <CardHeader>
        <CardTitle className="text-purple-900">Eligible Students</CardTitle>
        <CardDescription>Select students for shortlisting or other actions</CardDescription>
        
        <div className="flex items-center space-x-2 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="text-purple-900">Select All ({students.length} students)</span>
            <Checkbox 
              checked={selectedStudents.length === students.length}
              onCheckedChange={(checked) => {
                students.forEach(student => {
                  onStudentSelect(student.id, !!checked);
                });
              }}
            />
          </div>

          {students.map((student) => (
            <div key={student.id} className="p-4 border border-purple-100 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-purple-900">{student.name}</h4>
                    {getStatusBadge(student)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                    <div>Roll No: {student.rollNo}</div>
                    <div>Dept: {student.department}</div>
                    <div>CGPA: {student.cgpa}</div>
                    <div>Exp: {student.experience}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Checkbox 
                  checked={selectedStudents.includes(student.id)}
                  onCheckedChange={(checked) => onStudentSelect(student.id, !!checked)}
                  className="ml-4"
                />
              </div>
            </div>
          ))}
        </div>
        
        {selectedStudents.length > 0 && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-purple-900">{selectedStudents.length} students selected</span>
              <div className="space-x-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Shortlist Selected
                </Button>
                <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Send Notification
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}