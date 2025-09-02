import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

interface ContactSectionProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address *</label>
            <Input 
              type="email"
              value={formData.email || ''} 
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Phone Number *</label>
              <Input 
                value={formData.phone || ''} 
                onChange={(e) => onInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Alternate Phone</label>
              <Input 
                value={formData.alternatePhone || ''} 
                onChange={(e) => onInputChange('alternatePhone', e.target.value)}
                placeholder="Enter alternate phone number"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Permanent Address</label>
            <Textarea 
              value={formData.permanentAddress || ''} 
              onChange={(e) => onInputChange('permanentAddress', e.target.value)}
              placeholder="Enter permanent address"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Current Address</label>
            <Textarea 
              value={formData.currentAddress || ''} 
              onChange={(e) => onInputChange('currentAddress', e.target.value)}
              placeholder="Enter current address"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Emergency Contact</CardTitle>
          <CardDescription>Emergency contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Contact Name</label>
              <Input 
                value={formData.emergencyContactName || ''} 
                onChange={(e) => onInputChange('emergencyContactName', e.target.value)}
                placeholder="Enter contact name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Relationship</label>
              <Input 
                value={formData.emergencyContactRelation || ''} 
                onChange={(e) => onInputChange('emergencyContactRelation', e.target.value)}
                placeholder="e.g., Father, Mother, Spouse"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Phone Number</label>
              <Input 
                value={formData.emergencyContactPhone || ''} 
                onChange={(e) => onInputChange('emergencyContactPhone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
              <Input 
                type="email"
                value={formData.emergencyContactEmail || ''} 
                onChange={(e) => onInputChange('emergencyContactEmail', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};