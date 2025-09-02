import React from 'react';
import { Button } from '../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export default function BreadcrumbNavigation({ 
  items, 
  onNavigate, 
  showBackButton = true, 
  onBack,
  className = ""
}: BreadcrumbNavigationProps) {
  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showBackButton && onBack && (
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}
      
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.current ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    onClick={() => item.href && handleNavigate(item.href)}
                    className="cursor-pointer hover:text-primary"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Common breadcrumb paths for different user roles
export const getBreadcrumbsForPage = (
  userRole: string, 
  currentPage: string, 
  additionalContext?: { studentName?: string; jobTitle?: string; companyName?: string }
): BreadcrumbItem[] => {
  const basePaths: Record<string, BreadcrumbItem[]> = {
    student: [
      { label: 'Dashboard', href: '/dashboard' }
    ],
    faculty: [
      { label: 'Faculty Dashboard', href: '/faculty-dashboard' }
    ],
    outreach: [
      { label: 'Outreach Dashboard', href: '/outreach-dashboard' }
    ],
    operations: [
      { label: 'Operations Dashboard', href: '/operations-dashboard' }
    ],
    admin: [
      { label: 'Admin Dashboard', href: '/admin-dashboard' }
    ]
  };

  const base = basePaths[userRole] || [{ label: 'Dashboard', href: '/dashboard' }];

  switch (currentPage) {
    case 'profile':
      return [...base, { label: 'Profile', current: true }];
    
    case 'profile-edit':
      return [
        ...base, 
        { label: 'Profile', href: '/profile' },
        { label: 'Edit Profile', current: true }
      ];
    
    case 'resume-management':
      return [...base, { label: 'Resume Management', current: true }];
    
    case 'applications':
      return [...base, { label: 'My Applications', current: true }];
    
    case 'application-detail':
      return [
        ...base,
        { label: 'My Applications', href: '/applications' },
        { label: 'Application Details', current: true }
      ];
    
    case 'job-detail':
      return [
        ...base,
        { label: 'Jobs', href: '/jobs' },
        { label: additionalContext?.jobTitle || 'Job Details', current: true }
      ];
    
    case 'student-detail':
      return [
        ...base,
        { label: 'Students', href: '/students' },
        { label: additionalContext?.studentName || 'Student Details', current: true }
      ];
    
    case 'company-detail':
      return [
        ...base,
        { label: 'Companies', href: '/companies' },
        { label: additionalContext?.companyName || 'Company Details', current: true }
      ];
    
    case 'settings':
      return [...base, { label: 'Settings', current: true }];
    
    case 'notifications':
      return [...base, { label: 'Notifications', current: true }];
    
    case 'raise-ticket':
      return [...base, { label: 'Raise Ticket', current: true }];
    
    default:
      return base;
  }
};