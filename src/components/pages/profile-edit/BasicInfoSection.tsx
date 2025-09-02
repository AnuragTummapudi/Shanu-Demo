import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { User } from 'lucide-react';
import { GENDER_OPTIONS, BLOOD_GROUPS } from './ProfileEditConstants';

interface BasicInfoSectionProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onInputChange }) => {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-slate-800">
          <User className="w-5 h-5 mr-2" />
          Basic Information
        </CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">First Name *</label>
            <Input 
              value={formData.firstName || ''} 
              onChange={(e) => onInputChange('firstName', e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name *</label>
            <Input 
              value={formData.lastName || ''} 
              onChange={(e) => onInputChange('lastName', e.target.value)}
              placeholder="Enter last name"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Date of Birth</label>
            <Input 
              type="date"
              value={formData.dateOfBirth || ''} 
              onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Gender</label>
            <Select value={formData.gender || ''} onValueChange={(value) => onInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Blood Group</label>
            <Select value={formData.bloodGroup || ''} onValueChange={(value) => onInputChange('bloodGroup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUPS.map(group => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Career Objective</label>
          <Textarea 
            value={formData.careerObjective || ''} 
            onChange={(e) => onInputChange('careerObjective', e.target.value)}
            placeholder="Describe your career goals and aspirations"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};