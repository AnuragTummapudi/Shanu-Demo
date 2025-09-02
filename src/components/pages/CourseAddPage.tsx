import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

export const CourseAddPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    department: '',
    duration: '',
    capacity: '',
    description: '',
    prerequisites: '',
    level: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.instructor || !formData.department) {
      alert('Please fill in all required fields.');
      return;
    }
    alert(`Course "${formData.title}" has been successfully created!`);
    goBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Add New Course</h1>
              <p className="text-slate-600">Create a new training course or workshop</p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Course
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Course Information</CardTitle>
            <CardDescription>Enter details for the new course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Course Title *</label>
                <Input
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Instructor *</label>
                <Input
                  placeholder="Instructor name"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Department *</label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Duration</label>
                <Input
                  placeholder="e.g. 6 weeks"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Capacity</label>
                <Input
                  type="number"
                  placeholder="Max students"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <Textarea
                placeholder="Course description and objectives..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};