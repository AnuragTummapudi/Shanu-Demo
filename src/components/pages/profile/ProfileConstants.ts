import { 
  Star, 
  Award, 
  Users, 
  Target, 
  TrendingUp, 
  Briefcase 
} from 'lucide-react';

// Achievement definitions
export const achievements = [
  { id: 'achievement-1', title: 'Top Performer', icon: Star, description: 'Top 10% in class', earned: true },
  { id: 'achievement-2', title: 'Project Master', icon: Award, description: '5+ projects completed', earned: true },
  { id: 'achievement-3', title: 'Team Player', icon: Users, description: 'Excellent collaboration', earned: true },
  { id: 'achievement-4', title: 'Innovation Award', icon: Target, description: 'Creative solutions', earned: false },
  { id: 'achievement-5', title: 'Leadership Excellence', icon: TrendingUp, description: 'Led 3+ teams', earned: true },
  { id: 'achievement-6', title: 'Industry Ready', icon: Briefcase, description: 'Internship completed', earned: true }
];

// Tab configuration
export const profileTabs = [
  { value: 'overview', label: 'Overview', icon: 'User' },
  { value: 'academic', label: 'Academic', icon: 'GraduationCap' },
  { value: 'experience', label: 'Experience', icon: 'Briefcase' },
  { value: 'skills', label: 'Skills', icon: 'Award' },
  { value: 'achievements', label: 'Achievements', icon: 'Star' },
  { value: 'career', label: 'Career', icon: 'Target' },
  { value: 'resume', label: 'Resume', icon: 'FileText' }
];

// Color schemes for different elements
export const colorSchemes = {
  stats: [
    'from-blue-50 to-cyan-50',
    'from-green-50 to-emerald-50',
    'from-purple-50 to-pink-50',
    'from-orange-50 to-red-50'
  ],
  icons: {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  }
};

// Animation delays for staggered effects
export const animationDelays = {
  skill: (index: number) => index * 0.1,
  achievement: (index: number) => index * 0.1,
  stat: (index: number) => index * 0.1
};

// Default trends for stats
export const defaultTrends = [5.2, 12.5, -2.1, 8.3];