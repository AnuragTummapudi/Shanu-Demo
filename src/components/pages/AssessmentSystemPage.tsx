import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { 
  ArrowLeft,
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Send,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  FileText,
  Code,
  Calculator,
  Lightbulb,
  Zap,
  Shield,
  Globe,
  Timer,
  Flag,
  BookOpen,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../navigation/NavigationProvider';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'single-choice' | 'true-false' | 'text' | 'code' | 'essay';
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  points: number;
  timeLimit?: number; // in seconds
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'aptitude' | 'behavioral' | 'domain-specific';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  maxAttempts: number;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
  instructions: string[];
  tags: string[];
  prerequisites: string[];
  certificationAwarded: boolean;
  weightage: number;
}

interface AttemptResult {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  status: 'completed' | 'in-progress' | 'abandoned' | 'expired';
  startedAt: string;
  completedAt?: string;
  answers: Array<{
    questionId: string;
    answer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
  }>;
  feedback?: string;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'F';
  rank?: number;
  totalParticipants?: number;
}

const AssessmentSystemPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<AttemptResult[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Mock data initialization
  useEffect(() => {
    const mockAssessments: Assessment[] = [
      {
        id: '1',
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics including variables, functions, objects, and ES6 features.',
        category: 'technical',
        difficulty: 'intermediate',
        duration: 60,
        totalQuestions: 25,
        passingScore: 70,
        maxAttempts: 3,
        isActive: true,
        isPublic: true,
        createdBy: 'faculty1',
        createdByName: 'Dr. Lakshmi Venkatesh',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        questions: [
          {
            id: 'q1',
            text: 'Which of the following is the correct way to declare a variable in JavaScript?',
            type: 'multiple-choice',
            options: ['var name = "John";', 'variable name = "John";', 'v name = "John";', 'declare name = "John";'],
            correctAnswer: 'var name = "John";',
            explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
            difficulty: 'easy',
            category: 'syntax',
            tags: ['variables', 'declaration', 'syntax'],
            points: 2,
            timeLimit: 60
          },
          {
            id: 'q2',
            text: 'Write a function that returns the sum of two numbers.',
            type: 'code',
            correctAnswer: 'function sum(a, b) { return a + b; }',
            explanation: 'A simple function that takes two parameters and returns their sum.',
            difficulty: 'easy',
            category: 'functions',
            tags: ['functions', 'basic', 'arithmetic'],
            points: 5,
            timeLimit: 300
          }
        ],
        instructions: [
          'Read each question carefully before answering',
          'You can navigate between questions using the Previous/Next buttons',
          'Make sure to submit your assessment before time runs out',
          'Once submitted, you cannot change your answers'
        ],
        tags: ['javascript', 'frontend', 'programming', 'web-development'],
        prerequisites: ['Basic programming knowledge', 'Understanding of web development'],
        certificationAwarded: true,
        weightage: 100
      },
      {
        id: '2',
        title: 'Logical Reasoning',
        description: 'Assess your logical thinking and problem-solving abilities with pattern recognition and analytical questions.',
        category: 'aptitude',
        difficulty: 'intermediate',
        duration: 45,
        totalQuestions: 30,
        passingScore: 65,
        maxAttempts: 2,
        isActive: true,
        isPublic: true,
        createdBy: 'faculty2',
        createdByName: 'Prof. Krishna Murthy',
        createdAt: '2024-01-12T09:00:00Z',
        updatedAt: '2024-01-18T11:00:00Z',
        questions: [
          {
            id: 'q3',
            text: 'If all roses are flowers, and some flowers are red, which of the following is definitely true?',
            type: 'single-choice',
            options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Some roses might be red'],
            correctAnswer: 'Some roses might be red',
            explanation: 'This follows basic logical reasoning principles.',
            difficulty: 'medium',
            category: 'logic',
            tags: ['reasoning', 'logic', 'deduction'],
            points: 3,
            timeLimit: 90
          }
        ],
        instructions: [
          'This assessment tests your logical reasoning abilities',
          'Take your time to understand each question',
          'Consider all possibilities before selecting an answer',
          'No calculators or external aids are permitted'
        ],
        tags: ['aptitude', 'reasoning', 'logic', 'problem-solving'],
        prerequisites: ['None'],
        certificationAwarded: false,
        weightage: 80
      }
    ];

    const mockResults: AttemptResult[] = [
      {
        id: '1',
        assessmentId: '1',
        studentId: 'student1',
        studentName: 'Rajesh Kumar',
        score: 85,
        percentage: 85,
        totalQuestions: 25,
        correctAnswers: 21,
        timeSpent: 45,
        status: 'completed',
        startedAt: '2024-01-20T10:00:00Z',
        completedAt: '2024-01-20T10:45:00Z',
        answers: [
          {
            questionId: 'q1',
            answer: 'var name = "John";',
            isCorrect: true,
            timeSpent: 45
          }
        ],
        feedback: 'Excellent performance! Strong understanding of JavaScript fundamentals.',
        grade: 'A',
        rank: 2,
        totalParticipants: 15
      }
    ];

    setAssessments(mockAssessments);
    setResults(mockResults);
  }, []);

  // Timer effect for active assessments
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAssessmentActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isAssessmentActive, timeRemaining]);

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(assessment.duration * 60);
    setIsAssessmentActive(true);
    setActiveTab('take-assessment');
  };

  const handleSubmitAssessment = () => {
    if (!currentAssessment) return;
    
    // Calculate score and create result
    const result: AttemptResult = {
      id: Date.now().toString(),
      assessmentId: currentAssessment.id,
      studentId: 'student1',
      studentName: 'Current Student',
      score: 85, // Mock calculation
      percentage: 85,
      totalQuestions: currentAssessment.totalQuestions,
      correctAnswers: 21, // Mock calculation
      timeSpent: currentAssessment.duration - Math.floor(timeRemaining / 60),
      status: 'completed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      answers: [], // Would contain actual answers
      grade: 'A',
      rank: 1,
      totalParticipants: 10
    };

    setResults(prev => [...prev, result]);
    setIsAssessmentActive(false);
    setCurrentAssessment(null);
    setActiveTab('results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-50';
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-50';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  const AssessmentCard = ({ assessment }: { assessment: Assessment }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-2">{assessment.title}</h3>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{assessment.description}</p>
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={`${
              assessment.category === 'technical' ? 'bg-purple-100 text-purple-800' :
              assessment.category === 'aptitude' ? 'bg-blue-100 text-blue-800' :
              assessment.category === 'behavioral' ? 'bg-green-100 text-green-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {assessment.category}
            </Badge>
            <Badge variant="outline">{assessment.difficulty}</Badge>
            {assessment.certificationAwarded && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Award className="w-3 h-3 mr-1" />
                Certificate
              </Badge>
            )}
          </div>
        </div>
        <Badge className={assessment.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
          {assessment.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{assessment.duration} minutes</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600">
          <FileText className="w-4 h-4" />
          <span>{assessment.totalQuestions} questions</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600">
          <Target className="w-4 h-4" />
          <span>{assessment.passingScore}% to pass</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600">
          <RotateCcw className="w-4 h-4" />
          <span>{assessment.maxAttempts} attempts</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          By {assessment.createdByName} • {new Date(assessment.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" onClick={() => startAssessment(assessment)}>
            <Play className="w-4 h-4 mr-1" />
            Start
          </Button>
        </div>
      </div>
    </motion.div>
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
                <h1 className="text-2xl font-bold text-slate-800">Assessment System</h1>
                <p className="text-slate-600">Online evaluations and skill assessments platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="assessments">
              <Brain className="w-4 h-4 mr-2" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="results">
              <Award className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            {isAssessmentActive && (
              <TabsTrigger value="take-assessment">
                <Play className="w-4 h-4 mr-2" />
                Assessment
              </TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Assessments</p>
                      <p className="text-2xl font-bold text-slate-900">{assessments.length}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Completed</p>
                      <p className="text-2xl font-bold text-slate-900">{results.length}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Average Score</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length) : 0}%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Certificates Earned</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {results.filter(r => r.percentage >= 80).length}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Available Assessments</CardTitle>
                <CardDescription>Choose from a variety of assessments to test your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.slice(0, 3).map((assessment) => (
                    <AssessmentCard key={assessment.id} assessment={assessment} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Results</CardTitle>
                <CardDescription>Your performance history and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((result) => {
                    const assessment = assessments.find(a => a.id === result.assessmentId);
                    return (
                      <div key={result.id} className="border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-800">{assessment?.title}</h3>
                            <p className="text-sm text-slate-600">
                              Completed on {new Date(result.completedAt!).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getGradeColor(result.grade)}>
                              Grade: {result.grade}
                            </Badge>
                            <Badge variant="outline">
                              Rank: #{result.rank}/{result.totalParticipants}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{result.percentage}%</div>
                            <div className="text-xs text-slate-600">Score</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{result.correctAnswers}</div>
                            <div className="text-xs text-slate-600">Correct</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-xl font-bold text-orange-600">{result.timeSpent}</div>
                            <div className="text-xs text-slate-600">Minutes</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">#{result.rank}</div>
                            <div className="text-xs text-slate-600">Rank</div>
                          </div>
                        </div>

                        {result.feedback && (
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-700">{result.feedback}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Take Assessment Tab */}
          {isAssessmentActive && currentAssessment && (
            <TabsContent value="take-assessment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{currentAssessment.title}</span>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-red-100 text-red-800">
                        <Timer className="w-3 h-3 mr-1" />
                        {formatTime(timeRemaining)}
                      </Badge>
                      <Badge variant="outline">
                        Question {currentQuestion + 1} of {currentAssessment.totalQuestions}
                      </Badge>
                    </div>
                  </CardTitle>
                  <Progress 
                    value={((currentQuestion + 1) / currentAssessment.totalQuestions) * 100} 
                    className="mt-2"
                  />
                </CardHeader>
                <CardContent>
                  {currentAssessment.questions[currentQuestion] && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium text-slate-800 mb-4">
                          {currentAssessment.questions[currentQuestion].text}
                        </h2>
                        
                        {currentAssessment.questions[currentQuestion].type === 'multiple-choice' && (
                          <div className="space-y-3">
                            {currentAssessment.questions[currentQuestion].options?.map((option, index) => (
                              <label key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="rounded"
                                  onChange={(e) => {
                                    const questionId = currentAssessment.questions[currentQuestion].id;
                                    const currentAnswers = answers[questionId] || [];
                                    if (e.target.checked) {
                                      setAnswers(prev => ({
                                        ...prev,
                                        [questionId]: [...currentAnswers, option]
                                      }));
                                    } else {
                                      setAnswers(prev => ({
                                        ...prev,
                                        [questionId]: currentAnswers.filter((a: string) => a !== option)
                                      }));
                                    }
                                  }}
                                />
                                <span className="text-slate-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {currentAssessment.questions[currentQuestion].type === 'single-choice' && (
                          <RadioGroup
                            value={answers[currentAssessment.questions[currentQuestion].id] || ''}
                            onValueChange={(value) => {
                              setAnswers(prev => ({
                                ...prev,
                                [currentAssessment.questions[currentQuestion].id]: value
                              }));
                            }}
                          >
                            <div className="space-y-3">
                              {currentAssessment.questions[currentQuestion].options?.map((option, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-slate-50">
                                  <RadioGroupItem value={option} id={`option-${index}`} />
                                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        )}

                        {currentAssessment.questions[currentQuestion].type === 'code' && (
                          <div className="space-y-3">
                            <Textarea 
                              placeholder="Write your code here..."
                              rows={10}
                              className="font-mono text-sm"
                              value={answers[currentAssessment.questions[currentQuestion].id] || ''}
                              onChange={(e) => {
                                setAnswers(prev => ({
                                  ...prev,
                                  [currentAssessment.questions[currentQuestion].id]: e.target.value
                                }));
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline"
                          disabled={currentQuestion === 0}
                          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                        >
                          Previous
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">
                            <Save className="w-4 h-4 mr-2" />
                            Save Progress
                          </Button>
                          
                          {currentQuestion < currentAssessment.totalQuestions - 1 ? (
                            <Button 
                              onClick={() => setCurrentQuestion(prev => Math.min(currentAssessment.totalQuestions - 1, prev + 1))}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button onClick={handleSubmitAssessment}>
                              <Send className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AssessmentSystemPage;