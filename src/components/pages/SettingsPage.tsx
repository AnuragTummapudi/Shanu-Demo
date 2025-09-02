import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, Settings, Bell, Shield, Database, Mail, 
  Globe, User, Save, Download, Upload
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

export const SettingsPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    placement: true,
    interview: true,
    training: false
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'english',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
              <p className="text-slate-600">Manage your preferences and system configuration</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-primary to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-primary/20 rounded-xl p-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">General</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Privacy</TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Data</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">General Preferences</CardTitle>
                <CardDescription>Customize your system experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Theme</label>
                    <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Language</label>
                    <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Timezone</label>
                    <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Date Format</label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Email Notifications</h4>
                      <p className="text-sm text-slate-600">Receive updates via email</p>
                    </div>
                    <Switch checked={notifications.email} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">SMS Notifications</h4>
                      <p className="text-sm text-slate-600">Receive updates via SMS</p>
                    </div>
                    <Switch checked={notifications.sms} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Push Notifications</h4>
                      <p className="text-sm text-slate-600">Browser push notifications</p>
                    </div>
                    <Switch checked={notifications.push} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))} />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-800 mb-4">Notification Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Placement Updates</span>
                      <Switch checked={notifications.placement} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, placement: checked }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Interview Reminders</span>
                      <Switch checked={notifications.interview} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, interview: checked }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Training Sessions</span>
                      <Switch checked={notifications.training} onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, training: checked }))} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Privacy Settings</h3>
                  <p className="text-slate-600">Advanced privacy and security options will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">Data Management</CardTitle>
                <CardDescription>Import, export, and manage your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Download className="w-8 h-8 mb-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 mb-2" />
                    Import Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">System Information</CardTitle>
                <CardDescription>System version and configuration details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Version</span>
                    <span className="text-slate-800 font-medium">v1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Last Updated</span>
                    <span className="text-slate-800 font-medium">January 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Database</span>
                    <span className="text-slate-800 font-medium">Connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};