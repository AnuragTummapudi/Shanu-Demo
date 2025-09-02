import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, TrendingUp, Users, Building, Target } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';
import { EnhancedLineChart, EnhancedBarChart, AnimatedCounter } from '../common/AdvancedCharts';

export const CompanyAnalyticsPage: React.FC = () => {
  const { goBack } = useNavigation();

  const companyMetrics = [
    { label: 'Total Partnerships', value: 89, icon: Building, color: 'blue' },
    { label: 'Active Recruiters', value: 67, icon: Users, color: 'green' },
    { label: 'Hiring Rate', value: 94, icon: Target, color: 'purple', suffix: '%' },
    { label: 'Avg Packages', value: 12.5, icon: TrendingUp, color: 'orange', suffix: ' LPA' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={goBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Company Analytics</h1>
              <p className="text-slate-600">Detailed insights into company partnerships and recruitment trends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {companyMetrics.map((metric, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix || ''} />
                    </div>
                    <div className="text-sm text-slate-600">{metric.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Company Analytics Dashboard</CardTitle>
            <CardDescription>Comprehensive analytics coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Advanced Analytics</h3>
              <p className="text-slate-600">Detailed company performance metrics and recruitment analytics will be available here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};