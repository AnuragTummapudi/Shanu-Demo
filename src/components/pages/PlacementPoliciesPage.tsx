import React, { useState } from 'react';
import { ArrowLeft, Download, Edit, Plus, FileText, Calendar, Users, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { exportToCSV } from '../utils/csvExport';

interface PlacementPoliciesPageProps {
  onBack: () => void;
}

const PlacementPoliciesPage: React.FC<PlacementPoliciesPageProps> = ({ onBack }) => {
  const [editingPolicy, setEditingPolicy] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Placement Policies Data
  const [policies, setPolicies] = useState([
    {
      id: 'POL001',
      title: 'Student Eligibility Criteria',
      category: 'Eligibility',
      status: 'Active',
      lastUpdated: '2024-01-10',
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '2.1',
      content: `Students must meet the following criteria to be eligible for campus placements:

1. Academic Performance:
   - Minimum CGPA of 6.5 (on a 10-point scale)
   - No active backlogs during placement season
   - Must have cleared all subjects up to the 6th semester

2. Attendance Requirements:
   - Minimum 75% attendance in all subjects
   - Must have attended mandatory placement training sessions

3. Conduct and Discipline:
   - No disciplinary actions or suspensions
   - Good academic and personal conduct record

4. Documentation:
   - Complete and updated resume
   - All academic transcripts
   - Valid identity documents

5. Special Considerations:
   - Students with exceptional achievements may be granted eligibility with CGPA >= 6.0
   - Final year students only eligible for final placements`,
      affectedStudents: 2847,
      departments: ['All Departments']
    },
    {
      id: 'POL002',
      title: 'Company Onboarding Guidelines',
      category: 'Corporate Relations',
      status: 'Active',
      lastUpdated: '2024-01-08',
      updatedBy: 'Priya Krishnamurthy',
      version: '1.3',
      content: `Guidelines for companies participating in campus recruitment:

1. Registration Process:
   - Complete company profile with valid documents
   - Provide detailed job descriptions and requirements
   - Submit compensation and benefits details

2. Recruitment Process:
   - Online assessments must be conducted fairly
   - Interview schedules coordinated with placement cell
   - Feedback to be provided within 48 hours

3. Offer Guidelines:
   - Offers must be in writing with clear terms
   - Minimum salary threshold of ₹3.5 LPA
   - Benefits and joining details clearly specified

4. Ethical Standards:
   - No discrimination based on gender, caste, or region
   - Transparent evaluation process
   - Professional conduct during campus visits`,
      affectedStudents: 0,
      departments: ['Placement Cell']
    },
    {
      id: 'POL003',
      title: 'Multiple Offers Policy',
      category: 'Student Guidelines',
      status: 'Active',
      lastUpdated: '2024-01-05',
      updatedBy: 'Kavitha Sharma',
      version: '1.2',
      content: `Policy regarding students receiving multiple job offers:

1. Offer Acceptance:
   - Students can hold maximum 2 offers simultaneously
   - Must inform placement cell within 24 hours of receiving offer
   - Acceptance deadline strictly to be honored

2. Offer Withdrawal:
   - Students cannot withdraw after accepting an offer
   - Special circumstances considered case-by-case
   - Penalty for unfair withdrawal

3. Higher Offer Consideration:
   - Students with accepted offers can appear for higher-paying roles
   - Must be 50% higher than current accepted offer
   - Limited to companies with CTC > ₹10 LPA

4. Communication:
   - All offer-related communication through placement cell
   - Students must maintain professional conduct`,
      affectedStudents: 1250,
      departments: ['All Departments']
    },
    {
      id: 'POL004',
      title: 'Internship to PPO Conversion',
      category: 'Internships',
      status: 'Draft',
      lastUpdated: '2024-01-12',
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '1.0',
      content: `Guidelines for converting internships to Pre-Placement Offers (PPO):

1. Internship Requirements:
   - Minimum 8-week internship duration
   - Satisfactory performance evaluation
   - Completion of assigned projects

2. PPO Eligibility:
   - Intern must meet final year placement criteria
   - Company must provide written PPO confirmation
   - Salary must meet minimum threshold

3. Acceptance Process:
   - PPO offers considered equivalent to campus placements
   - Students must declare PPO status to placement cell
   - Cannot participate in further placements if PPO accepted

4. Timeline:
   - PPO declarations before October 15th
   - Company confirmations by November 30th`,
      affectedStudents: 450,
      departments: ['All Departments']
    }
  ]);

  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: 'Student Guidelines',
    content: '',
    departments: ['All Departments']
  });

  const policyCategories = [
    'Eligibility',
    'Corporate Relations', 
    'Student Guidelines',
    'Internships',
    'Assessment',
    'Documentation'
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
      id: `POL${String(policies.length + 1).padStart(3, '0')}`,
      ...newPolicy,
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: 'Dr. Rajesh Venkatesh',
      version: '1.0',
      affectedStudents: 0
    };

    setPolicies([...policies, policy]);
    setNewPolicy({ title: '', category: 'Student Guidelines', content: '', departments: ['All Departments'] });
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
      'Departments': policy.departments.join(', ')
    }));

    exportToCSV(policyData, 'placement_policies_report');
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
            <h1 className="text-3xl font-bold text-foreground">Placement Policies</h1>
            <p className="text-muted-foreground">Manage university placement policies and guidelines</p>
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
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-lg font-bold text-foreground">Jan 12</p>
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
            <CardTitle>Create New Policy</CardTitle>
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
                    <FileText className="w-5 h-5 text-primary" />
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

export default PlacementPoliciesPage;