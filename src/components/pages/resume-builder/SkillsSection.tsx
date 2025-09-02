import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Slider } from '../../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertCircle, CheckCircle, Code, Brain, Languages, ArrowRight, ArrowLeft, Plus, Trash2, Zap, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'programming' | 'frameworks' | 'tools' | 'soft' | 'languages';
  proficiency: number; // 1-5 scale
  yearsOfExperience: number;
  validated: boolean;
  certifications: string[];
}

interface SkillsData {
  skills: Skill[];
  skillCategories: string[];
  strengths: string[];
  skillAssessment: {
    overallScore: number;
    categoryScores: {[key: string]: number};
  };
}

interface SkillsSectionProps {
  initialData?: Partial<SkillsData>;
  onSave: (data: SkillsData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const skillSuggestions = {
  technical: [
    'Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management',
    'Software Engineering', 'System Design', 'Operating Systems', 'Computer Networks',
    'Information Security', 'Cloud Computing', 'Machine Learning', 'Artificial Intelligence',
    'Data Analytics', 'Mobile App Development', 'Web Development'
  ],
  programming: [
    'Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'R', 'MATLAB', 'SQL', 'HTML/CSS'
  ],
  frameworks: [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Spring Boot',
    'Django', 'Flask', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'Flutter',
    'React Native', 'Bootstrap', 'Tailwind CSS'
  ],
  tools: [
    'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud',
    'Jenkins', 'Jira', 'Confluence', 'Postman', 'VS Code', 'IntelliJ IDEA',
    'Eclipse', 'Android Studio', 'Xcode', 'Figma', 'Adobe Creative Suite'
  ],
  soft: [
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Project Management', 'Time Management', 'Adaptability', 'Creativity',
    'Public Speaking', 'Negotiation', 'Mentoring', 'Analytical Thinking'
  ],
  languages: [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali',
    'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Spanish', 'French', 'German'
  ]
};

const proficiencyLevels = [
  { value: 1, label: 'Beginner', description: 'Basic understanding' },
  { value: 2, label: 'Novice', description: 'Some experience' },
  { value: 3, label: 'Intermediate', description: 'Good working knowledge' },
  { value: 4, label: 'Advanced', description: 'Highly proficient' },
  { value: 5, label: 'Expert', description: 'Industry expert level' }
];

const SkillsSection: React.FC<SkillsSectionProps> = ({
  initialData,
  onSave,
  onNext,
  onPrevious
}) => {
  const [skillsData, setSkillsData] = useState<SkillsData>({
    skills: initialData?.skills || [],
    skillCategories: initialData?.skillCategories || [],
    strengths: initialData?.strengths || [],
    skillAssessment: initialData?.skillAssessment || {
      overallScore: 0,
      categoryScores: {}
    }
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValidating, setIsValidating] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<string>('technical');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const addSkill = (name: string, category: keyof typeof skillSuggestions) => {
    if (!name.trim()) return;

    const existingSkill = skillsData.skills.find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    );

    if (existingSkill) {
      setErrors({ ...errors, newSkill: 'Skill already added' });
      return;
    }

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      proficiency: 3,
      yearsOfExperience: 1,
      validated: false,
      certifications: []
    };

    setSkillsData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));

    setNewSkillName('');
    setErrors({ ...errors, newSkill: '' });
  };

  const removeSkill = (id: string) => {
    setSkillsData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkillsData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, ...updates } : skill
      )
    }));
  };

  const addSuggestedSkill = (name: string, category: keyof typeof skillSuggestions) => {
    addSkill(name, category);
  };

  const calculateSkillScore = (skill: Skill) => {
    const proficiencyScore = (skill.proficiency / 5) * 60;
    const experienceScore = Math.min(skill.yearsOfExperience * 5, 25);
    const validationScore = skill.validated ? 10 : 0;
    const certificationScore = Math.min(skill.certifications.length * 5, 5);
    
    return proficiencyScore + experienceScore + validationScore + certificationScore;
  };

  const calculateCategoryScore = (category: string) => {
    const categorySkills = skillsData.skills.filter(skill => skill.category === category);
    if (categorySkills.length === 0) return 0;
    
    const totalScore = categorySkills.reduce((sum, skill) => sum + calculateSkillScore(skill), 0);
    return Math.round(totalScore / categorySkills.length);
  };

  const calculateOverallScore = () => {
    if (skillsData.skills.length === 0) return 0;
    
    const totalScore = skillsData.skills.reduce((sum, skill) => sum + calculateSkillScore(skill), 0);
    return Math.round(totalScore / skillsData.skills.length);
  };

  const calculateCompletion = () => {
    const minSkillsRequired = 5;
    const hasMinimumSkills = skillsData.skills.length >= minSkillsRequired;
    const hasVariedCategories = new Set(skillsData.skills.map(s => s.category)).size >= 3;
    
    let completion = 0;
    
    // Basic skills added (50%)
    completion += Math.min(skillsData.skills.length / minSkillsRequired, 1) * 50;
    
    // Category variety (25%)
    if (hasVariedCategories) completion += 25;
    
    // Skill proficiency details (25%)
    const skillsWithDetails = skillsData.skills.filter(s => s.yearsOfExperience > 0);
    completion += (skillsWithDetails.length / Math.max(skillsData.skills.length, 1)) * 25;
    
    return Math.round(completion);
  };

  const validateAll = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (skillsData.skills.length < 3) {
      newErrors.general = 'Please add at least 3 skills';
    }
    
    const categories = new Set(skillsData.skills.map(s => s.category));
    if (categories.size < 2) {
      newErrors.variety = 'Please add skills from at least 2 different categories';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setIsValidating(true);
    
    setTimeout(() => {
      if (validateAll()) {
        const updatedData = {
          ...skillsData,
          skillAssessment: {
            overallScore: calculateOverallScore(),
            categoryScores: {
              technical: calculateCategoryScore('technical'),
              programming: calculateCategoryScore('programming'),
              frameworks: calculateCategoryScore('frameworks'),
              tools: calculateCategoryScore('tools'),
              soft: calculateCategoryScore('soft'),
              languages: calculateCategoryScore('languages')
            }
          }
        };
        
        onSave(updatedData);
        onNext();
      }
      setIsValidating(false);
    }, 500);
  };

  const getSkillsByCategory = (category: string) => {
    return skillsData.skills.filter(skill => skill.category === category);
  };

  const getProficiencyColor = (level: number) => {
    const colors = {
      1: 'bg-red-100 text-red-800 border-red-200',
      2: 'bg-orange-100 text-orange-800 border-orange-200',
      3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      4: 'bg-blue-100 text-blue-800 border-blue-200',
      5: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[level as keyof typeof colors] || colors[3];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Skills & Competencies</h2>
            <p className="text-slate-600">Showcase your technical abilities and soft skills</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600 mb-1">{calculateCompletion()}%</div>
            <div className="text-sm text-slate-600">Complete</div>
            <div className="text-xs text-green-600 mt-1">
              Overall Score: {calculateOverallScore()}/100
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-white/50 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateCompletion()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Skill Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{skillsData.skills.length}</div>
            <div className="text-sm text-slate-600">Total Skills</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {new Set(skillsData.skills.map(s => s.category)).size}
            </div>
            <div className="text-sm text-slate-600">Skill Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {skillsData.skills.filter(s => s.proficiency >= 4).length}
            </div>
            <div className="text-sm text-slate-600">Advanced+ Skills</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add New Skill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Add New Skill
            </CardTitle>
            <CardDescription>
              Add skills that are relevant to your career goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="newSkillName">Skill Name</Label>
                <Input
                  id="newSkillName"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., React, Python, Leadership"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(newSkillName, newSkillCategory as keyof typeof skillSuggestions);
                    }
                  }}
                />
                {errors.newSkill && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.newSkill}
                  </div>
                )}
              </div>

              <div>
                <Label>Category</Label>
                <Select value={newSkillCategory} onValueChange={setNewSkillCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="frameworks">Frameworks</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="soft">Soft Skills</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={() => addSkill(newSkillName, newSkillCategory as keyof typeof skillSuggestions)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            {/* Error Messages */}
            {errors.general && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.general}
              </div>
            )}
            {errors.variety && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.variety}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Suggestions */}
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Suggested Skills
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSuggestions(false)}
                >
                  Hide
                </Button>
              </div>
              <CardDescription>
                Popular skills in your field - click to add
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(skillSuggestions).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-medium text-slate-800 mb-2 capitalize flex items-center">
                    {category === 'technical' && <Code className="w-4 h-4 mr-1" />}
                    {category === 'soft' && <Brain className="w-4 h-4 mr-1" />}
                    {category === 'languages' && <Languages className="w-4 h-4 mr-1" />}
                    {category} Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(skill => !skillsData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase()))
                      .slice(0, 8)
                      .map((skill) => (
                        <Button
                          key={skill}
                          variant="outline"
                          size="sm"
                          onClick={() => addSuggestedSkill(skill, category as keyof typeof skillSuggestions)}
                          className="text-xs border-dashed hover:border-solid"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {skill}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Skills by Category */}
      {Object.entries(skillSuggestions).map(([category, _]) => {
        const categorySkills = getSkillsByCategory(category);
        if (categorySkills.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize flex items-center">
                    {category === 'technical' && <Code className="w-5 h-5 mr-2 text-blue-600" />}
                    {category === 'programming' && <Code className="w-5 h-5 mr-2 text-green-600" />}
                    {category === 'soft' && <Brain className="w-5 h-5 mr-2 text-purple-600" />}
                    {category === 'languages' && <Languages className="w-5 h-5 mr-2 text-orange-600" />}
                    {category} Skills
                  </span>
                  <Badge variant="secondary">
                    Score: {calculateCategoryScore(category)}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-slate-200 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-slate-800">{skill.name}</h4>
                        <Badge className={getProficiencyColor(skill.proficiency)}>
                          {proficiencyLevels.find(level => level.value === skill.proficiency)?.label}
                        </Badge>
                        {skill.validated && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500">Score: {Math.round(calculateSkillScore(skill))}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">Proficiency Level</Label>
                        <Select 
                          value={skill.proficiency.toString()} 
                          onValueChange={(value) => updateSkill(skill.id, { proficiency: parseInt(value) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {proficiencyLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value.toString()}>
                                <div className="flex items-center space-x-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < level.value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span>{level.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`experience-${skill.id}`} className="text-xs">
                          Years of Experience
                        </Label>
                        <Input
                          id={`experience-${skill.id}`}
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          value={skill.yearsOfExperience}
                          onChange={(e) => updateSkill(skill.id, { 
                            yearsOfExperience: parseFloat(e.target.value) || 0 
                          })}
                          className="text-sm"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={skill.validated}
                            onChange={(e) => updateSkill(skill.id, { validated: e.target.checked })}
                            className="rounded border-gray-300"
                          />
                          <span className="text-xs">Validated/Certified</span>
                        </label>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculateSkillScore(skill)}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

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
            {Object.keys(errors).length === 0 && skillsData.skills.length >= 3 ? (
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Ready to proceed
              </span>
            ) : (
              <span className="text-amber-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Add at least 3 skills from 2+ categories
              </span>
            )}
          </div>

          <Button 
            onClick={handleSave}
            disabled={isValidating || Object.keys(errors).length > 0}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
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

export default SkillsSection;