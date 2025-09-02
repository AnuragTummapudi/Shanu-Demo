import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Database, Calendar, CheckCircle, AlertTriangle, Clock, HardDrive, RefreshCw, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { exportToCSV } from '../utils/csvExport';

interface BackupManagementPageProps {
  onBack: () => void;
}

const BackupManagementPage: React.FC<BackupManagementPageProps> = ({ onBack }) => {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  // Backup Status Overview
  const backupOverview = {
    lastBackup: '2024-01-15 03:00:00',
    nextScheduled: '2024-01-16 03:00:00',
    totalSize: '145.2 GB',
    successRate: '99.5%',
    retentionPeriod: '30 days',
    storageUsed: 78
  };

  // Recent Backup History
  const backupHistory = [
    {
      id: 'backup_001',
      date: '2024-01-15',
      time: '03:00:00',
      type: 'Full Backup',
      status: 'Completed',
      size: '15.6 GB',
      duration: '45 min',
      location: 'Primary Storage'
    },
    {
      id: 'backup_002',
      date: '2024-01-14',
      time: '03:00:00',
      type: 'Incremental',
      status: 'Completed',
      size: '2.3 GB',
      duration: '12 min',
      location: 'Primary Storage'
    },
    {
      id: 'backup_003',
      date: '2024-01-13',
      time: '03:00:00',
      type: 'Incremental',
      status: 'Completed',
      size: '1.8 GB',
      duration: '8 min',
      location: 'Primary Storage'
    },
    {
      id: 'backup_004',
      date: '2024-01-12',
      time: '03:00:00',
      type: 'Full Backup',
      status: 'Failed',
      size: '0 GB',
      duration: '5 min',
      location: 'Primary Storage',
      error: 'Network timeout during backup process'
    },
    {
      id: 'backup_005',
      date: '2024-01-11',
      time: '03:00:00',
      type: 'Incremental',
      status: 'Completed',
      size: '3.1 GB',
      duration: '15 min',
      location: 'Primary Storage'
    }
  ];

  // Backup Configuration
  const backupConfig = {
    schedule: {
      frequency: 'Daily',
      time: '03:00',
      timezone: 'IST (UTC+5:30)'
    },
    retention: {
      daily: '7 days',
      weekly: '4 weeks',
      monthly: '12 months',
      yearly: '5 years'
    },
    storage: {
      primary: 'AWS S3 - ap-south-1',
      secondary: 'Google Cloud Storage',
      encryption: 'AES-256',
      compression: 'Enabled'
    }
  };

  // System Components Backup Status
  const componentStatus = [
    {
      component: 'Student Database',
      lastBackup: '2024-01-15 03:15:00',
      size: '8.2 GB',
      status: 'Completed',
      health: 'Healthy'
    },
    {
      component: 'Faculty Database',
      lastBackup: '2024-01-15 03:20:00',
      size: '2.1 GB',
      status: 'Completed',
      health: 'Healthy'
    },
    {
      component: 'Job Applications',
      lastBackup: '2024-01-15 03:25:00',
      size: '3.8 GB',
      status: 'Completed',
      health: 'Healthy'
    },
    {
      component: 'Document Storage',
      lastBackup: '2024-01-15 03:30:00',
      size: '1.5 GB',
      status: 'Completed',
      health: 'Healthy'
    },
    {
      component: 'System Configuration',
      lastBackup: '2024-01-15 03:35:00',
      size: '0.02 GB',
      status: 'Completed',
      health: 'Healthy'
    }
  ];

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false);
    }, 3000);
  };

  const handleExportBackupReport = () => {
    const reportData = backupHistory.map(backup => ({
      'Backup ID': backup.id,
      'Date': backup.date,
      'Time': backup.time,
      'Type': backup.type,
      'Status': backup.status,
      'Size': backup.size,
      'Duration': backup.duration,
      'Location': backup.location,
      'Error': backup.error || 'None'
    }));

    exportToCSV(reportData, 'backup_history_report');
  };

  const handleExportComponentStatus = () => {
    const componentData = componentStatus.map(component => ({
      'Component': component.component,
      'Last Backup': component.lastBackup,
      'Size': component.size,
      'Status': component.status,
      'Health': component.health
    }));

    exportToCSV(componentData, 'backup_component_status');
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
            <h1 className="text-3xl font-bold text-foreground">Data Backup Management</h1>
            <p className="text-muted-foreground">Monitor and manage system backups and data recovery</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
          >
            <Play className={`w-4 h-4 mr-2 ${isCreatingBackup ? 'animate-spin' : ''}`} />
            {isCreatingBackup ? 'Creating...' : 'Create Backup'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportBackupReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {isCreatingBackup && (
        <Alert>
          <RefreshCw className="w-4 h-4 animate-spin" />
          <AlertDescription>
            Creating manual backup... This may take several minutes depending on data size.
          </AlertDescription>
        </Alert>
      )}

      {/* Backup Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                <p className="text-lg font-bold text-foreground">15 Jan, 03:00</p>
                <p className="text-xs text-success">Completed Successfully</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Scheduled</p>
                <p className="text-lg font-bold text-foreground">16 Jan, 03:00</p>
                <p className="text-xs text-info">In 14 hours</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Size</p>
                <p className="text-lg font-bold text-foreground">{backupOverview.totalSize}</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <HardDrive className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-lg font-bold text-success">{backupOverview.successRate}</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <span>Backup Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Schedule Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="font-medium">{backupConfig.schedule.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{backupConfig.schedule.time} {backupConfig.schedule.timezone}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Retention Policy</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Backups:</span>
                  <span className="font-medium">{backupConfig.retention.daily}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekly Backups:</span>
                  <span className="font-medium">{backupConfig.retention.weekly}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Backups:</span>
                  <span className="font-medium">{backupConfig.retention.monthly}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Storage Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary:</span>
                  <span className="font-medium">{backupConfig.storage.primary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encryption:</span>
                  <span className="font-medium">{backupConfig.storage.encryption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compression:</span>
                  <span className="font-medium">{backupConfig.storage.compression}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HardDrive className="w-5 h-5 text-primary" />
              <span>Storage Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">{backupOverview.storageUsed}%</span>
              </div>
              <Progress value={backupOverview.storageUsed} />
              <p className="text-xs text-muted-foreground mt-1">
                {backupOverview.totalSize} of 200 GB used
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Primary Storage</span>
                <Badge variant="outline" className="text-success border-success">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Secondary Storage</span>
                <Badge variant="outline" className="text-success border-success">Synced</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Encryption Status</span>
                <Badge variant="outline" className="text-success border-success">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Backup Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Component Backup Status</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleExportComponentStatus}>
            <Download className="w-4 h-4 mr-2" />
            Export Status
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {componentStatus.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{component.component}</h4>
                  <p className="text-sm text-muted-foreground">Last backup: {component.lastBackup}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{component.size}</p>
                    <p className="text-xs text-muted-foreground">{component.status}</p>
                  </div>
                  <Badge variant={component.health === 'Healthy' ? 'default' : 'destructive'}>
                    {component.health}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Backup History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Recent Backup History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {backup.status === 'Completed' ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-error" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{backup.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {backup.date} at {backup.time}
                    </p>
                    {backup.error && (
                      <p className="text-xs text-error mt-1">{backup.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{backup.size}</p>
                    <p className="text-xs text-muted-foreground">{backup.duration}</p>
                  </div>
                  <Badge variant={backup.status === 'Completed' ? 'default' : 'destructive'}>
                    {backup.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManagementPage;