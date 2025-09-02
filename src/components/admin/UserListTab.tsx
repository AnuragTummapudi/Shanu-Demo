import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';
import { User } from '../types';
import { getRoleColor, getStatusColor, filterUsers, updateUserStatus, deleteUser } from '../utils/userManagementUtils';

interface UserListTabProps {
  users: User[];
  onUsersChange: (users: User[]) => void;
  onUserSelect: (user: User) => void;
}

export const UserListTab: React.FC<UserListTabProps> = ({ 
  users, 
  onUsersChange, 
  onUserSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = filterUsers(users, searchTerm, filterRole, filterStatus);

  const handleStatusUpdate = (userId: number, newStatus: User['status']) => {
    const updatedUsers = updateUserStatus(users, userId, newStatus);
    onUsersChange(updatedUsers);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = deleteUser(users, userId);
    onUsersChange(updatedUsers);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-info" />;
      case 'suspended': return <AlertCircle className="w-4 h-4 text-error" />;
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-white text-slate-600"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="outreach">Outreach</option>
              <option value="operations">Operations</option>
              <option value="admin">Admin</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-white text-slate-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>

            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Users</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-800">{user.name}</div>
                    <div className="text-sm text-slate-600">{user.email}</div>
                    <div className="text-xs text-slate-500">
                      {user.department} • Joined {user.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <div className="text-xs text-slate-500 mt-1">
                      Last login: {user.lastLogin}
                    </div>
                  </div>

                  <Badge className={getStatusColor(user.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(user.status)}
                      <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                    </div>
                  </Badge>

                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">{user.profileCompleted}%</div>
                    <div className="text-xs text-slate-500">Profile</div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUserSelect(user)}
                      className="border-primary/20 text-primary hover:bg-primary/5"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/5"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    {user.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/20 text-primary hover:bg-primary/5"
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/5"
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="border-error/20 text-error hover:bg-error/5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};