import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { AlertCircle, CheckCircle, Phone, Mail, MapPin, Linkedin, Github, Globe, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  careerObjective: string;
  summary: string;
  dateOfBirth: string;
  nationality: string;
  languages: string[];
}

interface PersonalInfoSectionProps {
  initialData?: Partial<PersonalInfo>;
  onSave: (data: PersonalInfo) => void;
  onNext: () => void;
  onPrevious?: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  initialData,
  onSave,
  onNext,
  onPrevious
}) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    linkedin: initialData?.linkedin || '',
    github: initialData?.github || '',
    portfolio: initialData?.portfolio || '',
    careerObjective: initialData?.careerObjective || '',
    summary: initialData?.summary || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    nationality: initialData?.nationality || 'Indian',
    languages: initialData?.languages || ['English']
  });

  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = (field: keyof PersonalInfo, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[field] = 'This field is required';
        } else if (value.trim().length < 2) {
          newErrors[field] = 'Must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors[field] = 'Only letters and spaces allowed';
        } else {
          delete newErrors[field];
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors[field] = 'Email is required';
        } else if (!value.includes('@srmap.edu.in')) {
          newErrors[field] = 'Please use your university email (@srmap.edu.in)';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field] = 'Please enter a valid email address';
        } else {
          delete newErrors[field];
        }
        break;

      case 'phone':
        if (!value.trim()) {
          newErrors[field] = 'Phone number is required';
        } else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(value)) {
          newErrors[field] = 'Please enter a valid phone number';
        } else {
          delete newErrors[field];
        }
        break;

      case 'linkedin':
        if (value && !value.includes('linkedin.com')) {
          newErrors[field] = 'Please enter a valid LinkedIn URL';
        } else {
          delete newErrors[field];
        }
        break;

      case 'github':
        if (value && !value.includes('github.com')) {
          newErrors[field] = 'Please enter a valid GitHub URL';
        } else {
          delete newErrors[field];
        }
        break;

      case 'careerObjective':
        if (!value.trim()) {
          newErrors[field] = 'Career objective is required';
        } else if (value.trim().length < 50) {
          newErrors[field] = 'Career objective should be at least 50 characters';
        } else if (value.trim().length > 300) {
          newErrors[field] = 'Career objective should not exceed 300 characters';
        } else {
          delete newErrors[field];
        }
        break;

      default:
        delete newErrors[field];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleLanguageAdd = (language: string) => {
    if (language && !formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, language]
      });
    }
  };

  const handleLanguageRemove = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang !== language)
    });
  };

  const validateAll = () => {
    const requiredFields: (keyof PersonalInfo)[] = [
      'firstName', 'lastName', 'email', 'phone', 'careerObjective'
    ];
    
    let isValid = true;
    const newErrors: Partial<PersonalInfo> = {};

    requiredFields.forEach(field => {
      if (!validateField(field, formData[field] as string)) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    setIsValidating(true);
    
    setTimeout(() => {
      if (validateAll()) {
        onSave(formData);
        onNext();
      }
      setIsValidating(false);
    }, 500);
  };

  const completionPercentage = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'careerObjective'];
    const optionalFields = ['location', 'linkedin', 'github', 'summary'];
    
    const requiredCompleted = requiredFields.filter(field => 
      formData[field as keyof PersonalInfo] && 
      String(formData[field as keyof PersonalInfo]).trim()
    ).length;
    
    const optionalCompleted = optionalFields.filter(field => 
      formData[field as keyof PersonalInfo] && 
      String(formData[field as keyof PersonalInfo]).trim()
    ).length;
    
    return Math.round(((requiredCompleted * 2) + optionalCompleted) / (requiredFields.length * 2 + optionalFields.length) * 100);
  };

  const suggestedLanguages = ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Personal Information</h2>
            <p className="text-slate-600">Let's start with your basic details and contact information</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{completionPercentage()}%</div>
            <div className="text-sm text-slate-600">Complete</div>
          </div>
        </div>
        
        <div className="mt-4 bg-white/50 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-indigo-600" />
              Basic Information
              <Badge variant="destructive" className="ml-2">Required</Badge>
            </CardTitle>
            <CardDescription>
              Your fundamental contact details that employers need to reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="flex items-center">
                  First Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="e.g., Rajesh"
                  className={errors.firstName ? 'border-red-500' : formData.firstName ? 'border-green-500' : ''}
                />
                {errors.firstName && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.firstName}
                  </div>
                )}
                {formData.firstName && !errors.firstName && (
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Looks good!
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="flex items-center">
                  Last Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="e.g., Kumar"
                  className={errors.lastName ? 'border-red-500' : formData.lastName ? 'border-green-500' : ''}
                />
                {errors.lastName && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.lastName}
                  </div>
                )}
                {formData.lastName && !errors.lastName && (
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Looks good!
                  </div>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email Address <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="rajesh.kumar@srmap.edu.in"
                  className={errors.email ? 'border-red-500' : formData.email && !errors.email ? 'border-green-500' : ''}
                />
                {errors.email && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </div>
                )}
                {formData.email && !errors.email && (
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    University email verified!
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? 'border-red-500' : formData.phone && !errors.phone ? 'border-green-500' : ''}
                />
                {errors.phone && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </div>
                )}
                {formData.phone && !errors.phone && (
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Valid phone number!
                  </div>
                )}
              </div>
            </div>

            {/* Location and DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Chennai, Tamil Nadu, India"
                />
                <p className="text-xs text-slate-500 mt-1">Your current city and state</p>
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Professional Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              Professional Links
              <Badge variant="secondary" className="ml-2">Recommended</Badge>
            </CardTitle>
            <CardDescription>
              Your online presence helps employers learn more about your work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedin" className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-1 text-blue-600" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/rajesh-kumar"
                  className={errors.linkedin ? 'border-red-500' : formData.linkedin && !errors.linkedin ? 'border-green-500' : ''}
                />
                {errors.linkedin && (
                  <div className="flex items-center text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.linkedin}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="github" className="flex items-center">
                  <Github className="w-4 h-4 mr-1" />
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/rajeshkumar"
                  className={errors.github ? 'border-red-500' : formData.github && !errors.github ? 'border-green-500' : ''}
                />
                {errors.github && (
                  <div className="flex items-center text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.github}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio Website</Label>
                <Input
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  placeholder="https://rajeshkumar.dev"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Objective */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Career Objective
              <Badge variant="destructive" className="ml-2">Required</Badge>
            </CardTitle>
            <CardDescription>
              A compelling summary of your career goals and what you offer to employers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="careerObjective" className="flex items-center justify-between">
                <span className="flex items-center">
                  Career Objective <span className="text-red-500 ml-1">*</span>
                </span>
                <span className="text-xs text-slate-500">
                  {formData.careerObjective.length}/300 characters
                </span>
              </Label>
              <Textarea
                id="careerObjective"
                value={formData.careerObjective}
                onChange={(e) => handleInputChange('careerObjective', e.target.value)}
                placeholder="Aspiring Software Engineer with strong foundation in Computer Science, seeking opportunities to apply technical skills in developing innovative solutions. Passionate about full-stack development and eager to contribute to dynamic technology teams while continuously learning emerging technologies."
                rows={4}
                maxLength={300}
                className={errors.careerObjective ? 'border-red-500' : formData.careerObjective && !errors.careerObjective ? 'border-green-500' : ''}
              />
              {errors.careerObjective && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.careerObjective}
                </div>
              )}
              {formData.careerObjective && !errors.careerObjective && formData.careerObjective.length >= 50 && (
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Excellent objective statement!
                </div>
              )}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <p className="text-sm text-blue-800 font-medium mb-1">💡 Tips for a great objective:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Mention your field of study and career aspirations</li>
                  <li>• Highlight 2-3 key skills or strengths</li>
                  <li>• Express enthusiasm for learning and growth</li>
                  <li>• Keep it between 50-150 words</li>
                </ul>
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Professional Summary (Optional)</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="A brief summary of your background, achievements, and key qualifications..."
                rows={3}
              />
              <p className="text-xs text-slate-500 mt-1">
                Use this for a more detailed professional summary if needed
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Languages you can speak, read, or write</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{language}</span>
                  {language !== 'English' && (
                    <button
                      onClick={() => handleLanguageRemove(language)}
                      className="ml-1 text-slate-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <p className="text-sm text-slate-600 w-full">Suggested languages:</p>
              {suggestedLanguages.filter(lang => !formData.languages.includes(lang)).map((language) => (
                <Button
                  key={language}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLanguageAdd(language)}
                  className="text-xs"
                >
                  <span className="mr-1">+</span>
                  {language}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center pt-6"
      >
        <div>
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-600">
            {Object.keys(errors).length === 0 && completionPercentage() >= 80 ? (
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Ready to proceed
              </span>
            ) : (
              <span className="text-amber-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Complete required fields
              </span>
            )}
          </div>

          <Button 
            onClick={handleSave}
            disabled={isValidating || Object.keys(errors).length > 0}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Validating...
              </>
            ) : (
              <>
                Save & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalInfoSection;