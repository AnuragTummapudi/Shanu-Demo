import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

interface AcademicSectionProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Academic Information</CardTitle>
          <CardDescription>Current academic details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Roll Number</label>
              <Input value={formData.rollNumber || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Course</label>
              <Input value={formData.course || ''} disabled />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Department</label>
              <Input value={formData.department || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">School</label>
              <Input value={formData.school || ''} disabled />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Batch</label>
              <Input value={formData.batch || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Current Semester</label>
              <Input value={formData.currentSemester || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">CGPA</label>
              <Input value={formData.cgpa || ''} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Skills</CardTitle>
          <CardDescription>Add your technical and soft skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Technical Skills</label>
            <Textarea 
              value={formData.technicalSkills?.join(', ') || ''} 
              onChange={(e) => onInputChange('technicalSkills', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="Enter technical skills separated by commas"
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Soft Skills</label>
            <Textarea 
              value={formData.softSkills?.join(', ') || ''} 
              onChange={(e) => onInputChange('softSkills', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="Enter soft skills separated by commas"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};