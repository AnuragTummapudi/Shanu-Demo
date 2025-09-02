import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit, Settings, Shield, Upload, Download, Building, Mail, Award } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { enhancedSuperAdminProfile } from '../data/superAdminData';
import { handleDownloadCSV, handleUploadCSV } from '../utils/csvUtils';

export const SettingsSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-800">System Settings & Profile</h3>
          <p className="text-slate-600">Configure system settings and manage your administrative profile</p>
        </div>
      </div>

      {/* Minimal Profile Section in Settings */}
      <Card className="bg-white border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-800">Administrator Profile</CardTitle>
          <CardDescription>Basic profile information and administrative details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">
                {enhancedSuperAdminProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{enhancedSuperAdminProfile.name}</h3>
              <p className="text-slate-600 mb-2">{enhancedSuperAdminProfile.designation}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {enhancedSuperAdminProfile.email}
                </span>
                <span className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {enhancedSuperAdminProfile.department}
                </span>
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {enhancedSuperAdminProfile.experience}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => navigateTo('super-admin-profile', enhancedSuperAdminProfile, 'Edit Profile')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">System Configuration</CardTitle>
            <CardDescription>Core system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Email Notifications</span>
              <Badge className="success-light">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Data Backup</span>
              <Badge className="success-light">Daily</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Security Level</span>
              <Badge className="info-light">High</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">System Maintenance</span>
              <Badge className="warning-light">Scheduled</Badge>
            </div>
            <Button className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure System
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Security & Access</CardTitle>
            <CardDescription>Security settings and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Two-Factor Auth</span>
              <Badge className="success-light">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Session Timeout</span>
              <Badge className="info-light">30 minutes</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">API Access</span>
              <Badge className="success-light">Secured</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Audit Logging</span>
              <Badge className="success-light">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Data Management</CardTitle>
            <CardDescription>Backup, export, and data handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => handleDownloadCSV('full-system-backup')}>
              <Download className="w-4 h-4 mr-2" />
              Export System Data
            </Button>
            <Button variant="outline" className="w-full" onClick={handleUploadCSV}>
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Backup Settings
            </Button>
            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Data Privacy
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">University Settings</CardTitle>
            <CardDescription>Institution-specific configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Academic Year</span>
              <Badge className="info-light">2024-2025</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Placement Season</span>
              <Badge className="success-light">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Registration</span>
              <Badge className="success-light">Open</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">System Status</span>
              <Badge className="success-light">Operational</Badge>
            </div>
            <Button variant="outline" className="w-full">
              <Building className="w-4 h-4 mr-2" />
              University Config
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};