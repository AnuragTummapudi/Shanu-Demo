export type PageType = 
  | 'dashboard'
  | 'job-detail' 
  | 'company-detail'
  | 'student-detail'
  | 'profile-edit'
  | 'resume-builder'
  | 'resume-management'
  | 'skills-management'
  | 'interview-management'
  | 'training-management'
  | 'document-management'
  | 'notification-center'
  | 'assessment-system'
  | 'training-session'
  | 'attendance-marking'
  | 'report-generation'
  | 'user-management'
  | 'faculty-profile'
  | 'student-profile'
  | 'operations-profile'
  | 'outreach-profile'
  | 'super-admin-profile'
  | 'raise-ticket'
  | 'test-navigation'
  | 'applications-list'
  | 'company-management'
  | 'interview-scheduler'
  | 'performance-analytics'
  | 'application-detail'
  | 'application-edit'
  | 'company-add'
  | 'company-analytics'
  | 'partnership-management'
  | 'settings'
  | 'course-management'
  | 'course-add'
  | 'course-edit';

export interface NavigationState {
  currentPage: PageType;
  currentData: any;
  currentTitle: string;
  breadcrumbs: Array<{
    label: string;
    page: PageType;
    data?: any;
  }>;
}

export interface NavigationContextType {
  navigationState: NavigationState;
  navigateTo: (page: PageType, data?: any, title?: string) => void;
  goBack: () => void;
  addBreadcrumb: (label: string, page: PageType, data?: any) => void;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
}

export interface NavigatedPageProps {
  children: React.ReactNode;
  userRole: string;
}