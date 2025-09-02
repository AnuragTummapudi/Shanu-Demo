import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, Save, User, Building, Calendar } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

interface ApplicationEditPageProps {
  application?: any;
}

export const ApplicationEditPage: React.FC<ApplicationEditPageProps> = ({ application }) => {
  const { goBack } = useNavigation();
  
  const [formData, setFormData] = useState({
    status: application?.status || 'applied',
    interviewDate: application?.interviewDate || '',
    nextRound: application?.nextRound || '',
    ctc: application?.ctc || '',
    notes: application?.notes || '',
    feedback: '',
    interviewMode: 'on-campus',
    interviewer: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    alert('Application details updated successfully!');
    goBack();
  };

  const appData = application || {
    studentName: 'Arjun Raghavan',
    company: 'Microsoft India',
    jobTitle: 'Software Engineer'
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
              <h1 className="text-2xl font-bold text-slate-800">Edit Application</h1>
              <p className="text-slate-600">{appData.studentName} - {appData.company}</p>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Application Details</CardTitle>
            <CardDescription>Update application status and interview details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Application Status</label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Interview Date</label>
                <Input
                  type="date"
                  value={formData.interviewDate}
                  onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Next Round</label>
                <Input
                  placeholder="e.g. Technical Interview Round 2"
                  value={formData.nextRound}
                  onChange={(e) => handleInputChange('nextRound', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Package Offered</label>
                <Input
                  placeholder="e.g. ₹15.5 LPA"
                  value={formData.ctc}
                  onChange={(e) => handleInputChange('ctc', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <Textarea
                placeholder="Add any additional notes or comments..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};