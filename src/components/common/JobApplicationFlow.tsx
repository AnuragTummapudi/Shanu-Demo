import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Upload, 
  CheckCircle, 
  Building,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Eye
} from 'lucide-react';
import ResumeManager from './ResumeManager';

interface JobApplicationFlowProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    description?: string;
    requirements?: string[];
    deadline?: string;
  };
  userId: string;
  userRole: string;
  onComplete: (applicationData: any) => void;
  onCancel: () => void;
}

export default function JobApplicationFlow({ 
  job, 
  userId, 
  userRole, 
  onComplete, 
  onCancel 
}: JobApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    selectedResume: null as any,
    coverLetter: '',
    additionalDocuments: [] as any[],
    questionnaire: {} as Record<string, any>,
    agreedToTerms: false,
    notifications: true
  });

  const steps = [
    { id: 1, title: 'Resume Selection', description: 'Choose your resume' },
    { id: 2, title: 'Cover Letter', description: 'Write a cover letter' },
    { id: 3, title: 'Application Details', description: 'Additional information' },
    { id: 4, title: 'Review & Submit', description: 'Confirm your application' }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!applicationData.selectedResume) {
      toast.error('Please select a resume');
      return;
    }

    if (!applicationData.agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    const finalApplicationData = {
      ...applicationData,
      jobId: job.id,
      submittedAt: new Date().toISOString(),
      status: 'applied'
    };

    onComplete(finalApplicationData);
    toast.success('Application submitted successfully!');
  };

  const renderJobSummary = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground">{job.company}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 w-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 w-3" />
                {job.salary}
              </span>
              <Badge variant="outline">{job.type}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Your Resume</h3>
        <p className="text-muted-foreground mb-4">
          Choose the resume you want to submit with this application
        </p>
      </div>

      <ResumeManager
        userId={userId}
        userRole={userRole as any}
        viewMode="full"
        allowUpload={true}
        showActions={true}
        onResumeSelect={(resume) => {
          setApplicationData(prev => ({ ...prev, selectedResume: resume }));
          toast.success('Resume selected');
        }}
      />

      {applicationData.selectedResume && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-800 font-medium">
                Selected: {applicationData.selectedResume.name}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cover Letter</h3>
        <p className="text-muted-foreground mb-4">
          Write a personalized cover letter for this position
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder="Dear Hiring Manager,&#10;&#10;I am writing to express my interest in the position of..."
            value={applicationData.coverLetter}
            onChange={(e) => setApplicationData(prev => ({ 
              ...prev, 
              coverLetter: e.target.value 
            }))}
            className="min-h-[200px]"
          />
          <div className="text-sm text-muted-foreground mt-2">
            {applicationData.coverLetter.length}/1000 characters
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cover Letter Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Address the hiring manager by name if possible</li>
            <li>• Mention specific skills that match the job requirements</li>
            <li>• Explain why you're interested in this company</li>
            <li>• Keep it concise and professional</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Application Details</h3>
        <p className="text-muted-foreground mb-4">
          Please provide additional information about your application
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Are you willing to relocate to {job.location}?
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="relocate"
                  value="yes"
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    questionnaire: { ...prev.questionnaire, relocate: e.target.value }
                  }))}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="relocate"
                  value="no"
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    questionnaire: { ...prev.questionnaire, relocate: e.target.value }
                  }))}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              What is your expected joining date?
            </label>
            <input
              type="date"
              className="mt-2 w-full p-2 border rounded-md"
              onChange={(e) => setApplicationData(prev => ({
                ...prev,
                questionnaire: { ...prev.questionnaire, joiningDate: e.target.value }
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Any additional comments or information?
            </label>
            <Textarea
              placeholder="Optional additional information..."
              className="mt-2"
              onChange={(e) => setApplicationData(prev => ({
                ...prev,
                questionnaire: { ...prev.questionnaire, additionalInfo: e.target.value }
              }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Application</h3>
        <p className="text-muted-foreground mb-4">
          Please review all information before submitting
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Resume</label>
            <div className="flex items-center gap-2 mt-1">
              <FileText className="w-4 h-4" />
              <span>{applicationData.selectedResume?.name || 'No resume selected'}</span>
              <Button size="sm" variant="outline">
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Cover Letter</label>
            <div className="mt-1 p-3 bg-muted rounded-md text-sm max-h-32 overflow-y-auto">
              {applicationData.coverLetter || 'No cover letter provided'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Relocation</label>
            <div className="mt-1">
              {applicationData.questionnaire.relocate || 'Not answered'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Expected Joining Date</label>
            <div className="mt-1">
              {applicationData.questionnaire.joiningDate || 'Not specified'}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Checkbox
                checked={applicationData.agreedToTerms}
                onCheckedChange={(checked) => setApplicationData(prev => ({
                  ...prev,
                  agreedToTerms: !!checked
                }))}
              />
              <div className="text-sm">
                I agree to the{' '}
                <button className="text-primary underline">terms and conditions</button>{' '}
                and confirm that all information provided is accurate.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                checked={applicationData.notifications}
                onCheckedChange={(checked) => setApplicationData(prev => ({
                  ...prev,
                  notifications: !!checked
                }))}
              />
              <div className="text-sm">
                I would like to receive email notifications about the status of this application.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Apply for Position</h2>
          <p className="text-muted-foreground">Complete your job application</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((step) => (
                <span key={step.id} className={currentStep >= step.id ? 'text-primary' : ''}>
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Summary */}
      {renderJobSummary()}

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && !applicationData.selectedResume}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!applicationData.selectedResume || !applicationData.agreedToTerms}
          >
            Submit Application
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}