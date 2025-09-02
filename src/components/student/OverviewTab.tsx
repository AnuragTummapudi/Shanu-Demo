import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RaiseTicketModal } from '../common/RaiseTicketModal';
import { 
  Calendar, 
  User, 
  Briefcase, 
  TrendingUp, 
  Award,
  HelpCircle
} from 'lucide-react';
import { 
  EnhancedLineChart, 
  EnhancedPieChart, 
  GradientProgressRing,
  AnimatedCounter
} from '../common/AdvancedCharts';
import { performanceData, applicationStatusData, upcomingSessions } from '../data/studentData';
import { Student } from '../types';
import { useNavigation } from '../navigation/NavigationProvider';

interface OverviewTabProps {
  student: Student;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ student }) => {
  const { navigateTo } = useNavigation();

  const handleTrainingClick = (session: any) => {
    navigateTo('training-session', session, session.title);
  };

  const chartDataKeys = [
    { key: 'preScore', name: 'Pre-Training', color: '#f59e0b' },
    { key: 'postScore', name: 'Post-Training', color: '#4f46e5' }
  ];

  return (
    <div className="space-y-8">
      {/* Header with User Info */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl border border-primary/10">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Welcome back, {student.name}!</h2>
          <p className="text-slate-600 mt-1">
            <span className="font-medium">Email:</span> {student.email} • 
            <span className="font-medium ml-2">Department:</span> {student.department}
          </p>
        </div>
        <RaiseTicketModal 
          userEmail={student.email}
          userRole="student"
          userName={student.name}
        />
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Applications</p>
                <p className="text-3xl font-bold text-slate-800">
                  <AnimatedCounter value={22} />
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Interviews</p>
                <p className="text-3xl font-bold text-slate-800">
                  <AnimatedCounter value={5} />
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Offers</p>
                <p className="text-3xl font-bold text-slate-800">
                  <AnimatedCounter value={2} />
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Training Score</p>
                <p className="text-3xl font-bold text-slate-800">
                  <AnimatedCounter value={92} suffix="%" />
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Profile Completion */}
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800">Profile Completion</CardTitle>
            <CardDescription>Complete your profile to increase job visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <GradientProgressRing 
                progress={student.profileCompleted} 
                size={140}
                strokeWidth={12}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    <AnimatedCounter value={student.profileCompleted} suffix="%" />
                  </div>
                  <div className="text-sm text-slate-600">Complete</div>
                </div>
              </GradientProgressRing>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Basic Info</span>
                <span className="flex items-center text-success">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Complete
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Skills</span>
                <span className="flex items-center text-success">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Complete
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Projects</span>
                <span className="flex items-center text-success">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Complete
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Portfolio</span>
                <span className="flex items-center text-warning">
                  <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                  Pending
                </span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigateTo('profile-edit', student, 'Edit Profile')}
            >
              Complete Profile
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Sessions */}
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800">Upcoming Training</CardTitle>
            <CardDescription>Your scheduled training sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.slice(0, 3).map((session, index) => (
              <div 
                key={session.id} 
                className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-purple-600/5 cursor-pointer hover:from-primary/10 hover:to-purple-600/10 transition-all duration-300 border border-primary/10"
                onClick={() => handleTrainingClick(session)}
              >
                <div className="p-2 bg-gradient-to-r from-primary to-purple-600 rounded-lg shadow-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-800">{session.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{session.instructor}</p>
                  <p className="text-xs text-slate-500 mt-1">{session.date} at {session.time}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-primary/20 text-primary hover:bg-primary/5"
            >
              View All Sessions
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Application Status */}
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800">Application Status</CardTitle>
            <CardDescription>Overview of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <EnhancedPieChart 
                data={applicationStatusData}
                height={200}
                innerRadius={40}
                showLegend={false}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {applicationStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600 font-medium">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Performance Chart */}
      <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-800">Training Performance</CardTitle>
          <CardDescription>Pre vs Post training evaluation scores showing your improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <EnhancedLineChart 
              data={performanceData}
              dataKeys={chartDataKeys}
              height={300}
              showArea={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};