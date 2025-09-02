import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

interface PreferencesSectionProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Career Preferences</CardTitle>
          <CardDescription>Set your job and career preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Preferred Job Roles</label>
            <Textarea 
              value={formData.preferredRoles?.join(', ') || ''} 
              onChange={(e) => onInputChange('preferredRoles', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="Enter preferred job roles separated by commas"
              rows={2}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Preferred Industries</label>
            <Textarea 
              value={formData.preferredIndustries?.join(', ') || ''} 
              onChange={(e) => onInputChange('preferredIndustries', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="Enter preferred industries separated by commas"
              rows={2}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Preferred Locations</label>
            <Textarea 
              value={formData.preferredLocations?.join(', ') || ''} 
              onChange={(e) => onInputChange('preferredLocations', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="Enter preferred locations separated by commas"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Expected Salary (Min) ₹</label>
              <Input 
                type="number"
                value={formData.expectedSalaryMin || ''} 
                onChange={(e) => onInputChange('expectedSalaryMin', parseInt(e.target.value) || 0)}
                placeholder="Enter minimum expected salary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Expected Salary (Max) ₹</label>
              <Input 
                type="number"
                value={formData.expectedSalaryMax || ''} 
                onChange={(e) => onInputChange('expectedSalaryMax', parseInt(e.target.value) || 0)}
                placeholder="Enter maximum expected salary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Social Profiles</CardTitle>
          <CardDescription>Add your professional social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">LinkedIn</label>
              <Input 
                value={formData.linkedin || ''} 
                onChange={(e) => onInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">GitHub</label>
              <Input 
                value={formData.github || ''} 
                onChange={(e) => onInputChange('github', e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Portfolio Website</label>
              <Input 
                value={formData.portfolio || ''} 
                onChange={(e) => onInputChange('portfolio', e.target.value)}
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Twitter</label>
              <Input 
                value={formData.twitter || ''} 
                onChange={(e) => onInputChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yourusername"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};