import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Shield, 
  TrendingUp, 
  Users,
  ArrowLeft,
  Edit,
  Save,
  Upload,
  BarChart3,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface SuperAdminProfilePageProps {
  profile?: any;
  onBack?: () => void;
}

export function SuperAdminProfilePage({ profile, onBack = () => window.history.back() }: SuperAdminProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'Dr. Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@srmap.edu.in',
    phone: '+91 98765 43210',
    dateOfBirth: '1975-09-25',
    gender: 'Female',
    address: 'Director\'s Residence, SRM University AP, Amaravati - 522502',
    
    // Professional Information
    employeeId: 'ADMIN001',
    designation: 'Director - Placement & Training',
    department: 'Placement & Training Cell',
    school: 'University Administration',
    dateOfJoining: '2015-06-01',
    
    // Administrative Scope
    overallResponsibility: 'Complete placement and training operations',
    schoolsOverseeing: ['Engineering & Technology', 'Management', 'Liberal Arts & Sciences'],
    teamSize: '25 members',
    budgetResponsibility: '₹5 Crores annually',
    
    // System Access
    systemPermissions: ['User Management', 'Report Generation', 'Global Configuration', 'Data Analytics'],
    reportingCapabilities: ['Performance Analytics', 'Placement Statistics', 'Financial Reports', 'Compliance Reports'],
    
    // Performance Overview
    totalStudentsManaged: '2,847',
    totalFacultyManaged: '145',
    placementRate: '94%',
    averagePackage: '₹8.5 LPA',
    
    // Qualifications
    qualifications: ['Ph.D in Management', 'MBA in HR', 'B.E in Computer Science'],
    certifications: ['Certified HR Director', 'Six Sigma Black Belt', 'Project Management Professional'],
    
    // Experience
    totalExperience: '20+ years',
    educationExperience: '15 years',
    corporateExperience: '8 years',
    
    // System Information
    lastLogin: '2024-01-15 09:30 AM',
    profileVersion: '2.0',
    systemRole: 'Super Administrator'
  });

  const handleSave = () => {
    toast.success('Super Admin profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Super Admin Profile</h1>
              <p className="text-slate-600">System administration and global oversight</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Super Administrator
            </Badge>
            {isEditing ? (
              <Button onClick={handleSave} className="bg-success text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal & Professional Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-purple-600 text-white">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Designation</Label>
                    <Input
                      value={profileData.designation}
                      onChange={(e) => setProfileData({...profileData, designation: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label>Employee ID</Label>
                    <Input
                      value={profileData.employeeId}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <Label>Email Address</Label>
                    <Input
                      value={profileData.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>System Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>System Permissions</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.systemPermissions.map((permission, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Reporting Capabilities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.reportingCapabilities.map((capability, index) => (
                      <Badge key={index} variant="secondary">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Administrative Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>System Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.totalStudentsManaged}</div>
                    <div className="text-sm text-muted-foreground">Total Students</div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-success">{profileData.totalFacultyManaged}</div>
                    <div className="text-sm text-muted-foreground">Faculty Members</div>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-700">{profileData.placementRate}</div>
                    <div className="text-sm text-muted-foreground">Placement Rate</div>
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-700">{profileData.averagePackage}</div>
                    <div className="text-sm text-muted-foreground">Avg Package</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Administrative Scope</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Schools Overseeing</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.schoolsOverseeing.map((school, index) => (
                      <Badge key={index} variant="outline">
                        {school}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Team Size</Label>
                    <div className="text-2xl font-bold text-slate-800">{profileData.teamSize}</div>
                  </div>
                  <div>
                    <Label>Budget Responsibility</Label>
                    <div className="text-2xl font-bold text-slate-800">{profileData.budgetResponsibility}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Qualifications & Experience */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Qualifications & Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Educational Qualifications</Label>
                  <div className="space-y-2 mt-2">
                    {profileData.qualifications.map((qual, index) => (
                      <div key={index} className="p-2 bg-muted rounded text-sm">
                        {qual}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Professional Certifications</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-success/10 text-success">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label>Total Experience</Label>
                    <Input value={profileData.totalExperience} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Education Experience</Label>
                    <Input value={profileData.educationExperience} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Corporate Experience</Label>
                    <Input value={profileData.corporateExperience} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login:</span>
                    <span>{profileData.lastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Version:</span>
                    <span>{profileData.profileVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Role:</span>
                    <Badge className="bg-primary/10 text-primary">
                      {profileData.systemRole}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminProfilePage;