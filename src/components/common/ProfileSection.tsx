import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Camera,
  Shield,
  Award,
  DollarSign,
  TrendingUp,
  Clock,
  Building
} from 'lucide-react';
import { getSchoolById, getDepartmentById } from '../data/universityStructure';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  school?: string;
  joinDate: string;
  employeeId?: string;
  designation?: string;
  profilePicture?: string;
  bio?: string;
  specialization?: string;
  experience?: number;
  budget?: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  permissions: string[];
  achievements?: string[];
  stats?: {
    studentsManaged?: number;
    companiesContacted?: number;
    placementRate?: number;
    trainingHours?: number;
  };
}

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate?: (updatedProfile: UserProfile) => void;
  showBudget?: boolean;
  showStats?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  profile, 
  onUpdate,
  showBudget = false,
  showStats = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const school = profile.school ? getSchoolById(profile.school) : null;
  const department = getDepartmentById(profile.department);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedProfile);
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      faculty: 'bg-green-100 text-green-800',
      outreach: 'bg-purple-100 text-purple-800',
      operations: 'bg-orange-100 text-orange-800',
      admin: 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getBudgetPercentage = () => {
    if (!profile.budget) return 0;
    return Math.round((profile.budget.spent / profile.budget.allocated) * 100);
  };

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.profilePicture || "/api/placeholder/80/80"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 p-0"
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-800">{profile.name}</CardTitle>
              <CardDescription className="text-lg">
                {profile.designation || profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </CardDescription>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getRoleColor(profile.role)}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </Badge>
                {profile.employeeId && (
                  <Badge variant="outline">ID: {profile.employeeId}</Badge>
                )}
              </div>
            </div>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your profile information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editedProfile.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-800">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-slate-600">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-slate-600">{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Building className="w-4 h-4 text-primary" />
              <span className="text-slate-600">{department?.name}</span>
            </div>
            {school && (
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-slate-600">{school.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="space-y-2">
            <h4 className="font-medium text-slate-800">About</h4>
            <p className="text-slate-600 text-sm">{profile.bio}</p>
          </div>
        )}

        {/* Budget Information (for Faculty) */}
        {showBudget && profile.budget && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Budget Allocation</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{(profile.budget.allocated / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-slate-600">Allocated</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{(profile.budget.spent / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-slate-600">Spent</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{(profile.budget.remaining / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-slate-600">Remaining</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Budget Utilization</span>
                <span className="font-medium text-slate-800">{getBudgetPercentage()}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getBudgetPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {showStats && profile.stats && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Performance Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              {profile.stats.studentsManaged && (
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <User className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-xl font-bold text-blue-600">{profile.stats.studentsManaged}</div>
                    <div className="text-sm text-slate-600">Students Managed</div>
                  </div>
                </div>
              )}
              {profile.stats.companiesContacted && (
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Building className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="text-xl font-bold text-purple-600">{profile.stats.companiesContacted}</div>
                    <div className="text-sm text-slate-600">Companies Contacted</div>
                  </div>
                </div>
              )}
              {profile.stats.placementRate && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-xl font-bold text-green-600">{profile.stats.placementRate}%</div>
                    <div className="text-sm text-slate-600">Placement Rate</div>
                  </div>
                </div>
              )}
              {profile.stats.trainingHours && (
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Clock className="w-8 h-8 text-orange-500" />
                  <div>
                    <div className="text-xl font-bold text-orange-600">{profile.stats.trainingHours}</div>
                    <div className="text-sm text-slate-600">Training Hours</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Achievements */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Achievements</h4>
            <div className="space-y-2">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="font-medium text-slate-800">Experience</div>
            <div className="text-sm text-slate-600">
              {profile.experience ? `${profile.experience} years` : 'Not specified'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-slate-800">Joined</div>
            <div className="text-sm text-slate-600">{profile.joinDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};