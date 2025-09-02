import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PageHeader } from '../common/PageHeader';
import { RaiseTicketModal } from '../common/RaiseTicketModal';
import { UserListTab } from '../admin/UserListTab';
import { UserAnalyticsTab } from '../admin/UserAnalyticsTab';
import { 
  Users, 
  UserPlus, 
  Download,
  Upload,
  Settings,
  Shield
} from 'lucide-react';
import { mockUsers, systemSettings, rolePermissions } from '../data/userManagementData';
import { User } from '../types';
import { AnimatedCounter } from '../common/AdvancedCharts';
import { getUserStats } from '../utils/userManagementUtils';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const stats = getUserStats(users);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUsersChange = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <PageHeader 
        title="User Management"
        description="Manage users, roles, and permissions across the platform"
        actions={
          <div className="flex items-center space-x-2">
            <RaiseTicketModal 
              userEmail="admin@university.edu.in"
              userRole="admin"
              userName="Admin User"
            />
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Users
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
            <Button onClick={() => setShowAddUser(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        }
      />

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={stats.total} />
                </div>
                <div className="text-sm text-slate-600">Total Users</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={stats.active} />
                </div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={stats.pending} />
                </div>
                <div className="text-sm text-slate-600">Pending</div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={stats.suspended} />
                </div>
                <div className="text-sm text-slate-600">Suspended</div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  <AnimatedCounter value={5} />
                </div>
                <div className="text-sm text-slate-600">User Roles</div>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-primary/20">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">All Users</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">User Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserListTab 
              users={users}
              onUsersChange={handleUsersChange}
              onUserSelect={handleUserSelect}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <UserAnalyticsTab users={users} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemSettings.map((category, index) => (
                <div key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
                  <h3 className="text-slate-800 mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={settingIndex} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-800">{setting.label}</div>
                          {setting.type === 'boolean' ? (
                            <div className="text-sm text-slate-600">
                              {setting.value ? 'Enabled' : 'Disabled'}
                            </div>
                          ) : (
                            <div className="text-sm text-slate-600">{setting.value}</div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8">
              <UserPlus className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600">User creation form will be implemented here</p>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">Create User</Button>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};