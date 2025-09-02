import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { applications } from '../data/studentData';

export const ApplicationsTab: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-900">My Applications</h2>
        <p className="text-blue-600">Track the status of your job and internship applications</p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="bg-white border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-blue-900">{app.position}</h3>
                  <p className="text-blue-600">{app.company}</p>
                  <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
                </div>
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-blue-600">{app.progress}%</span>
                </div>
                <Progress value={app.progress} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">{app.nextStep}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};