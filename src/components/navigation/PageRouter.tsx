import React from 'react';
import { PageType, NavigationState } from './NavigationTypes';

// Static imports for page components
import { JobDetailPage } from '../pages/JobDetailPage';
import { CompanyDetailPage } from '../pages/CompanyDetailPage';
import { StudentDetailPage } from '../pages/StudentDetailPage';
import { ProfileEditPage } from '../pages/ProfileEditPage';
import ResumeBuilderPage from '../pages/ResumeBuilderPage';
import { TrainingSessionPage } from '../pages/TrainingSessionPage';
import AttendanceMarkingPage from '../pages/AttendanceMarkingPage';
import { ReportGenerationPage } from '../pages/ReportGenerationPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import EnhancedFacultyProfilePage from '../pages/EnhancedFacultyProfilePage';
import EnhancedStudentProfilePage from '../pages/EnhancedStudentProfilePage';
import EnhancedOperationsProfilePage from '../pages/EnhancedOperationsProfilePage';
import { OutreachProfilePage } from '../pages/OutreachProfilePage';
import { SuperAdminProfilePage } from '../pages/SuperAdminProfilePage';
import { RaiseTicketPage } from '../pages/RaiseTicketPage';
import { TestNavigationPage } from '../pages/TestNavigationPage';
import { ApplicationsListPage } from '../pages/ApplicationsListPage';
import { CompanyManagementPage } from '../pages/CompanyManagementPage';
import { InterviewSchedulerPage } from '../pages/InterviewSchedulerPage';
import { PerformanceAnalyticsPage } from '../pages/PerformanceAnalyticsPage';
import { ApplicationDetailPage } from '../pages/ApplicationDetailPage';
import { ApplicationEditPage } from '../pages/ApplicationEditPage';
import { CompanyAddPage } from '../pages/CompanyAddPage';
import { CompanyAnalyticsPage } from '../pages/CompanyAnalyticsPage';
import PartnershipManagementPage from '../pages/PartnershipManagementPage';
import { SettingsPage } from '../pages/SettingsPage';
import CourseManagementPage from '../pages/CourseManagementPage';
import { CourseAddPage } from '../pages/CourseAddPage';
import { CourseEditPage } from '../pages/CourseEditPage';
import InterviewManagementPage from '../pages/InterviewManagementPage';
import TrainingManagementPage from '../pages/TrainingManagementPage';
import DocumentManagementPage from '../pages/DocumentManagementPage';
import NotificationCenterPage from '../pages/NotificationCenterPage';
import AssessmentSystemPage from '../pages/AssessmentSystemPage';
import SkillsManagementPage from '../pages/profile/SkillsManagementPage';
import ResumeManagementPage from '../pages/ResumeManagementPage';

// New Super Admin Pages
import SystemMonitoringPage from '../pages/SystemMonitoringPage';
import BackupManagementPage from '../pages/BackupManagementPage';
import PlacementPoliciesPage from '../pages/PlacementPoliciesPage';
import AcademicPoliciesPage from '../pages/AcademicPoliciesPage';
import UniversityAnnouncementsPage from '../pages/UniversityAnnouncementsPage';
import CommunicationSettingsPage from '../pages/CommunicationSettingsPage';
import DetailedAnalyticsPage from '../pages/DetailedAnalyticsPage';
import StudentGuidelinesPage from '../pages/StudentGuidelinesPage';

export const renderPage = (navigationState: NavigationState, userRole: string, children: React.ReactNode): React.ReactNode => {
  switch (navigationState.currentPage) {
    case 'dashboard':
      return children;
    case 'job-detail':
      return <JobDetailPage job={navigationState.currentData} userRole={userRole} />;
    case 'company-detail':
      return <CompanyDetailPage company={navigationState.currentData} />;
    case 'student-detail':
      return <StudentDetailPage student={navigationState.currentData} />;
    case 'profile-edit':
      return <ProfileEditPage profile={navigationState.currentData} />;
    case 'resume-builder':
      return <ResumeBuilderPage userData={navigationState.currentData} />;
    case 'resume-management':
      return <ResumeManagementPage 
        userId={navigationState.currentData?.userId || '1'} 
        userName={navigationState.currentData?.userName || 'Student'}
        userRole={userRole as any}
        onNavigateBack={() => window.history.back()} 
      />;
    case 'skills-management':
      return <SkillsManagementPage />;
    case 'interview-management':
      return <InterviewManagementPage />;
    case 'training-management':
      return <TrainingManagementPage />;
    case 'document-management':
      return <DocumentManagementPage />;
    case 'notification-center':
      return <NotificationCenterPage />;
    case 'assessment-system':
      return <AssessmentSystemPage />;
    case 'training-session':
      return <TrainingSessionPage session={navigationState.currentData} />;
    case 'attendance-marking':
      return <AttendanceMarkingPage userRole={userRole} />;
    case 'report-generation':
      return <ReportGenerationPage />;
    case 'user-management':
      return <UserManagementPage />;
    case 'faculty-profile':
      return <EnhancedFacultyProfilePage faculty={navigationState.currentData} />;
    case 'student-profile':
      return <EnhancedStudentProfilePage student={navigationState.currentData} />;
    case 'operations-profile':
      return <EnhancedOperationsProfilePage profile={navigationState.currentData} />;
    case 'outreach-profile':
      return <OutreachProfilePage profile={navigationState.currentData} />;
    case 'super-admin-profile':
      return <SuperAdminProfilePage profile={navigationState.currentData} />;
    case 'raise-ticket':
      return <RaiseTicketPage {...(navigationState.currentData || {})} />;
    case 'test-navigation':
      return <TestNavigationPage />;
    case 'applications-list':
      return <ApplicationsListPage userRole={userRole} />;
    case 'company-management':
      return <CompanyManagementPage />;
    case 'interview-scheduler':
      return <InterviewSchedulerPage application={navigationState.currentData} />;
    case 'performance-analytics':
      return <PerformanceAnalyticsPage />;
    case 'application-detail':
      return <ApplicationDetailPage application={navigationState.currentData} />;
    case 'application-edit':
      return <ApplicationEditPage application={navigationState.currentData} />;
    case 'company-add':
      return <CompanyAddPage />;
    case 'company-analytics':
      return <CompanyAnalyticsPage />;
    case 'partnership-management':
      return <PartnershipManagementPage />;
    case 'settings':
      return <SettingsPage />;
    case 'course-management':
      return <CourseManagementPage />;
    case 'course-add':
      return <CourseAddPage />;
    case 'course-edit':
      return <CourseEditPage course={navigationState.currentData} />;
    
    // New Super Admin Pages
    case 'system-monitoring':
      return <SystemMonitoringPage onBack={() => window.history.back()} />;
    case 'backup-management':
      return <BackupManagementPage onBack={() => window.history.back()} />;
    case 'placement-policies':
      return <PlacementPoliciesPage onBack={() => window.history.back()} />;
    case 'academic-policies':
      return <AcademicPoliciesPage onBack={() => window.history.back()} />;
    case 'announcements':
      return <UniversityAnnouncementsPage onBack={() => window.history.back()} />;
    case 'communication-settings':
      return <CommunicationSettingsPage onBack={() => window.history.back()} />;
    case 'detailed-analytics':
      return <DetailedAnalyticsPage onBack={() => window.history.back()} />;
    case 'student-guidelines':
      return <StudentGuidelinesPage onBack={() => window.history.back()} />;
    
    default:
      return children;
  }
};