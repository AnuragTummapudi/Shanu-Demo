import React, { useState } from 'react';
import { ArrowLeft, Download, Edit, Plus, FileText, Calendar, Users, CheckCircle, AlertCircle, Save, BookOpen, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { exportToCSV } from '../utils/csvExport';

interface AcademicPoliciesPageProps {
  onBack: () => void;
}

const AcademicPoliciesPage: React.FC<AcademicPoliciesPageProps> = ({ onBack }) => {
  const [editingPolicy, setEditingPolicy] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Academic Policies Data
  const [policies, setPolicies] = useState([
    {
      id: 'ACA001',
      title: 'Attendance and Academic Performance',
      category: 'Attendance',
      status: 'Active',
      lastUpdated: '2024-01-10',
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '3.2',
      content: `Academic Attendance and Performance Policy:

1. Attendance Requirements:
   - Minimum 75% attendance in all subjects mandatory
   - Students with 65-74% attendance: Condonation possible with valid reasons
   - Below 65% attendance: Debarred from semester examinations

2. Academic Performance Standards:
   - Minimum CGPA of 5.0 required for progression
   - Students with CGPA < 5.0: Academic probation
   - Two consecutive semesters below 5.0: Academic review

3. Make-up Classes:
   - Available for students with valid absence reasons
   - Medical certificates required for illness-related absences
   - Prior approval needed for academic/personal leave

4. Assessment Guidelines:
   - Continuous assessment: 30% of total marks
   - Mid-semester examination: 20% of total marks  
   - End-semester examination: 50% of total marks

5. Grade Improvement:
   - One chance for grade improvement per subject
   - Available only for students with attendance >= 75%
   - Must be completed within specified timeline`,
      affectedStudents: 2847,
      departments: ['All Departments'],
      effectiveDate: '2024-01-15'
    },
    {
      id: 'ACA002',
      title: 'Examination and Evaluation Guidelines',
      category: 'Examination',
      status: 'Active',
      lastUpdated: '2024-01-08',
      updatedBy: 'Dr. Priya Narasimhan',
      version: '2.5',
      content: `Examination and Evaluation Policy:

1. Examination Schedule:
   - Mid-semester exams: Week 8-9 of semester
   - End-semester exams: After completion of syllabus
   - Re-examination: Within 4 weeks of result declaration

2. Evaluation Process:
   - Answer scripts evaluated by subject faculty
   - Double evaluation for final year projects
   - External evaluation for end-semester exams

3. Grade System:
   - 10-point scale (S, A, B, C, D, F)
   - S: 10 points, A: 9 points, B: 8 points, C: 7 points
   - D: 6 points (minimum passing), F: 0 points (fail)

4. Supplementary Examinations:
   - Available for failed subjects (F grade)
   - Maximum 2 attempts per subject
   - Conducted before next semester begins

5. Academic Integrity:
   - Zero tolerance for plagiarism and unfair means
   - Disciplinary action for academic misconduct
   - Use of plagiarism detection software`,
      affectedStudents: 2847,
      departments: ['All Departments'],
      effectiveDate: '2024-01-15'
    },
    {
      id: 'ACA003',
      title: 'Course Registration and Credit System',
      category: 'Registration',
      status: 'Active',
      lastUpdated: '2024-01-05',
      updatedBy: 'Kavitha Sharma',
      version: '1.8',
      content: `Course Registration and Credit System Policy:

1. Credit Requirements:
   - Minimum 18 credits per semester
   - Maximum 24 credits per semester (with approval)
   - Total 160 credits required for graduation

2. Course Types:
   - Core Courses: Mandatory for all students
   - Professional Electives: Within specialization
   - Open Electives: From any department
   - Skill Development Courses: Industry-oriented

3. Registration Process:
   - Online registration during specified period
   - Academic advisor approval required
   - Late registration with penalty (up to 1 week)

4. Course Withdrawal:
   - Allowed up to week 8 of semester
   - 'W' grade assigned (not counted in CGPA)
   - Refund as per university fee policy

5. Prerequisites:
   - Must be satisfied before course registration
   - System validation during registration
   - Override possible with HOD approval`,
      affectedStudents: 2847,
      departments: ['All Departments'],
      effectiveDate: '2024-01-20'
    },
    {
      id: 'ACA004',
      title: 'Research and Project Guidelines',
      category: 'Research',
      status: 'Draft',
      lastUpdated: '2024-01-12',
      updatedBy: 'Prof. Rajesh Kumar',
      version: '1.0',
      content: `Research and Project Guidelines:

1. Final Year Projects:
   - Mandatory for all final year students
   - Individual or group projects (max 3 students)
   - Faculty guide assignment by department

2. Research Standards:
   - Original work with proper citations
   - Literature review minimum 50 references
   - Methodology clearly defined and justified

3. Project Timeline:
   - Project selection: Beginning of 7th semester
   - Progress reviews: Monthly evaluation
   - Final submission: 2 weeks before exams

4. Evaluation Criteria:
   - Technical content: 40%
   - Innovation and originality: 25%
   - Documentation and presentation: 20%
   - Implementation and results: 15%

5. Publication Opportunities:
   - Encourage conference and journal publications
   - University support for publication fees
   - Recognition and awards for publications`,
      affectedStudents: 680,
      departments: ['Engineering Departments'],
      effectiveDate: '2024-02-01'
    },
    {
      id: 'ACA005',
      title: 'Student Assessment and Feedback Policy',
      category: 'Assessment',
      status: 'Active',
      lastUpdated: '2024-01-15',
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '2.0',
      content: `Student Assessment and Feedback Policy:

1. Continuous Assessment:
   - Regular assignments and quizzes (20%)
   - Lab practical and seminars (10%)
   - Class participation and attendance bonus

2. Feedback Mechanism:
   - Student feedback on faculty and courses
   - Anonymous feedback system available
   - Feedback analysis and action taken

3. Grade Distribution:
   - Normal distribution encouraged
   - Maximum 20% students can receive 'S' grade
   - Minimum passing percentage: 40%

4. Assessment Transparency:
   - Answer scripts shown to students
   - Revaluation facility available
   - Clear marking scheme provided

5. Special Considerations:
   - Extra time for students with disabilities
   - Alternative assessment methods when needed
   - Remedial support for weak students`,
      affectedStudents: 2847,
      departments: ['All Departments'],
      effectiveDate: '2024-01-20'
    }
  ]);

  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: 'Academic',
    content: '',
    departments: ['All Departments'],
    effectiveDate: ''
  });

  const policyCategories = [
    'Attendance',
    'Examination', 
    'Registration',
    'Research',
    'Assessment',
    'Academic Integrity',
    'Student Support'
  ];

  const handleEditPolicy = (policyId: string) => {
    setEditingPolicy(policyId);
    setHasUnsavedChanges(false);
  };

  const handleSavePolicy = (policyId: string) => {
    // Save logic here
    setEditingPolicy(null);
    setHasUnsavedChanges(false);
  };

  const handleCreateNewPolicy = () => {
    setIsCreatingNew(true);
  };

  const handleSaveNewPolicy = () => {
    const policy = {
      id: `ACA${String(policies.length + 1).padStart(3, '0')}`,
      ...newPolicy,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '1.0',
      affectedStudents: 0
    };

    setPolicies([...policies, policy]);
    setNewPolicy({ 
      title: '', 
      category: 'Academic', 
      content: '', 
      departments: ['All Departments'],
      effectiveDate: ''
    });
    setIsCreatingNew(false);
  };

  const handleExportPolicies = () => {
    const policyData = policies.map(policy => ({
      'Policy ID': policy.id,
      'Title': policy.title,
      'Category': policy.category,
      'Status': policy.status,
      'Version': policy.version,
      'Last Updated': policy.lastUpdated,
      'Updated By': policy.updatedBy,
      'Affected Students': policy.affectedStudents,
      'Departments': policy.departments.join(', '),
      'Effective Date': policy.effectiveDate
    }));

    exportToCSV(policyData, 'academic_policies_report');
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
            <h1 className="text-3xl font-bold text-foreground">Academic Policies</h1>
            <p className="text-muted-foreground">Manage university academic policies and regulations</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCreateNewPolicy}>
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPolicies}>
            <Download className="w-4 h-4 mr-2" />
            Export Policies
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

      {/* Policy Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold text-success">{policies.filter(p => p.status === 'Active').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft Policies</p>
                <p className="text-2xl font-bold text-warning">{policies.filter(p => p.status === 'Draft').length}</p>
              </div>
              <FileText className="w-8 h-8 text-warning" />
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

      {/* New Policy Creation */}
      {isCreatingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Academic Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Policy Title</Label>
                <Input
                  id="title"
                  value={newPolicy.title}
                  onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                  placeholder="Enter policy title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newPolicy.category}
                  onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                  className="w-full p-2 border border-border rounded-md"
                >
                  {policyCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={newPolicy.effectiveDate}
                onChange={(e) => setNewPolicy({ ...newPolicy, effectiveDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Policy Content</Label>
              <Textarea
                id="content"
                value={newPolicy.content}
                onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                placeholder="Enter detailed policy content..."
                rows={8}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveNewPolicy}>
                <Save className="w-4 h-4 mr-2" />
                Save Policy
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Policies List */}
      <div className="space-y-6">
        {policies.map((policy) => (
          <Card key={policy.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>{policy.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant={policy.status === 'Active' ? 'default' : 'secondary'}>
                      {policy.status}
                    </Badge>
                    <Badge variant="outline">{policy.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Version {policy.version} • Updated {policy.lastUpdated}
                    </span>
                    {policy.effectiveDate && (
                      <span className="text-sm text-info">
                        Effective: {policy.effectiveDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPolicy(policy.id)}
                  disabled={editingPolicy === policy.id}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editingPolicy === policy.id ? 'Editing' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingPolicy === policy.id ? (
                <div className="space-y-4">
                  <Textarea
                    value={policy.content}
                    onChange={(e) => {
                      const updatedPolicies = policies.map(p =>
                        p.id === policy.id ? { ...p, content: e.target.value } : p
                      );
                      setPolicies(updatedPolicies);
                      setHasUnsavedChanges(true);
                    }}
                    rows={12}
                    className="font-mono text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSavePolicy(policy.id)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditingPolicy(null);
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
                      {policy.content}
                    </pre>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-6">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Affected Students:</span>
                        <span className="ml-2 font-medium">{policy.affectedStudents.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Departments:</span>
                        <span className="ml-2 font-medium">{policy.departments.join(', ')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Updated by:</span>
                        <span className="ml-2 font-medium">{policy.updatedBy}</span>
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

export default AcademicPoliciesPage;