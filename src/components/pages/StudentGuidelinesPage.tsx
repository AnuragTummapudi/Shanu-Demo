import React, { useState } from 'react';
import { ArrowLeft, Download, Edit, Plus, FileText, Calendar, Users, CheckCircle, AlertCircle, Save, BookOpen, GraduationCap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { exportToCSV } from '../utils/csvExport';

interface StudentGuidelinesPageProps {
  onBack: () => void;
}

const StudentGuidelinesPage: React.FC<StudentGuidelinesPageProps> = ({ onBack }) => {
  const [editingGuideline, setEditingGuideline] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Student Guidelines Data
  const [guidelines, setGuidelines] = useState([
    {
      id: 'STG001',
      title: 'Placement Preparation Guidelines',
      category: 'Career Preparation',
      status: 'Active',
      lastUpdated: '2024-01-10',
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '2.3',
      content: `Complete Guide for Placement Preparation:

1. Academic Excellence:
   - Maintain minimum 6.5 CGPA throughout your course
   - Focus on core subjects relevant to your specialization
   - Clear all backlogs before final year
   - Participate actively in classroom discussions

2. Technical Skills Development:
   - Master programming languages relevant to your field
   - Work on real-world projects and build a portfolio
   - Contribute to open-source projects on GitHub
   - Stay updated with latest industry technologies

3. Soft Skills Enhancement:
   - Improve communication skills in English
   - Practice public speaking and presentation skills
   - Develop leadership qualities through extracurricular activities
   - Work on time management and organizational skills

4. Resume Building:
   - Create a professional resume highlighting achievements
   - Include relevant projects, internships, and certifications
   - Quantify your accomplishments with specific metrics
   - Keep it concise and error-free

5. Interview Preparation:
   - Practice coding problems and technical concepts
   - Prepare for behavioral interview questions
   - Research companies and their work culture
   - Participate in mock interviews and feedback sessions`,
      affectedStudents: 2847,
      priority: 'High',
      targetAudience: ['Final Year Students', 'Pre-Final Year Students']
    },
    {
      id: 'STG002',
      title: 'Code of Conduct and Discipline',
      category: 'Conduct',
      status: 'Active',
      lastUpdated: '2024-01-08',
      updatedBy: 'Kavitha Sharma',
      version: '1.5',
      content: `Student Code of Conduct:

1. Academic Integrity:
   - No plagiarism in assignments or projects
   - Maintain honesty in examinations and assessments
   - Give proper citations and references in research work
   - Report any academic misconduct witnessed

2. Professional Behavior:
   - Dress appropriately for classes and college events
   - Maintain punctuality in attendance and submissions
   - Show respect to faculty, staff, and fellow students
   - Use appropriate language in all communications

3. Digital Citizenship:
   - Responsible use of internet and college resources
   - No cyberbullying or online harassment
   - Respect privacy and intellectual property rights
   - Follow social media guidelines representing the college

4. Campus Discipline:
   - Follow all college rules and regulations
   - Maintain cleanliness and decorum on campus
   - Report safety concerns to appropriate authorities
   - Participate constructively in college activities

5. Consequences:
   - Warning for minor violations
   - Community service for moderate violations
   - Suspension for serious violations
   - Expulsion for severe misconduct`,
      affectedStudents: 2847,
      priority: 'High',
      targetAudience: ['All Students']
    },
    {
      id: 'STG003',
      title: 'Internship and Industrial Training Guidelines',
      category: 'Internships',
      status: 'Active',
      lastUpdated: '2024-01-05',
      updatedBy: 'Priya Krishnamurthy',
      version: '1.8',
      content: `Guidelines for Internships and Industrial Training:

1. Internship Requirements:
   - Mandatory 6-8 weeks internship in pre-final year
   - Must be relevant to your field of study
   - Prior approval required from department
   - Regular progress reports during internship

2. Finding Internships:
   - Use college placement portal for opportunities
   - Network with alumni and industry professionals
   - Apply through company websites and job portals
   - Leverage faculty connections and recommendations

3. During Internship:
   - Maintain professional conduct and punctuality
   - Complete all assigned tasks with dedication
   - Ask questions and seek learning opportunities
   - Build professional relationships and network

4. Documentation:
   - Maintain daily work diary and progress log
   - Collect certificates and recommendation letters
   - Prepare comprehensive internship report
   - Include project details and learning outcomes

5. Evaluation:
   - Company evaluation form to be submitted
   - Internal presentation of internship experience
   - Report evaluation by faculty supervisor
   - Credits awarded based on performance`,
      affectedStudents: 1425,
      priority: 'Medium',
      targetAudience: ['Pre-Final Year Students']
    },
    {
      id: 'STG004',
      title: 'Academic Support and Resources',
      category: 'Academic Support',
      status: 'Active',
      lastUpdated: '2024-01-12',
      updatedBy: 'Prof. Rajesh Kumar',
      version: '2.1',
      content: `Academic Support Resources Available:

1. Library Resources:
   - Physical books, journals, and reference materials
   - Digital library with e-books and online databases
   - Research assistance and literature search support
   - Study spaces and group discussion rooms

2. Laboratory Facilities:
   - Well-equipped labs for practical learning
   - Latest software and hardware resources
   - Extended lab hours during project work
   - Technical support and equipment training

3. Faculty Support:
   - Regular office hours for doubt clarification
   - Project guidance and mentorship
   - Research opportunities and collaboration
   - Career counseling and guidance

4. Peer Support Programs:
   - Study groups and peer learning sessions
   - Senior student mentorship program
   - Subject-wise student communities
   - Collaborative project opportunities

5. Special Support Services:
   - Remedial classes for struggling students
   - Advanced courses for high achievers
   - Counseling services for personal issues
   - Financial aid and scholarship guidance`,
      affectedStudents: 2847,
      priority: 'Medium',
      targetAudience: ['All Students'],
    },
    {
      id: 'STG005',
      title: 'Extracurricular Activities and Personal Development',
      category: 'Personal Development',
      status: 'Active',
      lastUpdated: '2024-01-15',
      updatedBy: 'Student Activities Committee',
      version: '1.3',
      content: `Guidelines for Holistic Development:

1. Club Participation:
   - Join technical and non-technical clubs
   - Take leadership roles in club activities
   - Organize events and competitions
   - Develop teamwork and management skills

2. Sports and Fitness:
   - Participate in college sports activities
   - Maintain physical fitness and health
   - Represent college in inter-college competitions
   - Learn discipline and team spirit

3. Cultural Activities:
   - Participate in cultural events and festivals
   - Develop artistic and creative skills
   - Appreciate diversity and cultural values
   - Build confidence through performances

4. Social Service:
   - Engage in community service activities
   - Participate in NSS and social welfare programs
   - Develop empathy and social responsibility
   - Contribute to society and environment

5. Skill Development:
   - Attend workshops and training programs
   - Develop entrepreneurship and innovation skills
   - Learn new technologies and tools
   - Build personal brand and professional network`,
      affectedStudents: 2847,
      priority: 'Low',
      targetAudience: ['All Students']
    }
  ]);

  const [newGuideline, setNewGuideline] = useState({
    title: '',
    category: 'General',
    content: '',
    priority: 'Medium',
    targetAudience: ['All Students']
  });

  const guidelineCategories = [
    'Career Preparation',
    'Conduct', 
    'Academic Support',
    'Internships',
    'Personal Development',
    'General'
  ];

  const priorities = ['Low', 'Medium', 'High'];

  const handleEditGuideline = (guidelineId: string) => {
    setEditingGuideline(guidelineId);
    setHasUnsavedChanges(false);
  };

  const handleSaveGuideline = (guidelineId: string) => {
    // Save logic here
    setEditingGuideline(null);
    setHasUnsavedChanges(false);
  };

  const handleCreateNewGuideline = () => {
    setIsCreatingNew(true);
  };

  const handleSaveNewGuideline = () => {
    const guideline = {
      id: `STG${String(guidelines.length + 1).padStart(3, '0')}`,
      ...newGuideline,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '1.0',
      affectedStudents: 0
    };

    setGuidelines([...guidelines, guideline]);
    setNewGuideline({ 
      title: '', 
      category: 'General', 
      content: '', 
      priority: 'Medium',
      targetAudience: ['All Students']
    });
    setIsCreatingNew(false);
  };

  const handleExportGuidelines = () => {
    const guidelineData = guidelines.map(guideline => ({
      'Guideline ID': guideline.id,
      'Title': guideline.title,
      'Category': guideline.category,
      'Status': guideline.status,
      'Priority': guideline.priority,
      'Version': guideline.version,
      'Last Updated': guideline.lastUpdated,
      'Updated By': guideline.updatedBy,
      'Affected Students': guideline.affectedStudents,
      'Target Audience': guideline.targetAudience.join(', ')
    }));

    exportToCSV(guidelineData, 'student_guidelines_report');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Guidelines</h1>
            <p className="text-muted-foreground">Comprehensive guidelines for student success and development</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCreateNewGuideline}>
            <Plus className="w-4 h-4 mr-2" />
            New Guideline
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportGuidelines}>
            <Download className="w-4 h-4 mr-2" />
            Export Guidelines
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            You have unsaved changes. Please save your changes before navigating away.
          </AlertDescription>
        </Alert>
      )}

      {/* Guidelines Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Guidelines</p>
                <p className="text-2xl font-bold text-success">{guidelines.filter(g => g.status === 'Active').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-warning">{guidelines.filter(g => g.priority === 'High').length}</p>
              </div>
              <Target className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-primary">2,847</p>
              </div>
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-lg font-bold text-foreground">Jan 15</p>
              </div>
              <Calendar className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Guideline Creation */}
      {isCreatingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Student Guideline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Guideline Title</Label>
                <Input
                  id="title"
                  value={newGuideline.title}
                  onChange={(e) => setNewGuideline({ ...newGuideline, title: e.target.value })}
                  placeholder="Enter guideline title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newGuideline.category}
                  onChange={(e) => setNewGuideline({ ...newGuideline, category: e.target.value })}
                  className="w-full p-2 border border-border rounded-md"
                >
                  {guidelineCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={newGuideline.priority}
                onChange={(e) => setNewGuideline({ ...newGuideline, priority: e.target.value })}
                className="w-full p-2 border border-border rounded-md"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Guideline Content</Label>
              <Textarea
                id="content"
                value={newGuideline.content}
                onChange={(e) => setNewGuideline({ ...newGuideline, content: e.target.value })}
                placeholder="Enter detailed guideline content..."
                rows={8}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveNewGuideline}>
                <Save className="w-4 h-4 mr-2" />
                Save Guideline
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guidelines List */}
      <div className="space-y-6">
        {guidelines.map((guideline) => (
          <Card key={guideline.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>{guideline.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant={guideline.status === 'Active' ? 'default' : 'secondary'}>
                      {guideline.status}
                    </Badge>
                    <Badge variant="outline">{guideline.category}</Badge>
                    <Badge variant={
                      guideline.priority === 'High' ? 'destructive' :
                      guideline.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {guideline.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Version {guideline.version} • Updated {guideline.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditGuideline(guideline.id)}
                  disabled={editingGuideline === guideline.id}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editingGuideline === guideline.id ? 'Editing' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingGuideline === guideline.id ? (
                <div className="space-y-4">
                  <Textarea
                    value={guideline.content}
                    onChange={(e) => {
                      const updatedGuidelines = guidelines.map(g =>
                        g.id === guideline.id ? { ...g, content: e.target.value } : g
                      );
                      setGuidelines(updatedGuidelines);
                      setHasUnsavedChanges(true);
                    }}
                    rows={12}
                    className="font-mono text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSaveGuideline(guideline.id)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditingGuideline(null);
                      setHasUnsavedChanges(false);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg">
                      {guideline.content}
                    </pre>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-6">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Affected Students:</span>
                        <span className="ml-2 font-medium">{guideline.affectedStudents.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Target Audience:</span>
                        <span className="ml-2 font-medium">{guideline.targetAudience.join(', ')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Updated by:</span>
                        <span className="ml-2 font-medium">{guideline.updatedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentGuidelinesPage;