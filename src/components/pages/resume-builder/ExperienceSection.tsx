import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertCircle, CheckCircle, Briefcase, Building, Calendar, MapPin, ArrowRight, ArrowLeft, Plus, Trash2, Award, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface Experience {
  id: string;
  type: 'internship' | 'full-time' | 'part-time' | 'freelance' | 'volunteer' | 'project';
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  currentPosition: boolean;
  description: string;
  keyResponsibilities: string[];
  achievements: string[];
  technologiesUsed: string[];
  companySize: string;
  industry: string;
  supervisorName?: string;
  supervisorContact?: string;
  learningOutcomes: string[];
}

interface ExperienceSectionProps {
  initialData?: Experience[];
  onSave: (data: Experience[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const experienceTypes = [
  { value: 'internship', label: 'Internship', icon: '🎓' },
  { value: 'full-time', label: 'Full-time Job', icon: '💼' },
  { value: 'part-time', label: 'Part-time Job', icon: '⏰' },
  { value: 'freelance', label: 'Freelance', icon: '💻' },
  { value: 'volunteer', label: 'Volunteer', icon: '🤝' },
  { value: 'project', label: 'Project Work', icon: '🚀' }
];

const companySizes = [
  'Startup (1-50 employees)',
  'Small (51-200 employees)',
  'Medium (201-1000 employees)',
  'Large (1001-5000 employees)',
  'Enterprise (5000+ employees)'
];

const industries = [
  'Technology/Software', 'Financial Services', 'Healthcare', 'Manufacturing',
  'Retail/E-commerce', 'Education', 'Consulting', 'Media/Entertainment',
  'Telecommunications', 'Automotive', 'Energy', 'Government', 'Non-profit', 'Other'
];

const commonResponsibilities = [
  'Developed and maintained software applications',
  'Collaborated with cross-functional teams',
  'Participated in code reviews and testing',
  'Assisted in project planning and execution',
  'Conducted research and analysis',
  'Created technical documentation',
  'Provided technical support to clients',
  'Implemented best practices and quality standards'
];

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  initialData,
  onSave,
  onNext,
  onPrevious
}) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialData && initialData.length > 0 ? initialData : []
  );

  const [errors, setErrors] = useState<{[key: string]: Partial<Experience>}>({});
  const [isValidating, setIsValidating] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState<{[key: string]: string}>({});
  const [newAchievement, setNewAchievement] = useState<{[key: string]: string}>({});
  const [newTechnology, setNewTechnology] = useState<{[key: string]: string}>({});
  const [newLearning, setNewLearning] = useState<{[key: string]: string}>({});

  const validateExperience = (experience: Experience) => {
    const expErrors: Partial<Experience> = {};

    if (!experience.company.trim()) {
      expErrors.company = 'Company name is required';
    }

    if (!experience.position.trim()) {
      expErrors.position = 'Position/role is required';
    }

    if (!experience.startDate) {
      expErrors.startDate = 'Start date is required';
    }

    if (!experience.currentPosition && !experience.endDate) {
      expErrors.endDate = 'End date is required for completed positions';
    }

    if (experience.startDate && experience.endDate && !experience.currentPosition) {
      if (new Date(experience.startDate) > new Date(experience.endDate)) {
        expErrors.endDate = 'End date must be after start date';
      }
    }

    if (!experience.description.trim()) {
      expErrors.description = 'Job description is required';
    } else if (experience.description.trim().length < 50) {
      expErrors.description = 'Description should be at least 50 characters';
    }

    return expErrors;
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      )
    );

    // Validate the updated experience
    const updatedExp = experiences.find(exp => exp.id === id);
    if (updatedExp) {
      const expErrors = validateExperience({ ...updatedExp, ...updates });
      setErrors(prev => ({
        ...prev,
        [id]: expErrors
      }));
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      type: 'internship',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      currentPosition: false,
      description: '',
      keyResponsibilities: [],
      achievements: [],
      technologiesUsed: [],
      companySize: '',
      industry: '',
      learningOutcomes: []
    };

    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const addArrayItem = (
    id: string, 
    field: keyof Experience, 
    value: string,
    setState: React.Dispatch<React.SetStateAction<{[key: string]: string}>>
  ) => {
    if (value.trim()) {
      const experience = experiences.find(exp => exp.id === id);
      if (experience) {
        const currentArray = experience[field] as string[];
        updateExperience(id, {
          [field]: [...currentArray, value.trim()]
        });
        setState(prev => ({ ...prev, [id]: '' }));
      }
    }
  };

  const removeArrayItem = (id: string, field: keyof Experience, index: number) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      const currentArray = experience[field] as string[];
      const newArray = [...currentArray];
      newArray.splice(index, 1);
      updateExperience(id, { [field]: newArray });
    }
  };

  const calculateCompletion = () => {
    if (experiences.length === 0) return 0;

    const totalRequiredFields = experiences.length * 6; // Required fields per experience
    let completedFields = 0;

    experiences.forEach(exp => {
      if (exp.company) completedFields++;
      if (exp.position) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.currentPosition || exp.endDate) completedFields++;
      if (exp.description && exp.description.length >= 50) completedFields++;
      if (exp.keyResponsibilities.length > 0) completedFields++;
    });

    return Math.round((completedFields / totalRequiredFields) * 100);
  };

  const calculateDuration = (startDate: string, endDate: string, isCurrent: boolean) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 1) return '< 1 month';
    if (diffMonths === 1) return '1 month';
    if (diffMonths < 12) return `${diffMonths} months`;
    
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  };

  const validateAll = () => {
    let hasErrors = false;
    const newErrors: {[key: string]: Partial<Experience>} = {};

    experiences.forEach(exp => {
      const expErrors = validateExperience(exp);
      if (Object.keys(expErrors).length > 0) {
        newErrors[exp.id] = expErrors;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSave = () => {
    setIsValidating(true);
    
    setTimeout(() => {
      if (validateAll()) {
        onSave(experiences);
        onNext();
      }
      setIsValidating(false);
    }, 500);
  };

  const getTypeIcon = (type: string) => {
    const typeObj = experienceTypes.find(t => t.value === type);
    return typeObj?.icon || '💼';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Work Experience</h2>
            <p className="text-slate-600">Add your professional experience, internships, and projects</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600 mb-1">{calculateCompletion()}%</div>
            <div className="text-sm text-slate-600">Complete</div>
            <div className="text-xs text-purple-600 mt-1">{experiences.length} experiences added</div>
          </div>
        </div>
        
        <div className="mt-4 bg-white/50 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateCompletion()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Add Experience Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <Button
          onClick={addExperience}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Work Experience
        </Button>
        <p className="text-sm text-slate-600 mt-2">
          Include internships, jobs, freelance work, and significant projects
        </p>
      </motion.div>

      {/* Experience Items */}
      <div className="space-y-6">
        {experiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-500"
          >
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">No experience added yet</h3>
            <p className="text-sm">Click "Add Work Experience" to get started</p>
          </motion.div>
        )}

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-2">{getTypeIcon(experience.type)}</span>
                    Experience {index + 1}
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {experience.type.replace('-', ' ')}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {experience.startDate && (
                      <Badge variant="outline">
                        {calculateDuration(experience.startDate, experience.endDate, experience.currentPosition)}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(experience.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Share details about your role, responsibilities, and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`type-${experience.id}`}>Experience Type</Label>
                    <Select 
                      value={experience.type} 
                      onValueChange={(value) => updateExperience(experience.id, { type: value as Experience['type'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className="flex items-center">
                              <span className="mr-2">{type.icon}</span>
                              {type.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`company-${experience.id}`} className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      Company/Organization <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                      placeholder="e.g., Microsoft India"
                      className={errors[experience.id]?.company ? 'border-red-500' : experience.company ? 'border-green-500' : ''}
                    />
                    {errors[experience.id]?.company && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[experience.id]?.company}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`position-${experience.id}`} className="flex items-center">
                      Position/Role <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id={`position-${experience.id}`}
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                      placeholder="e.g., Software Development Intern"
                      className={errors[experience.id]?.position ? 'border-red-500' : experience.position ? 'border-green-500' : ''}
                    />
                    {errors[experience.id]?.position && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[experience.id]?.position}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`location-${experience.id}`} className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </Label>
                    <Input
                      id={`location-${experience.id}`}
                      value={experience.location}
                      onChange={(e) => updateExperience(experience.id, { location: e.target.value })}
                      placeholder="Hyderabad, India"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`startDate-${experience.id}`} className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Start Date <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                      className={errors[experience.id]?.startDate ? 'border-red-500' : experience.startDate ? 'border-green-500' : ''}
                    />
                    {errors[experience.id]?.startDate && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[experience.id]?.startDate}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${experience.id}`} className="flex items-center">
                      End Date {!experience.currentPosition && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={`endDate-${experience.id}`}
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                      disabled={experience.currentPosition}
                      className={
                        !experience.currentPosition && errors[experience.id]?.endDate ? 'border-red-500' : 
                        experience.endDate ? 'border-green-500' : 
                        experience.currentPosition ? 'bg-gray-100' : ''
                      }
                    />
                    {!experience.currentPosition && errors[experience.id]?.endDate && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[experience.id]?.endDate}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={experience.currentPosition}
                        onChange={(e) => updateExperience(experience.id, { 
                          currentPosition: e.target.checked,
                          endDate: e.target.checked ? '' : experience.endDate
                        })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Current position</span>
                    </label>
                  </div>
                </div>

                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`companySize-${experience.id}`}>Company Size</Label>
                    <Select 
                      value={experience.companySize} 
                      onValueChange={(value) => updateExperience(experience.id, { companySize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`industry-${experience.id}`}>Industry</Label>
                    <Select 
                      value={experience.industry} 
                      onValueChange={(value) => updateExperience(experience.id, { industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <Label htmlFor={`description-${experience.id}`} className="flex items-center justify-between">
                    <span className="flex items-center">
                      Job Description <span className="text-red-500 ml-1">*</span>
                    </span>
                    <span className="text-xs text-slate-500">
                      {experience.description.length} characters
                    </span>
                  </Label>
                  <Textarea
                    id={`description-${experience.id}`}
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                    placeholder="Provide a brief overview of your role, the team you worked with, and the company/department you worked in..."
                    rows={3}
                    className={errors[experience.id]?.description ? 'border-red-500' : experience.description && experience.description.length >= 50 ? 'border-green-500' : ''}
                  />
                  {errors[experience.id]?.description && (
                    <div className="flex items-center text-red-600 text-sm mt-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors[experience.id]?.description}
                    </div>
                  )}
                  {experience.description && experience.description.length >= 50 && !errors[experience.id]?.description && (
                    <div className="flex items-center text-green-600 text-sm mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Good description length!
                    </div>
                  )}
                </div>

                {/* Key Responsibilities */}
                <div>
                  <Label className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Key Responsibilities
                  </Label>
                  <div className="space-y-2">
                    {experience.keyResponsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex items-start space-x-2">
                        <div className="flex-1 p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="text-sm text-blue-800">• {responsibility}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem(experience.id, 'keyResponsibilities', respIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Suggested Responsibilities */}
                    {experience.keyResponsibilities.length < 3 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600 mb-2">💡 Suggested responsibilities (click to add):</p>
                        <div className="flex flex-wrap gap-2">
                          {commonResponsibilities
                            .filter(resp => !experience.keyResponsibilities.includes(resp))
                            .slice(0, 4)
                            .map((responsibility) => (
                              <Button
                                key={responsibility}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  updateExperience(experience.id, {
                                    keyResponsibilities: [...experience.keyResponsibilities, responsibility]
                                  });
                                }}
                                className="text-xs border-dashed"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {responsibility.substring(0, 30)}...
                              </Button>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Input
                        value={newResponsibility[experience.id] || ''}
                        onChange={(e) => setNewResponsibility({...newResponsibility, [experience.id]: e.target.value})}
                        placeholder="e.g., Developed REST APIs using Node.js and Express"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem(experience.id, 'keyResponsibilities', newResponsibility[experience.id] || '', setNewResponsibility);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addArrayItem(experience.id, 'keyResponsibilities', newResponsibility[experience.id] || '', setNewResponsibility)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <Label className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Key Achievements & Impact
                  </Label>
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-2">
                        <div className="flex-1 p-2 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-sm text-green-800">🏆 {achievement}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem(experience.id, 'achievements', achIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input
                        value={newAchievement[experience.id] || ''}
                        onChange={(e) => setNewAchievement({...newAchievement, [experience.id]: e.target.value})}
                        placeholder="e.g., Improved application performance by 40% through code optimization"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem(experience.id, 'achievements', newAchievement[experience.id] || '', setNewAchievement);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addArrayItem(experience.id, 'achievements', newAchievement[experience.id] || '', setNewAchievement)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500">
                      💡 Use numbers and metrics where possible (e.g., "increased efficiency by 25%", "reduced bugs by 50%")
                    </p>
                  </div>
                </div>

                {/* Technologies Used */}
                <div>
                  <Label>Technologies/Tools Used</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {experience.technologiesUsed.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="flex items-center space-x-1">
                          <span>{tech}</span>
                          <button
                            onClick={() => removeArrayItem(experience.id, 'technologiesUsed', techIndex)}
                            className="ml-1 text-slate-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newTechnology[experience.id] || ''}
                        onChange={(e) => setNewTechnology({...newTechnology, [experience.id]: e.target.value})}
                        placeholder="e.g., React, Node.js, MongoDB, AWS"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem(experience.id, 'technologiesUsed', newTechnology[experience.id] || '', setNewTechnology);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addArrayItem(experience.id, 'technologiesUsed', newTechnology[experience.id] || '', setNewTechnology)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <Label>Key Learning Outcomes</Label>
                  <div className="space-y-2">
                    {experience.learningOutcomes.map((learning, learningIndex) => (
                      <div key={learningIndex} className="flex items-start space-x-2">
                        <div className="flex-1 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                          <span className="text-sm text-yellow-800">📚 {learning}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem(experience.id, 'learningOutcomes', learningIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input
                        value={newLearning[experience.id] || ''}
                        onChange={(e) => setNewLearning({...newLearning, [experience.id]: e.target.value})}
                        placeholder="e.g., Gained expertise in agile development methodologies"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem(experience.id, 'learningOutcomes', newLearning[experience.id] || '', setNewLearning);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addArrayItem(experience.id, 'learningOutcomes', newLearning[experience.id] || '', setNewLearning)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Supervisor Details (Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`supervisorName-${experience.id}`}>Supervisor/Manager Name</Label>
                    <Input
                      id={`supervisorName-${experience.id}`}
                      value={experience.supervisorName || ''}
                      onChange={(e) => updateExperience(experience.id, { supervisorName: e.target.value })}
                      placeholder="John Smith"
                    />
                    <p className="text-xs text-slate-500 mt-1">Optional - for reference purposes</p>
                  </div>

                  <div>
                    <Label htmlFor={`supervisorContact-${experience.id}`}>Supervisor Contact</Label>
                    <Input
                      id={`supervisorContact-${experience.id}`}
                      value={experience.supervisorContact || ''}
                      onChange={(e) => updateExperience(experience.id, { supervisorContact: e.target.value })}
                      placeholder="john.smith@company.com"
                    />
                    <p className="text-xs text-slate-500 mt-1">Email or LinkedIn profile</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center pt-6"
      >
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-600">
            {Object.keys(errors).length === 0 ? (
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                {experiences.length > 0 ? 'Ready to proceed' : 'You can skip this section'}
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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

export default ExperienceSection;