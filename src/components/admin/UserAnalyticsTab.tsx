import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  EnhancedPieChart,
  EnhancedBarChart,
  AnimatedCounter
} from '../common/AdvancedCharts';
import { userStatsData, departmentData } from '../data/userManagementData';
import { User } from '../types';
import { getUserStats } from '../utils/userManagementUtils';

interface UserAnalyticsTabProps {
  users: User[];
}

export const UserAnalyticsTab: React.FC<UserAnalyticsTabProps> = ({ users }) => {
  const stats = getUserStats(users);

  const departmentKeys = [
    { key: 'active', name: 'Active Users', color: '#10b981' },
    { key: 'users', name: 'Total Users', color: '#4f46e5' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">
                <AnimatedCounter value={stats.total} />
              </div>
              <div className="text-sm text-slate-600">Total Users</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">
                <AnimatedCounter value={stats.active} />
              </div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">
                <AnimatedCounter value={stats.pending} />
              </div>
              <div className="text-sm text-slate-600">Pending Approval</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">
                <AnimatedCounter value={Math.round((stats.active / stats.total) * 100)} suffix="%" />
              </div>
              <div className="text-sm text-slate-600">Active Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution by Role */}
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800">User Distribution by Role</CardTitle>
            <CardDescription>Breakdown of users across different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <EnhancedPieChart 
                data={userStatsData}
                height={300}
                innerRadius={60}
                showLegend={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Department-wise Users */}
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800">Users by Department</CardTitle>
            <CardDescription>Total and active users in each department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <EnhancedBarChart 
                data={departmentData}
                dataKeys={departmentKeys}
                height={300}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Breakdown Table */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Role Statistics</CardTitle>
          <CardDescription>Detailed breakdown of users by role and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-slate-800">Role</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-800">Total Users</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-800">Active</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-800">Inactive</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-800">Pending</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-800">Suspended</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.byRole).map(([role, count]) => {
                  const roleUsers = users.filter(u => u.role === role);
                  const activeCount = roleUsers.filter(u => u.status === 'active').length;
                  const inactiveCount = roleUsers.filter(u => u.status === 'inactive').length;
                  const pendingCount = roleUsers.filter(u => u.status === 'pending').length;
                  const suspendedCount = roleUsers.filter(u => u.status === 'suspended').length;

                  return (
                    <tr key={role} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="font-medium text-slate-800 capitalize">{role}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4 font-medium text-slate-800">{count}</td>
                      <td className="text-center py-3 px-4 text-success">{activeCount}</td>
                      <td className="text-center py-3 px-4 text-slate-600">{inactiveCount}</td>
                      <td className="text-center py-3 px-4 text-warning">{pendingCount}</td>
                      <td className="text-center py-3 px-4 text-error">{suspendedCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};