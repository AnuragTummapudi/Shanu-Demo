import React, { useState } from 'react';
import { ArrowLeft, Save, Mail, MessageSquare, Bell, Smartphone, Settings, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

interface CommunicationSettingsPageProps {
  onBack: () => void;
}

const CommunicationSettingsPage: React.FC<CommunicationSettingsPageProps> = ({ onBack }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpEnabled: true,
    smtpServer: 'smtp.srmap.edu.in',
    smtpPort: '587',
    smtpEncryption: 'TLS',
    smtpUsername: 'noreply@srmap.edu.in',
    smtpPassword: '••••••••••••',
    fromName: 'SRM University AP',
    fromEmail: 'noreply@srmap.edu.in',
    replyToEmail: 'support@srmap.edu.in',
    dailyLimit: '10000',
    bounceHandling: true,
    emailQueue: true
  });

  // SMS Settings
  const [smsSettings, setSmsSettings] = useState({
    smsEnabled: true,
    provider: 'TextLocal',
    apiKey: '••••••••••••••••••••',
    senderId: 'SRMUNI',
    dailyLimit: '5000',
    internationalSms: false,
    deliveryReports: true,
    optOut: true
  });

  // Push Notification Settings
  const [pushSettings, setPushSettings] = useState({
    pushEnabled: true,
    fcmServerKey: '••••••••••••••••••••',
    apnsCertificate: 'Uploaded',
    badgeUpdates: true,
    soundEnabled: true,
    vibrationEnabled: true,
    scheduling: true
  });

  // Notification Preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    announcements: {
      email: true,
      sms: true,
      push: true,
      inApp: true
    },
    placements: {
      email: true,
      sms: true,
      push: true,
      inApp: true
    },
    academics: {
      email: true,
      sms: false,
      push: true,
      inApp: true
    },
    events: {
      email: false,
      sms: false,
      push: true,
      inApp: true
    },
    system: {
      email: true,
      sms: false,
      push: false,
      inApp: true
    }
  });

  // Template Settings
  const [templates, setTemplates] = useState([
    {
      id: 'welcome',
      name: 'Welcome Email',
      type: 'Email',
      status: 'Active',
      lastModified: '2024-01-10',
      usage: 245
    },
    {
      id: 'placement_notification',
      name: 'Placement Notification',
      type: 'Email + SMS',
      status: 'Active',
      lastModified: '2024-01-08',
      usage: 1205
    },
    {
      id: 'exam_reminder',
      name: 'Exam Reminder',
      type: 'SMS',
      status: 'Active',
      lastModified: '2024-01-05',
      usage: 2847
    },
    {
      id: 'fee_reminder',
      name: 'Fee Payment Reminder',
      type: 'Email + SMS',
      status: 'Active',
      lastModified: '2024-01-12',
      usage: 890
    }
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
    }, 2000);
  };

  const handleEmailSettingChange = (key: string, value: any) => {
    setEmailSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSmsSettingChange = (key: string, value: any) => {
    setSmsSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handlePushSettingChange = (key: string, value: any) => {
    setPushSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleNotificationPrefChange = (category: string, channel: string, value: boolean) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: value
      }
    }));
    setHasChanges(true);
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
            <h1 className="text-3xl font-bold text-foreground">Communication Settings</h1>
            <p className="text-muted-foreground">Configure email, SMS, and notification settings</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Changes Alert */}
      {hasChanges && (
        <div className="bg-warning-light border border-warning rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span className="text-warning font-medium">Unsaved Changes</span>
          </div>
          <p className="text-warning mt-1">You have unsaved changes. Click "Save Changes" to apply them.</p>
        </div>
      )}

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>Email Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Email Service</Label>
              <p className="text-sm text-muted-foreground">Allow the system to send emails</p>
            </div>
            <Switch
              checked={emailSettings.smtpEnabled}
              onCheckedChange={(value) => handleEmailSettingChange('smtpEnabled', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input
                  id="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={(e) => handleEmailSettingChange('smtpServer', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={(e) => handleEmailSettingChange('smtpPort', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => handleEmailSettingChange('smtpUsername', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) => handleEmailSettingChange('fromName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  value={emailSettings.fromEmail}
                  onChange={(e) => handleEmailSettingChange('fromEmail', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyLimit">Daily Email Limit</Label>
                <Input
                  id="dailyLimit"
                  value={emailSettings.dailyLimit}
                  onChange={(e) => handleEmailSettingChange('dailyLimit', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Bounce Handling</Label>
                <p className="text-sm text-muted-foreground">Automatically handle email bounces</p>
              </div>
              <Switch
                checked={emailSettings.bounceHandling}
                onCheckedChange={(value) => handleEmailSettingChange('bounceHandling', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Queue</Label>
                <p className="text-sm text-muted-foreground">Queue emails for batch processing</p>
              </div>
              <Switch
                checked={emailSettings.emailQueue}
                onCheckedChange={(value) => handleEmailSettingChange('emailQueue', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>SMS Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable SMS Service</Label>
              <p className="text-sm text-muted-foreground">Allow the system to send SMS messages</p>
            </div>
            <Switch
              checked={smsSettings.smsEnabled}
              onCheckedChange={(value) => handleSmsSettingChange('smsEnabled', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">SMS Provider</Label>
                <select
                  id="provider"
                  value={smsSettings.provider}
                  onChange={(e) => handleSmsSettingChange('provider', e.target.value)}
                  className="w-full p-2 border border-border rounded-md"
                >
                  <option value="TextLocal">TextLocal</option>
                  <option value="Twilio">Twilio</option>
                  <option value="AWS SNS">AWS SNS</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderId">Sender ID</Label>
                <Input
                  id="senderId"
                  value={smsSettings.senderId}
                  onChange={(e) => handleSmsSettingChange('senderId', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsLimit">Daily SMS Limit</Label>
                <Input
                  id="smsLimit"
                  value={smsSettings.dailyLimit}
                  onChange={(e) => handleSmsSettingChange('dailyLimit', e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">International SMS</Label>
                  <p className="text-sm text-muted-foreground">Allow sending to international numbers</p>
                </div>
                <Switch
                  checked={smsSettings.internationalSms}
                  onCheckedChange={(value) => handleSmsSettingChange('internationalSms', value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <span>Push Notification Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Send push notifications to mobile apps</p>
            </div>
            <Switch
              checked={pushSettings.pushEnabled}
              onCheckedChange={(value) => handlePushSettingChange('pushEnabled', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Sound Enabled</Label>
                <p className="text-sm text-muted-foreground">Play sound with notifications</p>
              </div>
              <Switch
                checked={pushSettings.soundEnabled}
                onCheckedChange={(value) => handlePushSettingChange('soundEnabled', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Badge Updates</Label>
                <p className="text-sm text-muted-foreground">Update app badge count</p>
              </div>
              <Switch
                checked={pushSettings.badgeUpdates}
                onCheckedChange={(value) => handlePushSettingChange('badgeUpdates', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-center py-3 px-4">Email</th>
                  <th className="text-center py-3 px-4">SMS</th>
                  <th className="text-center py-3 px-4">Push</th>
                  <th className="text-center py-3 px-4">In-App</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(notificationPrefs).map(([category, prefs]) => (
                  <tr key={category} className="border-b border-border">
                    <td className="py-3 px-4 font-medium capitalize">{category.replace('_', ' ')}</td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={prefs.email}
                        onCheckedChange={(value) => handleNotificationPrefChange(category, 'email', value)}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={prefs.sms}
                        onCheckedChange={(value) => handleNotificationPrefChange(category, 'sms', value)}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={prefs.push}
                        onCheckedChange={(value) => handleNotificationPrefChange(category, 'push', value)}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Switch
                        checked={prefs.inApp}
                        onCheckedChange={(value) => handleNotificationPrefChange(category, 'inApp', value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <span>Message Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium text-foreground">{template.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{template.type}</Badge>
                      <Badge variant={template.status === 'Active' ? 'default' : 'secondary'}>
                        {template.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Modified: {template.lastModified}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{template.usage} sent</p>
                    <p className="text-xs text-muted-foreground">this month</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSettingsPage;