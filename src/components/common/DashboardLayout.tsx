import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import RealTimeNotifications from './RealTimeNotifications';
import { 
  Bell,
  LogOut,
  Sun,
  Moon,
  Search
} from 'lucide-react';

interface DashboardTab {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

interface DashboardLayoutProps {
  user: {
    email: string;
    role: string;
    name: string;
    department: string;
    verified: boolean;
  };
  tabs: DashboardTab[];
  onLogout: () => void;
  defaultTab?: string;
  profileImage?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  tabs,
  onLogout,
  defaultTab,
  profileImage
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value || 'overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  // Get user initials
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Unified Header/Navbar */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Left side - Title and Role */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </h1>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            
            {/* Right side - All Icons */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                />
              </div>

              {/* Notifications */}
              <RealTimeNotifications userRole={user.role} />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="relative"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              {/* User Avatar - Only circle, no name */}
              <Avatar className="w-8 h-8 border-2 border-primary/20">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full bg-muted/50" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className="flex items-center space-x-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardLayout;