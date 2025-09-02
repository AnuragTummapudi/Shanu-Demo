import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Building, Save, Upload, Globe, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

export const CompanyAddPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    tier: '',
    establishedYear: '',
    employeeCount: '',
    description: '',
    hrContactName: '',
    hrContactEmail: '',
    hrContactPhone: '',
    specialization: '',
    partnershipType: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['name', 'industry', 'location', 'email', 'tier'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Simulate saving
    alert(`Company "${formData.name}" has been successfully added to the database!`);
    goBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Add New Company</h1>
              <p className="text-slate-600">Register a new company for campus recruitment</p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Company
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Company Information</CardTitle>
                <CardDescription>Enter the basic details of the company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company Name *</label>
                    <Input
                      placeholder="Enter company name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Industry *</label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT Services">IT Services</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Banking">Banking & Finance</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Telecom">Telecommunications</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Location *</label>
                    <Input
                      placeholder="City, State, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company Tier *</label>
                    <Select value={formData.tier} onValueChange={(value) => handleInputChange('tier', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tier 1">Tier 1 (Top-tier MNCs)</SelectItem>
                        <SelectItem value="Tier 2">Tier 2 (Established companies)</SelectItem>
                        <SelectItem value="Tier 3">Tier 3 (Growing companies)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Established Year</label>
                    <Input
                      type="number"
                      placeholder="e.g. 1995"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Employee Count</label>
                    <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-1000">201-1000</SelectItem>
                        <SelectItem value="1001-5000">1001-5000</SelectItem>
                        <SelectItem value="5001-10000">5001-10000</SelectItem>
                        <SelectItem value="10000+">10000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Website</label>
                      <Input
                        placeholder="www.company.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email *</label>
                      <Input
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone</label>
                    <Input
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* HR Contact */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800">HR Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">HR Contact Name</label>
                      <Input
                        placeholder="HR representative name"
                        value={formData.hrContactName}
                        onChange={(e) => handleInputChange('hrContactName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">HR Email</label>
                      <Input
                        type="email"
                        placeholder="hr@company.com"
                        value={formData.hrContactEmail}
                        onChange={(e) => handleInputChange('hrContactEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">HR Phone</label>
                    <Input
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.hrContactPhone}
                      onChange={(e) => handleInputChange('hrContactPhone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800">Additional Information</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company Description</label>
                    <Textarea
                      placeholder="Brief description of the company, its services, and culture..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Specialization</label>
                      <Input
                        placeholder="e.g. Cloud Computing, AI/ML, Web Development"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Partnership Type</label>
                      <Select value={formData.partnershipType} onValueChange={(value) => handleInputChange('partnershipType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Campus Recruitment">Campus Recruitment</SelectItem>
                          <SelectItem value="Internship Program">Internship Program</SelectItem>
                          <SelectItem value="Training Partner">Training Partner</SelectItem>
                          <SelectItem value="MOU Partner">MOU Partner</SelectItem>
                          <SelectItem value="Research Collaboration">Research Collaboration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-6">
              <CardHeader>
                <CardTitle className="text-slate-800">Company Preview</CardTitle>
                <CardDescription>How this company will appear in the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800">
                    {formData.name || 'Company Name'}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {formData.industry || 'Industry'}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  {formData.location && (
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {formData.location}
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Globe className="w-4 h-4 mr-2" />
                      {formData.website}
                    </div>
                  )}
                  {formData.email && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {formData.email}
                    </div>
                  )}
                  {formData.phone && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {formData.phone}
                    </div>
                  )}
                </div>

                {formData.tier && (
                  <div className="pt-4 border-t border-slate-200">
                    <div className="inline-flex px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {formData.tier}
                    </div>
                  </div>
                )}

                <div className="text-center pt-4">
                  <p className="text-xs text-slate-500">
                    * Required fields must be filled before saving
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};