import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Save, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { BasicInfoSection } from './profile-edit/BasicInfoSection';
import { ContactSection } from './profile-edit/ContactSection';
import { AcademicSection } from './profile-edit/AcademicSection';
import { PreferencesSection } from './profile-edit/PreferencesSection';
import { validateProfileForm } from './profile-edit/ProfileEditValidation';
import { FORM_TABS, VALIDATION_MESSAGES } from './profile-edit/ProfileEditConstants';

interface ProfileEditPageProps {
  profile?: any;
}

export const ProfileEditPage: React.FC<ProfileEditPageProps> = ({ profile }) => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(profile || {});
  const [hasChanges, setHasChanges] = useState(false);
  const [validationResult, setValidationResult] = useState({ isValid: true, errors: [] });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
    
    // Clear validation errors when user starts typing
    if (validationResult.errors.length > 0) {
      setValidationResult({ isValid: true, errors: [] });
    }
  };

  const handleSave = () => {
    const validation = validateProfileForm(formData);
    setValidationResult(validation);
    
    if (validation.isValid) {
      console.log('Saving profile:', formData);
      setHasChanges(false);
      goBack();
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm(VALIDATION_MESSAGES.UNSAVED_CHANGES)) {
        goBack();
      }
    } else {
      goBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleCancel} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
              <p className="text-slate-600">Update your personal and professional information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Validation Errors */}
        {!validationResult.isValid && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Please fix the following errors:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {validationResult.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Changes Indicator */}
        {hasChanges && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">You have unsaved changes</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Form */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20 mb-6">
            {FORM_TABS.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoSection formData={formData} onInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactSection formData={formData} onInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="academic">
            <AcademicSection formData={formData} onInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSection formData={formData} onInputChange={handleInputChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};