import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertCircle, CheckCircle, GraduationCap, Award, Calendar, BookOpen, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  cgpa: string;
  maxCgpa: string;
  percentage: string;
  achievements: string[];
  relevantCourses: string[];
  thesis?: string;
  honors?: string;
}

interface EducationSectionProps {
  initialData?: EducationItem[];
  onSave: (data: EducationItem[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const degreeTypes = [
  'Bachelor of Technology (B.Tech)',
  'Bachelor of Engineering (B.E.)',
  'Bachelor of Science (B.Sc)',
  'Bachelor of Computer Applications (BCA)',
  'Master of Technology (M.Tech)',
  'Master of Science (M.Sc)',
  'Master of Computer Applications (MCA)',
  'Bachelor of Commerce (B.Com)',
  'Master of Business Administration (MBA)',
  'Diploma',
  'Other'
];

const fieldOfStudyOptions = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Commerce',
  'Business Administration',
  'Other'
];

const EducationSection: React.FC<EducationSectionProps> = ({
  initialData,
  onSave,
  onNext,
  onPrevious
}) => {
  const [educationList, setEducationList] = useState<EducationItem[]>(
    initialData && initialData.length > 0 ? initialData : [{
      id: '1',
      degree: '',
      fieldOfStudy: '',
      institution: 'SRM Institute of Science and Technology, Andhra Pradesh',
      location: 'Amaravati, Andhra Pradesh, India',
      startDate: '',
      endDate: '',
      currentlyStudying: true,
      cgpa: '',
      maxCgpa: '10.0',
      percentage: '',
      achievements: [],
      relevantCourses: []
    }]
  );

  const [errors, setErrors] = useState<{[key: string]: Partial<EducationItem>}>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateEducationItem = (item: EducationItem) => {
    const itemErrors: Partial<EducationItem> = {};

    if (!item.degree.trim()) {
      itemErrors.degree = 'Degree is required';
    }

    if (!item.fieldOfStudy.trim()) {
      itemErrors.fieldOfStudy = 'Field of study is required';
    }

    if (!item.institution.trim()) {
      itemErrors.institution = 'Institution name is required';
    }

    if (!item.startDate) {
      itemErrors.startDate = 'Start date is required';
    }

    if (!item.currentlyStudying && !item.endDate) {
      itemErrors.endDate = 'End date is required for completed education';
    }

    if (item.cgpa) {
      const cgpa = parseFloat(item.cgpa);
      const maxCgpa = parseFloat(item.maxCgpa) || 10;
      if (cgpa < 0 || cgpa > maxCgpa) {
        itemErrors.cgpa = `CGPA must be between 0 and ${maxCgpa}`;
      }
    }

    if (item.percentage) {
      const percentage = parseFloat(item.percentage);
      if (percentage < 0 || percentage > 100) {
        itemErrors.percentage = 'Percentage must be between 0 and 100';
      }
    }

    return itemErrors;
  };

  const updateEducationItem = (id: string, updates: Partial<EducationItem>) => {
    setEducationList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );

    // Validate the updated item
    const updatedItem = educationList.find(item => item.id === id);
    if (updatedItem) {
      const itemErrors = validateEducationItem({ ...updatedItem, ...updates });
      setErrors(prev => ({
        ...prev,
        [id]: itemErrors
      }));
    }
  };

  const addEducationItem = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      fieldOfStudy: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      cgpa: '',
      maxCgpa: '10.0',
      percentage: '',
      achievements: [],
      relevantCourses: []
    };

    setEducationList([...educationList, newItem]);
  };

  const removeEducationItem = (id: string) => {
    setEducationList(prev => prev.filter(item => item.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const addAchievement = (id: string, achievement: string) => {
    if (achievement.trim()) {
      updateEducationItem(id, {
        achievements: [
          ...(educationList.find(item => item.id === id)?.achievements || []),
          achievement.trim()
        ]
      });
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const item = educationList.find(item => item.id === id);
    if (item) {
      const newAchievements = [...item.achievements];
      newAchievements.splice(index, 1);
      updateEducationItem(id, { achievements: newAchievements });
    }
  };

  const addRelevantCourse = (id: string, course: string) => {
    if (course.trim()) {
      updateEducationItem(id, {
        relevantCourses: [
          ...(educationList.find(item => item.id === id)?.relevantCourses || []),
          course.trim()
        ]
      });
    }
  };

  const removeRelevantCourse = (id: string, index: number) => {
    const item = educationList.find(item => item.id === id);
    if (item) {
      const newCourses = [...item.relevantCourses];
      newCourses.splice(index, 1);
      updateEducationItem(id, { relevantCourses: newCourses });
    }
  };

  const calculateCompletion = () => {
    if (educationList.length === 0) return 0;

    const totalFields = educationList.length * 6; // Required fields per item
    let completedFields = 0;

    educationList.forEach(item => {
      if (item.degree) completedFields++;
      if (item.fieldOfStudy) completedFields++;
      if (item.institution) completedFields++;
      if (item.startDate) completedFields++;
      if (item.currentlyStudying || item.endDate) completedFields++;
      if (item.cgpa || item.percentage) completedFields++;
    });

    return Math.round((completedFields / totalFields) * 100);
  };

  const validateAll = () => {
    let hasErrors = false;
    const newErrors: {[key: string]: Partial<EducationItem>} = {};

    educationList.forEach(item => {
      const itemErrors = validateEducationItem(item);
      if (Object.keys(itemErrors).length > 0) {
        newErrors[item.id] = itemErrors;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors && educationList.length > 0;
  };

  const handleSave = () => {
    setIsValidating(true);
    
    setTimeout(() => {
      if (validateAll()) {
        onSave(educationList);
        onNext();
      }
      setIsValidating(false);
    }, 500);
  };

  const [newAchievement, setNewAchievement] = useState<{[key: string]: string}>({});
  const [newCourse, setNewCourse] = useState<{[key: string]: string}>({});

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Education Details</h2>
            <p className="text-slate-600">Add your academic qualifications and achievements</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600 mb-1">{calculateCompletion()}%</div>
            <div className="text-sm text-slate-600">Complete</div>
          </div>
        </div>
        
        <div className="mt-4 bg-white/50 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateCompletion()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Education Items */}
      <div className="space-y-6">
        {educationList.map((education, index) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    Education {index + 1}
                    {index === 0 && <Badge variant="destructive" className="ml-2">Required</Badge>}
                  </CardTitle>
                  {educationList.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducationItem(education.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardDescription>
                  {index === 0 ? 'Your current or most recent education' : 'Additional qualification'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Education Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`degree-${education.id}`} className="flex items-center">
                      Degree <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select 
                      value={education.degree} 
                      onValueChange={(value) => updateEducationItem(education.id, { degree: value })}
                    >
                      <SelectTrigger className={errors[education.id]?.degree ? 'border-red-500' : education.degree ? 'border-green-500' : ''}>
                        <SelectValue placeholder="Select degree type" />
                      </SelectTrigger>
                      <SelectContent>
                        {degreeTypes.map((degree) => (
                          <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[education.id]?.degree && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.degree}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`fieldOfStudy-${education.id}`} className="flex items-center">
                      Field of Study <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select 
                      value={education.fieldOfStudy} 
                      onValueChange={(value) => updateEducationItem(education.id, { fieldOfStudy: value })}
                    >
                      <SelectTrigger className={errors[education.id]?.fieldOfStudy ? 'border-red-500' : education.fieldOfStudy ? 'border-green-500' : ''}>
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOfStudyOptions.map((field) => (
                          <SelectItem key={field} value={field}>{field}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[education.id]?.fieldOfStudy && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.fieldOfStudy}
                      </div>
                    )}
                  </div>
                </div>

                {/* Institution and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`institution-${education.id}`} className="flex items-center">
                      Institution Name <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id={`institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => updateEducationItem(education.id, { institution: e.target.value })}
                      placeholder="SRM Institute of Science and Technology"
                      className={errors[education.id]?.institution ? 'border-red-500' : education.institution ? 'border-green-500' : ''}
                    />
                    {errors[education.id]?.institution && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.institution}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`location-${education.id}`}>Location</Label>
                    <Input
                      id={`location-${education.id}`}
                      value={education.location}
                      onChange={(e) => updateEducationItem(education.id, { location: e.target.value })}
                      placeholder="Amaravati, Andhra Pradesh, India"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`startDate-${education.id}`} className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Start Date <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id={`startDate-${education.id}`}
                      type="date"
                      value={education.startDate}
                      onChange={(e) => updateEducationItem(education.id, { startDate: e.target.value })}
                      className={errors[education.id]?.startDate ? 'border-red-500' : education.startDate ? 'border-green-500' : ''}
                    />
                    {errors[education.id]?.startDate && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.startDate}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${education.id}`} className="flex items-center">
                      End Date {!education.currentlyStudying && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={`endDate-${education.id}`}
                      type="date"
                      value={education.endDate}
                      onChange={(e) => updateEducationItem(education.id, { endDate: e.target.value })}
                      disabled={education.currentlyStudying}
                      className={
                        !education.currentlyStudying && errors[education.id]?.endDate ? 'border-red-500' : 
                        education.endDate ? 'border-green-500' : 
                        education.currentlyStudying ? 'bg-gray-100' : ''
                      }
                    />
                    {!education.currentlyStudying && errors[education.id]?.endDate && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.endDate}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={education.currentlyStudying}
                        onChange={(e) => updateEducationItem(education.id, { 
                          currentlyStudying: e.target.checked,
                          endDate: e.target.checked ? '' : education.endDate
                        })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Currently studying here</span>
                    </label>
                  </div>
                </div>

                {/* Grades */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`cgpa-${education.id}`}>CGPA</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={`cgpa-${education.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        max={education.maxCgpa}
                        value={education.cgpa}
                        onChange={(e) => updateEducationItem(education.id, { cgpa: e.target.value })}
                        placeholder="8.5"
                        className={errors[education.id]?.cgpa ? 'border-red-500' : education.cgpa ? 'border-green-500' : ''}
                      />
                      <Input
                        type="number"
                        step="0.1"
                        min="1"
                        max="10"
                        value={education.maxCgpa}
                        onChange={(e) => updateEducationItem(education.id, { maxCgpa: e.target.value })}
                        placeholder="10.0"
                        className="w-20"
                      />
                    </div>
                    {errors[education.id]?.cgpa && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.cgpa}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`percentage-${education.id}`}>Percentage (Optional)</Label>
                    <Input
                      id={`percentage-${education.id}`}
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={education.percentage}
                      onChange={(e) => updateEducationItem(education.id, { percentage: e.target.value })}
                      placeholder="85.5"
                      className={errors[education.id]?.percentage ? 'border-red-500' : education.percentage ? 'border-green-500' : ''}
                    />
                    {errors[education.id]?.percentage && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors[education.id]?.percentage}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`honors-${education.id}`}>Honors/Recognition</Label>
                    <Input
                      id={`honors-${education.id}`}
                      value={education.honors || ''}
                      onChange={(e) => updateEducationItem(education.id, { honors: e.target.value })}
                      placeholder="Dean's List, Magna Cum Laude"
                    />
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <Label className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Academic Achievements
                  </Label>
                  <div className="space-y-2">
                    {education.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-2">
                        <div className="flex-1 p-2 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-sm text-green-800">{achievement}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(education.id, achIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input
                        value={newAchievement[education.id] || ''}
                        onChange={(e) => setNewAchievement({...newAchievement, [education.id]: e.target.value})}
                        placeholder="e.g., First in class, Research publication, Scholarship recipient"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addAchievement(education.id, newAchievement[education.id] || '');
                            setNewAchievement({...newAchievement, [education.id]: ''});
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addAchievement(education.id, newAchievement[education.id] || '');
                          setNewAchievement({...newAchievement, [education.id]: ''});
                        }}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Relevant Courses */}
                <div>
                  <Label className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Relevant Courses
                  </Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {education.relevantCourses.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="secondary" className="flex items-center space-x-1">
                          <span>{course}</span>
                          <button
                            onClick={() => removeRelevantCourse(education.id, courseIndex)}
                            className="ml-1 text-slate-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newCourse[education.id] || ''}
                        onChange={(e) => setNewCourse({...newCourse, [education.id]: e.target.value})}
                        placeholder="e.g., Data Structures, Machine Learning, Web Development"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addRelevantCourse(education.id, newCourse[education.id] || '');
                            setNewCourse({...newCourse, [education.id]: ''});
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addRelevantCourse(education.id, newCourse[education.id] || '');
                          setNewCourse({...newCourse, [education.id]: ''});
                        }}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Thesis/Project */}
                {education.degree.includes('Master') && (
                  <div>
                    <Label htmlFor={`thesis-${education.id}`}>Thesis/Major Project</Label>
                    <Textarea
                      id={`thesis-${education.id}`}
                      value={education.thesis || ''}
                      onChange={(e) => updateEducationItem(education.id, { thesis: e.target.value })}
                      placeholder="Brief description of your thesis or major project..."
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add More Education Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Button
          variant="outline"
          onClick={addEducationItem}
          className="border-dashed border-2 border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education
        </Button>
      </motion.div>

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
            {Object.keys(errors).length === 0 && calculateCompletion() >= 80 ? (
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
            disabled={isValidating || Object.keys(errors).length > 0 || educationList.length === 0}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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

export default EducationSection;