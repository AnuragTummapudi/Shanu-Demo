import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText } from 'lucide-react';

interface JobFormProps {
  onCancel: () => void;
}

export default function JobForm({ onCancel }: JobFormProps) {
  return (
    <Card className="bg-white border-purple-200 border-2">
      <CardHeader>
        <CardTitle className="text-purple-900">Create Job Posting</CardTitle>
        <CardDescription>Enter job details and eligibility criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="job-title" className="text-purple-900">Job Title</Label>
            <Input id="job-title" placeholder="Enter job title" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="company" className="text-purple-900">Company</Label>
            <Input id="company" placeholder="Company name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="job-type" className="text-purple-900">Job Type</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="ctc-range" className="text-purple-900">CTC Range</Label>
            <Input id="ctc-range" placeholder="e.g., $75,000 - $95,000" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="deadline" className="text-purple-900">Application Deadline</Label>
            <Input id="deadline" type="date" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="positions" className="text-purple-900">Number of Positions</Label>
            <Input id="positions" type="number" placeholder="Enter number" className="mt-1" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="text-purple-900">Job Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter detailed job description..."
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <Label htmlFor="requirements" className="text-purple-900">Requirements & Eligibility</Label>
          <Textarea 
            id="requirements" 
            placeholder="Enter requirements and eligibility criteria..."
            className="mt-1"
            rows={3}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="w-4 h-4 mr-2" />
            Create Job Posting
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}