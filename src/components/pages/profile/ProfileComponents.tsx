import React from 'react';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { motion } from 'motion/react';
import { TrendingUp, Star, CheckCircle, Clock, Users, AlertCircle } from 'lucide-react';

interface SkillMeterProps {
  skill: string;
  level: number;
  index: number;
}

export const SkillMeter: React.FC<SkillMeterProps> = ({ skill, level, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="space-y-2"
  >
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-800">{skill}</span>
      <span className="text-xs text-slate-500">{level}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
      />
    </div>
  </motion.div>
);

interface AchievementBadgeProps {
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  earned?: boolean;
  index: number;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  title, 
  icon: Icon, 
  description, 
  earned = true, 
  index 
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-4 rounded-xl border-2 ${
      earned 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
        : 'bg-slate-50 border-slate-200 opacity-60'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${earned ? 'bg-yellow-500' : 'bg-slate-400'}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h4 className={`font-medium ${earned ? 'text-slate-800' : 'text-slate-500'}`}>{title}</h4>
        <p className={`text-xs ${earned ? 'text-slate-600' : 'text-slate-400'}`}>{description}</p>
      </div>
    </div>
  </motion.div>
);

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: number;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  index 
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-6 rounded-xl bg-gradient-to-br ${color} border-0 shadow-lg relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 opacity-10">
      <Icon className="w-16 h-16" />
    </div>
    <div className="relative">
      <Icon className={`w-8 h-8 mb-3 ${color.includes('blue') ? 'text-blue-600' : 
                       color.includes('green') ? 'text-green-600' :
                       color.includes('purple') ? 'text-purple-600' : 'text-orange-600'}`} />
      <div className="text-2xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-2">{label}</div>
      {trend && (
        <div className={`text-xs flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-3 h-3 mr-1" />
          {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
        </div>
      )}
    </div>
  </motion.div>
);

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<any>;
  color?: string;
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color = 'bg-white',
  description 
}) => (
  <Card className={`${color} hover:shadow-md transition-shadow`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            changeType === 'increase' ? 'text-green-600' :
            changeType === 'decrease' ? 'text-red-600' : 'text-slate-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${changeType === 'decrease' ? 'rotate-180' : ''}`} />
            <span>{change}</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

interface ProcessCardProps {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'cancelled';
  assignedTo?: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
  progress?: number;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ 
  title, 
  description, 
  status, 
  assignedTo, 
  deadline, 
  priority = 'medium',
  progress 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      case 'pending':
        return AlertCircle;
      case 'cancelled':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getPriorityColor(priority)}>
                {priority}
              </Badge>
              <Badge variant="outline" className={getStatusColor(status)}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-slate-500">
            {assignedTo && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{assignedTo}</span>
              </div>
            )}
            {deadline && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{deadline}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PlacementCardProps {
  placement: {
    id: string;
    company: string;
    package: string;
    role: string;
    status: string;
  };
  index: number;
}

export const PlacementCard: React.FC<PlacementCardProps> = ({ placement, index }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-primary rounded-lg">
        <TrendingUp className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="font-medium text-slate-800">{placement.company}</div>
        <div className="text-sm text-slate-600">{placement.role} • {placement.package}</div>
      </div>
    </div>
    <Badge className={`${
      placement.status === 'Offered' ? 'bg-green-100 text-green-800' :
      placement.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
      'bg-orange-100 text-orange-800'
    }`}>
      {placement.status}
    </Badge>
  </div>
);

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    duration: string;
    status: string;
    impact: string;
  };
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <div className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{project.title}</h3>
        <p className="text-slate-600 mb-3">{project.description}</p>
      </div>
      <Badge className={`${
        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        'bg-orange-100 text-orange-800'
      }`}>
        {project.status}
      </Badge>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {project.technologies.map((tech: string, techIndex: number) => (
        <Badge key={`${project.id}-tech-${techIndex}`} variant="outline" className="text-xs">
          {tech}
        </Badge>
      ))}
    </div>
    <div className="flex items-center space-x-4 text-sm text-slate-500">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        {project.duration}
      </div>
      <div className="flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" />
        {project.impact}
      </div>
    </div>
  </div>
);

interface ExperienceCardProps {
  experience: {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    skills: string[];
    rating: number;
  };
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => (
  <div className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{experience.position}</h3>
        <p className="text-slate-600">{experience.company} • {experience.duration}</p>
        <p className="text-slate-600 mt-2">{experience.description}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="font-medium">{experience.rating}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {experience.skills.map((skill: string, skillIndex: number) => (
        <Badge key={`${experience.id}-skill-${skillIndex}`} variant="outline" className="text-xs">
          {skill}
        </Badge>
      ))}
    </div>
  </div>
);