import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { upcomingSessions, performanceData } from '../data/studentData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigation } from '../navigation/NavigationProvider';

export const TrainingTab: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleTrainingClick = (session: any) => {
    navigateTo('training-session', session, session.title);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-900">Training Dashboard</h2>
        <p className="text-blue-600">Track your learning progress and upcoming sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 rounded-lg border border-blue-100 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
                   onClick={() => handleTrainingClick(session)}>
                <h4 className="text-blue-900">{session.title}</h4>
                <p className="text-sm text-blue-600">by {session.instructor}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>{session.date} at {session.time}</span>
                  <span>{session.venue}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="preScore" fill="#f59e0b" name="Pre-Training" />
                  <Bar dataKey="postScore" fill="#3b82f6" name="Post-Training" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};