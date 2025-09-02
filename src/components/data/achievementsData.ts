import { Award, Zap, Users, Building, CheckCircle, Settings, Star, GraduationCap, Target, TrendingUp, Briefcase, Presentation } from 'lucide-react';

export const operationsAchievements = [
  { title: 'Operations Excellence', icon: Award, description: 'Outstanding operational efficiency', earned: true, date: 'Dec 2023' },
  { title: 'Process Innovator', icon: Zap, description: 'Implemented 5+ process improvements', earned: true, date: 'Nov 2023' },
  { title: 'Student Advocate', icon: Users, description: 'Resolved 2800+ student queries', earned: true, date: 'Oct 2023' },
  { title: 'Company Partner', icon: Building, description: 'Managed 150+ company relationships', earned: true, date: 'Sep 2023' },
  { title: 'Quality Champion', icon: CheckCircle, description: '99%+ accuracy in processing', earned: true, date: 'Aug 2023' },
  { title: 'Technology Adopter', icon: Settings, description: 'Digitized 80%+ of processes', earned: false }
];

export const facultyAchievements = [
  { title: 'Research Excellence', icon: Award, description: '40+ publications', earned: true, date: 'Dec 2023' },
  { title: 'Teaching Champion', icon: GraduationCap, description: '4.7+ rating consistently', earned: true, date: 'Nov 2023' },
  { title: 'Innovation Leader', icon: Target, description: '3 patents filed', earned: true, date: 'Sep 2023' },
  { title: 'Mentor Extraordinaire', icon: Users, description: '50+ students guided', earned: true, date: 'Aug 2023' },
  { title: 'Conference Speaker', icon: Presentation, description: '20+ keynotes delivered', earned: true, date: 'Jul 2023' },
  { title: 'Industry Collaborator', icon: Briefcase, description: 'Active industry partnerships', earned: false }
];

export const studentAchievements = [
  { title: 'Top Performer', icon: Star, description: 'Top 10% in class', earned: true },
  { title: 'Project Master', icon: Award, description: '5+ projects completed', earned: true },
  { title: 'Team Player', icon: Users, description: 'Excellent collaboration', earned: true },
  { title: 'Innovation Award', icon: Target, description: 'Creative solutions', earned: false },
  { title: 'Leadership Excellence', icon: TrendingUp, description: 'Led 3+ teams', earned: true },
  { title: 'Industry Ready', icon: Briefcase, description: 'Internship completed', earned: true }
];