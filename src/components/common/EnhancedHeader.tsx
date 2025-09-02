import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon,
  Home,
  Briefcase,
  Calendar,
  BarChart3,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import RealTimeNotifications from './RealTimeNotifications';
import srmLogo from 'figma:asset/8adb1464fcd29d400a034aaa328a389ecd3fd792.png';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department: string;
}

interface EnhancedHeaderProps {
  user: User;
  onSearch?: (query: string) => void;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  className?: string;
}

const quickNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Jobs & Internships', path: '/jobs' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: HelpCircle, label: 'Support', path: '/support' }
];

export default function EnhancedHeader({ 
  user, 
  onSearch, 
  onNavigate, 
  onLogout,
  className = '' 
}: EnhancedHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Simulate notification count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-500',
      faculty: 'bg-emerald-500',
      outreach: 'bg-purple-500',
      operations: 'bg-orange-500',
      admin: 'bg-red-500'
    };
    return colors[role as keyof typeof colors] || 'bg-slate-500';
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      student: 'Student',
      faculty: 'Faculty',
      outreach: 'Outreach',
      operations: 'Operations',
      admin: 'Admin'
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img src={srmLogo} alt="SRM Logo" className="w-8 h-8" />
                      <span className="font-semibold">SRM Portal</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* User Info */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className={getRoleColor(user.role)}>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {getRoleLabel(user.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-4">
                    <nav className="space-y-2">
                      {quickNavItems.map((item) => (
                        <Button
                          key={item.path}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            onNavigate?.(item.path);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t space-y-2">
                    <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
                      {darkMode ? <Sun className="mr-3 h-4 w-4" /> : <Moon className="mr-3 h-4 w-4" />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive" onClick={onLogout}>
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <img src={srmLogo} alt="SRM University AP" className="w-8 h-8" />
              <span className="font-semibold text-lg">SRM Portal</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex flex-1 items-center justify-center px-4">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs, companies, students..."
                  className="w-full pl-10 pr-4 bg-muted/50 border-0 focus:bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle - Desktop */}
            <Button variant="ghost" size="sm" className="hidden md:flex" onClick={toggleTheme}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-error">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className={getRoleColor(user.role)}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-4">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {getRoleLabel(user.role)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{user.department}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate?.('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate?.('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Quick Actions Bar - Mobile */}
        <div className="md:hidden border-t bg-muted/30 px-4 py-2">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {quickNavItems.slice(0, 4).map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={() => onNavigate?.(item.path)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      <RealTimeNotifications
        userRole={user.role}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}