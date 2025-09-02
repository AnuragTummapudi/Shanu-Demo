import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  User, 
  FileText, 
  Award, 
  Briefcase, 
  Code, 
  GraduationCap,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Clock,
  BookOpen,
  Trophy,
  Zap,
  Download,
  Eye,
  Edit,
  PlusCircle,
  LineChart
} from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useNavigation } from '../navigation/NavigationProvider';
import { toast } from 'sonner';

interface StudentResumeProfilingProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
}

interface ResumeSection {
  id: string;
  name: string;
  status: 'complete' | 'partial' | 'missing';
  score: number;
  maxScore: number;
  icon: any;
  description: string;
  suggestions: string[];
}

interface WeeklyTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedTime: string;
  completed: boolean;
  dueDate: string;
  points: number;
}

interface SkillAssessment {
  category: string;
  currentLevel: number;
  targetLevel: number;
  improvementTasks: string[];
}

const StudentResumeProfiling: React.FC<StudentResumeProfilingProps> = ({ user }) => {
  const { navigateTo } = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Resume Analysis Data
  const resumeSections: ResumeSection[] = [
    {
      id: 'personal',
      name: 'Personal Information',
      status: 'complete',
      score: 95,
      maxScore: 100,
      icon: User,
      description: 'Basic contact information and professional summary',
      suggestions: ['Add professional LinkedIn URL', 'Update contact phone number']
    },
    {
      id: 'education',
      name: 'Educational Background',
      status: 'complete',
      score: 88,
      maxScore: 100,
      icon: GraduationCap,
      description: 'Academic qualifications and achievements',
      suggestions: ['Add relevant coursework', 'Include academic projects']
    },
    {
      id: 'projects',
      name: 'Projects & Portfolio',
      status: 'partial',
      score: 65,
      maxScore: 100,
      icon: Code,
      description: 'Technical projects and portfolio showcase',
      suggestions: ['Add 2-3 more projects', 'Include project GitHub links', 'Add project impact metrics']
    },
    {
      id: 'experience',
      name: 'Work Experience',
      status: 'partial',
      score: 45,
      maxScore: 100,
      icon: Briefcase,
      description: 'Internships, jobs, and professional experience',
      suggestions: ['Add internship details', 'Include freelance work', 'Quantify achievements with numbers']
    },
    {
      id: 'skills',
      name: 'Technical Skills',
      status: 'partial',
      score: 70,
      maxScore: 100,
      icon: Award,
      description: 'Programming languages, tools, and technologies',
      suggestions: ['Organize skills by proficiency level', 'Add emerging technologies', 'Include certifications']
    },
    {
      id: 'achievements',
      name: 'Achievements & Awards',
      status: 'missing',
      score: 20,
      maxScore: 100,
      icon: Trophy,
      description: 'Awards, recognitions, and notable accomplishments',
      suggestions: ['Add academic achievements', 'Include competition participations', 'List certifications and courses']
    }
  ];

  // Weekly Tasks Data
  const weeklyTasks: WeeklyTask[] = [
    {
      id: 'task1',
      title: 'Complete GitHub Profile Optimization',
      description: 'Add professional README, pin important repositories, and ensure all projects have proper documentation.',
      priority: 'high',
      category: 'Projects',
      estimatedTime: '2-3 hours',
      completed: false,
      dueDate: '2024-12-22',
      points: 25
    },
    {
      id: 'task2',
      title: 'Add Two Technical Projects',
      description: 'Document and upload two additional projects showcasing different tech stacks and problem-solving approaches.',
      priority: 'high',
      category: 'Projects',
      estimatedTime: '4-5 hours',
      completed: false,
      dueDate: '2024-12-24',
      points: 35
    },
    {
      id: 'task3',
      title: 'Update Skills Section with Proficiency Levels',
      description: 'Categorize skills into Beginner, Intermediate, and Advanced levels with specific technologies.',
      priority: 'medium',
      category: 'Skills',
      estimatedTime: '1 hour',
      completed: false,
      dueDate: '2024-12-20',
      points: 15
    },
    {
      id: 'task4',
      title: 'Create Professional Summary',
      description: 'Write a compelling 3-4 line summary highlighting your key strengths and career objectives.',
      priority: 'medium',
      category: 'Personal',
      estimatedTime: '30 minutes',
      completed: false,
      dueDate: '2024-12-19',
      points: 20
    },
    {
      id: 'task5',
      title: 'Document Internship Experience',
      description: 'Add detailed description of your summer internship with quantifiable achievements and learning outcomes.',
      priority: 'high',
      category: 'Experience',
      estimatedTime: '1-2 hours',
      completed: false,
      dueDate: '2024-12-21',
      points: 30
    },
    {
      id: 'task6',
      title: 'Obtain LinkedIn Skill Endorsements',
      description: 'Connect with classmates and professionals to get endorsements for your top 5 technical skills.',
      priority: 'low',
      category: 'Networking',
      estimatedTime: '45 minutes',
      completed: false,
      dueDate: '2024-12-23',
      points: 10
    },
    {
      id: 'task7',
      title: 'Complete AWS/Google Cloud Certification',
      description: 'Enroll and complete a cloud certification course to enhance your technical credentials.',
      priority: 'medium',
      category: 'Certifications',
      estimatedTime: '10-15 hours',
      completed: false,
      dueDate: '2024-12-30',
      points: 40
    }
  ];

  // Skill Assessment Data
  const skillAssessments: SkillAssessment[] = [
    {
      category: 'Programming',
      currentLevel: 7,
      targetLevel: 9,
      improvementTasks: ['Practice advanced algorithms', 'Contribute to open source projects', 'Build complex applications']
    },
    {
      category: 'Web Development',
      currentLevel: 6,
      targetLevel: 8,
      improvementTasks: ['Learn advanced React patterns', 'Master state management', 'Build full-stack applications']
    },
    {
      category: 'Database Management',
      currentLevel: 5,
      targetLevel: 8,
      improvementTasks: ['Learn database optimization', 'Practice complex queries', 'Understand database design patterns']
    },
    {
      category: 'Cloud Technologies',
      currentLevel: 4,
      targetLevel: 7,
      improvementTasks: ['Complete cloud certification', 'Deploy applications on cloud', 'Learn infrastructure as code']
    },
    {
      category: 'Communication',
      currentLevel: 6,
      targetLevel: 8,
      improvementTasks: ['Practice technical presentations', 'Write technical blogs', 'Participate in community discussions']
    },
    {
      category: 'Leadership',
      currentLevel: 5,
      targetLevel: 7,
      improvementTasks: ['Lead project teams', 'Mentor junior students', 'Organize technical events']
    }
  ];

  // Progress tracking data
  const progressData = [
    { week: 'Week 1', score: 60, completedTasks: 2 },
    { week: 'Week 2', score: 65, completedTasks: 3 },
    { week: 'Week 3', score: 70, completedTasks: 4 },
    { week: 'Week 4', score: 72, completedTasks: 3 },
    { week: 'Week 5', score: 75, completedTasks: 5 },
    { week: 'Week 6', score: 78, completedTasks: 4 },
    { week: 'Current', score: 72, completedTasks: 2 }
  ];

  const radarData = skillAssessments.map(skill => ({
    category: skill.category,
    current: skill.currentLevel,
    target: skill.targetLevel
  }));

  // Calculate overall resume score
  const overallScore = Math.round(resumeSections.reduce((acc, section) => acc + section.score, 0) / resumeSections.length);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'missing': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(prev => prev.filter(id => id !== taskId));
      toast.success('Task marked as incomplete');
    } else {
      setCompletedTasks(prev => [...prev, taskId]);
      toast.success('Task completed! Great job!', {
        description: `You earned ${weeklyTasks.find(t => t.id === taskId)?.points || 0} points!`
      });
    }
  };

  const exportResumeAnalysis = () => {
    const csvContent = [
      ['Section', 'Status', 'Score', 'Max Score', 'Completion %'],
      ...resumeSections.map(section => [
        section.name,
        section.status,
        section.score,
        section.maxScore,
        Math.round((section.score / section.maxScore) * 100) + '%'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resume_analysis_${user.name}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('Resume analysis exported successfully!');
  };

  const exportWeeklyTasks = () => {
    const csvContent = [
      ['Task', 'Category', 'Priority', 'Status', 'Due Date', 'Points', 'Estimated Time'],
      ...weeklyTasks.map(task => [
        task.title,
        task.category,
        task.priority,
        completedTasks.includes(task.id) ? 'Completed' : 'Pending',
        task.dueDate,
        task.points,
        task.estimatedTime
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `weekly_tasks_${user.name}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('Weekly tasks exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resume Profiling & Career Development</h2>
          <p className="text-muted-foreground">Analyze your profile strength and complete weekly improvement tasks</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportResumeAnalysis}>
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
          <Button onClick={() => navigateTo('resume-builder', null, 'Resume Builder')}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Resume
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Overall Resume Score</h3>
              <p className="text-muted-foreground">Based on industry standards and completeness</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{overallScore}%</div>
              <Badge className={overallScore >= 80 ? 'success' : overallScore >= 60 ? 'warning' : 'error'}>
                {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Resume Analysis</TabsTrigger>
          <TabsTrigger value="tasks">Weekly Tasks</TabsTrigger>
          <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        {/* Resume Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <CardTitle className="text-base">{section.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(section.status)}>
                        {section.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completeness</span>
                        <span className="font-medium">{section.score}/{section.maxScore}</span>
                      </div>
                      <Progress value={(section.score / section.maxScore) * 100} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Improvement Suggestions:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {section.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Target className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Weekly Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Week {currentWeek} Tasks</h3>
              <p className="text-muted-foreground">
                Complete these tasks to improve your profile strength
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={exportWeeklyTasks}>
                <Download className="w-4 h-4 mr-2" />
                Export Tasks
              </Button>
              <Badge variant="secondary">
                {completedTasks.length} / {weeklyTasks.length} Completed
              </Badge>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{completedTasks.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{weeklyTasks.length - completedTasks.length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {weeklyTasks.filter((task, index) => completedTasks.includes(task.id)).reduce((acc, task) => acc + task.points, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-info mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {Math.round((completedTasks.length / weeklyTasks.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {weeklyTasks.map((task) => (
              <Card key={task.id} className={`${completedTasks.includes(task.id) ? 'bg-success-light border-success' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Button
                          size="sm"
                          variant={completedTasks.includes(task.id) ? 'default' : 'outline'}
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="p-1 h-8 w-8"
                        >
                          {completedTasks.includes(task.id) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                          )}
                        </Button>
                        <h4 className={`font-medium ${completedTasks.includes(task.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 ml-11">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-xs text-muted-foreground ml-11">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{task.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{task.points} points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Assessment Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Radar Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Current vs Target skill levels</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={60} domain={[0, 10]} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Development Plan</CardTitle>
                <p className="text-sm text-muted-foreground">Focus areas for improvement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillAssessments.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.category}</span>
                      <Badge variant="outline">
                        {skill.currentLevel}/10 → {skill.targetLevel}/10
                      </Badge>
                    </div>
                    <Progress value={(skill.currentLevel / 10) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground space-y-1">
                      {skill.improvementTasks.slice(0, 2).map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center space-x-2">
                          <Target className="w-3 h-3 text-primary" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skill Development Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <Code className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-medium text-foreground mb-2">Advanced Programming</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Master design patterns, algorithms, and system architecture
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Start Learning
                  </Button>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <Award className="w-8 h-8 text-success mb-2" />
                  <h4 className="font-medium text-foreground mb-2">Cloud Certifications</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get AWS, Azure, or Google Cloud certified
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    View Courses
                  </Button>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <Trophy className="w-8 h-8 text-warning mb-2" />
                  <h4 className="font-medium text-foreground mb-2">Leadership Skills</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Develop team leadership and project management skills
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Program
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress Trend</CardTitle>
                <p className="text-sm text-muted-foreground">Your resume score improvement over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[50, 90]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievement Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Your accomplishments this month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-warning" />
                    <div>
                      <h4 className="font-medium text-foreground">Tasks Completed</h4>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">23</div>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-success" />
                    <div>
                      <h4 className="font-medium text-foreground">Points Earned</h4>
                      <p className="text-sm text-muted-foreground">Total score</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">485</div>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-info" />
                    <div>
                      <h4 className="font-medium text-foreground">Score Improvement</h4>
                      <p className="text-sm text-muted-foreground">Since last month</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">+18%</div>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-destructive" />
                    <div>
                      <h4 className="font-medium text-foreground">Weekly Streak</h4>
                      <p className="text-sm text-muted-foreground">Consecutive weeks</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">6</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Milestones</CardTitle>
              <p className="text-sm text-muted-foreground">Track your weekly accomplishments</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progressData.slice(-5).map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${week.completedTasks >= 3 ? 'bg-success' : week.completedTasks >= 2 ? 'bg-warning' : 'bg-destructive'}`} />
                      <div>
                        <h4 className="font-medium text-foreground">{week.week}</h4>
                        <p className="text-sm text-muted-foreground">{week.completedTasks} tasks completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{week.score}%</div>
                      <div className="text-xs text-muted-foreground">Resume Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentResumeProfiling;