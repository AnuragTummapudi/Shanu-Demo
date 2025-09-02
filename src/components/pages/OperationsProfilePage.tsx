import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Settings, 
  TrendingUp, 
  ArrowLeft,
  Edit,
  Save,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  defaultOperationsProfile,
  defaultJobPostings,
  defaultPlacementDrives
} from '../data/operationsProfileData';

interface OperationsProfilePageProps {
  profile?: any;
  onBack?: () => void;
}

export function OperationsProfilePage({ profile, onBack = () => window.history.back() }: OperationsProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultOperationsProfile);
  const [jobPostings] = useState(defaultJobPostings);
  const [placementDrives] = useState(defaultPlacementDrives);

  const handleSave = () => {
    toast.success('Operations profile updated successfully!');
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
              <h1 className="text-3xl font-bold text-slate-800">Operations Team Profile</h1>
              <p className="text-slate-600">Placement operations and student coordination management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
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
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
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

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.jobsPosted}</div>
                    <div className="text-sm text-muted-foreground">Jobs Posted</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-success">{profileData.drivesOrganized}</div>
                    <div className="text-sm text-muted-foreground">Drives Organized</div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-700">{profileData.studentsPlaced}</div>
                    <div className="text-sm text-muted-foreground">Students Placed</div>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-700">{profileData.averageProcessingTime}</div>
                    <div className="text-sm text-muted-foreground">Avg Processing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Job Postings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Recent Job Postings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobPostings.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge 
                        className={
                          job.status === 'active' ? 'bg-success/10 text-success' :
                          job.status === 'closed' ? 'bg-muted text-muted-foreground' :
                          'bg-warning/10 text-warning'
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{job.applications} applications</span>
                      <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm font-medium text-primary">{job.salaryRange}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Placement Drives */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Drives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {placementDrives.map((drive) => (
                  <div key={drive.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{drive.companyName}</h4>
                      <Badge 
                        className={
                          drive.status === 'completed' ? 'bg-success/10 text-success' :
                          drive.status === 'ongoing' ? 'bg-primary/10 text-primary' :
                          drive.status === 'scheduled' ? 'bg-info/10 text-info' :
                          'bg-error/10 text-error'
                        }
                      >
                        {drive.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {drive.roles.join(', ')}
                    </div>
                    <div className="text-sm">
                      {drive.applicants} applicants, {drive.selected} selected
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Date: {new Date(drive.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationsProfilePage;