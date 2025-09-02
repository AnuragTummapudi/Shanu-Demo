import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Separator } from '../../ui/separator';
import { 
  ArrowLeft,
  Award,
  Plus,
  Trash2,
  Star,
  TrendingUp,
  Target,
  Code,
  Users,
  Globe,
  Zap,
  Brain,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  BarChart3,
  Lightbulb,
  Trophy,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../navigation/NavigationProvider';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'language' | 'design' | 'business';
  verified: boolean;
  endorsements: number;
  trending: boolean;
  certifications: string[];
  projects: string[];
  lastUpdated: string;
}

interface SkillSuggestion {
  name: string;
  category: string;
  reason: string;
  demand: 'high' | 'medium' | 'low';
  relatedTo: string[];
}

const skillSuggestions: SkillSuggestion[] = [
  {
    name: 'TypeScript',
    category: 'technical',
    reason: 'Highly demanded in React development',
    demand: 'high',
    relatedTo: ['React', 'JavaScript']
  },
  {
    name: 'Docker',
    category: 'technical',
    reason: 'Essential for modern deployment',
    demand: 'high',
    relatedTo: ['Node.js', 'AWS']
  },
  {
    name: 'Project Management',
    category: 'soft',
    reason: 'Valuable for leadership roles',
    demand: 'medium',
    relatedTo: ['Leadership', 'Team Work']
  },
  {
    name: 'UI/UX Design',
    category: 'design',
    reason: 'Complements frontend development',
    demand: 'medium',
    relatedTo: ['React', 'Frontend Development']
  }
];

const industryTrends = [
  { skill: 'AI/Machine Learning', growth: 150, category: 'technical' },
  { skill: 'Cloud Computing', growth: 120, category: 'technical' },
  { skill: 'Cybersecurity', growth: 110, category: 'technical' },
  { skill: 'Data Analytics', growth: 95, category: 'technical' },
  { skill: 'Digital Marketing', growth: 85, category: 'business' },
  { skill: 'Agile Methodology', growth: 75, category: 'soft' }
];

const SkillsManagementPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'React',
      level: 85,
      category: 'technical',
      verified: true,
      endorsements: 12,
      trending: true,
      certifications: ['React Developer Certification'],
      projects: ['E-commerce Platform', 'Chat Application'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Leadership',
      level: 92,
      category: 'soft',
      verified: false,
      endorsements: 8,
      trending: false,
      certifications: [],
      projects: ['Team Management', 'Project Leadership'],
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      name: 'Python',
      level: 78,
      category: 'technical',
      verified: true,
      endorsements: 15,
      trending: true,
      certifications: ['Python Developer Certificate'],
      projects: ['ML Model', 'Data Analysis'],
      lastUpdated: '2024-01-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'technical' as const
  });

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category,
      verified: false,
      endorsements: 0,
      trending: false,
      certifications: [],
      projects: [],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setSkills([...skills, skill]);
    setNewSkill({ name: '', level: 50, category: 'technical' });
  };

  const updateSkillLevel = (id: string, level: number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, level, lastUpdated: new Date().toISOString().split('T')[0] } : skill
    ));
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const getSkillLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Beginner';
    return 'Novice';
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-600 bg-green-50';
    if (level >= 70) return 'text-blue-600 bg-blue-50';
    if (level >= 50) return 'text-yellow-600 bg-yellow-50';
    if (level >= 30) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageSkillLevel = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length || 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Skills Management</h1>
                <p className="text-slate-600">Track, develop, and showcase your professional skills</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Trophy className="w-3 h-3 mr-1" />
              {skills.length} Skills Tracked
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Overview & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Skills Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{averageSkillLevel}%</div>
                  <p className="text-sm text-slate-600 mb-3">Average Skill Level</p>
                  <Progress value={averageSkillLevel} className="h-3" />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-800">By Category</h4>
                  {Object.entries(skillsByCategory).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center text-sm">
                      <span className="capitalize text-slate-600">{category}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Verified Skills</span>
                    <span className="font-medium">{skills.filter(s => s.verified).length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total Endorsements</span>
                    <span className="font-medium">{skills.reduce((sum, s) => sum + s.endorsements, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Trending Skills</span>
                    <span className="font-medium">{skills.filter(s => s.trending).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Add Skill */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Add Skill</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    placeholder="e.g., JavaScript"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="skillCategory">Category</Label>
                  <select
                    id="skillCategory"
                    className="w-full p-2 border border-border rounded-md"
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({...newSkill, category: e.target.value as any})}
                  >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skills</option>
                    <option value="language">Language</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="skillLevel">Proficiency Level: {newSkill.level}%</Label>
                  <input
                    id="skillLevel"
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    className="w-full mt-2"
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    {getSkillLevelLabel(newSkill.level)}
                  </div>
                </div>
                
                <Button onClick={addSkill} className="w-full" disabled={!newSkill.name.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardContent>
            </Card>

            {/* Industry Trends */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Industry Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {industryTrends.slice(0, 4).map((trend, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">{trend.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">+{trend.growth}%</span>
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    className="px-3 py-2 border border-border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skills</option>
                    <option value="language">Language</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Skills Suggestions */}
            {showSuggestions && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-green-800">
                    <span className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Skill Suggestions
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setShowSuggestions(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Based on your current skills and industry trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/60 rounded-lg border border-green-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-green-800">{suggestion.name}</h4>
                          <Badge 
                            variant="outline"
                            className={`text-xs ${
                              suggestion.demand === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                              suggestion.demand === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-green-50 text-green-700 border-green-200'
                            }`}
                          >
                            {suggestion.demand} demand
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700 mb-3">{suggestion.reason}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {suggestion.relatedTo.slice(0, 2).map((related, i) => (
                              <span key={i} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                {related}
                              </span>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setNewSkill({...newSkill, name: suggestion.name, category: suggestion.category as any})}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Your Skills ({filteredSkills.length})
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              skill.category === 'technical' ? 'bg-blue-50 text-blue-600' :
                              skill.category === 'soft' ? 'bg-green-50 text-green-600' :
                              skill.category === 'language' ? 'bg-purple-50 text-purple-600' :
                              skill.category === 'design' ? 'bg-pink-50 text-pink-600' :
                              'bg-orange-50 text-orange-600'
                            }`}>
                              {skill.category === 'technical' ? <Code className="w-4 h-4" /> :
                               skill.category === 'soft' ? <Users className="w-4 h-4" /> :
                               skill.category === 'language' ? <Globe className="w-4 h-4" /> :
                               skill.category === 'design' ? <Zap className="w-4 h-4" /> :
                               <Target className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-slate-800">{skill.name}</h3>
                                {skill.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                )}
                                {skill.trending && (
                                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <span className="capitalize">{skill.category}</span>
                                <span>•</span>
                                <span>{skill.endorsements} endorsements</span>
                                <span>•</span>
                                <span>Updated {new Date(skill.lastUpdated).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSkillLevelColor(skill.level)}>
                              {getSkillLevelLabel(skill.level)}
                            </Badge>
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

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-slate-700">Proficiency Level</span>
                              <span className="text-sm font-bold text-slate-800">{skill.level}%</span>
                            </div>
                            <div className="relative">
                              <Progress value={skill.level} className="h-3" />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => updateSkillLevel(skill.id, parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>

                          {(skill.certifications.length > 0 || skill.projects.length > 0) && (
                            <>
                              <Separator />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {skill.certifications.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Certifications</h4>
                                    <div className="space-y-1">
                                      {skill.certifications.map((cert, certIndex) => (
                                        <div key={certIndex} className="flex items-center text-sm text-slate-600">
                                          <Award className="w-3 h-3 mr-2 text-yellow-500" />
                                          {cert}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {skill.projects.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Projects</h4>
                                    <div className="space-y-1">
                                      {skill.projects.map((project, projectIndex) => (
                                        <div key={projectIndex} className="flex items-center text-sm text-slate-600">
                                          <Code className="w-3 h-3 mr-2 text-blue-500" />
                                          {project}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {filteredSkills.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      <Award className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <h3 className="text-lg font-medium mb-2">No skills found</h3>
                      <p className="text-sm">
                        {searchTerm || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filters'
                          : 'Start by adding your first skill above'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsManagementPage;